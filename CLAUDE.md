# Sullivan Street Projects — Website

## Project Overview

Single-page marketing site for a growth marketing consultancy. Astro 6 (static MPA) + React islands + Tailwind CSS v4 + Framer Motion + Lenis smooth scroll.

## Architecture

- **Sections:** Hero > Credentials > Statement > Intro > Approach > Services > PartnerOutcomes > About > Contact > Footer
- **Constants:** All structured data in `src/constants/index.js`, typography classes in `src/constants/typography.js`
- **Content:** `src/CONTENT.md` is the single source of truth for all copy. After editing, update the corresponding JSX in `src/sections/`. Also check if `public/llms.txt` needs syncing.
- **Design tokens:** All colors, fonts, type scale, spacing defined as Tailwind v4 `@theme` variables in `src/styles/global.css`. No hardcoded hex values in components.
- **Playground:** removed from the Astro site; preserved on git tag `pre-astro` (checkout the tag to run it).
- **Islands rule:** `.astro` imports always carry the `.astro` extension; extensionless imports resolve to `.jsx`. Static sections are `.astro`; Services/PartnerOutcomes are React islands (`client:visible`) and CookieConsent (`client:idle`) — the ONLY hydrated components (enforced by verify-dist's island ceiling). Lenis lives at `window.__lenis` (`src/scripts/smooth-scroll.js`).
- **Page chrome is composed per-page, not by the layout.** `BaseLayout` owns `<head>` only; every page assembles its own `Header` / `<main id="main">` / `Footer`. New routes must include all three — this is how the 404 shipped without any of them. Pass `noindex` to `BaseLayout` for non-indexable routes (emits `noindex, follow` and drops the canonical). verify-dist enforces chrome + landmarks on home, legal and 404.

## Bottom Rail (fixed bottom-docked UI)

Only ONE element may own the bottom edge. Anything docked there publishes the height it occupies as `--consent-bar-height` on `<html>`; consumers add `.bottom-rail` and lift by that amount (`src/styles/global.css`). Currently: CookieConsent produces, Navigation consumes.

- Lift is a `transform`, never a `bottom` override — that preserves the consumer's own `bottom-*` utilities as its resting position and no-JS fallback, and avoids a Tailwind cascade fight.
- Motion is **asymmetric and deliberate**: instant on open and while tracking (the height is republished as the preferences panel animates, so a transition would chase a moving target and lag behind the banner's real edge), eased only on close via `[data-rail-settling]`, which is set for that one discrete write. Do not "simplify" this into a blanket transition.
- The settle matches Lenis (0.8s expo-out) so the nav moves with the same signature as the page scroll. Duration/easing are `:root` tokens and the JS **reads** `--rail-settle-duration` rather than duplicating it.
- The producer is capped (`.consent-bar`, 14rem reserve — derivation in the CSS comment) and scrolls internally, so the consumer can always clear it. Internally-scrolling fixed UI **must** carry `data-lenis-prevent` or Lenis swallows the wheel/touch events.
- CSS fallbacks for the same property must live in `@supports` — Lightning CSS dedupes sibling declarations and drops the fallback (this bit the `100vh`/`100dvh` pair).

## Brand & Typography

- **Serif (Drama):** Libre Baskerville — headlines, statements, emotional content
- **Sans (Body):** Instrument Sans — body copy, UI, labels (swapped from Inter, Mar 2026)
- **Mono (Data):** JetBrains Mono — designed but not yet shipped to production
- **Colors:** Charcoal `#1a1a1a` on paper `#FAFAF8`. See `src/styles/global.css` @theme block for full palette.

## FocusText Rules

FocusText is a scroll-reveal effect (opacity 0.4→1, blur 3.5px→0, Y 8px→0), implemented as the `.focus-text` CSS class in `src/styles/global.css` using CSS scroll-driven animations (`animation-timeline: view()`). Apply as `class="focus-text -mx-1 px-1"`. No React island required. Usage conventions:

- Wrap content blocks, NOT individual paragraphs within a block
- Grid/list items each get their own `.focus-text` for staggered reveal
- Hero is above the fold — NO focus-text
- Each `.focus-text` element = one scroll-reveal unit
- Do NOT add to: section labels, brand name lists, footnotes, CTAs, founder bio
- Non-supporting browsers and reduced-motion users get static, fully visible text

## Animation & Accessibility

- Every animated component must call `useReducedMotion()` and skip animation when true
- Global CSS rule in `src/styles/global.css` disables all CSS animations for `prefers-reduced-motion`
- Typewriter is a vanilla module (`src/scripts/typewriter.js`) driven by `[data-typewriter]` (`data-tw-speed`, `data-tw-delay`); triggers on scroll-into-view, ~4s to complete; SSR text stays visible without JS
- FocusText renders at 40% opacity / 3.5px blur until scrolled into view

## Screenshot Verification

Use `node scripts/screenshot.js` for visual verification. Key flags:

- `--scroll-to "#section-id"` — scroll element to viewport center before capture (required for FocusText/TypewriterText sections)
- `--settle 4000` — wait for TypewriterText sections (Hero, Contact)
- `--settle 1500` — standard settle for FocusText sections
- `--full-page` — capture entire scrollable page
- Auto-starts Vite dev server if localhost URL and server isn't running

Baseline capture: `bash scripts/capture-baselines.sh` (9 sections x 3 viewports = 30 images)

## Decisions & Constraints

- No SVG animations in Intro section — removed intentionally to let text breathe
- Footer Privacy/Terms are live `<Link>` routes to full legal pages (`/privacy-policy`, `/terms-and-conditions`)
- Contact CTA links to TidyCal booking (`tidycal.com/sullivan-street-projects/growth-consultation`) — **deliberately NOT the branded `call.sullivanstreetprojects.com`**, which lands on the booking _directory_ (all types) instead of the specific consultation: worse UX. Do not "upgrade" the CTA to the branded domain.

## Analytics & Observability

- Stack: GA4 + Microsoft Clarity + Google Search Console + Bing Webmaster (consent-gated; see `src/utils/analytics.js`). PostHog deferred; GTM intentionally not used.
- Manageable through Claude Code: GA4 reports via the `analytics-mcp` MCP; Clarity heatmaps/session recordings via the `clarity` MCP; site verification + DNS via the Hostinger DNS MCP; deploys watched via the Hostinger hosting MCP.
- Verification tokens live in `src/layouts/BaseLayout.astro` (`SITE_VERIFICATION`) and/or DNS TXT records.
- Adding a new tag = edit `BaseLayout` + add its host to the CSP in `public/.htaccess`. No GTM indirection.

## Deployment (Hostinger)

- Deploy = `npm run build` (regenerates `llms.txt` from constants), zip the **contents** of `dist/` (must include `.htaccess` — use `zip -rq out.zip .` from inside dist/), then `hosting_deployStaticWebsite` (Hostinger MCP) with domain `sullivanstreetprojects.com`. Always live-verify after (routes, headers, key content markers), then `node scripts/indexnow.mjs` to ping Bing/Copilot.
- Search Console: `node scripts/gsc.mjs` (sites/perf/inspect/sitemaps/sitemap-submit) — service-account key at `~/.secrets/ssp-gsc-sa.json`, never in the repo.
- Bing Webmaster: `node scripts/bing.mjs` (sites/perf/queries/sitemaps/sitemap-submit/quota) — API key at `~/.secrets/ssp-bing-key.txt`. Bing's AI Performance report (Copilot citations) is UI-only.
- GA4: `node scripts/ga.mjs` (properties/report/pages/sources/realtime) — same service-account key as gsc.mjs.
- Clarity (SSP): `node scripts/clarity.mjs insights [1-3] [dimension]` — token at `~/.secrets/ssp-clarity-token.txt`, **hard limit 10 API calls/day**. The `clarity` MCP connector is the Cloud Club project, NOT this site.
- TidyCal: `node scripts/tidycal.mjs` (summary/bookings/types) — token at `~/.secrets/ssp-tidycal-token.txt`. Source of truth for ACTUAL bookings; GA4 only carries TidyCal's funnel events (fired from tidycal.com + call.sullivanstreetprojects.com via its GA integration). `book_call_click` + `select_time` are GA4 Key Events.
- Server is **LiteSpeed**, not Apache: `Header setifempty` is unsupported (it emits a literal `setifempty:` response header). Use rule ordering instead — last matching `Header set` wins.
- Hostinger's WAF 403s spoofed crawler user-agents from non-crawler IPs (anti-spoofing) — you cannot test real crawler access with `curl -A Googlebot`. Verify via an independent-infrastructure fetch or Search Console.
- **`hosting_deployStaticWebsite` can return HTTP 500 on a deploy that actually succeeded.** Never blind-retry — a retry over a partial deploy is how you get a half-updated site. Verify against the live site first: read the `<link rel="stylesheet">` out of the served HTML and diff that hash against `dist/index.html`. Don't grep for a remembered asset filename — content hashes move for unrelated reasons (adding a `Footer` import to 404.astro renamed the whole CSS bundle).

## Commands

- `npm run dev` — Astro dev server on :5173
- `npm run build` — production build (static HTML, the AEO surface)
- `npm run verify` — build + assert marketing copy exists in dist HTML
- `npm run screenshot` — alias for `node scripts/screenshot.js`
