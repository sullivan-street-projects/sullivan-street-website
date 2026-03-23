#!/usr/bin/env node
/**
 * Post-build prerender script.
 *
 * 1. Starts `vite preview` to serve the production build
 * 2. Loads the page in Puppeteer with prefers-reduced-motion: reduce
 *    (TypewriterText shows full text, FocusText renders at full opacity)
 * 3. Extracts the rendered innerHTML from #root
 * 4. Injects it into dist/index.html so AI crawlers see real content
 * 5. Shuts down
 *
 * Usage: node scripts/prerender.js
 * Typically run after `vite build` via: npm run build && npm run prerender
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createConnection } from 'node:net';
import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const DIST_DIR = resolve(process.cwd(), 'dist');
const INDEX_PATH = resolve(DIST_DIR, 'index.html');
const PREVIEW_PORT = 4173;
const PREVIEW_URL = `http://localhost:${PREVIEW_PORT}`;

function isPortOpen(port, host = 'localhost') {
  return new Promise((res) => {
    const socket = createConnection({ port, host });
    socket.once('connect', () => { socket.destroy(); res(true); });
    socket.once('error', () => { socket.destroy(); res(false); });
  });
}

async function startPreviewServer() {
  if (await isPortOpen(PREVIEW_PORT)) {
    console.log(`Preview server already running on port ${PREVIEW_PORT}.`);
    return null;
  }

  console.log('Starting vite preview server...');
  const child = spawn('npx', ['vite', 'preview', '--port', String(PREVIEW_PORT)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'inherit'],
  });

  await new Promise((res, reject) => {
    const timeout = setTimeout(() => reject(new Error('Preview server timed out after 30s')), 30_000);
    child.stdout.on('data', (data) => {
      if (data.toString().includes('Local:')) {
        clearTimeout(timeout);
        res();
      }
    });
    child.on('error', (err) => { clearTimeout(timeout); reject(err); });
    child.on('exit', (code) => {
      if (code) { clearTimeout(timeout); reject(new Error(`Preview server exited with code ${code}`)); }
    });
  });

  console.log('Preview server ready.');
  return child;
}

async function captureRenderedHTML() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // Emulate reduced motion so TypewriterText shows full text
    // and FocusText renders at full opacity — clean content for crawlers
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);

    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(PREVIEW_URL, { waitUntil: 'networkidle0' });

    // Wait for React hydration + any remaining async renders
    await new Promise(r => setTimeout(r, 3000));

    // Extract the rendered content inside #root
    const rootHTML = await page.evaluate(() => {
      return document.getElementById('root').innerHTML;
    });
    return rootHTML;
  } finally {
    await browser.close();
  }
}

async function injectIntoIndex(renderedHTML) {
  const indexHTML = readFileSync(INDEX_PATH, 'utf-8');

  // Replace empty <div id="root"></div> with the rendered content
  const injected = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedHTML}</div>`
  );

  if (injected === indexHTML) {
    throw new Error('Could not find <div id="root"></div> in dist/index.html — already prerendered?');
  }

  writeFileSync(INDEX_PATH, injected, 'utf-8');

  // Report size
  const before = Buffer.byteLength(indexHTML, 'utf-8');
  const after = Buffer.byteLength(injected, 'utf-8');
  console.log(`Injected ${((after - before) / 1024).toFixed(1)} KB of rendered HTML into dist/index.html`);
  console.log(`  Before: ${(before / 1024).toFixed(1)} KB → After: ${(after / 1024).toFixed(1)} KB`);
}

// Main
let previewServer = null;
try {
  previewServer = await startPreviewServer();
  console.log('Capturing rendered HTML...');
  const renderedHTML = await captureRenderedHTML();
  console.log(`Captured ${(Buffer.byteLength(renderedHTML, 'utf-8') / 1024).toFixed(1)} KB of rendered content.`);
  await injectIntoIndex(renderedHTML);
  console.log('Prerender complete. dist/index.html now contains static HTML for AI crawlers.');
} catch (err) {
  console.error('Prerender failed:', err.message);
  process.exit(1);
} finally {
  if (previewServer) {
    previewServer.kill();
    console.log('Preview server stopped.');
  }
}
