// Asserts the built HTML in dist/ carries the site's actual content —
// the AEO contract this migration exists to enforce. Extend the checks
// list as sections land; run via `npm run verify`.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));
const html = (p) => readFileSync(dist(p), 'utf-8');

const checks = [];
const check = (name, fn) => checks.push({ name, fn });

// --- Task 2: shell ---
check('index.html exists', () => existsSync(dist('index.html')));
check('no SPA root div', () => !html('index.html').includes('<div id="root">'));
check('H1 copy in static HTML', () => html('index.html').includes('Marketing for Tomorrow'));
check('JSON-LD organization present', () => html('index.html').includes('"@type":"Organization"'));
check('canonical present', () =>
  html('index.html').includes('rel="canonical" href="https://sullivanstreetprojects.com"'),
);
check('llms.txt copied', () => existsSync(dist('llms.txt')));
check('robots.txt copied', () => existsSync(dist('robots.txt')));

let failed = 0;
for (const { name, fn } of checks) {
  let ok = false;
  try {
    ok = fn();
  } catch {
    ok = false;
  }
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name}`);
  if (!ok) failed++;
}
console.log('');
if (failed) {
  console.error(`${failed} of ${checks.length} checks failed`);
  process.exit(1);
}
console.log(`All ${checks.length} checks passed`);
