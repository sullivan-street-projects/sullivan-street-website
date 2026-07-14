# De-React Scroll Animations (Phase A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reproduce the site's scroll-reveal (FocusText), typewriter, and credentials-chart animations with CSS scroll-driven animations + small vanilla scripts, eliminating 11 of 14 React islands and all above-the-fold JavaScript — with pixel-identical visuals gated by screenshot comparison.

**Architecture:** FocusText becomes a `.focus-text` CSS class using `animation-timeline: view()` (scroll-scrubbed, off-main-thread, `@supports`-guarded). TypewriterText becomes a `[data-typewriter]` vanilla module (IntersectionObserver + setTimeout, SSR'd visible text). Credentials + CredentialsChart become `.astro` files — the chart path is already computed from static data at module scope, so it renders at build time; line-draw uses the SVG `pathLength="1"` + `stroke-dashoffset` technique. Services, PartnerOutcomes, and CookieConsent keep their genuine interactivity as React islands (Phase B decides their fate); they still lazy-load React/Framer via `client:visible`/`client:idle`, but nothing above the fold does.

**Tech Stack:** Astro 6, Tailwind CSS v4 (`@theme` tokens), CSS scroll-driven animations, vanilla JS modules, Puppeteer screenshot tooling (`scripts/screenshot.js`), `scripts/verify-dist.mjs` content assertions.

## Global Constraints

- **Visual parity is the acceptance gate.** Every visual task compares fresh screenshots against `screenshots/pre-migration/` at 1440/768/375 px. The effect must look the same; if a scroll-reveal's timing looks different, tune `animation-range`, don't accept drift.
- **`npm run verify` must pass at every commit.** New checks are added _before_ their implementation (red → green) where the plan says so.
- **No new npm dependencies. No package.json changes in this phase.**
- **Do NOT touch the interactivity of `Services.jsx`, `PartnerOutcomes.jsx`, `CookieConsent.jsx`** (their FocusText _wrapper_ changes; their state/gesture logic does not). Framer-motion/React removal from those is Phase B, out of scope.
- **`.astro` imports always carry the `.astro` extension; extensionless imports resolve to `.jsx`** (repo islands rule).
- **Design tokens only** — reference `var(--color-*)` / Tailwind token utilities, never hardcoded hex.
- **All animation honors `prefers-reduced-motion`**: CSS via `@media (prefers-reduced-motion: no-preference)` wrappers, JS via `matchMedia` check. Reduced-motion state = fully visible, static.
- **SSR text integrity:** every copy string currently in `dist/index.html` must still be there (verify-dist enforces most of this).
- **Node ≥ 22.12. Conventional commit messages. One commit per task** (Task 1 has nothing to commit).
- All work on branch `dereact-scroll-animations` (created in Task 1).

---

## Success Criteria

Verified after all tasks complete. Most are already encoded as `verify-dist.mjs` checks, so criterion 2 subsumes several — they are listed explicitly here for the grader.

| #   | Criterion                                                                                                                          | How to Verify                                                                                                                                                                    |
| --- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Work is on branch `dereact-scroll-animations` with one commit per implemented task (Tasks 2–7 = 6 commits; Task 1 has none)        | `git rev-parse --abbrev-ref HEAD` = `dereact-scroll-animations`; `git log --oneline main..HEAD \| wc -l` ≥ 6                                                                     |
| 2   | Full content-assertion suite passes                                                                                                | `npm run verify` → final line `All N checks passed`, exit 0                                                                                                                      |
| 3   | Island count reduced to 3 (Services, PartnerOutcomes, CookieConsent)                                                               | `npm run build && grep -o '<astro-island' dist/index.html \| wc -l` → `3` (guardrail check asserts ≤ 4)                                                                          |
| 4   | Above-the-fold JS eliminated — no FocusText/TypewriterText/Credentials chunks emitted                                              | `ls dist/_astro/ \| grep -E '^(FocusText\|TypewriterText\|Credentials\|CredentialsChart)\.'` → no matches                                                                        |
| 5   | `.focus-text` CSS scroll animation compiled and applied                                                                            | compiled `dist/_astro/*.css` contains `focus-reveal` + `animation-timeline`; `grep -o 'focus-text' dist/index.html \| wc -l` ≥ 8                                                 |
| 6   | Hero H1 is static SSR text — no island, no invisible ghost                                                                         | `<h1>` in `dist/index.html` contains `Billion-Dollar Brands`, excludes `astro-island` and `opacity-0`                                                                            |
| 7   | Credentials chart SVG is server-rendered (build-time)                                                                              | `dist/index.html` contains `chart-line` and all milestone labels (`$0.5B`, `$1B`, `$1.5B`, `$2.1B`)                                                                              |
| 8   | Dead/replaced components deleted                                                                                                   | `FocusText.jsx`, `TypewriterText.jsx`, `AnimatedArrow.jsx`, `Credentials.jsx`, `CredentialsChart.jsx` do not exist under `src/`                                                  |
| 9   | Vanilla typewriter module shipped and loaded                                                                                       | `src/scripts/typewriter.js` exists; imported in `BaseLayout.astro` head script                                                                                                   |
| 10  | Visual parity — post-migration screenshots match `screenshots/pre-migration/` at 1440/768/375 (marquee horizontal offset excepted) | `bash scripts/capture-baselines.sh`; pairwise compare all 30 images; no visible difference beyond the continuously-looping marquee offset                                        |
| 11  | Docs reflect the new architecture                                                                                                  | `CLAUDE.md` Islands rule names only Services/PartnerOutcomes/CookieConsent; FocusText section describes `.focus-text` CSS class; Animation section describes `[data-typewriter]` |

**Correctness-only leash (for grading):** BLOCKING = criteria 1–9, 11 (mechanically verifiable) and any visible regression in 10. Non-blocking = marquee phase offset, sub-pixel antialiasing differences, and the accepted micro-deviations named in the Reference section.

---

## Reference: current behavior being ported (source of truth)

| Component              | Effect                    | Parameters                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FocusText.jsx`        | scroll-scrubbed reveal    | opacity 0.4→1 and Y 8px→0 over first 60% of progress; blur 3.5px→0 over 100%; progress = element travel from "top at 90% viewport" to "center at 55% viewport"; wrapper adds `-mx-1 px-1`                                                                       |
| `TypewriterText.jsx`   | type-on-scroll-into-view  | 500ms start delay, 70ms/char, blinking 2px cursor (0.8s), resets when scrolled out, ghost copy holds layout width, typed overlay is `aria-hidden`                                                                                                               |
| `CredentialsChart.jsx` | sequenced chart animation | 600ms after 40% in view (once): line draws over 2.8s `cubic-bezier(0.32,0,0.67,1)`; each milestone fades in 0.35s at `delay = (year−2014)/12 × 2.8s`; caption types at 35ms/char after line completes (~3.7s after start); mobile/desktop configs swap at 768px |

Known intentional micro-deviations (accepted, do not "fix"): unified cursor metrics (0.8em/0.8s for both typewriter instances vs 0.85em/0.6s on the old chart caption); chart caption starts from its own IntersectionObserver + 3700ms delay instead of chaining off the chart's observer; no-JS/legacy browsers now see _visible_ static text instead of the old invisible "ghost" state (strict improvement).

---

### Task 1: Branch + pre-migration visual baselines

**Files:**

- Create: `screenshots/pre-migration/` (30 PNGs; gitignored — lives on disk only)

**Interfaces:**

- Produces: `screenshots/pre-migration/<section>-<viewport>.png` and `fullpage-<viewport>.png` — every later task's comparison target.

- [ ] **Step 1: Create the working branch**

```bash
git checkout -b dereact-scroll-animations
```

- [ ] **Step 2: Confirm green starting state**

Run: `npm run verify`
Expected: `All 31 checks passed` (count may differ slightly; all must PASS).

- [ ] **Step 3: Capture baselines** (auto-starts the dev server if needed)

```bash
bash scripts/capture-baselines.sh
```

Expected: `=== Done: 30 screenshots saved to screenshots/baselines/ ===`

- [ ] **Step 4: Move them out of the default output path** (so post-migration captures don't overwrite)

```bash
mv screenshots/baselines screenshots/pre-migration
ls screenshots/pre-migration | wc -l
```

Expected: `30`

No commit — screenshots are gitignored and no tracked files changed.

---

### Task 2: `.focus-text` CSS primitive

**Files:**

- Modify: `src/styles/global.css` (append after the arrow-nudge block, before the reduced-motion block)
- Modify: `scripts/verify-dist.mjs` (append new check before the runner loop)

**Interfaces:**

- Produces: CSS class `focus-text` — apply to any block-level element to get the scroll reveal. Consumers add it alongside `-mx-1 px-1` (the blur-bleed guard the old wrapper carried).

- [ ] **Step 1: Add the failing verify check**

In `scripts/verify-dist.mjs`, after the Task-15 verification-meta checks (line ~115), add:

```js
// --- De-React Phase A: CSS scroll-driven FocusText ---
check('focus-text scroll animation compiled into CSS', () => {
  const cssFile = readdirSync(dist('_astro')).find((f) => f.endsWith('.css'));
  const css = readFileSync(dist(`_astro/${cssFile}`), 'utf-8');
  return css.includes('focus-reveal') && css.includes('animation-timeline');
});
```

And extend the imports at the top of the file:

```js
import { readFileSync, existsSync, readdirSync } from 'node:fs';
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm run verify`
Expected: `FAIL — focus-text scroll animation compiled into CSS` (exit 1)

- [ ] **Step 3: Add the CSS**

In `src/styles/global.css`, insert after the `.animate-arrow-nudge-lg` rule (line ~168), before the reduced-motion block:

```css
/* FocusText — CSS scroll-driven port of FocusText.jsx.
   opacity 0.4→1 and Y 8→0 complete at 60% of progress; blur 3.5→0 runs the
   full range (mirrors the old useTransform ranges). Progress ≈ Framer's
   offset ["start 90%", "center 55%"]. Non-supporting browsers and
   reduced-motion users get static, fully visible text — identical to the
   old reduced-motion fallback. Usage: class="focus-text -mx-1 px-1". */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .focus-text {
      animation: focus-reveal linear both;
      animation-timeline: view();
      animation-range: cover 8% cover 46%;
    }
  }
}
@keyframes focus-reveal {
  from {
    opacity: 0.4;
    filter: blur(3.5px);
    transform: translateY(8px);
  }
  60% {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `npm run verify`
Expected: all checks PASS, including the new one.

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css scripts/verify-dist.mjs
git commit -m "feat(css): add .focus-text scroll-driven animation primitive"
```

---

### Task 3: Replace FocusText islands in the five static sections

**Files:**

- Modify: `src/sections/Statement.astro` (lines 3, 9, 15 + closing tags)
- Modify: `src/sections/Intro.astro` (lines 3, 9, 23 + closing tags)
- Modify: `src/sections/Approach.astro` (lines 3, 9, 24 + closing tags)
- Modify: `src/sections/About.astro` (lines 3, 9 + closing tag)
- Modify: `src/sections/Contact.astro` (lines 3, 13 + closing tag)

**Interfaces:**

- Consumes: `.focus-text` class from Task 2.

- [ ] **Step 1: Record the current island count** (comparison figure for Step 3)

```bash
npm run build && grep -o '<astro-island' dist/index.html | wc -l
```

Note the number (call it N; there are 8 FocusText islands across these files).

- [ ] **Step 2: Apply the mechanical replacement in all five files**

In each file:

1. Delete the import line: `import FocusText from '../components/FocusText.jsx';`
2. Replace every `<FocusText client:visible>` with `<div class="focus-text -mx-1 px-1">`
3. Replace `<FocusText client:visible className="space-y-10 md:space-y-12">` (About.astro only) with `<div class="focus-text -mx-1 px-1 space-y-10 md:space-y-12">`
4. Replace every `</FocusText>` with `</div>`

(The old wrapper's `will-change-[filter,opacity,transform]` is intentionally dropped — compositor-driven CSS animations don't need it, and permanent will-change is an anti-pattern.)

Call sites checklist: Statement ×2, Intro ×2, Approach ×2, About ×1, Contact ×1 = 8.

- [ ] **Step 3: Verify the island count dropped by exactly 8**

```bash
npm run build && grep -o '<astro-island' dist/index.html | wc -l
```

Expected: N − 8. Also run `npm run verify` — all PASS (copy strings unchanged).

- [ ] **Step 4: Visual comparison against baselines**

```bash
node scripts/screenshot.js http://localhost:5173 --selector "#statement" --settle 1500 -w 1440 -o screenshots/task3-statement-1440.png
node scripts/screenshot.js http://localhost:5173 --selector "#intro" --settle 1500 -w 1440 -o screenshots/task3-intro-1440.png
node scripts/screenshot.js http://localhost:5173 --selector "#approach" --settle 1500 -w 375 -o screenshots/task3-approach-375.png
node scripts/screenshot.js http://localhost:5173 --selector "#about" --settle 1500 -w 1440 -o screenshots/task3-about-1440.png
```

Open each next to its `screenshots/pre-migration/` counterpart (Read both image files). Sections must show the same reveal state (settled = fully revealed). **If a section appears dimmer/blurrier than baseline at rest**, the range end is too late — reduce `cover 46%` in steps of 4 (46 → 42 → 38) in `global.css` and re-capture until it matches.

- [ ] **Step 5: Interactive scrub check (Lenis compatibility)**

Load `http://localhost:5173` in the screenshot browser or manually; confirm text blocks scrub from dim/blurred to sharp as they travel up the viewport (Lenis animates native scroll position, which `view()` timelines track — this step confirms it empirically).

- [ ] **Step 6: Commit**

```bash
git add src/sections/Statement.astro src/sections/Intro.astro src/sections/Approach.astro src/sections/About.astro src/sections/Contact.astro
git commit -m "refactor(sections): replace FocusText islands with .focus-text CSS in static sections"
```

---

### Task 4: Vanilla typewriter module; de-island Hero + Contact

**Files:**

- Create: `src/scripts/typewriter.js`
- Modify: `src/styles/global.css` (append `.tw-*` styles after the `.focus-text` block)
- Modify: `src/layouts/BaseLayout.astro` (head script block, line ~132)
- Modify: `src/sections/Hero.astro` (lines 4, 12)
- Modify: `src/sections/Contact.astro` (lines 4, 17)
- Delete: `src/components/TypewriterText.jsx`
- Modify: `scripts/verify-dist.mjs`

**Interfaces:**

- Consumes: nothing from earlier tasks.
- Produces: contract `[data-typewriter]` — any element with this attribute gets typed on scroll-into-view. Optional attrs: `data-tw-speed` (ms/char, default `70`), `data-tw-delay` (ms before typing starts, default `500`). SSR markup is the plain visible text; the script restructures the DOM only when it runs and motion is allowed. Task 6's chart caption uses this contract.

- [ ] **Step 1: Add the failing verify check**

In `scripts/verify-dist.mjs`, below the Task-2 focus-text check, add:

```js
check('hero H1 is static text (no island, no ghost)', () => {
  const h1 = html('index.html').match(/<h1[\s\S]*?<\/h1>/)?.[0] ?? '';
  return (
    h1.includes('Billion-Dollar Brands') &&
    !h1.includes('astro-island') &&
    !h1.includes('opacity-0')
  );
});
```

Run: `npm run verify`
Expected: `FAIL — hero H1 is static text (no island, no ghost)`

- [ ] **Step 2: Create `src/scripts/typewriter.js`**

```js
// Vanilla port of TypewriterText.jsx. SSR markup is plain visible text:
//   <span class="italic" data-typewriter>Billion-Dollar Brands</span>
// When JS runs and motion is allowed, the element is restructured into a
// layout-holding ghost (kept in the a11y tree) plus an aria-hidden typed
// overlay — same DOM strategy as the old React component. No JS / legacy
// browsers / reduced motion ⇒ the text simply stays visible.
const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup(el) {
  const text = el.textContent;
  const speed = Number(el.dataset.twSpeed || 70);
  const delay = Number(el.dataset.twDelay || 500);

  el.textContent = '';
  el.classList.add('tw');

  const ghost = document.createElement('span');
  ghost.className = 'tw-ghost';
  ghost.textContent = text;
  const spacer = document.createElement('span');
  spacer.className = 'tw-spacer';
  ghost.append(spacer);

  const live = document.createElement('span');
  live.className = 'tw-live';
  live.setAttribute('aria-hidden', 'true');
  const typed = document.createElement('span');
  const cursor = document.createElement('span');
  cursor.className = 'tw-cursor';
  live.append(typed, cursor);

  el.append(ghost, live);

  let i = 0;
  let tickTimer = null;
  let startTimer = null;

  const tick = () => {
    typed.textContent = text.slice(0, ++i);
    if (i < text.length) tickTimer = setTimeout(tick, speed);
  };

  // Types on entry, resets on exit — parity with the old IntersectionObserver.
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      cursor.classList.add('tw-cursor-on');
      startTimer = setTimeout(tick, delay);
    } else {
      clearTimeout(tickTimer);
      clearTimeout(startTimer);
      i = 0;
      typed.textContent = '';
      cursor.classList.remove('tw-cursor-on');
    }
  });
  io.observe(el);
}

if (!REDUCED) document.querySelectorAll('[data-typewriter]').forEach(setup);
```

- [ ] **Step 3: Add the `.tw-*` styles to `src/styles/global.css`** (after the focus-text block)

```css
/* Typewriter — companion styles for src/scripts/typewriter.js */
.tw {
  position: relative;
  display: inline-block;
}
.tw-ghost {
  opacity: 0;
  pointer-events: none;
  user-select: none;
}
.tw-spacer {
  display: inline-block;
  width: 2px;
  margin-left: 0.375rem;
}
.tw-live {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
}
.tw-cursor {
  display: inline-block;
  width: 2px;
  height: 0.8em;
  margin-left: 0.375rem;
  background: var(--color-charcoal);
  transform: translateY(0.1em);
  visibility: hidden;
}
.tw-cursor-on {
  visibility: visible;
  animation: tw-blink 0.8s infinite;
}
@keyframes tw-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
```

- [ ] **Step 4: Load the module + swap both call sites**

`src/layouts/BaseLayout.astro` — extend the existing head script block:

```html
<script>
  import '../scripts/smooth-scroll.js';
  import '../scripts/typewriter.js';
  import { initAnalytics } from '../utils/analytics.js';
  initAnalytics();
</script>
```

`src/sections/Hero.astro` — delete line 4 (`import TypewriterText …`), and replace line 12:

```html
<TypewriterText client:visible text="Billion-Dollar Brands" />
```

with:

```html
<span class="italic" data-typewriter>Billion-Dollar Brands</span>
```

`src/sections/Contact.astro` — delete the `import TypewriterText …` line, and replace:

```html
<TypewriterText client:visible text="billion-dollar brand?" />
```

with:

```html
<span class="italic" data-typewriter>billion-dollar brand?</span>
```

- [ ] **Step 5: Delete the React component**

```bash
git rm src/components/TypewriterText.jsx
```

- [ ] **Step 6: Verify green + visual check**

Run: `npm run verify`
Expected: all PASS, including `hero H1 is static text`.

```bash
node scripts/screenshot.js http://localhost:5173 --selector "#hero" --settle 4000 -w 1440 -o screenshots/task4-hero-1440.png
node scripts/screenshot.js http://localhost:5173 --selector "#contact" --settle 4000 -w 375 -o screenshots/task4-contact-375.png
```

Compare against `screenshots/pre-migration/hero-1440.png` and `contact-375.png`: full text typed out, italic styling, cursor at end. Expected micro-difference: none at settle=4000 (typing completes in ~1.6s).

- [ ] **Step 7: Commit**

```bash
git add src/scripts/typewriter.js src/styles/global.css src/layouts/BaseLayout.astro src/sections/Hero.astro src/sections/Contact.astro scripts/verify-dist.mjs
git commit -m "feat(scripts): vanilla typewriter module replaces TypewriterText islands"
```

---

### Task 5: FocusText out of the React islands; delete FocusText.jsx

**Files:**

- Modify: `src/sections/Services.jsx` (lines 5, 58, 76 + 2 closing tags)
- Modify: `src/sections/PartnerOutcomes.jsx` (lines 4, 40 + 1 closing tag)
- Delete: `src/components/FocusText.jsx`
- Modify: `scripts/verify-dist.mjs`

**Interfaces:**

- Consumes: `.focus-text` class from Task 2 (CSS scroll animations work identically on elements inside hydrated islands — it's just DOM + CSS).

- [ ] **Step 1: Add the failing verify check**

In `scripts/verify-dist.mjs`, below the hero-H1 check:

```js
check(
  'no FocusText/TypewriterText chunks emitted',
  () =>
    !readdirSync(dist('_astro')).some(
      (f) => f.startsWith('FocusText.') || f.startsWith('TypewriterText.'),
    ),
);
```

Run: `npm run verify`
Expected: `FAIL — no FocusText/TypewriterText chunks emitted` (FocusText chunk still built).

- [ ] **Step 2: Replace the three call sites**

`src/sections/Services.jsx`:

- Delete line 5: `import FocusText from '../components/FocusText';`
- Line 58: `<FocusText>` → `<div className="focus-text -mx-1 px-1">`
- Line 76: `<FocusText key={tier.id}>` → `<div key={tier.id} className="focus-text -mx-1 px-1">`
- Both matching `</FocusText>` → `</div>`

`src/sections/PartnerOutcomes.jsx`:

- Delete line 4: `import FocusText from '../components/FocusText';`
- Line 40: `<FocusText>` → `<div className="focus-text -mx-1 px-1">`
- Matching `</FocusText>` → `</div>`

Do NOT touch anything else in these files (drag handlers, AnimatePresence, state — Phase B territory).

- [ ] **Step 3: Delete the component**

```bash
git rm src/components/FocusText.jsx
```

- [ ] **Step 4: Verify green + visual check**

Run: `npm run verify`
Expected: all PASS.

```bash
node scripts/screenshot.js http://localhost:5173 --selector "#services" --settle 1500 -w 1440 -o screenshots/task5-services-1440.png
node scripts/screenshot.js http://localhost:5173 --selector "#outcomes" --settle 1500 -w 768 -o screenshots/task5-outcomes-768.png
```

Compare with `screenshots/pre-migration/services-1440.png` / `outcomes-768.png`.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Services.jsx src/sections/PartnerOutcomes.jsx scripts/verify-dist.mjs
git commit -m "refactor(islands): swap FocusText wrapper for .focus-text class; remove FocusText.jsx"
```

---

### Task 6: Credentials section + chart → static Astro with CSS animation

**Files:**

- Create: `src/components/CredentialsChart.astro`
- Create: `src/sections/Credentials.astro`
- Modify: `src/pages/index.astro` (lines 7, 41)
- Delete: `src/sections/Credentials.jsx`, `src/components/CredentialsChart.jsx`
- Modify: `scripts/verify-dist.mjs`

**Interfaces:**

- Consumes: `[data-typewriter]` contract from Task 4 (`data-tw-speed="35" data-tw-delay="3700"` for the caption).
- Produces: `<Credentials />` — plain static section, imported **with** `.astro` extension, **no** `client:` directive.

- [ ] **Step 1: Add the failing verify check**

In `scripts/verify-dist.mjs`:

```js
check('credentials chart SVG SSRed', () => html('index.html').includes('chart-line'));
```

Run: `npm run verify`
Expected: `FAIL — credentials chart SVG SSRed`.

- [ ] **Step 2: Create `src/components/CredentialsChart.astro`**

Chart math ports verbatim from `CredentialsChart.jsx` (it's all static data — it now runs at build time, so the SVG ships as SSR'd HTML). Mobile/desktop variants both render; CSS breakpoints swap them (replaces the `useIsMobile` hook).

```astro
---
// Static port of CredentialsChart.jsx — path computed at build time.
// Animation sequence (600ms after 40% in view, once):
//   line draws 2.8s cubic-bezier(0.32,0,0.67,1) via pathLength/stroke-dashoffset,
//   milestones fade 0.35s at delay = progress × 2.8s,
//   caption types at 35ms/char via the shared [data-typewriter] module.
// No JS / reduced motion ⇒ fully drawn chart, static caption.
const DATA = [
  { year: 2014, value: 0 }, { year: 2015, value: 80 },
  { year: 2016, value: 200 }, { year: 2017, value: 400 },
  { year: 2018, value: 650 }, { year: 2019, value: 900 },
  { year: 2020, value: 1100 }, { year: 2021, value: 1350 },
  { year: 2022, value: 1600 }, { year: 2023, value: 1800 },
  { year: 2024, value: 1950 }, { year: 2025, value: 2050 },
  { year: 2026, value: 2150 },
];

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;
const LINE_DURATION = 2.8;

const Y_TICKS = [
  { value: 0, label: '$0' },
  { value: 1000, label: '$1B' },
  { value: 2000, label: '$2B' },
];

const DESKTOP = {
  w: 1000, h: 360,
  margin: { top: 40, right: 60, bottom: 44, left: 50 },
  xTicks: [2014, 2016, 2018, 2020, 2022, 2024, 2026],
  milestones: [
    { year: 2018, value: 650, label: '$0.5B' },
    { year: 2020, value: 1100, label: '$1B' },
    { year: 2022, value: 1600, label: '$1.5B' },
    { year: 2026, value: 2150, label: '$2.1B' },
  ],
  fontSize: { axis: 13, milestone: 15 },
  stroke: 2.5,
  dot: { r: 5, ring: 9 },
  gridStroke: 1,
  msOffset: 14,
  class: 'hidden md:block',
};

const MOBILE = {
  w: 600, h: 400,
  margin: { top: 40, right: 40, bottom: 50, left: 60 },
  xTicks: [2014, 2020, 2026],
  milestones: [
    { year: 2018, value: 650, label: '$0.5B' },
    { year: 2026, value: 2150, label: '$2.1B' },
  ],
  fontSize: { axis: 18, milestone: 22 },
  stroke: 3.5,
  dot: { r: 7, ring: 12 },
  gridStroke: 1,
  msOffset: 18,
  class: 'md:hidden',
};

function makeHelpers(cfg) {
  const plotW = cfg.w - cfg.margin.left - cfg.margin.right;
  const plotH = cfg.h - cfg.margin.top - cfg.margin.bottom;
  const xPos = (year) => cfg.margin.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * plotW;
  const yPos = (value) => cfg.margin.top + plotH - (value / Y_MAX) * plotH;
  return { xPos, yPos };
}

// Fritsch-Carlson monotone cubic interpolation (verbatim from the JSX version)
function monotoneCubicPath(pts) {
  const n = pts.length;
  if (n < 2) return '';
  const slopes = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((pts[i + 1].y - pts[i].y) / (pts[i + 1].x - pts[i].x));
  }
  const tangents = [slopes[0]];
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) tangents.push(0);
    else tangents.push(2 / (1 / slopes[i - 1] + 1 / slopes[i]));
  }
  tangents.push(slopes[n - 2]);
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1].x - pts[i].x) / 3;
    const cp1x = pts[i].x + dx;
    const cp1y = pts[i].y + dx * tangents[i];
    const cp2x = pts[i + 1].x - dx;
    const cp2y = pts[i + 1].y - dx * tangents[i + 1];
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${pts[i + 1].x.toFixed(1)},${pts[i + 1].y.toFixed(1)}`;
  }
  return d;
}

const charts = [MOBILE, DESKTOP].map((cfg) => {
  const { xPos, yPos } = makeHelpers(cfg);
  const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
  return { cfg, xPos, yPos, path: monotoneCubicPath(points) };
});

const msDelay = (year) => (((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * LINE_DURATION).toFixed(2);

const TYPEWRITER_TEXT =
  '$2B+ in media managed across Fortune 500 brands and venture-backed startups.';
---

<div
  data-chart
  class="w-full max-w-5xl mx-auto px-6 lg:px-8 mt-8 md:mt-10 border-t border-divider pt-8 md:pt-12"
>
  <div class="relative">
    {
      charts.map(({ cfg, xPos, yPos, path }) => (
        <svg
          viewBox={`0 0 ${cfg.w} ${cfg.h}`}
          class={`w-full ${cfg.class}`}
          role="img"
          aria-label="Line chart showing cumulative media spend growing from $0 to over $2.1 billion between 2014 and 2026"
        >
          {Y_TICKS.map(({ value }) => (
            <line
              x1={cfg.margin.left}
              x2={cfg.w - cfg.margin.right}
              y1={yPos(value)}
              y2={yPos(value)}
              stroke="var(--color-divider)"
              stroke-width={cfg.gridStroke}
            />
          ))}
          {Y_TICKS.map(({ value, label }) => (
            <text
              x={cfg.margin.left - 12}
              y={yPos(value)}
              text-anchor="end"
              dominant-baseline="middle"
              class="font-sans"
              font-size={cfg.fontSize.axis}
              fill="var(--color-faint)"
            >
              {label}
            </text>
          ))}
          {cfg.xTicks.map((year) => (
            <text
              x={xPos(year)}
              y={cfg.h - 12}
              text-anchor="middle"
              class="font-sans"
              font-size={cfg.fontSize.axis}
              fill="var(--color-faint)"
            >
              {year}
            </text>
          ))}
          <path
            class="chart-line"
            d={path}
            pathLength="1"
            fill="none"
            stroke="var(--color-charcoal)"
            stroke-width={cfg.stroke}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          {cfg.milestones.map((m) => (
            <g class="chart-ms" style={`--ms-delay: ${msDelay(m.year)}s`}>
              <circle cx={xPos(m.year)} cy={yPos(m.value)} r={cfg.dot.r} fill="var(--color-charcoal)" />
              <circle
                cx={xPos(m.year)}
                cy={yPos(m.value)}
                r={cfg.dot.ring}
                fill="none"
                stroke="var(--color-charcoal)"
                stroke-width="1"
                opacity="0.25"
              />
              <text
                x={xPos(m.year)}
                y={yPos(m.value) - cfg.msOffset}
                text-anchor="middle"
                class="font-sans"
                font-weight="600"
                font-size={cfg.fontSize.milestone}
                fill="var(--color-charcoal)"
              >
                {m.label}
              </text>
            </g>
          ))}
        </svg>
      ))
    }
  </div>

  <div class="mt-6 border-t border-divider pt-4 min-h-[2rem]">
    <p class="font-sans text-body-sm text-muted italic">
      <span data-typewriter data-tw-speed="35" data-tw-delay="3700">{TYPEWRITER_TEXT}</span>
    </p>
  </div>
</div>

<style>
  /* Armed (script ran, motion allowed): hide line + milestones.
     Playing: draw the line and fade milestones on schedule.
     pathLength="1" on the <path> normalizes dash units so dasharray/offset
     of 1 = the full path, replicating Framer's pathLength animation. */
  @media (prefers-reduced-motion: no-preference) {
    .chart-armed .chart-line {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
    }
    .chart-armed .chart-ms {
      opacity: 0;
    }
    .chart-play .chart-line {
      animation: chart-draw 2.8s cubic-bezier(0.32, 0, 0.67, 1) forwards;
    }
    .chart-play .chart-ms {
      animation: chart-fade 0.35s ease forwards;
      animation-delay: var(--ms-delay);
    }
  }
  @keyframes chart-draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes chart-fade {
    to {
      opacity: 1;
    }
  }
</style>

<script>
  // Arm the hidden initial state only when JS runs and motion is allowed
  // (no-JS ⇒ chart is fully visible), then play 600ms after 40% in view, once.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    document.querySelectorAll('[data-chart]').forEach((root) => {
      root.classList.add('chart-armed');
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          setTimeout(() => root.classList.add('chart-play'), 600);
        },
        { threshold: 0.4 },
      );
      io.observe(root);
    });
  }
</script>
```

- [ ] **Step 3: Create `src/sections/Credentials.astro`**

Port of `Credentials.jsx`. The `useReducedMotion` marquee guard is dropped — the global reduced-motion CSS block already neutralizes `animate-marquee-horizontal`.

```astro
---
import CredentialsChart from '../components/CredentialsChart.astro';
import { LABEL_CLASSES, BRANDS } from '../constants/index.js';
---

<div>
  <div class="max-w-site w-full mx-auto px-6 lg:px-8">
    <div class="border-t border-divider"></div>
  </div>
  <section id="credentials" class="pt-16 md:pt-20 pb-16 md:pb-20">
    <div class="max-w-site w-full mx-auto px-6 lg:px-8 mb-6">
      <span class={LABEL_CLASSES}> Before SSP, our team managed campaigns for </span>
    </div>

    <!-- Full-width marquee (outside the max-w wrapper) -->
    <div class="overflow-hidden relative w-full">
      <div
        class="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-paper via-paper/90 to-transparent z-10 pointer-events-none"
      >
      </div>
      <div
        class="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-paper via-paper/90 to-transparent z-10 pointer-events-none"
      >
      </div>

      <div class="flex whitespace-nowrap animate-marquee-horizontal">
        {
          [0, 1].map((copy) => (
            <div class="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {BRANDS.map((brand) => (
                <span class="font-sans text-caption font-medium text-label uppercase tracking-widest cursor-default shrink-0 mx-6 md:mx-10">
                  {brand}
                </span>
              ))}
            </div>
          ))
        }
      </div>
    </div>

    <CredentialsChart />
  </section>
</div>
```

- [ ] **Step 4: Swap the import in `src/pages/index.astro`**

Line 7: `import Credentials from '../sections/Credentials.jsx';` → `import Credentials from '../sections/Credentials.astro';`
Line 41: `<Credentials client:visible />` → `<Credentials />`

- [ ] **Step 5: Delete the React pair**

```bash
git rm src/sections/Credentials.jsx src/components/CredentialsChart.jsx
```

- [ ] **Step 6: Verify green + visual + behavioral check**

Run: `npm run verify`
Expected: all PASS — including the existing `credentials brands SSRed` / `credentials section id` checks and the new `credentials chart SVG SSRed`.

```bash
node scripts/screenshot.js http://localhost:5173 --selector "#credentials" --settle 4500 -w 1440 -o screenshots/task6-credentials-1440.png
node scripts/screenshot.js http://localhost:5173 --selector "#credentials" --settle 4500 -w 375 -o screenshots/task6-credentials-375.png
```

Compare with `screenshots/pre-migration/credentials-{1440,375}.png` (settle 4500 > 600 + 2800 + caption start, so line fully drawn + milestones visible; marquee position will differ — it's a continuous loop, ignore its horizontal offset). Confirm: correct chart variant per viewport, all milestone labels, caption text present.

- [ ] **Step 7: Commit**

```bash
git add src/sections/Credentials.astro src/components/CredentialsChart.astro src/pages/index.astro scripts/verify-dist.mjs
git commit -m "refactor(credentials): static astro section with CSS-animated SSR chart"
```

---

### Task 7: Dead code removal, island ceiling, docs, full visual regression

**Files:**

- Delete: `src/components/AnimatedArrow.jsx` (zero importers — its CSS port already lives in `global.css`)
- Modify: `scripts/verify-dist.mjs`
- Modify: `CLAUDE.md` (Architecture bullet, FocusText section, Animation section)

**Interfaces:**

- Consumes: everything prior; this task locks the end state in.

- [ ] **Step 1: Delete dead component**

```bash
git rm src/components/AnimatedArrow.jsx
```

- [ ] **Step 2: Add the permanent guardrail checks**

In `scripts/verify-dist.mjs`, below the chart check:

```js
check(
  'island ceiling: only Services/Outcomes/CookieConsent hydrate',
  () => (html('index.html').match(/<astro-island/g) || []).length <= 4,
);
check(
  'focus-text applied across sections',
  () => (html('index.html').match(/focus-text/g) || []).length >= 8,
);
```

Run: `npm run verify`
Expected: all PASS (3 islands remain: Services, PartnerOutcomes, CookieConsent). If the island count check fails, a `client:` directive survived somewhere — find it with `grep -rn "client:" src` and fix before proceeding.

- [ ] **Step 3: Update `CLAUDE.md`**

Replace the **Islands rule** bullet (in Architecture) with:

```markdown
- **Islands rule:** `.astro` imports always carry the `.astro` extension; extensionless imports resolve to `.jsx`. Static sections are `.astro`; Services/PartnerOutcomes are React islands (`client:visible`) and CookieConsent (`client:idle`) — the ONLY hydrated components (enforced by verify-dist's island ceiling). Lenis lives at `window.__lenis` (`src/scripts/smooth-scroll.js`).
```

Replace the **## FocusText Rules** section body with:

```markdown
FocusText is a scroll-reveal effect (opacity 0.4→1, blur 3.5px→0, Y 8px→0), implemented as the `.focus-text` CSS class in `src/styles/global.css` using CSS scroll-driven animations (`animation-timeline: view()`). Apply as `class="focus-text -mx-1 px-1"`. No React island required. Usage conventions:

- Wrap content blocks, NOT individual paragraphs within a block
- Grid/list items each get their own `.focus-text` for staggered reveal
- Hero is above the fold — NO focus-text
- Each `.focus-text` element = one scroll-reveal unit
- Do NOT add to: section labels, brand name lists, footnotes, CTAs, founder bio
- Non-supporting browsers and reduced-motion users get static, fully visible text
```

In **## Animation & Accessibility**, replace the TypewriterText line with:

```markdown
- Typewriter is a vanilla module (`src/scripts/typewriter.js`) driven by `[data-typewriter]` (`data-tw-speed`, `data-tw-delay`); triggers on scroll-into-view, ~4s to complete; SSR text stays visible without JS
```

- [ ] **Step 4: Full visual regression sweep**

```bash
bash scripts/capture-baselines.sh
```

Then compare all 30 images in `screenshots/baselines/` against `screenshots/pre-migration/` (Read each pair side by side; the marquee's horizontal offset in `credentials-*` is expected to differ). Any other visible difference = fix before commit.

- [ ] **Step 5: Final verification + payload report**

```bash
npm run verify
grep -o '<astro-island' dist/index.html | wc -l
du -h dist/_astro/*.js | sort -rh
```

Expected: all checks PASS; island count = 3; no `FocusText.*`/`TypewriterText.*`/`Credentials.*` chunks. React/Framer chunks still exist (Services/PartnerOutcomes/CookieConsent) but nothing above the fold references them. Record before/after numbers in the commit message.

- [ ] **Step 6: Commit**

```bash
git add scripts/verify-dist.mjs CLAUDE.md
git commit -m "chore(dereact): island ceiling guardrail, remove dead AnimatedArrow, update docs

Islands: 14 -> 3 (Services, PartnerOutcomes, CookieConsent).
Above-the-fold JS: 0. React/Framer now lazy-load below the fold only."
```

---

## Out of scope (Phase B — separate plan if pursued)

De-Reacting `Services.jsx` (expand/collapse), `PartnerOutcomes.jsx` (drag carousel), `CookieConsent.jsx` (consent UI) — would remove `react-dom` (58 KB gz) + `framer-motion` (40 KB gz) entirely. Different risk class: interaction rewrites, not visual ports. Decide after Phase A ships and real-user metrics (Clarity/GA4) confirm no regressions.
