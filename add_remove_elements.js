import puppeteer from "puppeteer";

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

  // Navigate to the Add/Remove Elements page
  await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");

  // Click "Add Element" button twice
  await page.click('button[onclick="addElement()"]');
  await page.click('button[onclick="addElement()"]');

  // Wait a moment for elements to be added
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check how many "Delete" buttons appeared
  const deleteButtons = await page.$$(".added-manually");
  console.log("Delete nuppude arv:", deleteButtons.length);

  // Verify that 2 "Delete" buttons appeared
  if (deleteButtons.length === 2) {
    console.log('✓ Kontrolli läbitud: 2 "Delete" nuppu on lisatud');
  } else {
    console.log(
      "✗ Kontrolli ebaõnnestus: oodatud 2, leitud",
      deleteButtons.length
    );
  }

  // Remove one button
  await page.click(".added-manually");
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check remaining buttons
  const remainingButtons = await page.$$(".added-manually");
  console.log(
    "Ülejäänud nuppude arv pärast eemaldamist:",
    remainingButtons.length
  );

  await browser.close();
})();
