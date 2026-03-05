# Puppeteer Screenshot Utility — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a general-purpose CLI screenshot tool that works with any URL, auto-starts the Vite dev server for localhost targets, and supports viewport/full-page/selector/delay options.

**Architecture:** Single standalone ESM script at `scripts/screenshot.js` using Node's built-in `parseArgs` for CLI args and `puppeteer` for headless Chrome. Dev server auto-start uses `child_process.spawn` with a TCP port check to detect if the server is already running.

**Tech Stack:** Node 22, Puppeteer, node:util (parseArgs), node:net, node:child_process

---

### Task 1: Install Puppeteer

**Files:**
- Modify: `package.json` (puppeteer added to devDependencies, new screenshot script)

**Step 1: Install puppeteer as a dev dependency**

Run: `npm install --save-dev puppeteer`

**Step 2: Add the npm script to package.json**

In `package.json`, add to `"scripts"`:
```json
"screenshot": "node scripts/screenshot.js"
```

**Step 3: Verify installation**

Run: `node -e "const p = await import('puppeteer'); console.log('puppeteer OK', Object.keys(p))"`
Expected: prints `puppeteer OK` with exported keys

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add puppeteer dev dependency and screenshot npm script"
```

---

### Task 2: Create screenshot script — arg parsing and help text

**Files:**
- Create: `scripts/screenshot.js`

**Step 1: Create the script with CLI arg parsing**

```js
#!/usr/bin/env node
import { parseArgs } from 'node:util';

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

// Will add screenshot logic in Task 3, dev server logic in Task 4
console.log('Config:', config);
console.log('URL:', url);
```

**Step 2: Verify arg parsing works**

Run: `node scripts/screenshot.js --help`
Expected: prints usage text

Run: `node scripts/screenshot.js http://example.com -w 1920 --full-page`
Expected: prints Config with width 1920 and fullPage true

**Step 3: Commit**

```bash
git add scripts/screenshot.js
git commit -m "feat: add screenshot script with CLI arg parsing"
```

---

### Task 3: Add core screenshot logic

**Files:**
- Modify: `scripts/screenshot.js` (replace the placeholder console.logs with Puppeteer logic)

**Step 1: Add the screenshot function**

Replace the placeholder `console.log` lines at the bottom of `scripts/screenshot.js` with:

```js
import puppeteer from 'puppeteer';

async function takeScreenshot(url, config) {
  const browser = await puppeteer.launch();
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
      console.error(`Selector "${config.selector}" not found on page.`);
      await browser.close();
      process.exit(1);
    }
    await el.screenshot(screenshotOptions);
  } else {
    screenshotOptions.fullPage = config.fullPage;
    await page.screenshot(screenshotOptions);
  }

  await browser.close();
  console.log(`Screenshot saved to ${config.output}`);
}
```

Note: the `import puppeteer` line should be at the top of the file with the other imports.

**Step 2: Call the function**

At the bottom of the file:
```js
await takeScreenshot(url, config);
```

**Step 3: Test with an external URL**

Run: `node scripts/screenshot.js https://example.com -o ./test-screenshot.png`
Expected: creates `test-screenshot.png` in project root, prints "Screenshot saved to ./test-screenshot.png"

Verify the file exists:
Run: `ls -la test-screenshot.png`

Clean up test file:
Run: `rm test-screenshot.png`

**Step 4: Commit**

```bash
git add scripts/screenshot.js
git commit -m "feat: add core Puppeteer screenshot logic"
```

---

### Task 4: Add auto dev server start for localhost URLs

**Files:**
- Modify: `scripts/screenshot.js` (add port check + Vite spawn logic before `takeScreenshot`)

**Step 1: Add the port-checking utility**

Add these imports at the top:
```js
import { createConnection } from 'node:net';
import { spawn } from 'node:child_process';
```

Add this function before `takeScreenshot`:

```js
function isPortOpen(port, host = 'localhost') {
  return new Promise((resolve) => {
    const socket = createConnection({ port, host });
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => resolve(false));
  });
}

async function ensureDevServer(url) {
  const parsed = new URL(url);
  const port = parsed.port || (parsed.protocol === 'https:' ? 443 : 80);

  if (await isPortOpen(Number(port), parsed.hostname)) {
    return null; // already running
  }

  console.log(`Starting Vite dev server on port ${port}...`);
  const child = spawn('npx', ['vite', '--port', String(port)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  // Wait for server to be ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Dev server start timed out after 30s')), 30_000);
    child.stdout.on('data', (data) => {
      if (data.toString().includes('Local:')) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.on('error', (err) => { clearTimeout(timeout); reject(err); });
    child.on('exit', (code) => {
      if (code) { clearTimeout(timeout); reject(new Error(`Dev server exited with code ${code}`)); }
    });
  });

  console.log('Dev server ready.');
  return child;
}
```

**Step 2: Wire it into the main flow**

Replace the final `await takeScreenshot(url, config);` with:

```js
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
```

**Step 3: Test with localhost (dev server not running)**

Make sure no Vite server is running, then:
Run: `node scripts/screenshot.js http://localhost:5173 -o ./test-local.png`
Expected: prints "Starting Vite dev server...", "Dev server ready.", takes screenshot, prints "Dev server stopped."

Verify: `ls -la test-local.png`
Clean up: `rm test-local.png`

**Step 4: Test with localhost (dev server already running)**

Start Vite in another terminal, then:
Run: `node scripts/screenshot.js http://localhost:5173 -o ./test-existing.png`
Expected: does NOT print "Starting Vite dev server" — just takes the screenshot directly.

Clean up: `rm test-existing.png`

**Step 5: Commit**

```bash
git add scripts/screenshot.js
git commit -m "feat: auto-start Vite dev server for localhost screenshots"
```

---

### Task 5: Add screenshot.png to .gitignore

**Files:**
- Modify or create: `.gitignore`

**Step 1: Add screenshot output patterns to .gitignore**

Append to `.gitignore`:
```
# Screenshot utility output
screenshot.png
*.screenshot.png
```

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore screenshot output files"
```
