import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Context Menu page
  await page.goto("https://the-internet.herokuapp.com/context_menu");

  // Wait for the hot-spot element
  await page.waitForSelector("#hot-spot");

  // Set up dialog handler to accept the alert
  page.on("dialog", async (dialog) => {
    console.log("Alert sõnum:", dialog.message());
    await dialog.accept();
  });

  // Right-click on the hot-spot area
  await page.click("#hot-spot", { button: "right" });

  // Wait a moment for the alert to be handled
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("✓ Paremklõps tehtud ja alert nõustutud");

  await browser.close();
})();
