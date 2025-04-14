const puppeteer = require("puppeteer");

const BATCH_SIZE = 300;
const CONCURRENCY = 10;
const URL = "https://kayaquiz.com";

const SLOW_4G = {
  offline: false,
  downloadThroughput: (200 * 1024) / 8,
  uploadThroughput: (200 * 1024) / 8,
  latency: 400,
};

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const pagePool = [];

  for (let i = 0; i < BATCH_SIZE; i++) {
    if (i > 0 && i % CONCURRENCY === 0) {
      console.log(`⌛ Pausing after batch ${i}...`);
      await delay(2000);
    }

    const page = await browser.newPage();

    // Simulate mobile
    await page.setViewport({ width: 375, height: 667 });
    await page.setUserAgent(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    );

    // Throttle network
    const client = await page.target().createCDPSession();
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", SLOW_4G);

    await page.setCacheEnabled(false);

    // Unregister service workers
    await page.evaluateOnNewDocument(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((regs) =>
          regs.forEach((reg) => reg.unregister())
        );
      }
    });

    page.on("response", (response) => {
      if (!response.ok()) {
        console.warn(`⚠️ ${response.status()} on ${response.url()}`);
      }
    });

    pagePool.push(page);

    // Try to load page with more generous timeout and deeper wait
    page
      .goto(`${URL}?rnd=${Date.now()}&user=${i}`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      })
      .then(() => console.log(`✅ Page ${i + 1} loaded`))
      .catch((err) =>
        console.error(`❌ Page ${i + 1} failed to load: ${err.message}`)
      );
  }

  console.log("🔁 Waiting to observe traffic for 30s...");
  await delay(30000);
  await browser.close();
})();
