import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the A/B Test page
  await page.goto("https://the-internet.herokuapp.com/abtest");

  // Wait for the h3 element to load
  await page.waitForSelector("h3");

  // Get the h3 heading text
  const heading = await page.$eval("h3", (el) => el.textContent);

  // Print the heading to console
  console.log("Pealkiri:", heading);

  await browser.close();
})();
