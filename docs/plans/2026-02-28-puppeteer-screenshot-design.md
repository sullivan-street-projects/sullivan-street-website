# Puppeteer Screenshot Utility — Design

## Overview

A standalone Node script (`scripts/screenshot.js`) for taking screenshots of any URL. Supports configurable viewports, full-page capture, element targeting, animation delays, and auto-starting the Vite dev server for localhost URLs.

## File & Dependency Changes

- **New file:** `scripts/screenshot.js`
- **New dev dependency:** `puppeteer`
- **Modified:** `package.json` (add dependency + `"screenshot"` npm script)

No changes to app code, Vite config, or existing source files.

## CLI Interface

```
node scripts/screenshot.js <url> [options]
npm run screenshot -- <url> [options]
```

| Flag | Default | Description |
|------|---------|-------------|
| `--output, -o` | `./screenshot.png` | Output file path |
| `--width, -w` | `1280` | Viewport width |
| `--height, -h` | `720` | Viewport height |
| `--scale, -s` | `2` | Device pixel ratio |
| `--full-page` | `false` | Capture full scrollable page |
| `--selector` | (none) | CSS selector to screenshot a specific element |
| `--delay` | `0` | Wait N ms after load (for animations) |

## Script Flow

1. Parse CLI args using `node:util` `parseArgs` (no extra dependencies)
2. If URL contains `localhost` and the port isn't responding, spawn `npx vite` as a child process and wait for it to be ready
3. Launch Puppeteer with configured viewport width/height and device scale factor
4. Navigate to URL, wait for `networkidle0`
5. If `--delay` specified, wait additional milliseconds
6. If `--selector` specified, find element and screenshot it; otherwise screenshot the page (respecting `--full-page`)
7. Save PNG to `--output` path
8. Clean up: close browser, kill dev server if we started one
9. Log output path to console

## Approach: Option A (Standalone Script)

Chosen over a shared module + CLI wrapper (premature abstraction — no server-side code to import it) and over `capture-website-cli` (less control over browser lifecycle and dev server management).
