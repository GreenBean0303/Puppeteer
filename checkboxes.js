import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Checkboxes page
  await page.goto("https://the-internet.herokuapp.com/checkboxes");

  // Wait for checkboxes
  await page.waitForSelector('input[type="checkbox"]');

  // Get all checkboxes
  const checkboxes = await page.$$('input[type="checkbox"]');

  // Check both checkboxes (mark them if not already marked)
  for (const checkbox of checkboxes) {
    const isChecked = await page.evaluate((el) => el.checked, checkbox);
    if (!isChecked) {
      await checkbox.click();
    }
  }

  console.log("Mõlemad kastid on märgitud");

  // Verify both are checked
  let allChecked = true;
  for (const checkbox of checkboxes) {
    const isChecked = await page.evaluate((el) => el.checked, checkbox);
    if (!isChecked) {
      allChecked = false;
    }
  }

  if (allChecked) {
    console.log("✓ Kontrolli läbitud: mõlemad kastid on märgitud");
  } else {
    console.log("✗ Kontrolli ebaõnnestus: mõni kast ei ole märgitud");
  }

  await browser.close();
})();
