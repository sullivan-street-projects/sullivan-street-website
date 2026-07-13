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

// --- Task 5: static sections ---
check('Hero payoff text SSRed (typewriter ghost)', () =>
  html('index.html').includes('Billion-Dollar Brands'),
);
check('Statement copy present', () => html('index.html').includes('someone owning the outcome'));
check('Intro heading present', () => html('index.html').includes('Make Marketing Work'));
check('Approach heading present', () => html('index.html').includes('Growth Marketing'));
check('About founder present', () => html('index.html').includes('Brett Wohl'));
check('Contact CTA href present', () =>
  html('index.html').includes('tidycal.com/sullivan-street-projects/growth-consultation'),
);
check('section ids present', () =>
  ['hero', 'statement', 'intro', 'approach', 'about', 'contact'].every((id) =>
    html('index.html').includes(`id="${id}"`),
  ),
);

// --- Task 6: credentials island ---
check('credentials brands SSRed', () =>
  ['Apple', 'JPMorgan Chase', 'Samsung'].every((b) => html('index.html').includes(b)),
);
check('credentials section id', () => html('index.html').includes('id="credentials"'));

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
