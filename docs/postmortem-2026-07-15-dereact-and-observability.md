# Post-Mortem: De-React Phase A + Search/Analytics Observability Build

**Dates:** 2026-07-14 → 2026-07-15 (two sessions)
**Scope:** Site audit → de-React scroll animations (Phase A) → production hardening → autonomous search/analytics tooling
**Status at writing:** Everything shipped and live; one external timer pending (GSC ownership propagation), two Brett-side items open (SSP Clarity token; Phase B decision)

---

## TL;DR

A six-lens audit of the freshly-Astro-migrated site found one structural opportunity (React islands powering purely-visual animations) and a list of hygiene gaps. We rebuilt the animations in CSS/vanilla JS with pixel-parity gates (islands 14→3, above-the-fold JS→0), fixed three production bugs the audit's live sweep surfaced, then built headless tooling for Google Search Console, Bing Webmaster, GA4, and IndexNow. The tooling paid for itself within the hour: GA4 data exposed booking-intent clicks 404ing on a malformed link (now 301-rescued) and dev traffic polluting analytics (now guarded). A closing smoke test caught a data mis-attribution (Clarity MCP points at a different project) — corrected on the record.

## Metrics

| Metric                                        | Before                | After                            |
| --------------------------------------------- | --------------------- | -------------------------------- |
| Hydrated React islands (homepage)             | 14                    | 3 (all below fold)               |
| Above-the-fold JavaScript                     | React + Framer Motion | 0                                |
| Verify suite                                  | 33 checks             | 48 checks                        |
| Production bugs live                          | 4 unknown             | 0 known (all fixed + guarded)    |
| Search/analytics surfaces readable headlessly | 0                     | 3 of 4 (GSC pending propagation) |
| Deploys this window                           | —                     | 6, each live-verified            |

## Timeline (condensed)

1. **Audit** (6 lenses: perf, a11y, SEO/AEO, security, code health, observability) → ranked findings; #1 = replace animation islands with CSS scroll-driven animations.
2. **Plan** — 7-task implementation plan with success-criteria table, executed via subagent-driven development (fresh implementer + independent reviewer per task, Opus whole-branch review at the end). PR #8 → merged → deployed → live-verified.
3. **Hardening** — post-ship verification sweep found trailing-slash 500s, www non-redirect, invalid `setifempty` header; fixed same-day with `<main>` landmark, CSP additions, JSON-LD WebSite/sameAs, sitemap lastmod.
4. **Observability build** — `gsc.mjs` (service-account JWT), `bing.mjs` (API key), `ga.mjs` (same SA), `indexnow.mjs` (deploy-time ping), llms.txt build-generation, screenshot.js autostart fix.
5. **First data payoff** — booking-path 301 rescue; localhost analytics guard.
6. **Smoke test + this post-mortem.**

## Final smoke-test results (2026-07-15 ~12:10 ET)

| Surface                                                                                                                                   | Result                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run verify` (build + llms gen + 48 assertions)                                                                                       | ✅ 48/48                                                                                                 |
| Production battery (200s, 404s, 3 islands, www/trailing-slash/booking 301s, llms marker, IndexNow key, sitemap, robots, title, CSP, HSTS) | ✅ all pass                                                                                              |
| `bing.mjs` (sites, quota)                                                                                                                 | ✅ verified, 10k/day quota                                                                               |
| `ga.mjs` (properties, realtime)                                                                                                           | ✅ SSP property visible                                                                                  |
| `indexnow.mjs`                                                                                                                            | ✅ 200 OK                                                                                                |
| `screenshot.js` cold autostart                                                                                                            | ✅ capture + cleanup                                                                                     |
| `gsc.mjs`                                                                                                                                 | ⏳ auth works; property awaiting Google-side ownership propagation                                       |
| Clarity MCP                                                                                                                               | ⚠️ works, but connected to the **Cloud Club** project — SSP project needs its own token (see incident 7) |

## What went well

- **Executable acceptance gates.** `verify-dist.mjs` + screenshot baselines meant every task had a machine-checkable definition of done; the suite grew 33→48 and now guards the end state (island ceiling, entity-apostrophe leak, llms sync) against future regressions.
- **Generator/evaluator separation caught real defects.** Per-task independent review found the typewriter cursor-timing bug (in the plan's own example code) before ship.
- **The audit-fix-verify loop generalized.** The same discipline (red check → fix → live-verify) worked for CSS, `.htaccess`, JSON-LD, and analytics code alike.
- **Service-account architecture beat OAuth.** After Google blocked the gcloud client from the Analytics scope, the SA/JWT pattern (no consent screens, headless, cron-able) proved to be the right shape — one identity now reads GSC and GA4.
- **Data → fix latency of minutes.** First real GA4 pull to deployed 301 rescue of booking-intent clicks: under 15 minutes.

## What went wrong (and what caught it)

1. **Audit error: "AnimatedArrow.jsx has zero importers" was false.** The grep pattern missed a sibling-directory import from CTAButton.jsx. _Caught by:_ the implementer's build break. _Fix:_ port CTAButton to the existing CSS classes. _Lesson:_ dead-code greps must cover relative sibling imports (`./X`), not just path-qualified ones.
2. **Plan arithmetic: "−8 islands" was a source-count, not a render-count.** Two FocusText call sites sat inside `.map()` loops (actual: −13). _Caught by:_ implementer measurement. Harmless, but plans should count rendered instances.
3. **Plan example code shipped a behavior bug** (cursor visible during pre-typing delay). _Caught by:_ per-task review comparing against the deleted component. _Lesson:_ example code in plans is a draft, not a spec — reviewers must diff behavior against the original.
4. **Three production bugs predating the project went unnoticed until a deep live sweep:** trailing-slash 500s, www serving 200 without redirect, `Header setifempty` unsupported on LiteSpeed (leaked a literal header; silently disabled the intended cache rule). _Lesson:_ post-deploy verification must include hostile inputs (trailing slashes, www, spoofed UAs) — happy-path curl checks missed all three.
5. **Environment debt burned a task:** a stale dev server squatting on :5173 plus two latent `screenshot.js` autostart bugs (IPv6 localhost resolution; Astro 6 output-format change) made the baseline capture fail. _Caught by:_ Task 1 subagent, which correctly refused to improvise. Both bugs now fixed and tested.
6. **Puppeteer clipped-selector captures reset completed CSS animations** — the credentials chart looked undrawn in regression sweeps. _Lesson:_ screenshot CSS-animated sections with `--scroll-to` (unclipped), and record tool artifacts in the ledger so later tasks don't misread them as regressions.
7. **Data mis-attribution (caught by this smoke test):** the Clarity MCP is configured for the Cloud Club project; an earlier "SSP post-ship: 36 sessions, 90.5% scroll depth" reading was actually Cloud Club data. _Corrected in the ledger._ _Lesson:_ when a connector serves multiple properties/projects, verify identity (ask for URLs/hostnames, not just aggregates) before attributing data.
8. **GA4 was polluted by our own dev sessions** (localhost = #2 traffic source). Now guarded in `analytics.js`.

## Incidents rescued by the new tooling (the payoff)

- **Booking-intent 404s:** a malformed (relative) TidyCal link somewhere in the wild sent 3 users/14d to `/sullivan-street-projects/growth-consultation` on our domain → 404 at the moment of highest intent. Now 301s to the real booking page.
- **Stale Bing feed:** Bing was still crawling the SPA-era `www…/sitemap.xml`; removed via API, correct `sitemap-index.xml` submitted.

## Open items

| Item                                                                                     | Owner               | Trigger                                        |
| ---------------------------------------------------------------------------------------- | ------------------- | ---------------------------------------------- |
| GSC ownership propagation → run sitemap/inspect/perf chain                               | automatic (watcher) | Google-side, ≤~24h; fallback = 30s UI user-add |
| SSP Clarity API token → point clarity MCP at project `r8b7ctb5d6`                        | Brett (~2 min)      | whenever                                       |
| Phase B: de-React Services/PartnerOutcomes/CookieConsent (−~312KB framework)             | decision            | after 1–2 wks of clean GA4/Clarity data        |
| Backlog: none — prior backlog (llms gen, screenshot fix, @types) all shipped this window | —                   | —                                              |

## Durable knowledge locations

- Conventions: `CLAUDE.md` (Deployment section: zip flow, LiteSpeed/WAF gotchas, gsc/bing/indexnow usage)
- Execution ledger: `.superpowers/sdd/progress.md`
- Auto-memory: `project-dereact-phase-a`, `project-search-engine-tooling`, `handoff-dereact-phase-a`
- Plan (with success criteria): `docs/superpowers/plans/2026-07-14-dereact-scroll-animations.md`
