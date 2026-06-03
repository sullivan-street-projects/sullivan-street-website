# CEV Evaluator Memory

## Past Decisions

### 2026-06-01 — Analysis: JSON-LD for The Brief Tools Directory (ssp-blog repo)
- See [decision_2026-06-01_tools_jsonld.md](decision_2026-06-01_tools_jsonld.md) — 6 recs, 5 Aligned / 1 Deferred / 0 Rejected. Honesty-as-schema (rating only on sspPick, no aggregateRating), fixes a real JSON.stringify→set:html escaping bug, dependency-averse. Sequencing tension: all aligned but renders to nobody until Phase 1 launch blocker (Loops URL + hosting) clears.

### 2026-03-05 — Analysis: FocusText Bug Fix Recommendations (4 items)
- **Depth:** Analysis
- **Evaluated:** 4 recommendations from FocusText scroll-reveal glitch root cause investigation
- **Results:** 3 Aligned, 1 Tension (deferred), 0 Rejected
- **Aligned:** (1) Remove CSS scroll-behavior:smooth — Lenis conflict, (2) Switch 3-point to 2-point offset — exit blur contradicts stated spec, (3) Move useTransform out of JSX — Rules of Hooks violation
- **Tension:** Switch useScroll to whileInView — restraint vs. signature-element investment (echoes prior micro-interaction tension)
- **Key evidence:** Lenis owns scrolling (4 components use useLenis); exit blur (40px+fade) contradicts CLAUDE.md spec "opacity 0.4→1, blur 3.5→0"; useTransform in style prop is hooks violation; reduced-motion query already overrides scroll-behavior to auto (awareness signal)
- **Override:** None (pending user response)

### 2026-03-05 — Analysis: Deep Research Recommendations (8 items)
- **Depth:** Analysis
- **Evaluated:** 8 recommendations from deep research into agentic web dev best practices
- **Results:** 2 Aligned, 1 Tension, 4 Deferred, 1 Rejected
- **Aligned:** (1) Ship Approach horizontal scroll section, (2) Fix remaining refactoring plan items
- **Tension:** Signature micro-interaction — restraint vs. aspiration values conflict
- **Deferred:** Grain opacity refinement, motion typography, horizontal rule vocabulary, variable font weight axis
- **Rejected:** Dark mode — charcoal-on-paper IS the brand identity, not a default theme to be inverted
- **Key evidence:** Owner has 22 Approach playground variants (heavy prototyping investment); digital-instrument-elevation plan was heavily pruned in practice (behavioral restraint pattern); skip-to-content link already exists in App.jsx
- **Override:** None (pending user response)

### 2026-03-23 — Analysis: AI Summary Links & SPA Prerendering (5 items)
- **Depth:** Analysis
- **Evaluated:** 5 recommendations from AI Summary footer links implementation and SPA rendering gap discovery
- **Results:** 3 Aligned, 0 Tensions, 4 Deferred, 1 Rejected
- **Aligned:** (1) AI Summary links in footer — connects to existing AIEO investment (robots.txt, llms.txt, JSON-LD); (2) Neutral query text — editorial voice, let architecture sell; (3) DIY Puppeteer prerender script — fixes critical gap where AI crawlers see empty `<div id="root"></div>`, uses existing Puppeteer devDep and screenshot.js patterns, no new dependencies
- **Deferred:** llms.txt sync automation (trigger: next CONTENT.md edit), AI link click tracking (trigger: business question about platform usage), structured data expansion (trigger: after prerender is live), sitemap.xml lastmod automation (trigger: build pipeline formalization)
- **Rejected:** Full SSR/SSG framework migration (Next.js/Astro) — anti-sprawl, iterative refinement values both argue against; Puppeteer script solves the actual problem without architectural migration
- **Key evidence:** robots.txt:4 explicitly allows AI crawlers for "AIEO/GEO visibility"; index.html:98 serves empty div to non-JS crawlers; Puppeteer already in devDependencies; llms.txt and JSON-LD schema already exist but are architecturally undermined by SPA rendering; anti-sprawl value aligns with DIY script over framework migration
- **Critical finding:** Owner has built deliberate multi-layer AIEO stack (robots.txt + llms.txt + JSON-LD + AI Summary links) but SPA architecture means non-Google crawlers receive no content. Prerender script is the structural fix.
- **Override:** Pending

### 2026-03-20 — Analysis: Code Review Audit Recommendations (24 items)
- **Depth:** Analysis
- **Evaluated:** 24 recommendations from 4-agent code review audit (5 Critical, 10 Important, 7 Cleanup)
- **Results:** 15 Aligned, 1 Tension (ErrorBoundary: console.error aligned, Sentry deferred), 4 Deferred, 2 Rejected
- **Aligned Critical:** (C1) Nav broken for reduced-motion — lenis null when prefersReducedMotion, all CTAs no-op; (C3) Analytics privacy default backwards — localStorage catch returns false, tracks without consent; (C4) Z-index collision Nav+CookieConsent both z-[100]; (C5) CookieConsent imports Framer's useReducedMotion (returns null) instead of project hook
- **Aligned Important:** (I1) SmoothScroll missing prefersReducedMotion dep; (I2) useIsMobile initializes false (flash on mobile); (I3) useReducedMotion no SSR guard; (I5) PartnerOutcomes timer desync on dot click; (I6) Empty catch blocks in CookieConsent; (I8) initAnalytics can white-screen app; (I9) CTAButton underline outside clickable Tag
- **Aligned Cleanup:** (L1) Duplicate BRANDS array; (L4) FocusText noBlur dead prop; (L6) Section.jsx redundant wrapper div; (L7) Marquee @keyframes in inline style
- **Tension:** (C2) ErrorBoundary — console.error fix aligned, Sentry deferred (anti-sprawl vs production-readiness)
- **Deferred:** (I4) TypewriterText threshold — trigger: observed reset during scroll; (I7) Lenis constructor try-catch — trigger: actual throw in any environment; (I10) Founder image fallback — trigger: image served from CDN; (L5) Unnecessary React imports — trigger: touching files for functional changes
- **Rejected:** (L2) SVG components in svg/ — playground prototyping assets, not production dead code; (L3) COMPARISON_DATA — source data for derived FEATURES constant, not unused
- **Key evidence:** CLAUDE.md mandates useReducedMotion in every animated component; SmoothScroll.jsx:14 skips Lenis when prefersReducedMotion but dep array is []; analytics.js:19 catch returns false (tracks by default); CookieConsent.jsx:2 imports from framer-motion not project hook; most recent commit is "production launch readiness"
- **Override:** Pending

### 2026-03-10 — Gate: Brand Reference File Alignment
- **Depth:** Gate
- **Evaluated:** Align BRAND_GUIDE.md, brand/index.html, and Pencil style guide (5 sub-items: fix font name, expand palette, add lockups, normalize grain to 5%, add Voice & Tone to HTML/Pencil)
- **Classification:** Go
- **Evidence:** BRAND_GUIDE.md lists "Inter" (swapped to Instrument Sans Mar 1); says grain 0.04 (production is 0.05); documents 5 of 10 colors and 3 of 4 lockups; Voice & Tone missing from HTML guide. Single-source-of-truth is a core value. Brand guide design doc (2026-03-06) explicitly aimed to "codify existing brand identity."
- **Override:** Pending

## Extracted Values (SSP Website)
- Editorial, typography-first: type IS the design
- Restrained animation: owner pattern is removing animation, not adding
- Anti-sprawl: justified complexity only (pruned GSAP, icon libs, FocusText wrappers)
- Prototype in playground, curate before shipping
- Charcoal-on-paper is brand identity, not a swappable theme
- Design tokens as single source of truth (no hardcoded hex)
- Behavioral: iterative refinement over big rewrites (elevation plan pruned heavily)
- Recurring tension: restraint vs. signature-element investment (surfaced in 2 analyses — micro-interactions and FocusText scroll-tracking). Owner values restraint broadly but has specific elements worth the complexity.
- Accessibility as enforced value: custom useReducedMotion hook, global CSS reduced-motion rule, CLAUDE.md mandate. Gap between stated intent and implementation is the primary audit finding.
- Privacy-first analytics: Consent Mode v2, cookie consent banner, opt-out persistence. Default-to-track on localStorage failure contradicts this intent.
- Production readiness push: most recent commit explicitly targets launch readiness (security headers, a11y, OG images). Audit findings are pre-launch quality gates.
- AIEO/GEO as deliberate strategy: robots.txt explicitly allows all AI crawlers, llms.txt maintained, JSON-LD schema covers org + services, AI Summary links added to footer. Owner is actively investing in AI discoverability as a growth channel. Critical gap: SPA renders empty HTML for non-Google crawlers.
