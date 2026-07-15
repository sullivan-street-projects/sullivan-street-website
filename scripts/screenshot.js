#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { createConnection } from 'node:net';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    output: { type: 'string', short: 'o', default: './screenshot.png' },
    width: { type: 'string', short: 'w', default: '1280' },
    height: { type: 'string', short: 'h', default: '720' },
    scale: { type: 'string', short: 's', default: '2' },
    'full-page': { type: 'boolean', default: false },
    selector: { type: 'string', default: '' },
    'scroll-to': { type: 'string', default: '' },
    settle: { type: 'string', default: '800' },
    delay: { type: 'string', default: '0' },
    help: { type: 'boolean', default: false },
  },
});

if (values.help || positionals.length === 0) {
  console.log(
    `
Usage: node scripts/screenshot.js <url> [options]

Options:
  -o, --output <path>     Output file path (default: ./screenshot.png)
  -w, --width <px>        Viewport width (default: 1280)
  -h, --height <px>       Viewport height (default: 720)
  -s, --scale <n>         Device pixel ratio (default: 2)
      --full-page         Capture full scrollable page
      --selector <css>    Screenshot a specific element
      --scroll-to <css>   Scroll element to viewport center before capture
      --settle <ms>       Wait after scroll for animations (default: 800)
      --delay <ms>        Wait after load (default: 0)
      --help              Show this help
`.trim(),
  );
  process.exit(0);
}

const url = positionals[0];
const config = {
  output: values.output,
  width: parseInt(values.width, 10),
  height: parseInt(values.height, 10),
  scale: parseFloat(values.scale),
  fullPage: values['full-page'],
  selector: values.selector,
  scrollTo: values['scroll-to'],
  settle: parseInt(values.settle, 10),
  delay: parseInt(values.delay, 10),
};

function probeHost(port, host) {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

// 'localhost' may resolve to IPv4 while the dev server binds IPv6-only (or
// vice versa) — probe both families so a running server is never missed.
async function isPortOpen(port, host = 'localhost') {
  const hosts = host === 'localhost' ? ['127.0.0.1', '::1'] : [host];
  const results = await Promise.all(hosts.map((h) => probeHost(port, h)));
  return results.some(Boolean);
}

async function ensureDevServer(url) {
  const parsed = new URL(url);
  const port = parsed.port || (parsed.protocol === 'https:' ? 443 : 80);

  if (await isPortOpen(Number(port), parsed.hostname)) {
    return null; // already running
  }

  console.log(`Starting Astro dev server on port ${port}...`);
  const child = spawn('npx', ['astro', 'dev', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'ignore', 'inherit'],
  });

  // Readiness = the port accepts connections. Polling the socket is immune
  // to dev-server output-format changes (Astro 6 stopped printing 'Local:',
  // which silently broke the old stdout-substring detection).
  await new Promise((resolve, reject) => {
    const deadline = Date.now() + 30_000;
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code) reject(new Error(`Dev server exited with code ${code}`));
    });
    const poll = async () => {
      if (await isPortOpen(Number(port), parsed.hostname)) return resolve();
      if (Date.now() > deadline) return reject(new Error('Dev server start timed out after 30s'));
      setTimeout(poll, 500);
    };
    poll();
  });

  console.log('Dev server ready.');
  return child;
}

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
      await new Promise((r) => setTimeout(r, config.delay));
    }

    // Scroll target into viewport center (triggers FocusText/scroll animations)
    const scrollTarget = config.scrollTo || config.selector;
    if (scrollTarget) {
      const scrollEl = await page.$(scrollTarget);
      if (!scrollEl) {
        throw new Error(`Scroll target "${scrollTarget}" not found on page.`);
      }
      await scrollEl.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      // Wait for scroll-driven animations (FocusText opacity/blur) to settle
      if (config.settle > 0) {
        await new Promise((r) => setTimeout(r, config.settle));
      }
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

let devServer = null;
try {
  const parsed = new URL(url);
  if (['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname)) {
    devServer = await ensureDevServer(url);
  }
  await takeScreenshot(url, config);
} finally {
  if (devServer) {
    devServer.kill();
    console.log('Dev server stopped.');
  }
}
