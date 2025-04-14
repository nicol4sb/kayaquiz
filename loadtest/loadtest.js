const puppeteer = require("puppeteer");

const BROWSER_COUNT = 20;
const URL = "https://kayaquiz.com";

const FAST_4G = {
  offline: false,
  downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
  uploadThroughput: (750 * 1024) / 8,          // 750 kbps
  latency: 150, // ms
};

(async () => {
  console.log(`🚀 Starting load test with ${BROWSER_COUNT} clients...\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const durations = [];

  const tasks = Array.from({ length: BROWSER_COUNT }, async (_, i) => {
    try {
      const page = await browser.newPage();

      await page.setViewport({ width: 375, height: 667 });
      await page.setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
      );

      const client = await page.target().createCDPSession();
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", FAST_4G);

      // Skip rendering-heavy resources (like fonts)
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const type = req.resourceType();
        if (type === 'document' || type === 'script' || type === 'stylesheet' || type === 'image') {
          req.continue();
        } else {
          req.abort();
        }
      });

      const start = Date.now();
      await page.goto(URL, {
        waitUntil: "networkidle2", // don't wait forever
        timeout: 60000,
      });
      const duration = Date.now() - start;
      durations.push(duration);
    } catch (err) {
      console.error(`❌ [${i + 1}] Failed: ${err.message}`);
    }
  });

  await Promise.all(tasks);
  await browser.close();

  // Summary
  const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
  const min = Math.min(...durations);
  const max = Math.max(...durations);

  console.log("\n📊 Load Test Summary:");
  console.log(` - Clients:       ${durations.length} / ${BROWSER_COUNT}`);
  console.log(` - Average load:  ${Math.round(avg)} ms`);
  console.log(` - Fastest load:  ${min} ms`);
  console.log(` - Slowest load:  ${max} ms`);
})();
