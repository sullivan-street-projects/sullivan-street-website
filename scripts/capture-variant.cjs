const puppeteer = require('puppeteer');

(async () => {
  const variantLabel = process.argv[2] || 'eMarketer';
  const output = process.argv[3] || 'screenshot-emarketer.png';

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#playground', { waitUntil: 'networkidle0', timeout: 15000 });

  // Click the variant button matching the label
  const clicked = await page.evaluate((label) => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.includes(label)) {
        btn.click();
        return true;
      }
    }
    return false;
  }, variantLabel);

  if (!clicked) {
    console.error(`Could not find variant button with label "${variantLabel}"`);
    await browser.close();
    process.exit(1);
  }

  // Wait for component to load and animations to complete
  await new Promise((r) => setTimeout(r, 5000));
  await page.screenshot({ path: output, fullPage: false });
  console.log(`Screenshot saved to ${output}`);
  await browser.close();
})();
