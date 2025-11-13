import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Disappearing Elements page
  await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

  // Wait for the navigation menu
  await page.waitForSelector("ul li");

  // Count navigation menu elements
  const menuItems = await page.$$("ul li");
  const count = menuItems.length;

  console.log("Menüü elementide arv:", count);

  // Optional: Print all menu items
  console.log("Menüü elemendid:");
  for (let i = 0; i < menuItems.length; i++) {
    const text = await page.evaluate((el) => el.textContent, menuItems[i]);
    console.log(`  ${i + 1}. ${text}`);
  }

  await browser.close();
})();
