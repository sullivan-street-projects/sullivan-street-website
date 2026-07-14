// Asserts the built HTML in dist/ carries the site's actual content —
// the AEO contract this migration exists to enforce. Extend the checks
// list as sections land; run via `npm run verify`.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
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

// --- Task 7: services island ---
check('services copy SSRed', () => html('index.html').includes('Your marketing investment'));
check('services section id', () => html('index.html').includes('id="services"'));

// --- Task 8: partner outcomes island ---
check('outcomes section id', () => html('index.html').includes('id="outcomes"'));

// --- Task 9: chrome ---
check('footer AI summary links', () =>
  ['claude.ai/new?q=', 'chat.openai.com/?q='].every((u) => html('index.html').includes(u)),
);
check('footer legal links', () =>
  ['href="/privacy-policy"', 'href="/terms-and-conditions"'].every((u) =>
    html('index.html').includes(u),
  ),
);
check('nav items present', () =>
  ['Approach', 'Services', 'About', 'Call'].every((l) => html('index.html').includes(l)),
);

// --- Task 10: consent ---
check(
  'cookie consent island present',
  () => html('index.html').includes('astro-island') && html('index.html').includes('CookieConsent'),
);

// --- Task 11: legal + 404 ---
check(
  'privacy policy page built',
  () =>
    existsSync(dist('privacy-policy.html')) &&
    html('privacy-policy.html').includes('Privacy Policy'),
);
check(
  'terms page built',
  () =>
    existsSync(dist('terms-and-conditions.html')) &&
    html('terms-and-conditions.html').includes('Terms'),
);
check('404 page built', () => existsSync(dist('404.html')) && html('404.html').includes('404'));

// --- Task 12: deploy plumbing ---
check('sitemap-index emitted', () => existsSync(dist('sitemap-index.xml')));
check('robots points at new sitemap', () =>
  readFileSync(dist('robots.txt'), 'utf-8').includes('sitemap-index.xml'),
);
check(
  'htaccess has no SPA catch-all',
  () => !readFileSync(dist('.htaccess'), 'utf-8').includes('RewriteRule ^ index.html'),
);
check('stale static sitemap removed', () => !existsSync(dist('sitemap.xml')));
check('netlify redirects removed', () => !existsSync(dist('_redirects')));

// --- Task 15: verification meta (token-gated: pass vacuously while the
// tokens in BaseLayout are '', enforce presence forever once they're set) ---
const baseLayoutSrc = readFileSync(
  new URL('../src/layouts/BaseLayout.astro', import.meta.url),
  'utf-8',
);
const googleTokenSet = !/google:\s*''/.test(baseLayoutSrc);
const bingTokenSet = !/bing:\s*''/.test(baseLayoutSrc);
check(
  'search-console verification present (when token set)',
  () => !googleTokenSet || html('index.html').includes('name="google-site-verification"'),
);
check(
  'bing verification present (when token set)',
  () => !bingTokenSet || html('index.html').includes('name="msvalidate.01"'),
);

// --- De-React Phase A: CSS scroll-driven FocusText ---
check('focus-text scroll animation compiled into CSS', () => {
  const cssFile = readdirSync(dist('_astro')).find((f) => f.endsWith('.css'));
  const css = readFileSync(dist(`_astro/${cssFile}`), 'utf-8');
  return css.includes('focus-reveal') && css.includes('animation-timeline');
});

// --- De-React Phase A: vanilla typewriter ---
check('hero H1 is static text (no island, no ghost)', () => {
  const h1 = html('index.html').match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? '';
  return (
    h1.includes('Billion-Dollar Brands') &&
    !h1.includes('astro-island') &&
    !h1.includes('opacity-0')
  );
});

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
