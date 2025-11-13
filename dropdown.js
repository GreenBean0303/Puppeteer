import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Dropdown page
  await page.goto("https://the-internet.herokuapp.com/dropdown");

  // Wait for the dropdown
  await page.waitForSelector("#dropdown");

  // Select "Option 2"
  await page.select("#dropdown", "2");

  console.log("Option 2 valitud");

  // Verify the selected value
  const selectedValue = await page.$eval("#dropdown", (el) => el.value);

  console.log("Valitud väärtus:", selectedValue);

  if (selectedValue === "2") {
    console.log("✓ Kontrolli läbitud: Option 2 on valitud");
  } else {
    console.log("✗ Kontrolli ebaõnnestus: vale väärtus valitud");
  }

  await browser.close();
})();
