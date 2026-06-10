import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://neo-brutalism-fashion.vercel.app/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'src/assets/projects/neo-brutalism.webp', type: 'webp' });
  await browser.close();
})();
