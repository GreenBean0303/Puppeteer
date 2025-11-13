import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/abtest");
  await page.waitForSelector("h3");
  const heading = await page.$eval("h3", (el) => el.textContent);
  console.log("Pealkiri:", heading);

  await browser.close();
})();
