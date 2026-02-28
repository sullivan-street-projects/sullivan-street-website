#!/usr/bin/env node
import { parseArgs } from 'node:util';
import puppeteer from 'puppeteer';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    output:    { type: 'string',  short: 'o', default: './screenshot.png' },
    width:     { type: 'string',  short: 'w', default: '1280' },
    height:    { type: 'string',  short: 'h', default: '720' },
    scale:     { type: 'string',  short: 's', default: '2' },
    'full-page': { type: 'boolean', default: false },
    selector:  { type: 'string',  default: '' },
    delay:     { type: 'string',  default: '0' },
    help:      { type: 'boolean', default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(`
Usage: node scripts/screenshot.js <url> [options]

Options:
  -o, --output <path>     Output file path (default: ./screenshot.png)
  -w, --width <px>        Viewport width (default: 1280)
  -h, --height <px>       Viewport height (default: 720)
  -s, --scale <n>         Device pixel ratio (default: 2)
      --full-page         Capture full scrollable page
      --selector <css>    Screenshot a specific element
      --delay <ms>        Wait after load (default: 0)
      --help              Show this help
`.trim());
  process.exit(0);
}

const url = positionals[0];
const config = {
  output:   values.output,
  width:    parseInt(values.width, 10),
  height:   parseInt(values.height, 10),
  scale:    parseFloat(values.scale),
  fullPage: values['full-page'],
  selector: values.selector,
  delay:    parseInt(values.delay, 10),
};

async function takeScreenshot(url, config) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: config.width,
      height: config.height,
      deviceScaleFactor: config.scale,
    });

    await page.goto(url, { waitUntil: 'networkidle0' });

    if (config.delay > 0) {
      await new Promise(r => setTimeout(r, config.delay));
    }

    const screenshotOptions = { path: config.output };

    if (config.selector) {
      const el = await page.$(config.selector);
      if (!el) {
        throw new Error(`Selector "${config.selector}" not found on page.`);
      }
      await el.screenshot(screenshotOptions);
    } else {
      screenshotOptions.fullPage = config.fullPage;
      await page.screenshot(screenshotOptions);
    }
  } finally {
    await browser.close();
  }
  console.log(`Screenshot saved to ${config.output}`);
}

await takeScreenshot(url, config);
