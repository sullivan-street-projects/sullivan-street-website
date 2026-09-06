# Audit Follow-ups (September 2026) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved audit follow-ups — structured-data enrichment, two accessibility fixes, three hygiene edits, the deck-link UTM convention, and account-flexible observability scripts — on one branch, verified by `npm run verify` and `npm test`, then deployed once after a human checkpoint.

**Architecture:** Site changes stay inside the existing single-source-of-truth pattern: founder data joins `src/constants/index.js` as `FOUNDER`, and both the JSON-LD in `BaseLayout.astro` and `scripts/generate-llms.mjs` read from it (Service nodes are generated from `TIERS` instead of hand-copied). Every new behavior gets a `verify-dist.mjs` check written red-first. Tooling changes add one small pure module, `scripts/lib/account.mjs`, tested with `node:test`, that the five observability scripts import; secrets stay at `~/.secrets/<account>-<tool>`, and `~/.claude/tools` becomes a symlink to this repo's `scripts/` so any project can call them.

**Tech Stack:** Astro 6, Tailwind CSS v4 `@theme` tokens, zero-dependency Node ESM scripts, `node:test`, `scripts/verify-dist.mjs`, `scripts/screenshot.js` (Puppeteer), Hostinger MCP for deploy.

**Spec:** `docs/superpowers/specs/2026-09-06-audit-followups-spec.md`

> **Amendment 2026-09-06 (during execution, Task 8):** `node --test scripts/lib/` fails with MODULE_NOT_FOUND on Node 24 (a directory path is not scanned), so the `test` script is `node --test scripts/lib/*.test.mjs`. Node's default reporter prints the summary as `ℹ pass 7`, not `# pass 7`; criterion 3 and Task 8 Step 2/4 now say so.

## Global Constraints

- **Branch `audit-followups-2026-09`, one conventional commit per task** (Task 1 commits the plan + spec). All work on that branch; merge to `main` only in Task 11 after the human checkpoint.
- **`npm run verify` passes at every commit.** New checks are added red → green in the order the steps say.
- **No new npm dependencies. `package.json` may gain `scripts` entries only.**
- **C4 is deferred: do NOT touch `Services.jsx`, `PartnerOutcomes.jsx`, `CookieConsent.jsx`, `framer-motion`, or `react`.** The animations stay.
- **No apostrophes in strings that Astro interpolates through `{...}`** (they escape to `&#39;` and fail verify-dist). JSON-LD is emitted via `set:html` from `JSON.stringify`, so `TIERS` descriptions with apostrophes are safe there. `.astro` template literal text is safe.
- **Design tokens only** — never hardcoded hex in components; the one hex edit in this plan is the token definition itself in `src/styles/global.css`.
- **Prettier: single quotes, semicolons, trailing commas, width 100.** Run `npx prettier --write <file>` on every file you touch before committing.
- **Scripts stay zero-dependency and secrets never enter the repo.** `gitleaks` allowlist untouched.
- **Node ≥ 22.12** (`node --test` and top-level await are used).
- **Autonomy tier 3.** Tasks 1–10 run without pause. Task 11 (merge + deploy) runs only after `/working-standards:verify-plan` reports and Brett says go.

---

### Task 1: Branch and commit the spec + plan

**Files:**

- Create (already written): `docs/superpowers/specs/2026-09-06-audit-followups-spec.md`
- Create (already written): `docs/superpowers/plans/2026-09-06-audit-followups.md`

- [ ] **Step 1: Create the branch from main**

```bash
git checkout main && git pull --ff-only
git checkout -b audit-followups-2026-09
```

- [ ] **Step 2: Confirm the baseline is green**

Run: `npm run verify`
Expected: final line `All 55 checks passed`, exit 0.

- [ ] **Step 3: Commit the spec and plan**

```bash
git add docs/superpowers/specs/2026-09-06-audit-followups-spec.md docs/superpowers/plans/2026-09-06-audit-followups.md
git commit -m "docs(plan): audit follow-ups spec + implementation plan (2026-09-06)"
```

---

### Task 2: About founder card heading level (C3a)

**Files:**

- Modify: `src/sections/About.astro:41`
- Modify: `scripts/verify-dist.mjs` (append a check before the runner loop, i.e. above `let failed = 0;`)

**Interfaces:**

- Produces: verify-dist check named `founder card heading is an h3 (no heading-level skip)`.

- [ ] **Step 1: Write the failing check**

Add above `let failed = 0;` in `scripts/verify-dist.mjs`:

```js
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
```

- [ ] **Step 2: Run verify to confirm it fails**

Run: `npm run verify 2>&1 | grep -E "founder card heading|checks"`
Expected: `FAIL — founder card heading is an h3 (no heading-level skip)` and `1 of 56 checks failed`.

- [ ] **Step 3: Change the heading tag**

In `src/sections/About.astro` line 41, replace:

```html
<h4 class="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h4>
```

with:

```html
<h3 class="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h3>
```

- [ ] **Step 4: Run verify to confirm it passes**

Run: `npm run verify 2>&1 | tail -1`
Expected: `All 56 checks passed`.

- [ ] **Step 5: Commit**

```bash
npx prettier --write src/sections/About.astro scripts/verify-dist.mjs
git add src/sections/About.astro scripts/verify-dist.mjs
git commit -m "fix(a11y): founder card heading is an h3, not an h4 under an h2"
```

---

### Task 3: Label token contrast on tinted sections (C3b)

**Files:**

- Modify: `src/styles/global.css:11` (`--color-label`)
- Modify: `scripts/verify-dist.mjs` (append a check)

**Interfaces:**

- Produces: verify-dist check `label token clears 4.5:1 on paper and paper-warm`, computed from the source tokens so a future palette edit cannot silently regress it.

- [ ] **Step 1: Capture the before screenshot**

```bash
node scripts/screenshot.js http://localhost:5173/ -o screenshots/audit-2026-09/contact-before.png -w 390 -h 844 -s 2 --scroll-to "#contact" --settle 4000
```

(`screenshot.js` autostarts the dev server. Create `screenshots/audit-2026-09/` if missing; the directory is committed.)

- [ ] **Step 2: Write the failing check**

Add above `let failed = 0;` in `scripts/verify-dist.mjs`:

```js
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
```

- [ ] **Step 3: Run verify to confirm it fails**

Run: `npm run verify 2>&1 | grep -E "label token|checks"`
Expected: `FAIL — label token clears 4.5:1 on paper and paper-warm` and `1 of 57 checks failed`.

- [ ] **Step 4: Darken the token one step**

In `src/styles/global.css` line 11, replace:

```css
--color-label: #737373;
```

with:

```css
--color-label: #6b6b6b; /* 4.67:1 on paper-warm, 5.10:1 on paper (was #737373 = 4.16:1 on paper-warm) */
```

- [ ] **Step 5: Run verify to confirm it passes**

Run: `npm run verify 2>&1 | tail -1`
Expected: `All 57 checks passed`.

- [ ] **Step 6: Capture the after screenshot and eyeball it**

```bash
node scripts/screenshot.js http://localhost:5173/ -o screenshots/audit-2026-09/contact-after.png -w 390 -h 844 -s 2 --scroll-to "#contact" --settle 4000
```

Open both PNGs. Expected: the `CALL` eyebrow is one step darker; nothing else moved.

- [ ] **Step 7: Commit**

```bash
npx prettier --write src/styles/global.css scripts/verify-dist.mjs
git add src/styles/global.css scripts/verify-dist.mjs screenshots/audit-2026-09/contact-before.png screenshots/audit-2026-09/contact-after.png
git commit -m "fix(a11y): label token clears WCAG AA on tinted sections"
```

---

### Task 4: Hygiene — meta keywords, HSTS preload, /contact redirect (C5)

**Files:**

- Modify: `src/layouts/BaseLayout.astro:101` (delete the keywords meta)
- Modify: `public/.htaccess:19-20` (add the contact rule after the booking rescue) and `:36` (HSTS)
- Modify: `scripts/verify-dist.mjs` (append three checks)

**Interfaces:**

- Produces: verify-dist checks `no meta keywords tag`, `HSTS carries preload`, `/contact 301s to the contact section`.

- [ ] **Step 1: Write the three failing checks**

Add above `let failed = 0;` in `scripts/verify-dist.mjs`:

```js
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
```

- [ ] **Step 2: Run verify to confirm all three fail**

Run: `npm run verify 2>&1 | grep -E "meta keywords|HSTS|/contact|checks"`
Expected: three `FAIL` lines and `3 of 60 checks failed`.

- [ ] **Step 3: Delete the keywords meta**

In `src/layouts/BaseLayout.astro` delete line 101 entirely:

```html
<meta name="keywords" content="marketing, growth, CMO, strategy, advisory, brands" />
```

- [ ] **Step 4: Add the contact redirect and HSTS preload**

In `public/.htaccess`, directly after the booking-rescue rule (line 19), add:

```apache

# /contact is not a route — the contact section lives on the home page.
# GA4 showed a real visitor 404ing here (audit 2026-09-06). NE keeps the
# fragment unescaped in the Location header.
RewriteRule ^contact/?$ /#contact [L,R=301,NE]
```

And replace the HSTS line:

```apache
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

with:

```apache
  Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
```

- [ ] **Step 5: Run verify to confirm it passes**

Run: `npm run verify 2>&1 | tail -1`
Expected: `All 60 checks passed`.

- [ ] **Step 6: Prove the redirect locally**

```bash
grep -n "contact" dist/.htaccess
```

Expected: the rule appears once, before the clean-URL rewrite block. (LiteSpeed honors `NE`; the live check is in Task 11.)

- [ ] **Step 7: Commit**

```bash
npx prettier --write src/layouts/BaseLayout.astro scripts/verify-dist.mjs
git add src/layouts/BaseLayout.astro public/.htaccess scripts/verify-dist.mjs
git commit -m "chore(hygiene): drop meta keywords, HSTS preload, 301 /contact to the section"
```

---

### Task 5: FOUNDER constant and llms.txt LinkedIn line (C2, part 1)

**Files:**

- Modify: `src/constants/index.js` (insert after `PARTNER_OUTCOMES`, before `export const TIERS` at line 97)
- Modify: `scripts/generate-llms.mjs:8` (import) and the `## Founder` block
- Modify: `scripts/verify-dist.mjs` (append a check)

**Interfaces:**

- Produces: `FOUNDER` export with shape `{ name, jobTitle, id, url, linkedin, description, knowsAbout }` consumed by Task 6 and by `generate-llms.mjs`.

- [ ] **Step 1: Write the failing check**

Add above `let failed = 0;` in `scripts/verify-dist.mjs`:

```js
check('llms.txt links the founder LinkedIn profile', () =>
  readFileSync(dist('llms.txt'), 'utf-8').includes(
    '- **LinkedIn:** https://www.linkedin.com/in/brettwohl/',
  ),
);
```

- [ ] **Step 2: Run verify to confirm it fails**

Run: `npm run verify 2>&1 | grep -E "LinkedIn profile|checks"`
Expected: `FAIL — llms.txt links the founder LinkedIn profile`, `1 of 61 checks failed`.

- [ ] **Step 3: Add the FOUNDER constant**

In `src/constants/index.js`, insert before `export const TIERS = [`:

```js
// Founder entity — the single source for JSON-LD (Person node), llms.txt and
// any future byline. No apostrophes: description is Astro-interpolated nowhere
// today, but keep the constants rule anyway.
export const FOUNDER = {
  name: 'Brett Wohl',
  jobTitle: 'Founder, Managing Partner',
  id: 'https://sullivanstreetprojects.com/#brett-wohl',
  url: 'https://sullivanstreetprojects.com/#about',
  linkedin: 'https://www.linkedin.com/in/brettwohl/',
  description:
    'Executive growth strategist with 10+ years of experience across startups and global brands. Previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and Google.',
  knowsAbout: [
    'Growth marketing',
    'Demand generation',
    'Paid media',
    'Go-to-market strategy',
    'AI-native marketing operations',
    'Fractional marketing leadership',
  ],
};
```

- [ ] **Step 4: Read FOUNDER in the llms generator**

In `scripts/generate-llms.mjs` change the import line to:

```js
import { VALUE_PROPS, TIERS, PARTNER_OUTCOMES, FOUNDER } from '../src/constants/index.js';
```

and replace the `## Founder` block:

```md
## Founder

**Brett Wohl** (Founder, Managing Partner)
Executive growth strategist with 10+ years of experience. Previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and Google.
```

with:

```md
## Founder

**${FOUNDER.name}** (${FOUNDER.jobTitle})
${FOUNDER.description}

- **LinkedIn:** ${FOUNDER.linkedin}
- **Expertise:** ${FOUNDER.knowsAbout.join(', ')}
```

- [ ] **Step 5: Run verify to confirm it passes**

Run: `npm run verify 2>&1 | tail -1`
Expected: `All 61 checks passed` (the `llms.txt structured sections in sync` check still passes because TIERS/VALUE_PROPS are unchanged).

- [ ] **Step 6: Commit**

```bash
npx prettier --write src/constants/index.js scripts/generate-llms.mjs scripts/verify-dist.mjs
git add src/constants/index.js scripts/generate-llms.mjs scripts/verify-dist.mjs public/llms.txt
git commit -m "feat(aeo): FOUNDER constant feeds llms.txt with LinkedIn + expertise"
```

---

### Task 6: JSON-LD Person node, Organization links, Services from TIERS (C2, part 2)

**Files:**

- Modify: `src/layouts/BaseLayout.astro:28-93` (the `structuredData` object)
- Modify: `scripts/verify-dist.mjs` (append four checks)

**Interfaces:**

- Consumes: `FOUNDER` (Task 5), `TIERS` (existing: `{ id, title, subtitle, description }`).
- Produces: JSON-LD `@graph` with exactly 6 nodes: WebSite, Organization, Person, Service ×3.

- [ ] **Step 1: Write the failing checks**

Add above `let failed = 0;` in `scripts/verify-dist.mjs`:

```js
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
```

- [ ] **Step 2: Run verify to confirm they fail**

Run: `npm run verify 2>&1 | grep -E "JSON-LD parses|Person node|Organization founder|Service nodes|checks"`
Expected: four `FAIL` lines and `4 of 65 checks failed`.

- [ ] **Step 3: Rewrite `structuredData` from the constants**

In `src/layouts/BaseLayout.astro`, add to the frontmatter imports (top of file, alongside the existing imports):

```js
import { TIERS, FOUNDER } from '../constants';
```

Then replace the entire `structuredData` object (from `// Ported verbatim from the old index.html <head>.` through the closing `};` before `const jsonLd = ...`) with:

```js
// Entity graph. Person + Services are derived from src/constants so the
// markup cannot drift from the copy (verify-dist asserts the mirror).
const ORG_ID = 'https://sullivanstreetprojects.com/#organization';
const AREA_SERVED = { '@type': 'Country', name: 'United States' };
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://sullivanstreetprojects.com/#website',
      url: 'https://sullivanstreetprojects.com',
      name: 'Sullivan Street Projects',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Sullivan Street Projects',
      url: 'https://sullivanstreetprojects.com',
      sameAs: ['https://www.linkedin.com/company/sullivan-street-projects'],
      logo: 'https://sullivanstreetprojects.com/og-image.png',
      description:
        'Fractional growth consultancy delivering AI-powered strategy, media, and execution.',
      founder: { '@id': FOUNDER.id },
      areaServed: AREA_SERVED,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1178 Broadway',
        addressLocality: 'New York',
        addressRegion: 'NY',
        postalCode: '10001',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@sullivanstreetprojects.co',
        contactType: 'customer service',
      },
    },
    {
      '@type': 'Person',
      '@id': FOUNDER.id,
      name: FOUNDER.name,
      jobTitle: FOUNDER.jobTitle,
      url: FOUNDER.url,
      sameAs: [FOUNDER.linkedin],
      description: FOUNDER.description,
      knowsAbout: FOUNDER.knowsAbout,
      worksFor: { '@id': ORG_ID },
    },
    ...TIERS.map((t) => ({
      '@type': 'Service',
      provider: { '@id': ORG_ID },
      name: `${t.title} (${t.subtitle})`,
      serviceType: t.subtitle,
      description: t.description,
      areaServed: AREA_SERVED,
    })),
  ],
};
```

- [ ] **Step 4: Run verify to confirm it passes**

Run: `npm run verify 2>&1 | tail -1`
Expected: `All 65 checks passed`. The pre-existing checks `JSON-LD organization present`, `WebSite node in JSON-LD`, `Organization sameAs entity link` and `no HTML-entity apostrophes leak into markup` must still pass (the Advisory description now carries raw `'` inside JSON, which is not `&#39;`).

- [ ] **Step 5: Validate the graph shape by eye**

```bash
node -e 'const h=require("fs").readFileSync("dist/index.html","utf8");const j=JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);console.log(j["@graph"].map(n=>n["@type"]+" "+(n["@id"]||n.name)).join("\n"))'
```

Expected six lines: WebSite, Organization, Person `#brett-wohl`, and three Services named `Management (Growth Leadership)`, `Strategy (Go-to-Market Design)`, `Advisory (Strategic Guidance)`.

- [ ] **Step 6: Commit**

```bash
npx prettier --write src/layouts/BaseLayout.astro scripts/verify-dist.mjs
git add src/layouts/BaseLayout.astro scripts/verify-dist.mjs
git commit -m "feat(aeo): Person entity + Services generated from TIERS in JSON-LD"
```

---

### Task 7: Deck-link UTM convention (C1)

**Files:**

- Modify: `CLAUDE.md` (Decisions & Constraints section, after the "Booking-link changes are a five-file move" bullet at line 70)

- [ ] **Step 1: Add the convention**

Insert after line 70 of `CLAUDE.md`:

```md
- **Deck and outbound links carry UTMs.** Gamma decks are the highest-intent referral traffic (444s average visit, audit 2026-09-06) and arrived untagged. Every site link placed in a deck, email signature or LinkedIn post uses `?utm_source=<gamma|email|linkedin>&utm_medium=<deck|signature|post>&utm_campaign=<slug>` where `<slug>` is kebab-case `<prospect-or-purpose>-<yyyy-mm>` (e.g. `acme-intro-2026-09`). Read them back with `node scripts/ga.mjs sources 30`. The booking link itself is NOT tagged — TidyCal is cross-domain-linked, so the session source survives the hop.
```

- [ ] **Step 2: Verify the grep**

Run: `grep -c "utm_source=<gamma|email|linkedin>" CLAUDE.md`
Expected: `1`.

- [ ] **Step 3: Commit**

```bash
npx prettier --write CLAUDE.md
git add CLAUDE.md
git commit -m "docs(claude): UTM convention for deck, signature and post links"
```

---

### Task 8: `scripts/lib/account.mjs` with tests (B2, part 1)

**Files:**

- Create: `scripts/lib/account.mjs`
- Create: `scripts/lib/account.test.mjs`
- Modify: `package.json` (`scripts.test`)

**Interfaces:**

- Produces:
  - `parseAccountArgs(argv: string[], env?: object) → { account: string, overrides: { property?: string, site?: string }, rest: string[] }` — pure; `--account X`, `--property X`, `--site X` (also `--account=X` form) are removed from `rest`; default account `ssp`, then `env.SSP_ACCOUNT`.
  - `secretPath(account: string, tool: string, home: string) → string` — `${home}/.secrets/${account}-${tool}`.
  - `resolveAccount(argv?: string[], env?: object, home?: string) → { name, rest, overrides, secret(tool), hint(key, sspDefault) }` — `hint` reads `${home}/.secrets/accounts.json` (optional, `{ "<account>": { "<key>": "<value>" } }`); for `ssp` it falls back to `sspDefault`; for any other account with no entry it throws `Error('No hint "<key>" for account "<name>" — add it to ~/.secrets/accounts.json')`.

- [ ] **Step 1: Write the failing tests**

Create `scripts/lib/account.test.mjs`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseAccountArgs, secretPath, resolveAccount } from './account.mjs';

test('defaults to ssp and leaves the command args intact', () => {
  const r = parseAccountArgs(['report', '30']);
  assert.equal(r.account, 'ssp');
  assert.deepEqual(r.rest, ['report', '30']);
  assert.deepEqual(r.overrides, {});
});

test('--account and --account= are both removed from rest', () => {
  assert.deepEqual(parseAccountArgs(['--account', 'cloudclub', 'perf']), {
    account: 'cloudclub',
    overrides: {},
    rest: ['perf'],
  });
  assert.deepEqual(parseAccountArgs(['perf', '--account=cloudclub']), {
    account: 'cloudclub',
    overrides: {},
    rest: ['perf'],
  });
});

test('SSP_ACCOUNT env is the fallback, the flag wins', () => {
  assert.equal(parseAccountArgs(['x'], { SSP_ACCOUNT: 'brief' }).account, 'brief');
  assert.equal(parseAccountArgs(['--account', 'ssp'], { SSP_ACCOUNT: 'brief' }).account, 'ssp');
});

test('--property and --site land in overrides', () => {
  const r = parseAccountArgs(['--property', '123', '--site=https://x.test/', 'sites']);
  assert.deepEqual(r.overrides, { property: '123', site: 'https://x.test/' });
  assert.deepEqual(r.rest, ['sites']);
});

test('secretPath follows ~/.secrets/<account>-<tool>', () => {
  assert.equal(secretPath('ssp', 'gsc-sa.json', '/home/u'), '/home/u/.secrets/ssp-gsc-sa.json');
  assert.equal(secretPath('cloudclub', 'bing-key.txt', '/h'), '/h/.secrets/cloudclub-bing-key.txt');
});

test('hint: ssp uses the baked default, other accounts read accounts.json, missing throws', () => {
  const home = mkdtempSync(join(tmpdir(), 'acct-'));
  mkdirSync(join(home, '.secrets'));
  writeFileSync(
    join(home, '.secrets', 'accounts.json'),
    JSON.stringify({ cloudclub: { gsc: 'cloudclub.ai' } }),
  );
  const ssp = resolveAccount(['sites'], {}, home);
  assert.equal(ssp.hint('gsc', 'sullivanstreetprojects'), 'sullivanstreetprojects');
  assert.equal(ssp.secret('gsc-sa.json'), join(home, '.secrets', 'ssp-gsc-sa.json'));
  const cc = resolveAccount(['--account', 'cloudclub', 'sites'], {}, home);
  assert.equal(cc.hint('gsc', 'sullivanstreetprojects'), 'cloudclub.ai');
  assert.throws(() => cc.hint('bing_site', 'x'), /No hint "bing_site" for account "cloudclub"/);
});

test('hint: ssp entries in accounts.json override the baked default', () => {
  const home = mkdtempSync(join(tmpdir(), 'acct-'));
  mkdirSync(join(home, '.secrets'));
  writeFileSync(
    join(home, '.secrets', 'accounts.json'),
    JSON.stringify({ ssp: { gsc: 'ssp.test' } }),
  );
  assert.equal(resolveAccount([], {}, home).hint('gsc', 'default'), 'ssp.test');
});
```

- [ ] **Step 2: Add the test script and run it to see it fail**

In `package.json` `scripts`, add:

```json
"test": "node --test scripts/lib/*.test.mjs"
```

Run: `npm test`
Expected: FAIL — `Cannot find module '.../scripts/lib/account.mjs'`.

- [ ] **Step 3: Implement the module**

Create `scripts/lib/account.mjs`:

```js
// Which business is this script talking to? Shared by ga/gsc/bing/clarity/
// tidycal so the same zero-dependency CLIs serve SSP, the Brief, Cloud Club…
//
//   --account <name>   (or --account=<name>; env SSP_ACCOUNT; default "ssp")
//   --property <id>    GA4 property override (also GA_PROPERTY env in ga.mjs)
//   --site <url>       GSC/Bing site override (also GSC_SITE / BING_SITE env)
//
// Secrets: ~/.secrets/<account>-<tool>  e.g. ~/.secrets/ssp-gsc-sa.json
// Hints:   ~/.secrets/accounts.json (optional) — per-account lookup hints:
//   { "cloudclub": { "gsc": "cloudclub.ai", "ga": "Cloud Club",
//                    "bing_site": "https://www.cloudclub.ai/",
//                    "sitemap": "https://www.cloudclub.ai/sitemap.xml" } }
// "ssp" needs no entry: each script passes its baked-in default as the
// fallback. Any other account with no entry fails loudly.
import { existsSync, readFileSync } from 'node:fs';

const FLAGS = ['account', 'property', 'site'];

export function parseAccountArgs(argv, env = {}) {
  const found = {};
  const rest = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const eq = a.match(/^--([a-z]+)=(.*)$/);
    if (eq && FLAGS.includes(eq[1])) {
      found[eq[1]] = eq[2];
      continue;
    }
    const bare = a.match(/^--([a-z]+)$/);
    if (bare && FLAGS.includes(bare[1]) && i + 1 < argv.length) {
      found[bare[1]] = argv[++i];
      continue;
    }
    rest.push(a);
  }
  const { account, ...overrides } = found;
  return { account: account || env.SSP_ACCOUNT || 'ssp', overrides, rest };
}

export function secretPath(account, tool, home) {
  return `${home}/.secrets/${account}-${tool}`;
}

export function resolveAccount(argv = process.argv.slice(2), env = process.env, home = env.HOME) {
  const { account, overrides, rest } = parseAccountArgs(argv, env);
  const hintsFile = `${home}/.secrets/accounts.json`;
  const hints = existsSync(hintsFile) ? JSON.parse(readFileSync(hintsFile, 'utf-8')) : {};
  return {
    name: account,
    rest,
    overrides,
    secret: (tool) => secretPath(account, tool, home),
    hint(key, sspDefault) {
      const v = hints[account]?.[key];
      if (v !== undefined) return v;
      if (account === 'ssp') return sspDefault;
      throw new Error(
        `No hint "${key}" for account "${account}" — add it to ~/.secrets/accounts.json`,
      );
    },
  };
}
```

- [ ] **Step 4: Run the tests to see them pass**

Run: `npm test`
Expected: `pass 7`, `fail 0` in the summary (printed as `ℹ pass 7` / `ℹ fail 0`).

- [ ] **Step 5: Commit**

```bash
npx prettier --write scripts/lib/account.mjs scripts/lib/account.test.mjs package.json
git add scripts/lib/account.mjs scripts/lib/account.test.mjs package.json
git commit -m "feat(tools): account resolver for the observability scripts (--account, secrets, hints)"
```

---

### Task 9: Wire the Google pair — `ga.mjs` (+ `admin`) and `gsc.mjs` (B2, part 2)

**Files:**

- Modify: `scripts/ga.mjs:1-18`, `:66-78` (`resolveProperty`), `:93`, `:105-186` (add `admin`, update the usage line)
- Modify: `scripts/gsc.mjs:22-31`, `:101-104` (`resolveSite`)

**Interfaces:**

- Consumes: `resolveAccount` from Task 8.
- Produces: `node scripts/ga.mjs [--account X] [--property ID] <cmd>`; new `ga.mjs admin` printing key events, custom dimensions and retention; `node scripts/gsc.mjs [--account X] [--site URL] <cmd>`. Both keep `GSC_SA_KEY`, `GA_PROPERTY`, `GSC_SITE` env overrides.

- [ ] **Step 1: ga.mjs — replace the key path and arg parsing**

In `scripts/ga.mjs` replace lines 14–18:

```js
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';

const KEY_PATH = process.env.GSC_SA_KEY || `${process.env.HOME}/.secrets/ssp-gsc-sa.json`;
const [cmd = 'help', ...args] = process.argv.slice(2);
```

with:

```js
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { resolveAccount } from './lib/account.mjs';

const acct = resolveAccount();
const KEY_PATH = process.env.GSC_SA_KEY || acct.secret('gsc-sa.json');
const [cmd = 'help', ...args] = acct.rest;
```

Update the usage comment block (lines 6–13) to read:

```js
// Usage:
//   node scripts/ga.mjs [--account <name>] [--property <id>] <command>
//   node scripts/ga.mjs properties                    list accessible GA4 properties
//   node scripts/ga.mjs report [days]                 daily users/sessions/engagement
//   node scripts/ga.mjs pages [days]                  top pages by views
//   node scripts/ga.mjs sources [days]                top session sources
//   node scripts/ga.mjs events [days] | clicks [days] events by name / outbound clicks
//   node scripts/ga.mjs admin                         key events, custom dimensions, retention
//   node scripts/ga.mjs realtime                      active users right now
//
// Account: --account <name> (default ssp, env SSP_ACCOUNT) selects
// ~/.secrets/<name>-gsc-sa.json and the property-name hint "ga" in
// ~/.secrets/accounts.json. Env: GSC_SA_KEY (key path), GA_PROPERTY.
```

- [ ] **Step 2: ga.mjs — make `resolveProperty` account-aware**

Replace the body of `resolveProperty` (lines 66–78) with:

```js
async function resolveProperty() {
  const explicit = acct.overrides.property || process.env.GA_PROPERTY;
  if (explicit) {
    const p = String(explicit);
    return p.startsWith('properties/') ? p : `properties/${p}`;
  }
  const { accountSummaries = [] } = await api(
    'https://analyticsadmin.googleapis.com/v1beta/accountSummaries',
  );
  const props = accountSummaries.flatMap((a) => a.propertySummaries || []);
  const hint = acct.hint('ga', 'sullivan');
  const match =
    props.find((p) => p.displayName.toLowerCase().includes(hint.toLowerCase())) ||
    (props.length === 1 && props[0]);
  if (!match) {
    console.error(`No property matching "${hint}" visible to the service account. Visible:`);
    props.forEach((p) => console.error(`  ${p.property}  ${p.displayName}`));
    console.error('→ Add the SA as Viewer in GA4 Admin → Property access management.');
    process.exit(1);
  }
  return match.property;
}
```

- [ ] **Step 3: ga.mjs — add the `admin` command**

Insert before `} else if (cmd === 'realtime') {`:

```js
} else if (cmd === 'admin') {
  // Property configuration the audit found wrong (2026-09-06): 2-month
  // retention, no custom dimensions, a dead "purchase" key event. Read-only.
  const property = await resolveProperty();
  const base = `https://analyticsadmin.googleapis.com/v1beta/${property}`;
  const [{ keyEvents = [] }, { customDimensions = [] }, retention] = await Promise.all([
    api(`${base}/keyEvents`),
    api(`${base}/customDimensions`),
    api(`${base}/dataRetentionSettings`),
  ]);
  console.log(`${property}`);
  console.log(`retention: events=${retention.eventDataRetention} users=${retention.userDataRetention}`);
  console.log(`key events: ${keyEvents.map((k) => k.eventName).join(', ') || '(none)'}`);
  console.log(
    `custom dimensions: ${customDimensions.map((d) => `${d.parameterName} (${d.scope})`).join(', ') || '(none)'}`,
  );
```

And update the fallback usage line to:

```js
console.error(
  'Commands: properties | report [days] | pages [days] | sources [days] | events [days] | clicks [days] | admin | realtime',
);
```

- [ ] **Step 4: gsc.mjs — replace the key path, hints and arg parsing**

In `scripts/gsc.mjs` replace lines 24–31:

```js
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';

const KEY_PATH = process.env.GSC_SA_KEY || `${process.env.HOME}/.secrets/ssp-gsc-sa.json`;
const SITE_HINT = 'sullivanstreetprojects';
const DEFAULT_SITEMAP = 'https://sullivanstreetprojects.com/sitemap-index.xml';

const [cmd = 'help', ...args] = process.argv.slice(2);
```

with:

```js
import { readFileSync, existsSync } from 'node:fs';
import { createSign } from 'node:crypto';
import { resolveAccount } from './lib/account.mjs';

const acct = resolveAccount();
const KEY_PATH = process.env.GSC_SA_KEY || acct.secret('gsc-sa.json');
const SITE_HINT = acct.hint('gsc', 'sullivanstreetprojects');
const DEFAULT_SITEMAP = acct.hint(
  'sitemap',
  'https://sullivanstreetprojects.com/sitemap-index.xml',
);

const [cmd = 'help', ...args] = acct.rest;
```

and in `resolveSite` replace `if (process.env.GSC_SITE) return process.env.GSC_SITE;` with:

```js
if (acct.overrides.site || process.env.GSC_SITE) return acct.overrides.site || process.env.GSC_SITE;
```

Add to the usage comment (after the `Env overrides` lines, before the imports):

```js
// Account: --account <name> (default ssp, env SSP_ACCOUNT) → ~/.secrets/<name>-gsc-sa.json
// and hints "gsc" (site substring) / "sitemap" in ~/.secrets/accounts.json; --site <url>.
```

Note: the `help` command prints comment lines 1–27 of the file; after inserting two lines, change `.slice(1, 27)` to `.slice(1, 29)`.

- [ ] **Step 5: Prove both scripts, positive and negative**

```bash
node scripts/ga.mjs properties
node scripts/ga.mjs --account ssp admin
node scripts/ga.mjs --account nope properties; echo "exit=$?"
node scripts/gsc.mjs --account=ssp sites
node scripts/gsc.mjs --account nope sites; echo "exit=$?"
npm test
```

Expected, in order: `properties/486648286  SullivanStreetProjects.co …`; `retention: events=TWO_MONTHS …` (or `FOURTEEN_MONTHS` once A2 is done) with `key events:` and `custom dimensions:` lines; `No service-account key at /Users/…/.secrets/nope-gsc-sa.json` + `exit=1`; the sc-domain line or the existing "no properties visible" message (A1 pending) with exit 0; `No service-account key at /Users/…/.secrets/nope-gsc-sa.json` + `exit=1`; `# pass 7`.

- [ ] **Step 6: Commit**

```bash
npx prettier --write scripts/ga.mjs scripts/gsc.mjs
git add scripts/ga.mjs scripts/gsc.mjs
git commit -m "feat(tools): ga.mjs + gsc.mjs take --account/--property/--site; ga admin command"
```

---

### Task 10: Wire `bing.mjs`, `clarity.mjs`, `tidycal.mjs` (+ `[PRIVATE]`), symlink install, docs (B2, part 3)

**Files:**

- Modify: `scripts/bing.mjs:16-25`
- Modify: `scripts/clarity.mjs:17-26`
- Modify: `scripts/tidycal.mjs:12-19`, `:48`, `:52-56` (`types` output)
- Modify: `package.json` (`scripts["tools:link"]`)
- Modify: `CLAUDE.md:72-77` (Analytics & Observability) and the Deployment bullets that name the scripts
- Modify: `~/.claude/CLAUDE.md` (Web Properties paragraph — one sentence)

**Interfaces:**

- Consumes: `resolveAccount` (Task 8).
- Produces: `--account` on all five scripts; `node scripts/tidycal.mjs types` shows `[PRIVATE]`; `npm run tools:link` creates `~/.claude/tools`.

- [ ] **Step 1: bing.mjs**

Replace lines 16–25:

```js
import { readFileSync, existsSync } from 'node:fs';

const KEY_PATH = `${process.env.HOME}/.secrets/ssp-bing-key.txt`;
const KEY =
  process.env.BING_WM_KEY || (existsSync(KEY_PATH) && readFileSync(KEY_PATH, 'utf-8').trim());
const SITE = process.env.BING_SITE || 'https://sullivanstreetprojects.com/';
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';
const DEFAULT_SITEMAP = 'https://sullivanstreetprojects.com/sitemap-index.xml';

const [cmd = 'help', ...args] = process.argv.slice(2);
```

with:

```js
import { readFileSync, existsSync } from 'node:fs';
import { resolveAccount } from './lib/account.mjs';

const acct = resolveAccount();
const KEY_PATH = acct.secret('bing-key.txt');
const KEY =
  process.env.BING_WM_KEY || (existsSync(KEY_PATH) && readFileSync(KEY_PATH, 'utf-8').trim());
const SITE =
  acct.overrides.site ||
  process.env.BING_SITE ||
  acct.hint('bing_site', 'https://sullivanstreetprojects.com/');
const BASE = 'https://ssl.bing.com/webmaster/api.svc/json';
const DEFAULT_SITEMAP = acct.hint(
  'sitemap',
  'https://sullivanstreetprojects.com/sitemap-index.xml',
);

const [cmd = 'help', ...args] = acct.rest;
```

Add to the header comment after the `Key:` lines: `// Account: --account <name> → ~/.secrets/<name>-bing-key.txt; hints "bing_site", "sitemap".`

- [ ] **Step 2: clarity.mjs**

Replace lines 17–26:

```js
import { readFileSync, existsSync } from 'node:fs';

const TOKEN_PATH = `${process.env.HOME}/.secrets/ssp-clarity-token.txt`;
if (!existsSync(TOKEN_PATH)) {
  console.error(`No Clarity token at ${TOKEN_PATH} (Clarity → Settings → Data Export).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();

const [cmd = 'insights', ...args] = process.argv.slice(2);
```

with:

```js
import { readFileSync, existsSync } from 'node:fs';
import { resolveAccount } from './lib/account.mjs';

const acct = resolveAccount();
const TOKEN_PATH = acct.secret('clarity-token.txt');
if (!existsSync(TOKEN_PATH)) {
  console.error(`No Clarity token at ${TOKEN_PATH} (Clarity → Settings → Data Export).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();

const [cmd = 'insights', ...args] = acct.rest;
```

Change the output header line `SSP Clarity — last …` to `` `${acct.name} Clarity — last ${days} day(s)…` `` and add to the header comment: `// Account: --account <name> → ~/.secrets/<name>-clarity-token.txt (one token per Clarity project).`

- [ ] **Step 3: tidycal.mjs**

Replace lines 12–19:

```js
import { readFileSync, existsSync } from 'node:fs';

const TOKEN_PATH = `${process.env.HOME}/.secrets/ssp-tidycal-token.txt`;
if (!existsSync(TOKEN_PATH)) {
  console.error(`No TidyCal token at ${TOKEN_PATH} (tidycal.com → Account → API Access).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();
```

with:

```js
import { readFileSync, existsSync } from 'node:fs';
import { resolveAccount } from './lib/account.mjs';

const acct = resolveAccount();
const TOKEN_PATH = acct.secret('tidycal-token.txt');
if (!existsSync(TOKEN_PATH)) {
  console.error(`No TidyCal token at ${TOKEN_PATH} (tidycal.com → Account → API Access).`);
  process.exit(1);
}
const TOKEN = readFileSync(TOKEN_PATH, 'utf-8').trim();
```

Replace `const [cmd = 'summary', ...args] = process.argv.slice(2);` with `const [cmd = 'summary', ...args] = acct.rest;`.

In the `types` command, replace:

```js
      `${t.title} (/${t.url_slug}) — ${t.duration_minutes}min${t.disabled_at ? ' [DISABLED]' : ''}`,
```

with:

```js
      // [PRIVATE] types are hidden from the directory — a private-only
      // account renders "No booking types currently available" on the bare
      // call. domain (audit 2026-09-06, item A4).
      `${t.title} (/${t.url_slug}) — ${t.duration_minutes}min${t.disabled_at ? ' [DISABLED]' : ''}${t.private ? ' [PRIVATE]' : ''}`,
```

- [ ] **Step 4: Add the symlink installer**

In `package.json` `scripts`, add:

```json
"tools:link": "ln -sfn \"$PWD/scripts\" \"$HOME/.claude/tools\" && echo \"~/.claude/tools -> $PWD/scripts\""
```

- [ ] **Step 5: Prove all three scripts, the private marker and the symlink**

```bash
node scripts/bing.mjs --account ssp quota
node scripts/bing.mjs --account nope quota; echo "exit=$?"
node scripts/tidycal.mjs types
node scripts/tidycal.mjs --account nope summary; echo "exit=$?"
node scripts/clarity.mjs --account nope insights 1; echo "exit=$?"
npm run tools:link
readlink ~/.claude/tools
node ~/.claude/tools/tidycal.mjs summary
```

Expected: `daily: 10000  monthly: 250000`; `No Bing API key at …/nope-bing-key.txt` + `exit=1`; the four booking types with `Growth Consultation … [PRIVATE]` (until Brett does A4); `No TidyCal token at …/nope-tidycal-token.txt` + `exit=1`; `No Clarity token at …/nope-clarity-token.txt` + `exit=1` (no API call spent); the symlink echo; the absolute repo `scripts` path; `total bookings ever: 3`. Do NOT run a positive Clarity call — it spends 1 of the 10 daily requests for nothing.

- [ ] **Step 6: Update CLAUDE.md**

In `CLAUDE.md` replace the Analytics & Observability bullet that begins `- Manageable through Claude Code:` with:

```md
- **Both MCP connectors are Cloud Club, not SSP** (`analytics-mcp` and `clarity` resolve to the Cloud Club account/project; confirmed 2026-09-06). SSP numbers come from the scripts below. All five accept `--account <name>` (default `ssp`, env `SSP_ACCOUNT`), which selects `~/.secrets/<name>-<tool>` and per-account hints in `~/.secrets/accounts.json` (see `scripts/lib/account.mjs`). `npm run tools:link` symlinks `~/.claude/tools` → this repo's `scripts/`, so any project can run `node ~/.claude/tools/ga.mjs --account cloudclub report 30`. This repo stays the single source of truth; `npm test` covers the resolver.
- Site verification + DNS via the Hostinger DNS MCP; deploys watched via the Hostinger hosting MCP.
```

In the Deployment section, change the GA4 bullet to also name `admin`:

```md
- GA4: `node scripts/ga.mjs` (properties/report/pages/sources/events/clicks/admin/realtime) — same service-account key as gsc.mjs. `admin` prints key events, custom dimensions and retention (must read `FOURTEEN_MONTHS`).
```

- [ ] **Step 7: Update the global playbook**

In `~/.claude/CLAUDE.md`, in the "Web Properties — Observability & AEO Playbook (SSP)" paragraph, replace `scripts/{gsc,bing,ga,clarity,tidycal,indexnow}.mjs (zero-dep, copyable)` with `scripts/{gsc,bing,ga,clarity,tidycal,indexnow}.mjs (zero-dep; all take --account <name>, and ~/.claude/tools symlinks to them — run from any repo)`. This file is outside git; edit in place.

- [ ] **Step 8: Verify and commit**

Run: `npm test && npm run verify 2>&1 | tail -1`
Expected: `# pass 7` and `All 65 checks passed`.

```bash
npx prettier --write scripts/bing.mjs scripts/clarity.mjs scripts/tidycal.mjs package.json CLAUDE.md
git add scripts/bing.mjs scripts/clarity.mjs scripts/tidycal.mjs package.json CLAUDE.md
git commit -m "feat(tools): bing/clarity/tidycal take --account; tidycal marks private types; tools:link installer"
```

---

### Task 11: Verify, human checkpoint, merge, deploy, live-verify (Tier 3 gate)

**Files:**

- No source changes. Produces a deploy and a memory update.

- [ ] **Step 1: Run the grader**

Run `/working-standards:verify-plan docs/superpowers/plans/2026-09-06-audit-followups.md`.
Expected: all criteria 1–14 PASS (15–19 are post-deploy and will FAIL until Step 5; that is expected and noted in the report). Fix any BLOCKING finding on the branch, max 3 cycles.

- [ ] **Step 2: HUMAN CHECKPOINT — stop here**

Present the verification report and `git log --oneline main..HEAD` to Brett. Do not merge or deploy until he says go. Nothing after this line runs without that.

- [ ] **Step 3: Merge to main**

```bash
git checkout main && git pull --ff-only
git merge --no-ff audit-followups-2026-09 -m "merge: audit follow-ups 2026-09 (C1–C3, C5, B2)"
git push origin main
```

- [ ] **Step 4: Build and deploy**

```bash
npm run verify && (cd dist && rm -f ../out.zip && zip -rq ../out.zip .)
```

Then call the Hostinger MCP `hosting_deployStaticWebsite` with domain `sullivanstreetprojects.com` and `out.zip`. If it returns HTTP 500, do NOT retry blindly — go to Step 5 and let the live diff decide (CLAUDE.md → Deployment).

- [ ] **Step 5: Live-verify**

```bash
S=https://sullivanstreetprojects.com
curl -sS $S/ | grep -o 'stylesheet" href="[^"]*"'; grep -o 'stylesheet" href="[^"]*"' dist/index.html
curl -sS $S/ | grep -c 'name="keywords"'
curl -sSI $S/ | grep -i strict-transport-security
curl -sS -o /dev/null -w "%{http_code} %{redirect_url}\n" $S/contact
curl -sS $S/ | grep -o '"@type":"Person","@id":"https://sullivanstreetprojects.com/#brett-wohl"'
curl -sS $S/llms.txt | grep -c 'linkedin.com/in/brettwohl'
curl -sS $S/ | grep -c '<h3 class="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h3>'
node scripts/indexnow.mjs
```

Expected: identical stylesheet hash on both lines; `0`; `max-age=31536000; includeSubDomains; preload`; `301 https://sullivanstreetprojects.com/#contact`; the Person match; `1`; `1`; IndexNow `200`/`202`.

- [ ] **Step 6: Delete the branch and record the outcome**

```bash
git branch -d audit-followups-2026-09 && git push origin --delete audit-followups-2026-09
```

Update `~/.claude/projects/…/memory/project-site-audit-2026-09.md`: mark C1–C3, C5, B2 shipped with the deploy date; list which A-items Brett has completed per the checks in the spec's owner table.

---

## Success Criteria

Verified after all tasks complete. Criteria 1–14 gate the human checkpoint; 15–19 are checked after the deploy in Task 11.

| #   | Criterion                                                                                      | How to Verify                                                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Work is on branch `audit-followups-2026-09` with one commit per task (Tasks 1–10)              | `git rev-parse --abbrev-ref HEAD` = `audit-followups-2026-09`; `git log --oneline main..HEAD \| wc -l` ≥ 10                                                                                                                                                         |
| 2   | Full content-assertion suite passes with the 10 new checks                                     | `npm run verify` → final line `All 65 checks passed`, exit 0                                                                                                                                                                                                        |
| 3   | Account resolver unit tests pass                                                               | `npm test` → summary lines show `pass 7` and `fail 0` (Node's default reporter prints them as `ℹ pass 7`), exit 0                                                                                                                                                   |
| 4   | Founder card heading is an h3 and the page has no h4                                           | `grep -c '<h3 class="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h3>' dist/index.html` = 1; `grep -c '<h4' dist/index.html` = 0                                                                                                                 |
| 5   | Label token clears WCAG AA on both grounds                                                     | `grep -c -- '--color-label: #6b6b6b' src/styles/global.css` = 1 (verify-dist computes the ratio: ≥ 4.5 on `#fafaf8` and `#f0f0ee`)                                                                                                                                  |
| 6   | Meta keywords tag is gone                                                                      | `grep -c 'name="keywords"' dist/index.html` = 0                                                                                                                                                                                                                     |
| 7   | HSTS preload and /contact redirect are in the shipped .htaccess                                | `grep -cF 'includeSubDomains; preload' dist/.htaccess` = 1; `grep -cF 'RewriteRule ^contact/?$ /#contact [L,R=301,NE]' dist/.htaccess` = 1                                                                                                                          |
| 8   | JSON-LD parses and has exactly WebSite, Organization, Person, 3 Services                       | `node -e 'const h=require("fs").readFileSync("dist/index.html","utf8");const g=JSON.parse(h.match(/ld\+json">([\s\S]*?)<\/script>/)[1])["@graph"];console.log(g.length, g.map(n=>n["@type"]).join(","))'` → `6 WebSite,Organization,Person,Service,Service,Service` |
| 9   | Person node links LinkedIn and the Organization both ways                                      | `grep -oF '"@id":"https://sullivanstreetprojects.com/#brett-wohl"' dist/index.html \| wc -l` ≥ 2; `grep -oF 'linkedin.com/in/brettwohl' dist/index.html \| wc -l` = 1                                                                                               |
| 10  | Service nodes carry serviceType from TIERS and the Advisory description is no longer truncated | `grep -o '"serviceType":"[^"]*"' dist/index.html \| sort -u \| wc -l` = 3; `grep -oF "what's working and what isn't" dist/index.html \| wc -l` ≥ 2 (Services island copy + JSON-LD)                                                                                 | sort -u \| wc -l`= 3;`grep -c "what's working and what isn't" dist/index.html` ≥ 2 (Services island copy + JSON-LD)              |
| 11  | llms.txt carries the LinkedIn and expertise lines                                              | `grep -c 'linkedin.com/in/brettwohl' dist/llms.txt` = 1; `grep -c '\*\*Expertise:\*\*' dist/llms.txt` = 1                                                                                                                                                           |
| 12  | UTM convention and `--account` tooling are documented                                          | `grep -cF 'utm_source=<gamma\|email\|linkedin>' CLAUDE.md` = 1; `grep -cF 'Both MCP connectors are Cloud Club' CLAUDE.md` = 1; `grep -cF 'tools:link' CLAUDE.md` ≥ 1                                                                                                | email\|linkedin>' CLAUDE.md`= 1;`grep -c 'Both MCP connectors are Cloud Club' CLAUDE.md`= 1;`grep -c 'tools:link' CLAUDE.md` ≥ 1 |
| 13  | Every script rejects an unknown account with the expected secret path and exit 1               | for each of `ga.mjs properties`, `gsc.mjs sites`, `bing.mjs quota`, `clarity.mjs insights 1`, `tidycal.mjs summary`: `node scripts/<s> --account nope …; echo $?` prints a `No … at …/.secrets/nope-…` line and `1`                                                 |
| 14  | Shared install works from outside the repo                                                     | `readlink ~/.claude/tools` = `<repo>/scripts`; `cd /tmp && node ~/.claude/tools/tidycal.mjs summary` prints `total bookings ever:`                                                                                                                                  |
| 15  | [post-deploy] Live HTML matches the build                                                      | stylesheet hash from `curl -sS https://sullivanstreetprojects.com/` equals the one in `dist/index.html`                                                                                                                                                             |
| 16  | [post-deploy] Live /contact redirects to the section                                           | `curl -sS -o /dev/null -w "%{http_code} %{redirect_url}" https://sullivanstreetprojects.com/contact` = `301 https://sullivanstreetprojects.com/#contact`                                                                                                            |
| 17  | [post-deploy] Live HSTS carries preload                                                        | `curl -sSI https://sullivanstreetprojects.com/ \| grep -ic 'includeSubDomains; preload'` = 1                                                                                                                                                                        |
| 18  | [post-deploy] Live page has the Person node and no keywords meta                               | `curl -sS https://sullivanstreetprojects.com/ \| grep -oF '#brett-wohl' \| wc -l` ≥ 2 and `curl -sS https://sullivanstreetprojects.com/ \| grep -cF 'name="keywords"'` = 0                                                                                          | grep -c '#brett-wohl'`≥ 2 and`\| grep -c 'name="keywords"'` = 0                                                                  |
| 19  | [post-deploy] IndexNow ping accepted                                                           | `node scripts/indexnow.mjs` prints HTTP 200 or 202                                                                                                                                                                                                                  |

## Owner preconditions (not graded — Brett's A-items)

Run after Brett reports them done; each is a single command from the spec's owner table: `node scripts/gsc.mjs sites` (A1), `node scripts/ga.mjs admin` (A2, A3, A5), `node scripts/tidycal.mjs types` (A4, no `[PRIVATE]`).
