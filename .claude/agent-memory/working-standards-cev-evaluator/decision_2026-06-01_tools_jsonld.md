---
name: decision-2026-06-01-tools-jsonld
description: "CEV Analysis of JSON-LD structured data for The Brief's tools directory (ssp-blog repo, AEO launch surface)"
metadata:
  type: project
---

# 2026-06-01 — Analysis: JSON-LD Structured Data for The Brief Tools Directory (ssp-blog)

**Repo evaluated:** `../ssp-blog` (The Brief Astro publication) — NOT the main SSP marketing site. The owner reframed the tools directory as The Brief's launch SEO/AEO surface.

**Depth:** Analysis

**Evaluated:** 6 recommendations from a brainstorming session on adding JSON-LD to the tools directory, plus 2 in-session deferrals (per-tool OG image, sitemap lastmod).

**Results:** 5 Aligned, 1 Deferred-with-trigger, 0 Rejected, 0 internal tensions. One sequencing tension surfaced vs. the launch-critical path.

**Aligned:**
- (1) SoftwareApplication + nested Organization review; reviewRating ONLY on sspPick; NO aggregateRating — honesty-as-schema, the strongest alignment. Mirrors no-AI-attribution-caption discipline. Self-serving-review rule clears (SSP reviews tools it doesn't sell).
- (6) `structured-data.ts` builder + thin `StructuredData.astro` escaping chokepoint, retrofit posts+home — fixes a REAL latent bug: PostLayout.astro:186 and index.astro:97 inject `JSON.stringify` into `set:html` with no `<`/`</script>` escaping. Plus anti-duplication + dependency-averse architecture.
- (2) BreadcrumbList on tool detail — mirrors visual breadcrumb at [slug].astro:88-99; detail page currently has ZERO JSON-LD.
- (4) `getImage()` for absolute logo URL — required for (1); uses astro:assets already imported at [slug].astro:2,30-36; zero new dep. Do as part of (1).
- (5) Explicit trailingSlash + build.format in astro.config.mjs — REAL pre-existing split: build.format unset (defaults `directory` → `/tools/clay/`) vs BaseLayout canonical `/tools/clay` (BaseLayout.astro:16-17,32). Site-wide. Cheapest to fix pre-launch.

**Deferred:**
- (3) CollectionPage + ItemList on /tools index — trigger: ship 1/2/4/6 first, then reference stable per-tool @ids; promote if index targeted for rich results.
- Per-tool OG (Satori) — trigger: after publicly live. Sitemap lastmod — trigger: any sitemap revisit (lastUpdated already in schema, content.config.ts:133).

**Recommended order:** 5 (config) → 6 (builder + escaping fix) → 1+4 (core AEO payload) → 2 (breadcrumb) → 3 (deferred) → OG/sitemap (Phase 8).

**Sequencing tension (not a value conflict):** All recs are aligned and correct, but NONE renders to any crawler until Phase 1 launch blocker clears (Loops form still `'#'`, no hosting config; brief.sullivanstreetprojects.com unreachable). This is excellent pre-launch quality work that runs PARALLEL to unblocking launch — it must not be mistaken FOR launch progress. For a solo part-time owner: right second move, not first.

**Verified against live code (not just memory):** content.config.ts:96-142 (sspPick bool, pricing.tiers free-text price, addedAt/lastUpdated all present); clay.md (sspPick:false confirms field is sparse/honest); [slug].astro (visual breadcrumb, no schema, astro:assets in use); PostLayout/index.astro (hand-rolled JSON.stringify escaping gap); astro.config.mjs (no trailingSlash/build.format); BaseLayout.astro (canonical with no trailing slash). No new dependency introduced by any aligned rec.

**Override:** Pending

**Related:** [[project-tools-directory-status]], [[feedback-ai-attribution-caption]]. Echoes the SSP-site AIEO value (2026-03-23 prerender decision) — same owner, same structured-data-as-growth-channel strategy, now in the publication arm.
