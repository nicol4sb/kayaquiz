const puppeteer = require("puppeteer");

const BROWSER_COUNT = 30;
const URL = "https://kayaquiz.com";
const SLOW_3G = {
  offline: false,
  downloadThroughput: (400 * 1024) / 8,
  uploadThroughput: (400 * 1024) / 8,
  latency: 400,
};

(async () => {
  console.log(`🚨 Starting spike load test with ${BROWSER_COUNT} clients...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const tasks = Array.from({ length: BROWSER_COUNT }, async (_, i) => {
    try {
      const page = await browser.newPage();

      await page.setViewport({ width: 375, height: 667 });
      await page.setUserAgent(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
      );

      const client = await page.target().createCDPSession();
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", SLOW_3G);

      page.on("request", (req) => {
        console.log(`🛰️ [${i + 1}] Request: ${req.method()} ${req.url()}`);
      });

      page.on("response", (res) => {
        console.log(`📦 [${i + 1}] Response: ${res.status()} ${res.url()}`);
      });

      await page.goto(URL, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });

      console.log(`✅ [${i + 1}] Page loaded`);
    } catch (err) {
      console.error(`❌ [${i + 1}] Failed: ${err.message}`);
    }
  });

  // Fire them all at once!
  await Promise.all(tasks);

  console.log("🎉 Spike test complete.");
  await browser.close();
})();
