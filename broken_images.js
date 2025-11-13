import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Broken Images page
  await page.goto("https://the-internet.herokuapp.com/broken_images");

  // Wait for images to load
  await page.waitForSelector("img");

  // Get all img elements
  const images = await page.$$("img");
  console.log("Kõik pildid kokku:", images.length);

  // Check how many images are broken
  let brokenCount = 0;

  for (const img of images) {
    const isBroken = await page.evaluate((element) => {
      // Check if image failed to load (naturalWidth is 0 for broken images)
      return element.naturalWidth === 0;
    }, img);

    if (isBroken) {
      brokenCount++;
    }
  }

  console.log("Katkised pildid:", brokenCount);

  await browser.close();
})();
