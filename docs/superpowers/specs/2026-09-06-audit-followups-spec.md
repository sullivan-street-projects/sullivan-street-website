# Audit Follow-ups (September 2026) — Spec

Approved by Brett on 2026-09-06 from the site audit decision page
(https://claude.ai/code/artifact/1563273b-383a-469f-9234-20c7f2499349).
Approved: A1–A5, B1–B2, C1–C3, C5. **C4 (remove React/Framer) is deferred — the
animations stay.** D1–D3 are watch items, not built.

## Ground truth the spec argues from

Audit run 2026-09-06 against sullivanstreetprojects.com. Behavior window Jul 31 – Sep 6, 2026.

- 191 users / 211 sessions on the main host; 88 engaged sessions (42%).
- Organic search 42 sessions / 20 users, 126s avg — best channel. Bing shows brand queries only.
- Gamma deck referrals: 12 sessions, one pair of users averaging 444s — highest-intent traffic, untagged.
- Zero real bookings ever (Aug 4 booking = `test@test.test`, created Jul 30).
- Bare `call.sullivanstreetprojects.com/` caught 4 landing sessions; all saw "No booking types currently available" (booking type is `private: true`).
- GA4 property `486648286`: `eventDataRetention: TWO_MONTHS`, zero custom dimensions, key events `book_call_click`, `select_time`, plus a dead 2025 `purchase`.
- GSC service account sees no properties (UI user-add never done).
- `analytics-mcp` and `clarity` MCP connectors both resolve to Cloud Club; SSP numbers come only from `scripts/{ga,gsc,bing,clarity,tidycal}.mjs`, which are hard-wired to `~/.secrets/ssp-*`.
- Lighthouse (production build, local): perf 96 / a11y 94 / BP 100 / SEO 100. A11y misses: `<h4>` directly under `<h2>` in the About founder card; Contact eyebrow label `#737373` on `bg-paper-warm #f0f0ee` = 4.16:1 (needs 4.5). The other 45 contrast flags are FocusText's 40% resting state — by design.
- JSON-LD: Organization + WebSite + 3 Service nodes. Founder is an inline Person with no `sameAs`/`url`; Services have no `serviceType`/`areaServed`; the Advisory description is a truncated copy of `TIERS[2].description` (drift).
- `<meta name="keywords">` present; HSTS lacks `preload`; `/contact` 404s (1 real visitor).

## Owner actions (no code — Brett, ~5 min)

| ID  | Action                                                                                                                                                                                                                                                                                                        | Verify with                                                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| A1  | Search Console → Settings → Users and permissions → Add `gsc-agent@claude-workspace-mcp-483716.iam.gserviceaccount.com` as **Full** on `sc-domain:sullivanstreetprojects.com`                                                                                                                                 | `node scripts/gsc.mjs sites` lists the sc-domain              |
| A2  | GA4 Admin → Data collection and modification → Data retention → Event data retention **14 months**                                                                                                                                                                                                            | `node scripts/ga.mjs admin` → `FOURTEEN_MONTHS`               |
| A3  | GA4 Admin → Custom definitions → Create custom dimension: scope **Event**, parameter `cta_location`                                                                                                                                                                                                           | `node scripts/ga.mjs admin` lists `cta_location`              |
| A4  | TidyCal → Growth Consultation → uncheck **Private**                                                                                                                                                                                                                                                           | `node scripts/tidycal.mjs types` shows no `[PRIVATE]`         |
| A5  | GA4 Admin → Data streams → Configure tag settings → List unwanted referrals: `localhost`; Key events → remove `purchase`                                                                                                                                                                                      | `node scripts/ga.mjs admin` has no `purchase` key event       |
| B1  | GA4 Admin (SSP property) → Property access management → add the Google account behind the `analytics-mcp` connector as **Viewer**                                                                                                                                                                             | `get_account_summaries` MCP lists `SullivanStreetProjects.co` |
| —   | **Owner-item outcome 2026-09-06:** A1 ✅ (siteFullUser), A2 ✅ (FOURTEEN_MONTHS), A3 ✅ (`cta_location` EVENT), A4 ✅ (no `[PRIVATE]`), A5 ✅ referral filter / ✖ `purchase` cannot be removed (Google-owned key event), B1 ✅ (`ga4-mcp-reader@ssp-growth-os-prod` Viewer→ connector lists both properties). | —                                                             |
| C1b | Update the site link in the Gamma deck template(s) to carry the UTM convention from C1                                                                                                                                                                                                                        | GA4 `sources` shows `gamma / deck`                            |

## Build requirements (code — this plan)

### C1 — UTM convention for deck links

Document in `CLAUDE.md` (Decisions & Constraints): deck links carry
`?utm_source=gamma&utm_medium=deck&utm_campaign=<deck-slug>` where `<deck-slug>`
is kebab-case `<prospect-or-purpose>-<yyyy-mm>` (e.g. `acme-intro-2026-09`). No site code.

### C2 — Structured data for AI answer engines

- Founder becomes a top-level `Person` node, `@id` `https://sullivanstreetprojects.com/#brett-wohl`, `url` same, `sameAs` `https://www.linkedin.com/in/brettwohl/`, `worksFor` → Organization `@id`, `jobTitle`, `knowsAbout` list.
- Organization: `founder` references the Person `@id`; `areaServed` United States.
- Service nodes are generated from `TIERS` (single source of truth) with `serviceType` = tier subtitle and `areaServed` United States. This fixes the Advisory description drift.
- Founder data lives in a new `FOUNDER` constant in `src/constants/index.js`; `generate-llms.mjs` reads it and adds a LinkedIn line under Founder.
- verify-dist gains checks for: Person node with `@id` + LinkedIn, JSON-LD parses with 6 graph nodes, `serviceType` ×3, all `TIERS` descriptions present in JSON-LD, llms.txt carries the LinkedIn URL.

### C3 — Accessibility

- About founder card heading `<h4>` → `<h3>`.
- `--color-label` `#737373` → `#6b6b6b` (4.67:1 on paper-warm, 5.10:1 on paper; same value as the existing `--color-faint`, so the palette gains no new grey).
- verify-dist gains a contrast guard computed from the source tokens.

### C5 — Hygiene

- Remove `<meta name="keywords">`.
- HSTS: `max-age=31536000; includeSubDomains; preload`.
- `.htaccess`: `RewriteRule ^contact/?$ /#contact [L,R=301,NE]`.

### B2 — Account-flexible observability scripts

- New `scripts/lib/account.mjs`: parses `--account <name>` (default `ssp`, env `SSP_ACCOUNT` as fallback), `--property`, `--site`; builds secret paths `~/.secrets/<account>-<tool>`; reads optional per-account hints from `~/.secrets/accounts.json`.
- All five scripts (`ga`, `gsc`, `bing`, `clarity`, `tidycal`) consume it. Existing env overrides (`GSC_SA_KEY`, `GA_PROPERTY`, `GSC_SITE`, `BING_WM_KEY`, `BING_SITE`) keep working.
- `ga.mjs` gains `admin` (key events, custom dimensions, retention) so A2/A3/A5 are checkable. `tidycal.mjs types` marks `[PRIVATE]` so A4 is checkable.
- `npm run tools:link` symlinks `~/.claude/tools` → this repo's `scripts/` (decision: repo stays the single source of truth). `npm test` runs `node --test scripts/lib/*.test.mjs` (a bare directory path is MODULE_NOT_FOUND on Node 24).
- `CLAUDE.md` Analytics section states that both MCP connectors are Cloud Club and documents `--account`.

## Out of scope

C4 (React removal), any change to Services/PartnerOutcomes/CookieConsent behavior, FocusText resting opacity, the bottom rail, copy changes in `src/CONTENT.md`.
