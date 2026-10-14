/* Captures a project screenshot for the portfolio (1280x800 @2x, WebP).
   Usage:  node screenshot.js <url> <name>   →  src/assets/projects/<name>.webp
   Then add a 800w copy (<name>-800.webp) and register it in src/data/projects.js.
   Needs Google Chrome installed; set CHROME_PATH if it lives elsewhere. */
/* global process */
import puppeteer from 'puppeteer-core';

const [url, name] = process.argv.slice(2);
if (!url || !name) {
  console.error('usage: node screenshot.js <url> <name>');
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
await new Promise((r) => setTimeout(r, 6000)); // let preloaders and intro animations finish
await page.screenshot({ path: `src/assets/projects/${name}.webp`, type: 'webp', quality: 84 });
await browser.close();
console.log(`saved src/assets/projects/${name}.webp`);
