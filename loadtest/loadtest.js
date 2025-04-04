const puppeteer = require('puppeteer');
const { Cluster } = require('puppeteer-cluster');

const users = parseInt(process.argv[2], 10) || 40;
const targetURL = 'https://kayaquiz.com';

(async () => {
  const devices = puppeteer.KnownDevices || puppeteer.devices;
  const mobileDevices = Object.keys(devices).filter(
    (name) => devices[name].viewport?.isMobile
  );

  const results = [];

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: users,
    puppeteerOptions: {
      headless: true,
      args: ['--no-sandbox'],
    },
    timeout: 120000,
    monitor: true,
  });

  await cluster.task(async ({ page, data: { url, index } }) => {
    const deviceName = mobileDevices[Math.floor(Math.random() * mobileDevices.length)];
    const device = devices[deviceName];

    await page.emulate(device);

    let totalBytes = 0;
    let requestCount = 0;

    page.on('response', async (response) => {
      try {
        const buffer = await response.buffer();
        totalBytes += buffer.length;
        requestCount++;
      } catch (e) {
        // Skipping unreadable responses (e.g., no content-length)
      }
    });

    const startTime = Date.now();
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });
      const duration = Date.now() - startTime;

      results.push({
        index,
        device: deviceName,
        duration,
        totalBytes,
        requestCount,
      });

      console.log(`✔ User ${index + 1} | ${deviceName} | ${duration} ms | ${(totalBytes / 1024 / 1024).toFixed(2)} MB | ${requestCount} requests`);
    } catch (err) {
      console.log(`✘ User ${index + 1} | ${deviceName} | Error: ${err.message}`);
    }
  });

  // Queue all users up front
  for (let i = 0; i < users; i++) {
    cluster.queue({ url: targetURL, index: i });
  }

  // Wait for all to finish
  await cluster.idle();
  await cluster.close();

  // Summary
  const successful = results.length;
  if (successful === 0) return console.log('\n⚠️ No successful page loads.');

  const avgTime = (results.reduce((sum, r) => sum + r.duration, 0) / successful).toFixed(2);
  const avgSize = (results.reduce((sum, r) => sum + r.totalBytes, 0) / successful / 1024 / 1024).toFixed(2);

  console.log('\n✅ Summary:');
  console.log(`- Successful loads: ${successful}/${users}`);
  console.log(`- Average load time: ${avgTime} ms`);
  console.log(`- Average page size: ${avgSize} MB`);
})();
