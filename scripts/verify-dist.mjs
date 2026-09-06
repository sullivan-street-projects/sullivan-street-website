// Asserts the built HTML in dist/ carries the site's actual content —
// the AEO contract this migration exists to enforce. Extend the checks
// list as sections land; run via `npm run verify`.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TIERS, VALUE_PROPS } from '../src/constants/index.js';

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));
const html = (p) => readFileSync(dist(p), 'utf-8');

// Emitted bundles. Filenames are content-hashed and move for unrelated
// reasons, so always resolve by extension/prefix — never a remembered name.
const distCss = () =>
  readdirSync(dist('_astro'))
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(dist(`_astro/${f}`), 'utf-8'))
    .join('\n');
const distJs = (prefix) =>
  readdirSync(dist('_astro'))
    .filter((f) => f.startsWith(prefix) && f.endsWith('.js'))
    .map((f) => readFileSync(dist(`_astro/${f}`), 'utf-8'))
    .join('\n');

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
  html('index.html').includes('call.sullivanstreetprojects.com/growth-consultation'),
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
check('credentials chart SVG SSRed', () => html('index.html').includes('chart-line'));

// --- De-React Phase A: permanent guardrails ---
check(
  'island ceiling: only Services/Outcomes/CookieConsent hydrate',
  () => (html('index.html').match(/<astro-island/g) || []).length <= 4,
);
check(
  'focus-text applied across sections',
  () => (html('index.html').match(/focus-text/g) || []).length >= 8,
);

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

check(
  'no FocusText/TypewriterText chunks emitted',
  () =>
    !readdirSync(dist('_astro')).some(
      (f) => f.startsWith('FocusText.') || f.startsWith('TypewriterText.'),
    ),
);

// --- Prod hardening (2026-07-14): landmarks, entity graph, CLS/CSP hygiene ---
check(
  'main landmark on home + legal + 404 pages',
  () =>
    html('index.html').includes('<main id="main"') &&
    html('privacy-policy.html').includes('<main') &&
    html('404.html').includes('<main id="main"'),
);
check(
  '404 keeps site chrome (header + footer)',
  () => html('404.html').includes('<header') && html('404.html').includes('<footer'),
);
check('404 is noindex', () => html('404.html').includes('content="noindex, follow"'));
check('404 claims no canonical', () => !html('404.html').includes('rel="canonical"'));
// Legal pages route through LegalPage.astro, which destructures only
// { title, canonicalPath } — so it cannot forward `noindex`. Assert on them
// too: they are the pages most likely to lose indexability by accident.
check('indexable pages still canonical + index', () =>
  ['index.html', 'privacy-policy.html', 'terms-and-conditions.html'].every(
    (page) =>
      html(page).includes('content="index, follow"') && html(page).includes('rel="canonical"'),
  ),
);

// Bottom rail contract (see CLAUDE.md → "Bottom Rail"). Without these the rail
// can be silently severed — the nav simply stops lifting and the banner covers
// it again, which no other check would notice.
check('bottom rail: nav consumes the rail', () =>
  html('index.html').includes('class="bottom-rail fixed bottom-6'),
);
check('bottom rail: CSS contract emitted', () => {
  const css = distCss();
  return (
    css.includes('--consent-bar-height') &&
    css.includes('.bottom-rail') &&
    css.includes('.consent-bar') &&
    css.includes('--rail-settle-duration')
  );
});
// The banner renders nothing until it becomes visible, so this attribute is
// never in the static HTML — assert against the island's compiled bundle.
check('bottom rail: banner opts out of Lenis', () =>
  distJs('CookieConsent').includes('data-lenis-prevent'),
);
check('skip link targets #main', () => html('index.html').includes('href="#main"'));
check('WebSite node in JSON-LD', () => html('index.html').includes('"@type":"WebSite"'));
check('no inline onerror handlers', () => !html('index.html').includes('onerror='));
check('sitemap entries carry lastmod', () =>
  readFileSync(dist('sitemap-0.xml'), 'utf-8').includes('<lastmod>'),
);
check('Organization sameAs entity link', () =>
  html('index.html').includes('linkedin.com/company/sullivan-street-projects'),
);
// llms.txt is build-generated from the constants SSOT (scripts/generate-llms.mjs)
check('llms.txt carries generated marker', () =>
  readFileSync(dist('llms.txt'), 'utf-8').includes('generated from src/constants'),
);
check('llms.txt structured sections in sync with constants', () => {
  const txt = readFileSync(dist('llms.txt'), 'utf-8');
  return [...TIERS, ...VALUE_PROPS].every((x) => txt.includes(x.description));
});
// AI citation surfaces (Google AI mode etc.) show <title> entities raw —
// copy must use typographic ’ (U+2019), which needs no escaping.
check('no HTML-entity apostrophes leak into markup', () => !html('index.html').includes('&#39;'));

// Lighthouse 2026-09-06: the founder card used <h4> directly under the
// section's <h2>, skipping a level. Screen-reader outlines rely on levels.
check('founder card heading is an h3 (no heading-level skip)', () => {
  const page = html('index.html');
  return (
    page.includes(
      '<h3 class="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h3>',
    ) && !page.includes('<h4')
  );
});

// WCAG AA contrast guard for the section eyebrow label. Lighthouse 2026-09-06
// measured #737373 on bg-paper-warm at 4.16:1. Computed from the source
// tokens so a palette edit cannot silently drop below 4.5:1 again.
check('label token clears 4.5:1 on paper and paper-warm', () => {
  const css = readFileSync(
    fileURLToPath(new URL('../src/styles/global.css', import.meta.url)),
    'utf-8',
  );
  const token = (name) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
  const lum = (hex) => {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };
  const label = token('label');
  return ratio(label, token('paper')) >= 4.5 && ratio(label, token('paper-warm')) >= 4.5;
});

// Hygiene (audit 2026-09-06). meta keywords has been ignored by every engine
// since 2009 and only advertises targeting; HSTS preload is a free upgrade;
// /contact was a real 404 for at least one visitor.
check('no meta keywords tag', () => !html('index.html').includes('name="keywords"'));
check('HSTS carries preload', () =>
  readFileSync(dist('.htaccess'), 'utf-8').includes(
    'Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"',
  ),
);
check('/contact 301s to the contact section', () =>
  readFileSync(dist('.htaccess'), 'utf-8').includes(
    'RewriteRule ^contact/?$ /#contact [L,R=301,NE]',
  ),
);

check('llms.txt links the founder LinkedIn profile', () =>
  readFileSync(dist('llms.txt'), 'utf-8').includes(
    '- **LinkedIn:** https://www.linkedin.com/in/brettwohl/',
  ),
);

// Entity graph for AI answer engines (audit 2026-09-06): the founder is a
// first-class Person linked both ways to the Organization, and Service nodes
// are generated from TIERS so they cannot drift from the site copy again.
const jsonLd = () => {
  const m = html('index.html').match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  return m ? JSON.parse(m[1]) : null;
};
check('JSON-LD parses with 6 graph nodes (WebSite, Organization, Person, 3 Services)', () => {
  const g = jsonLd()?.['@graph'] ?? [];
  const types = g.map((n) => n['@type']);
  return (
    g.length === 6 &&
    ['WebSite', 'Organization', 'Person'].every((t) => types.includes(t)) &&
    types.filter((t) => t === 'Service').length === 3
  );
});
check('Person node carries @id, LinkedIn sameAs and worksFor', () => {
  const p = (jsonLd()?.['@graph'] ?? []).find((n) => n['@type'] === 'Person');
  return (
    p?.['@id'] === 'https://sullivanstreetprojects.com/#brett-wohl' &&
    p.sameAs?.includes('https://www.linkedin.com/in/brettwohl/') &&
    p.worksFor?.['@id'] === 'https://sullivanstreetprojects.com/#organization'
  );
});
check('Organization founder references the Person @id', () => {
  const o = (jsonLd()?.['@graph'] ?? []).find((n) => n['@type'] === 'Organization');
  return o?.founder?.['@id'] === 'https://sullivanstreetprojects.com/#brett-wohl';
});
check('Service nodes mirror TIERS with serviceType', () => {
  const s = (jsonLd()?.['@graph'] ?? []).filter((n) => n['@type'] === 'Service');
  return TIERS.every((t) =>
    s.some((n) => n.serviceType === t.subtitle && n.description === t.description),
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
