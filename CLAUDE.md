# Sullivan Street Projects — Website

## Project Overview

Single-page marketing site for a growth marketing consultancy. Astro 6 (static MPA) + React islands + Tailwind CSS v4 + Framer Motion + Lenis smooth scroll.

## Architecture

- **Sections:** Hero > Credentials > Statement > Intro > Approach > Services > PartnerOutcomes > About > Contact > Footer
- **Constants:** All structured data in `src/constants/index.js`, typography classes in `src/constants/typography.js`
- **Content:** `src/CONTENT.md` is the single source of truth for all copy. After editing, update the corresponding JSX in `src/sections/`. Also check if `public/llms.txt` needs syncing. The founder bio also lives in `FOUNDER` (`src/constants/index.js`), which feeds the JSON-LD Person node and the llms.txt Founder block — a bio edit in CONTENT.md is a two-place edit (About.astro + FOUNDER), and verify-dist asserts the entity graph, not the wording. Google appears as an employer in the About bio and as a media client in the FOUNDER/llms.txt sentence — both are true (Brett, 2026-09-06); do not "fix" one to match the other.
- **No apostrophes in copy that Astro interpolates.** Strings rendered through `{...}` from `src/constants/index.js` (`VALUE_PROPS`, `CAPABILITIES`, …) get escaped to `&#39;`, which fails verify-dist's `no HTML-entity apostrophes` check. This is why those strings contain no contractions — rephrase around them rather than reaching for a curly `’`. Literal text typed directly into an `.astro` template is fine; React islands escape as `&#x27;` and slip past the check, so the trap is Astro-rendered constants only. Copy assertions in `scripts/verify-dist.mjs` anchor on exact phrases — rewriting a section means repointing its check.
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
- Contact CTA links to the branded booking URL `call.sullivanstreetprojects.com/growth-consultation` (switched 2026-07-30). **Always include the `/growth-consultation` slug.** The BARE branded domain is a dead end: the booking type is `private: true` and the other three types are disabled, so the directory renders "No booking types currently available" — GA4 recorded 9 users hitting that wall over 90 days with zero reaching a booking type. The `/sullivan-street-projects/growth-consultation` vanity path 404s on the branded host; only the bare slug works.
- **Booking-link changes are a five-file move**, not a one-liner: `Contact.astro` (href), `analytics.js` (`BOOKING_LINK_SELECTOR` — matches BOTH hosts, since legacy `tidycal.com` links live on in decks and signatures; miss this and `book_call_click` silently stops firing), `verify-dist.mjs` (copy assertion), `public/.htaccess` (the rescue 301), and this file.
- **`/contact` is a rescue 301 to `/#contact`** (`public/.htaccess`, added 2026-09-06 after a real visitor 404ed). It has no file-existence guard, so it shadows any future real `/contact` route — delete the rule (and its verify-dist check) if one ever ships. Query strings on `/contact?…` end up after the `#` and are invisible to GA; deck links point at `/`, never `/contact`.
- **Deck and outbound links carry UTMs.** Gamma decks are the highest-intent referral traffic (444s average visit, audit 2026-09-06) and arrived untagged. Every site link placed in a deck, email signature or LinkedIn post uses `?utm_source=<gamma|email|linkedin>&utm_medium=<deck|signature|post>&utm_campaign=<slug>` where `<slug>` is kebab-case `<prospect-or-purpose>-<yyyy-mm>` (e.g. `acme-intro-2026-09`). Read them back with `node scripts/ga.mjs sources 30`. The booking link itself is NOT tagged — TidyCal is cross-domain-linked, so the session source survives the hop.

## Analytics & Observability

- Stack: GA4 + Microsoft Clarity + Google Search Console + Bing Webmaster (consent-gated; see `src/utils/analytics.js`). PostHog deferred; GTM intentionally not used.
- **Two Google service accounts, two jobs (2026-09-06):** `gsc-agent@claude-workspace-mcp-483716.iam.gserviceaccount.com` is what the repo scripts use (Full on Search Console, Editor on GA4); `ga4-mcp-reader@ssp-growth-os-prod.iam.gserviceaccount.com` is the identity behind the local `analytics-mcp` connector (key at `~/.config/gcloud/ga4-mcp-reader-key.json`, per `~/.claude.json`), granted on BOTH the SSP and Cloud Club GA4 properties — so the connector now serves either business. The `clarity` MCP connector remains Cloud Club-only (one token per project); SSP Clarity is `scripts/clarity.mjs`.
- **GA4's data-stream page shows "Data collection isn't active / No data received" — a known false alarm.** Google's tag-health crawler looks for the literal gtag snippet in the HTML; this site injects the tag after the consent check, so the crawler never sees it while every real browser fires it (realtime confirmed 2026-09-06). Never paste the snippet in: it would bypass consent and double-count.
- **GA4 property settings as of 2026-09-06:** event retention 14 months; custom dimension `cta_location` (event scope); unwanted referral `localhost`; key events `book_call_click`, `select_time` (the `purchase` key event is Google-owned and cannot be removed — ignore it).
- **(superseded)** ~~Both MCP connectors are Cloud Club, not SSP~~ — the GA4 connector was granted on SSP 2026-09-06; the sentence below about scripts and `--account` still holds.
- **Both MCP connectors are Cloud Club, not SSP** (`analytics-mcp` and `clarity` resolve to the Cloud Club account/project; confirmed 2026-09-06). SSP numbers come from the scripts below. All five accept `--account <name>` (default `ssp`, env `SSP_ACCOUNT`), which selects `~/.secrets/<name>-<tool>` and per-account hints in `~/.secrets/accounts.json` (see `scripts/lib/account.mjs`). `npm run tools:link` symlinks `~/.claude/tools` → this repo's `scripts/`, so any project can run `node ~/.claude/tools/ga.mjs --account cloudclub report 30`. This repo stays the single source of truth; `npm test` covers the resolver.
- Site verification + DNS via the Hostinger DNS MCP; deploys watched via the Hostinger hosting MCP.
- Verification tokens live in `src/layouts/BaseLayout.astro` (`SITE_VERIFICATION`) and/or DNS TXT records.
- Adding a new tag = edit `BaseLayout` + add its host to the CSP in `public/.htaccess`. No GTM indirection.

## Deployment (Hostinger)

- Deploy = `npm run build` (regenerates `llms.txt` from constants), zip the **contents** of `dist/` (must include `.htaccess` — use `zip -rq out.zip .` from inside dist/), then `hosting_deployStaticWebsite` (Hostinger MCP) with domain `sullivanstreetprojects.com`. Always live-verify after (routes, headers, key content markers), then `node scripts/indexnow.mjs` to ping Bing/Copilot.
- Search Console: `node scripts/gsc.mjs` (sites / perf [days] [--by query|page|date] [--limit N, default 100] / inspect / sitemaps / sitemap-submit / sitemap-delete) — service-account key at `~/.secrets/ssp-gsc-sa.json`, never in the repo.
- Bing Webmaster: `node scripts/bing.mjs` (sites/perf/queries/sitemaps/sitemap-submit/quota) — API key at `~/.secrets/ssp-bing-key.txt`. Bing's AI Performance report (Copilot citations) is UI-only.
- GA4: `node scripts/ga.mjs` (properties/report/pages/sources/events/clicks/admin/realtime) — same service-account key as gsc.mjs. `admin` prints key events, custom dimensions and retention (must read `FOURTEEN_MONTHS`).
- Clarity (SSP): `node scripts/clarity.mjs insights [1-3] [dimension]` — token at `~/.secrets/ssp-clarity-token.txt`, **hard limit 10 API calls/day**. The `clarity` MCP connector is the Cloud Club project, NOT this site.
- TidyCal: `node scripts/tidycal.mjs` (summary/bookings/types) — token at `~/.secrets/ssp-tidycal-token.txt`. Source of truth for ACTUAL bookings; GA4 only carries TidyCal's funnel events (fired from tidycal.com + call.sullivanstreetprojects.com via its GA integration). `book_call_click` + `select_time` are GA4 Key Events.
- Server is **LiteSpeed**, not Apache: `Header setifempty` is unsupported (it emits a literal `setifempty:` response header). Use rule ordering instead — last matching `Header set` wins.
- Hostinger's WAF 403s spoofed crawler user-agents from non-crawler IPs (anti-spoofing) — you cannot test real crawler access with `curl -A Googlebot`. Verify via an independent-infrastructure fetch or Search Console.
- **`hosting_deployStaticWebsite` can return HTTP 500 on a deploy that actually succeeded.** Never blind-retry — a retry over a partial deploy is how you get a half-updated site. Verify against the live site first: read the `<link rel="stylesheet">` out of the served HTML and diff that hash against `dist/index.html`. Don't grep for a remembered asset filename — content hashes move for unrelated reasons (adding a `Footer` import to 404.astro renamed the whole CSS bundle). The 500 can also mean the opposite: a genuinely failed extraction that guts the docroot (homepage 403, files 404 — seen 2026-07-28). Same rule either way: probe the live site first; if it's verifiably partial/down, redeploying the complete archive is the restore, not a blind retry.
- **HSTS carries `preload` (since 2026-09-06)** with `includeSubDomains`: every future SSP subdomain must serve valid HTTPS from the moment its DNS is published — a vendor CNAME whose certificate is still provisioning hard-fails in Chrome instead of warning. Submission at hstspreload.org is a separate, effectively irreversible owner action; do not submit without Brett.

## Commands

- `npm run dev` — Astro dev server on :5173
- `npm run build` — production build (static HTML, the AEO surface)
- `npm run verify` — build + assert marketing copy exists in dist HTML
- `npm run screenshot` — alias for `node scripts/screenshot.js`
