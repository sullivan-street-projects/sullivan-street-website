#!/usr/bin/env node
/**
 * Export brand assets as PNGs using Puppeteer.
 * Renders SVG-based logo lockups at exact pixel dimensions with Google Fonts loaded.
 *
 * Usage: node scripts/export-brand-assets.js
 */

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BRAND_DIR = path.join(__dirname, '..', 'brand');
const CHARCOAL = '#1a1a1a';
const PAPER = '#FAFAF8';

// Shared HTML template — renders centered content on a solid background with brand fonts loaded
function buildHTML({ bg, width, height, content }) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Instrument+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${width}px;
      height: ${height}px;
      background: ${bg};
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Libre Baskerville', Georgia, serif;
      overflow: hidden;
    }
  </style>
</head>
<body>${content}</body>
</html>`;
}

// Content builders for each lockup type

// Single-line wordmark — "Sullivan Street Projects" in one clean line
function wordmark(fg, fontSize = 36) {
  return `<span style="font-size: ${fontSize}px; color: ${fg}; letter-spacing: 0.04em; white-space: nowrap;">Sullivan Street Projects</span>`;
}

// Stacked wordmark — each word on its own line, left-aligned, group centered + tagline underneath
// Reference: brand/og-image.pen — 80px at 1200x630, scaled proportionally per asset
function wordmarkStacked(fg, fontSize = 80) {
  const tagSize = Math.round(fontSize * 0.225);
  const tagSpacing = Math.round(fontSize * 0.0625);
  const spacer = Math.round(fontSize * 0.35);
  const letterSp = Math.round(fontSize * 0.0375);
  return `<div style="text-align: left; line-height: 1.15;">
    <div style="font-size: ${fontSize}px; color: ${fg}; letter-spacing: ${letterSp}px;">Sullivan</div>
    <div style="font-size: ${fontSize}px; color: ${fg}; letter-spacing: ${letterSp}px;">Street</div>
    <div style="font-size: ${fontSize}px; color: ${fg}; letter-spacing: ${letterSp}px;">Projects</div>
    <div style="font-size: ${tagSize}px; color: #737373; letter-spacing: ${tagSpacing}px; text-transform: uppercase; margin-top: ${spacer}px; font-family: 'Instrument Sans', system-ui, sans-serif;">Growth Marketing Partners</div>
  </div>`;
}

// Single-line wordmark + tagline (for wide banners like LinkedIn profile)
function wordmarkWithTagline(fg) {
  return `<div style="text-align: center;">
    <div style="font-size: 36px; color: ${fg}; letter-spacing: 0.04em; white-space: nowrap;">Sullivan Street Projects</div>
    <div style="font-size: 14px; color: ${fg}; letter-spacing: 0.25em; text-transform: uppercase; margin-top: 12px; opacity: 0.7; font-family: 'Instrument Sans', system-ui, sans-serif;">Growth Marketing Partners</div>
  </div>`;
}

// SSP monogram
function monogram(fg) {
  return `<span style="font-size: 48px; color: ${fg}; letter-spacing: 0.15em;">SSP</span>`;
}

// SSP monogram + wordmark underneath (for OG images, title slides)
function monogramWithWordmark(fg) {
  return `<div style="text-align: center;">
    <div style="font-size: 72px; color: ${fg}; letter-spacing: 0.15em; margin-bottom: 24px;">SSP</div>
    <div style="font-size: 24px; color: ${fg}; letter-spacing: 0.04em; opacity: 0.8;">Sullivan Street Projects</div>
  </div>`;
}

// Bare S mark — scales font size relative to container
function sMarkBareScaled(fg, size) {
  const fontSize = Math.round(size * 0.55);
  return `<span style="font-size: ${fontSize}px; color: ${fg}; line-height: 1;">S</span>`;
}

// Asset definitions
const assets = [
  // LinkedIn
  { path: 'linkedin/company-logo-light.png', w: 300, h: 300, bg: PAPER, content: () => sMarkBareScaled(CHARCOAL, 300) },
  { path: 'linkedin/company-logo-dark.png', w: 300, h: 300, bg: CHARCOAL, content: () => sMarkBareScaled(PAPER, 300) },
  { path: 'linkedin/company-banner-light.png', w: 1128, h: 191, bg: PAPER, content: () => wordmark(CHARCOAL) },
  { path: 'linkedin/company-banner-dark.png', w: 1128, h: 191, bg: CHARCOAL, content: () => wordmark(PAPER) },
  { path: 'linkedin/profile-banner-light.png', w: 1584, h: 396, bg: PAPER, content: () => wordmarkWithTagline(CHARCOAL) },
  { path: 'linkedin/profile-banner-dark.png', w: 1584, h: 396, bg: CHARCOAL, content: () => wordmarkWithTagline(PAPER) },

  // Favicon / App Icon
  { path: 'favicon/favicon-32.png', w: 32, h: 32, bg: CHARCOAL, content: () => sMarkBareScaled(PAPER, 32) },
  { path: 'favicon/apple-touch-icon-180.png', w: 180, h: 180, bg: PAPER, content: () => sMarkBareScaled(CHARCOAL, 180) },
  { path: 'favicon/android-icon-512.png', w: 512, h: 512, bg: PAPER, content: () => sMarkBareScaled(CHARCOAL, 512) },

  // Social / OG
  { path: 'social/og-image-light.png', w: 1200, h: 630, bg: PAPER, content: () => monogramWithWordmark(CHARCOAL) },
  { path: 'social/og-image-dark.png', w: 1200, h: 630, bg: CHARCOAL, content: () => monogramWithWordmark(PAPER) },

  // Email — wider canvas so wordmark has breathing room
  { path: 'email/signature-light.png', w: 280, h: 36, bg: PAPER, content: () => wordmark(CHARCOAL, 14) },
  { path: 'email/signature-dark.png', w: 280, h: 36, bg: CHARCOAL, content: () => wordmark(PAPER, 14) },

  // Decks — header uses scaled-down wordmark to fit 600x80
  { path: 'decks/header-light.png', w: 600, h: 80, bg: PAPER, content: () => wordmark(CHARCOAL, 24) },
  { path: 'decks/header-dark.png', w: 600, h: 80, bg: CHARCOAL, content: () => wordmark(PAPER, 24) },
  { path: 'decks/title-slide-light.png', w: 1920, h: 1080, bg: PAPER, content: () => wordmarkStacked(CHARCOAL) },
  { path: 'decks/title-slide-dark.png', w: 1920, h: 1080, bg: CHARCOAL, content: () => wordmarkStacked(PAPER) },
];

async function main() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  for (const asset of assets) {
    const outPath = path.join(BRAND_DIR, asset.path);
    const html = buildHTML({
      bg: asset.bg,
      width: asset.w,
      height: asset.h,
      content: asset.content(),
    });

    await page.setViewport({ width: asset.w, height: asset.h, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 10000 });
    // Wait for Google Fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✓ ${asset.path} (${asset.w}x${asset.h})`);
  }

  await browser.close();
  console.log(`\nDone — ${assets.length} assets exported to brand/`);
}

main().catch(err => {
  console.error('Export failed:', err);
  process.exit(1);
});
