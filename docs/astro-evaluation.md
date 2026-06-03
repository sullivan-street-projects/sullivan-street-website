# Astro Evaluation — Should SSP Migrate?

**Date:** 2026-05-18
**Status:** Read-only assessment. No code changes.
**Audience:** Brett (decision-maker).

---

## TL;DR — Verdict First

**Don't migrate to Astro right now.** Your existing Vite + React + Puppeteer prerender stack already solves the only problem Astro was uniquely going to fix for you (AIEO / crawler-visible HTML). The other gains Astro offers — per-route JS budgets, content collections, file-system routing — are real but don't justify rewriting a shipped marketing site whose remaining work is content-and-polish, not framework problems.

**Migrate to Astro later** if and when you start adding routes (blog, case studies, resources, knowledge base). At that point the file-system routing + Content Collections + per-page JS shedding compound, and the migration math flips. For a single-page marketing site with two static legal routes, the framework switch is high-effort low-leverage.

**Do this instead, in priority order:**
1. **Flip the deploy switch** to run `npm run build:prerender` instead of `npm run build`. Your prerender script is built but not wired in (the current `dist/index.html` still has empty `<div id="root"></div>`). This is the highest-leverage 1-hour task in your roadmap.
2. **Re-validate AIEO** against the prerendered output (Perplexity + Claude readers).
3. **Park Astro as a future option** with this doc as the reference. Revisit when the site adds a content layer (blog, articles, case studies).

The rest of this doc is the evidence behind that verdict — read on if you want to understand the trade-off in detail or push back on the recommendation.

---

## 1. What Astro Actually Is (Mental Model)

Astro is a **multi-page application (MPA) framework** that produces static HTML by default and lets you opt-in to JavaScript-driven interactivity per component, not per page.

Three concepts to internalize:

- **`.astro` files** are server components. They run only at build time. They produce HTML. They can import and render React/Vue/Svelte/Solid components, but those components also render to HTML by default — no JS shipped.
- **Client directives** (`client:load`, `client:idle`, `client:visible`, `client:media`, `client:only`) opt a single component into client-side hydration. The component's JavaScript ships only for that one island. Everything else stays pure HTML.
- **File-system routing.** A file at `src/pages/about.astro` becomes the route `/about`. No router library. No JS-driven navigation between pages. Each route is a separate HTML file at build time.

**The contrast with your current setup:**

| Concept | Your current SPA | Astro MPA |
|---|---|---|
| What ships to first-time visitor | Full React + ReactDOM + Framer Motion + Lenis + Router runtime + all your components, regardless of which section they'll see | Just the HTML for the current route, plus JS for whichever islands hydrate |
| Crawler view | Empty `<div id="root">` (until prerender script runs) | Real HTML, by default, no scripting required |
| Navigation between routes | Client-side, React Router intercepts `<Link>` | Full page load, hits a new `.html` file (or use View Transitions for a smooth feel) |
| State between routes | Persistent — React tree stays mounted | Reset — each page is its own document |
| Mental shift | "App that happens to be a website" | "Website with app-like interactions where needed" |

**Key honesty point:** Astro is *not* magic for animations or interactivity. If you use Framer Motion in an island, you still ship Framer Motion's runtime to that island. Astro saves you bytes only on pages or components that genuinely don't need JS. For your site, that's most of it — but not all.

---

## 2. Your Current Architecture, Named

You don't have a generic React SPA. You have a *very specific* setup, and the migration math depends on knowing exactly what's there.

**Dependencies (from `package.json`):**

```
react 18 + react-dom 18
react-router-dom v7
framer-motion v12
lenis v1.3 (Lenis smooth scroll)
tailwindcss v4 + @tailwindcss/vite
vite 5
puppeteer 24 (devDep — used by prerender script + screenshot script)
```

**Routes (from `react-router-dom`):**
- `/` — single page with 9 sections
- `/privacy-policy` — full legal page
- `/terms-and-conditions` — full legal page
- `#playground` — hash route, lazy-loaded design playground

**Sections (`src/sections/`):**
- Hero, Credentials, Intro, Statement, Approach, Services, PartnerOutcomes, About, Contact (9 total)

**Shared components (`src/components/`):**
- CTAButton, AnimatedArrow, CredentialsChart, CookieConsent — pure-presentational, easy
- Section, Header, Footer, LegalPage, Navigation — layout
- FocusText, TypewriterText — animation primitives (Framer Motion)
- SmoothScroll — Lenis wrapper using React Context
- GrainOverlay — pure CSS overlay
- ErrorBoundary — React error boundary
- svg/ — inline SVG components

**Build scripts:**
- `dev` — `vite`
- `build` — `vite build`
- **`build:prerender`** — `vite build && node scripts/prerender.js` ← *the AIEO fix, already implemented but evidently not the active production build command*
- `prerender` — `node scripts/prerender.js`
- `screenshot` — `node scripts/screenshot.js`

**Current AIEO status (verified 2026-05-18):**
- `dist/index.html` is **still 7.8 KB with empty `<div id="root"></div>`** — meaning the most recent deploy used `vite build`, not `build:prerender`. The fix exists; it isn't wired in.

---

## 3. Three Paths Compared

| Criterion | Path A: Status Quo + Wire-in Prerender | Path B: Migrate to Astro | Path C: Do Nothing |
|---|---|---|---|
| **AIEO (crawler HTML)** | ✅ Solved — prerender script already exists, just flip the build script | ✅ Solved by default | ❌ Broken (current state) |
| **Estimated effort** | **~1 hour** (change deploy command, verify, redeploy) | **40–80 hours** (port 9 sections + 2 legal pages + playground + ship/QA) | 0 hours |
| **Risk to existing site** | Very low — prerender output already tested in script | Medium-high — full framework swap, regressions possible across animations/scroll/router | None |
| **First-paint JS bundle** | Same as today (~React + Framer + Lenis loaded everywhere) | Smaller for static-heavy sections; same for animated sections | Same as today |
| **Legal pages JS** | Loads full React app then routes to `<LegalPage>` | Pure HTML — zero JS unless you opt in | Same as today |
| **Future blog/case-study scaling** | Would need to add a content layer manually | Built-in Content Collections + glob loader + Zod schemas + auto-routing | Same as today |
| **`CONTENT.md` ↔ `llms.txt` ↔ JSX sync problem** | Hand-sync continues (your current pain) | Could become a single content collection → all three outputs derived | Hand-sync continues |
| **Playground (5k lines)** | Already lazy-loaded; could become its own route | Becomes its own page, fully excluded from main bundle by definition | Same as today |
| **Animation stack** | Unchanged | Framer Motion still works inside React islands; Lenis becomes one big `client:load` wrapper | Unchanged |
| **Smooth scroll across "pages"** | Already works — it's all one page | Loses by default (each route is a new document) unless you use View Transitions API + a router-aware Lenis wrapper | N/A |
| **Build tooling familiarity** | Vite (already known) | Astro (new, but Vite-powered under the hood) | Vite |
| **Talent / handoff** | React-everywhere — easy for any React dev | Requires picking up `.astro` syntax (small learning curve, ~half day) | Easy |

**Reading this table the right way:** Path B's costs are real and front-loaded. Its benefits compound only if you add more content over time. Path A's benefits are immediate and require almost no new code. Path C is a non-starter — leaves AIEO broken — but worth listing to make the comparison honest.

---

## 4. Per-Component / Per-Dependency Impact (If You Migrated)

This is the granular cost view. It's also the truthful answer to "is this hard?"

### 4.1 Sections (Hero, Credentials, Intro, Statement, Approach, Services, PartnerOutcomes, About, Contact)

**Two valid porting strategies:**

**Strategy 1 — Each section as a React island.**
```astro
---
import Hero from '../components/sections/Hero.jsx';
---
<Hero client:visible />
```
- Pro: Minimal porting effort. JSX moves over almost as-is.
- Con: Defeats Astro's main benefit. You ship the same React + Framer JS, just split per island. Marginal savings.

**Strategy 2 — Each section as a `.astro` component, with animations as isolated islands.**
```astro
---
// Hero.astro
import FocusText from '../components/FocusText.jsx';
---
<section class="hero">
  <h1 class="...">Static heading</h1>
  <FocusText client:visible>
    <p>Scroll-revealed paragraph</p>
  </FocusText>
</section>
```
- Pro: Maximum JS savings. Static sections ship zero JS.
- Con: Significantly more porting. JSX has to be re-expressed in `.astro` template syntax (similar, not identical). The mental model is also different — `.astro` props are server-only.

**Honest assessment:** Strategy 2 is the *correct* migration but requires touching every section. Strategy 1 is "lift and shift" and gets you most of the AIEO/SEO benefit with less work, but is also why some Astro migrations end up shipping just as much JS as before — the islands quietly grew until they cover the page.

**Estimated effort:** 20–30 hours for Strategy 2 across 9 sections (most of the time is design verification, not coding).

### 4.2 FocusText, TypewriterText (animation primitives)

**Direct fit for Astro's island model.** Both are self-contained Framer Motion components that already gate on scroll position. Wrapped as `client:visible`, they hydrate only when needed, which is *better* than today.

**Effort:** ~0 hours of code change. Just import and add the directive.

### 4.3 SmoothScroll (Lenis wrapper)

**This is the hardest single piece.** Lenis is a global concern — it intercepts every scroll event on `window`. You can't make it "an island."

**Options:**

1. **Wrap the entire layout as one big `client:load` React island.** Works but: defeats Astro's per-island story for everything inside, and forces every page to load Lenis + React.
2. **Drop Lenis entirely.** Use native scroll. Lose the smoothness on most browsers but gain meaningful JS savings.
3. **Add Lenis in a tiny inline `<script>` tag** in the layout, not through React Context. This is the cleanest Astro-native solution but requires rewriting SmoothScroll to not use Context, which then forces FocusText to not depend on `useLenis()` (it doesn't currently — checked).
4. **Astro View Transitions API** — for the legal pages, this can simulate SPA feel without React Router. Doesn't solve Lenis.

**Recommended pattern (if you migrated):** Option 3 — Lenis as a vanilla JS module, initialized in a `<script>` in the root layout. Adds ~12 KB of JS to every page but matches Astro's philosophy.

**Effort:** 3–5 hours (rewrite + verify smoothness matches current feel).

### 4.4 Framer Motion

**Works inside React islands, ships its bundle once per page that uses it.** No magic savings — but on legal pages (which have no animations) it disappears entirely. That's the win.

**Effort:** 0 code changes. Just shipping discipline.

### 4.5 Tailwind v4 + `@theme` block

**Direct port.** Astro 5.2+ uses the same `@tailwindcss/vite` plugin you're already using. Run `npx astro add tailwind`. Move your `index.css` to `src/styles/global.css`. Import it from the root layout. Tokens, fonts, colors — all unchanged.

**Effort:** ~30 minutes.

### 4.6 React Router → File-System Routing

**Legal pages become trivial:** `src/pages/privacy-policy.astro` + `src/pages/terms-and-conditions.astro`. The `<Link>` components become plain `<a>` tags.

**Footer + Nav link updates required.** Search/replace for `<Link to=`.

**Trade-off:** You lose persistent-state-across-navigation (the React tree resets between pages). For your site, this doesn't matter — there's no cross-route state.

**Effort:** ~2 hours.

### 4.7 DesignPlayground (~5,000 lines)

**Becomes `src/pages/playground.astro` (or stays as a hash route inside the home page).** Either way, it's no longer in the main bundle by definition — Astro only compiles pages you visit, and unvisited pages don't affect each other.

**This is genuinely better than today's setup**, where the playground is lazy-loaded but still bundled.

**Effort:** Whatever the porting strategy for the sections is (same components inside).

### 4.8 Prerender script

**Becomes redundant.** Astro is static-by-default. Delete the script after migration.

### 4.9 Screenshot script (`scripts/screenshot.js`)

**Works unchanged.** It just points Puppeteer at a URL. Astro serves the same dev server URLs.

### 4.10 CookieConsent, ErrorBoundary, GrainOverlay

**CookieConsent** → React island with `client:load`.
**ErrorBoundary** → Astro doesn't need React error boundaries at the framework level (since there's no React tree at the page level). Per-island error boundaries become a per-island concern, which is *less work*, not more.
**GrainOverlay** → Pure CSS. Drop into the root layout. Zero JS.

---

## 5. Where Astro Would Genuinely Help You

Listing these honestly so the verdict isn't "Astro bad." Astro is good. It's just not aligned with your current needs.

1. **Legal pages would be pure HTML.** Today they're full React routes. Astro would make `/privacy-policy` and `/terms-and-conditions` ship zero JS. Real performance win for those routes.
2. **Per-page JS budget control.** You'd know exactly what JS each route ships. Today you have one bundle for everything.
3. **Content Collections would solve `CONTENT.md` sync pain.** Today: `CONTENT.md` → manually copied into JSX → manually mirrored in `public/llms.txt`. With Content Collections: one schema-validated source, JSX renders from it, `llms.txt` generated from it via an Astro endpoint.
4. **Adding routes is trivial.** A future case-studies section is just `src/pages/case-studies/[slug].astro` + a content collection. Today it would require new React Router routes + new bundle splits.
5. **AIEO is solved at the architecture level**, not bolted on with a Puppeteer script. Less to maintain.
6. **View Transitions API gives you SPA-like navigation feel for free** between legal pages and home, without router/runtime cost.

**The honest pattern:** all six of these gains scale with *content surface area*. You currently have low content surface area. The math doesn't favor migration today.

---

## 6. Where Astro Would Quietly Hurt You

1. **Lenis becomes awkward.** Either it spans pages (one big island, defeating Astro's model) or it doesn't (and navigation feels different between routes).
2. **The animation-heavy hero/sections still ship Framer Motion.** You don't get "zero JS" on the home page no matter how clean the migration is.
3. **Stateful UI patterns are harder.** Cookie consent, scroll position memory, anything that should persist across navigation — needs explicit handling.
4. **Mental model shift.** Your team / collaborators have to internalize "this is multi-page, not single-page" — which affects every architectural conversation going forward.
5. **The migration risk is higher than the eventual maintenance benefit** if you stay at the current content scale.

---

## 7. Decision Framework — When Astro Wins, When It Doesn't

**Astro wins for SSP if any of these become true:**
- You start a content-heavy section: blog, case studies, articles, resources, knowledge base, glossary
- You want to ship a separate funnel or landing page that doesn't share the main site's JS
- The `CONTENT.md` → JSX → `llms.txt` hand-sync becomes painful enough to demand a real content layer
- You hire a designer/dev who doesn't know React but knows HTML/CSS — `.astro` is much closer to plain HTML than JSX
- Lenis stops being a hard requirement

**Astro doesn't win for SSP today because:**
- Site is one page + two legal pages — minimum content surface area
- Animation stack (Framer + Lenis) doesn't benefit from Astro's per-island JS model
- The prerender script already exists and addresses AIEO with ~1 hour of remaining work
- Refactoring effort (Plan in memory, Phases 0–4) is mostly orthogonal to framework choice — Tailwind tokens, component extraction, accessibility — those happen in any framework
- Migration time = time not spent on conversion, content, or growth work

---

## 8. The Smallest Spike (If You Still Want To Try It)

If you want to *feel* Astro before deciding, do this — not a full migration, just enough to form an opinion:

1. **Scaffold a sibling Astro project** (in a separate directory, not in this repo):
   ```
   npm create astro@latest ../ssp-astro-spike -- --template minimal --typescript strict --install --git --yes
   ```
2. **Run `npx astro add tailwind`** to wire Tailwind v4 with the same plugin you already use.
3. **Copy your `src/index.css` to `src/styles/global.css`** and import it from `src/layouts/Layout.astro`.
4. **Port one section — recommend Credentials** because it has no scroll animations and reveals the static-HTML story most clearly. Copy `Credentials.jsx` into `src/components/` and use it as `<Credentials client:visible />` from `src/pages/index.astro`.
5. **View source on the resulting page.** Compare to viewing source on `localhost:5173` of your current site. The difference is the entire pitch.

**Time investment:** ~2 hours. **Throwaway when done.**

This is the cheapest way to validate the mental model before committing to a real migration timeline.

---

## 9. Recommendation, In One Paragraph

Your prerender script is the right intervention for your current shape — it's already written and just needs to be promoted to the production build command. Doing that this week eliminates the AIEO problem at almost zero cost and zero risk. Astro is a credible long-term path but only earns its migration cost when you start adding content surface (blog, case studies, additional landing pages). Bookmark Astro. Wire in the prerender. Re-evaluate when content grows.

---

## 10. Open Questions to Revisit

These are good prompts to bring back into a planning session, not blockers:

- Is the deploy currently running `npm run build` or `npm run build:prerender`? (The current `dist/index.html` suggests the former — confirm with the host.)
- Has anyone validated that Perplexity and Claude can read the prerendered output? (Listed in your memory as the original problem; the script exists but the validation step doesn't appear to have happened.)
- Are blog, case studies, or articles on the roadmap in the next 6 months? If yes, Astro re-enters the conversation sooner.
- Would a separate marketing micro-site (e.g., a campaign landing page) be Astro's first foothold, leaving the main site on Vite+React? That's a real option worth considering before a full migration.

---

*This doc captures the state of evaluation as of 2026-05-18. Conditions that would invalidate the recommendation: significant content growth, sustained pain with `CONTENT.md` sync, animation stack changes (dropping Lenis), or team composition changes.*
