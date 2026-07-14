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
- Contact CTA links to TidyCal booking (`tidycal.com/sullivan-street-projects/growth-consultation`)

## Analytics & Observability

- Stack: GA4 + Microsoft Clarity + Google Search Console + Bing Webmaster (consent-gated; see `src/utils/analytics.js`). PostHog deferred; GTM intentionally not used.
- Manageable through Claude Code: GA4 reports via the `analytics-mcp` MCP; Clarity heatmaps/session recordings via the `clarity` MCP; site verification + DNS via the Hostinger DNS MCP; deploys watched via the Hostinger hosting MCP.
- Verification tokens live in `src/layouts/BaseLayout.astro` (`SITE_VERIFICATION`) and/or DNS TXT records.
- Adding a new tag = edit `BaseLayout` + add its host to the CSP in `public/.htaccess`. No GTM indirection.

## Deployment (Hostinger)

- Deploy = `npm run build`, zip the **contents** of `dist/` (must include `.htaccess` — use `zip -rq out.zip .` from inside dist/), then `hosting_deployStaticWebsite` (Hostinger MCP) with domain `sullivanstreetprojects.com`. Always live-verify after (routes, headers, key content markers).
- Server is **LiteSpeed**, not Apache: `Header setifempty` is unsupported (it emits a literal `setifempty:` response header). Use rule ordering instead — last matching `Header set` wins.
- Hostinger's WAF 403s spoofed crawler user-agents from non-crawler IPs (anti-spoofing) — you cannot test real crawler access with `curl -A Googlebot`. Verify via an independent-infrastructure fetch or Search Console.

## Commands

- `npm run dev` — Astro dev server on :5173
- `npm run build` — production build (static HTML, the AEO surface)
- `npm run verify` — build + assert marketing copy exists in dist HTML
- `npm run screenshot` — alias for `node scripts/screenshot.js`
