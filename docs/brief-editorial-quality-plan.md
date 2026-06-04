# The Brief — Editorial Quality System

> **Scope note:** this plan targets the **`ssp-blog`** repository (The Brief), not this
> repo. It is committed here only to persist the refined, approved plan for retrieval —
> execute it from a local `ssp-blog` checkout.

## Summary

Add four **advisory** editorial capabilities to the `ssp-blog` repo (The Brief) — voice
scoring, staged AI drafting, a fact-flagger, and AEO answer-block/schema enrichment — so that
tone, facts, drafting, and machine-citability each get a tool that *surfaces issues for Brett's
final read* and never auto-approves or auto-edits content. The judgment tools are built as
Claude Code slash commands (the session model does the reasoning, native `WebSearch` does the
grounding); the mechanical tools are plain Node/TS. Brett's manual read stays the moat.

## Context

The Brief has solved the **infrastructure** half of content production — the "Pattern C"
pipeline: Airtable edit surface → Zod-validated one-way markdown generator → build-time
hedcut/audio assets → merged AEO surface. It has **not** solved the **editorial** half: nothing
checks tone, nothing checks facts, idea→draft is fully manual, and articles are far less
machine-citable than the tools directory. The field has converged on a staged pipeline —
research → outline → draft → score → fact-check → **human edit** → publish — where AI owns
*structure* and a non-negotiable human gate owns *voice, point-of-view, and fact verification*.
The two things the field has genuinely not solved — reliable automated fact-checking and
manufacturable taste — are exactly where Brett's manual read remains the moat.

Locked with the user: north star = quality system first; scope = full four-pattern system;
build style = minimal in-house (borrow the STORM *technique*, not the dependency).

## Goals (definition of done)

Four lightweight advisory capabilities live in `ssp-blog`, each surfacing issues for Brett's
final read:

1. **Voice** — house voice is written into the repo, and a scorer flags off-voice drafts.
2. **Drafting** — a transparent, staged idea→draft pipeline exists (steps, not a black box).
3. **Facts** — a read-only flagger lists shaky claims in a draft for human verification.
4. **AEO** — articles are engineered to be cited by AI engines, closing the gap with the
   tools directory.

## Non-goals

- **Not** blocking the build, skipping an Airtable row, or gating publish automatically —
  Brett's read is the final gate.
- **No** auto-approval or auto-editing of content.
- **No** standing LLM service / headless-CI automation of the reasoning (add an SDK later if
  that need ever arises — out of scope now).
- **Not** solving fully-automated fact-checking or "manufacturable taste" — those stay human.
- **Not** a launch task — the directory already provides the day-one SEO surface; articles are
  the slow drip, so *good* matters more than *fast*.
- **No** STORM/GPT-Researcher dependency — technique only.
- **No** changes to `sullivan-street-website` (the repo this planning session runs in).

## Design

The four capabilities split into two kinds of work:

- **Judgment** (score voice, draft a post, flag shaky facts) → **Claude Code slash commands**
  in `ssp-blog/.claude/commands/`. Each is a markdown file the Claude Code session runs
  directly; web grounding comes from the session's native `WebSearch`/`WebFetch`. Where a step
  is pure pattern-matching (jargon blacklist, sentence-length, sentence pre-segmentation) the
  command shells out to a small runnable Node helper, so the model only does the judgment.
- **Mechanical** (JSON-LD schema, answer-block linting) → plain Node scripts and `.ts`
  builders, run via `npm`.

This mirrors the convention the sister `sullivan-street-website` repo already uses for judgment
work — `.claude/commands/screenshot.md` is markdown instructions plus a thin
`scripts/screenshot.js`. Because the reasoning runs inside the Claude Code session, the
editorial tools stand up with no separate LLM service to provision (this answers the user's
"why can't we just use the native LLM inside Claude Code?").

One structural change from the original draft: voice scoring runs as a command Brett invokes on
a draft before approving it, not as a hook inside the Airtable→markdown generator. The session
isn't present in the headless build, and an advisory check shouldn't sit in the build path
anyway — consistent with "advisory never blocks the build."

```
  EDITORIAL QUALITY SYSTEM — all advisory; Brett's read = final gate

  ┌─ JUDGMENT  (Claude Code session, via .claude/commands/*.md) ──────────────────┐
  │  WS1  /voice-score <slug>   reads docs/voice.md → per-dimension report          │
  │  WS2  /draft-post <idea>    4 staged steps, native WebSearch grounding          │
  │  WS3  /qa-facts <slug>      verify atomic claims via native WebSearch           │
  │            │ uses                  │ uses                                        │
  └────────────┼──────────────────────┼────────────────────────────────────────────┘
               ▼                       ▼  (mechanical helpers only)
  ┌─ MECHANICAL  (plain Node / TS) ───────────────────────────────────────────────┐
  │  scripts/lib/voice-lint.mjs   (blacklist + sentence-length, shelled out by WS1) │
  │  scripts/lib/atomic-claims.mjs (optional sentence pre-segmentation for WS3)     │
  │  WS4  scripts/qa-aeo.mjs (regex/word-count linter)        ── npm run aeo:qa     │
  │  WS4  src/lib/structured-data.ts  faqSchema()/howToSchema ── npm run build      │
  │            └─ wired into → src/layouts/PostLayout.astro                         │
  └────────────────────────────────────────────────────────────────────────────────┘

  Two independent tracks (Housekeeping precedes any topic/AEO work):
    Track A — no model:   WS4-schema  ·  WS4-linter            (parallel, start now)
    Track B — judgment:   docs/voice.md → WS1 ┐
                                         WS3 ─┴→ WS2           (WS2 last)
```

## Guardrails (risks & mitigations)

- **Advisory only.** Every command/script warns and reports; none blocks the build, skips a
  row, or edits content.
- **Never touch `src/content/` destructively.** The generator's `--prune` deletes any slug
  missing from Airtable. New commands/scripts are read-only or write to `/tmp` (the existing
  `qa-*.mjs` convention) — never into `src/content/`.
- **Calibrate the judge.** LLM-as-judge has a self-preference bias toward AI text. The scorer
  is advisory permanently; separately, its scores aren't *relied on* until they've been
  calibrated against Brett's own ratings of the existing posts (see Verification).
- **Verify borrowed stats.** The Princeton-GEO figures (+30% stats / +30% quotes / +41%
  citations) came from secondhand summaries — confirm against the primary KDD'24 paper before
  any are quoted in published Brief content.
- **Citation ≠ accuracy.** FActScore found citations correlate poorly with factual precision —
  WS3 checks *claims*, not the presence of citations.

## Plan of work

### Housekeeping (do first — blocks clean topic work)

Reconcile strategy-doc drift: `docs/brief-strategy.md` still says "5 categories / 20–30 tools"
while reality is 13 categories / 121 tools. Fix before any topic/pillar planning feeds AEO.
Also re-check `brief-strategy.md` §8's contingent "contributor without agent memory" promise —
WS1's `docs/voice.md` is what discharges it.

### WS1 — Voice contract + voice-score command

- **`docs/voice.md` (new)** — mirror the voice rules currently only in agent memory
  (`feedback_blog_editorial_voice.md`), as a 5d-brief-style contract: a small fixed set of
  structural primitives, a named filler/jargon blacklist (no "leverage", "unlock", "it's worth
  noting"), a sentence-length target, "concrete number over abstract", and a "Where I'm thin"
  calibration convention (naming uncertainty = the credible-operator register).
- **`docs/post-structures.md` (new, or a section of voice.md)** — structural DNA per content
  type `briefing / case-study / news / framework` (the `internal-comms` dispatcher pattern: one
  short index + a section per type), anchored to existing schema fields (`bottomLine`,
  `editorsNote`, `column`, `client/sector/outcome`, `version/effortTimeMin`).
- **`.claude/commands/voice-score.md` (new)** — slash command, G-Eval technique. Two-part
  report: (a) shells out to `voice-lint.mjs` for the deterministic findings, then (b) reads the
  post body + `docs/voice.md` and, chain-of-thought, fills a form-style rubric ("dimension:
  score + one-line justification") for the qualitative dimensions (register, POV, "Where I'm
  thin"). Prints both sections.
- **`scripts/lib/voice-lint.mjs` (new)** — runnable Node lint for the pattern-matchable rules
  only: filler/jargon-blacklist hits and over-length sentences, reported with line numbers. The
  qualitative rubric lives in `docs/voice.md` (model-read), not here.

### WS2 — Staged drafting spike (last; off critical path)

- **`.claude/commands/draft-post.md` (new)** — four discrete swappable steps: (1)
  multi-perspective research questions (STORM's insight: interrogate from several expert angles
  before writing), grounded via native `WebSearch`; (2) outline; (3) section-by-section draft;
  (4) a final voice-transfer pass against `docs/voice.md` (stops STORM-style output reading
  Wikipedia-neutral).
- **`scripts/lib/draft-steps.mjs` (new, optional)** — only if a step needs deterministic
  scaffolding (e.g. assembling the perspective prompts); otherwise keep the steps in markdown.
- **Output target: `/tmp` first** (matches `qa-*` convention, zero Pattern-C risk); promote to
  an Airtable `Stage='AI-Draft'` row once proven. Never write `src/content/` — `git diff
  src/content` stays the human gate.
- **Register the AI author:** add the `Sullivan` entry to `src/data/authors.ts` (currently
  Brett-only) to validate the byline model.
- Depends on WS1 (voice.md as final pass) and WS3 (fact-flag as review gate).

### WS3 — Fact-flagger command (read-only)

- **`.claude/commands/qa-facts.md` (new)** — follows the read-only `qa-listen-player.mjs`
  template (output to `/tmp/qa-facts/`). FActScore technique: the session **decomposes** the
  body into atomic factual claims (this decomposition is itself a judgment step — regex can't do
  it reliably), then for each claim does a `WebSearch` retrieval + verification, then writes a
  report flagging *unsupported / uncertain* claims. Assists, never replaces, Brett. Zero writes
  to the repo.
- **`scripts/lib/atomic-claims.mjs` (new, optional)** — only a coarse sentence/clause
  pre-segmenter to feed the command; carries no claim-extraction logic of its own. Skip it if
  the command reads the markdown directly.

### WS4 — AEO answer-blocks + article schema (pure Node/TS — start immediately, no model)

- **Schema:** extend `src/lib/structured-data.ts` with `faqSchema()` and `howToSchema()`
  builders, routed through the existing escaping chokepoint (reuse it; don't hand-roll
  escaping). Wire into `src/layouts/PostLayout.astro` (today emits Article/NewsArticle only).
  Routing keys off the existing content `type` field — `framework` → HowTo; `briefing` /
  `case-study` → FAQ, **but only when** that post's `## H2`s parse as questions (regex test), so
  FAQ schema never wraps non-Q content. Posts that match nothing keep today's Article output.
- **`scripts/qa-aeo.mjs` (new) + `npm run aeo:qa`** — read-only `/tmp` linter for Princeton-GEO
  heuristics per post: does each `## H2` lead with a self-contained ~40–60-word answer, are
  headings phrased as user queries, is there a stat/quote per section. Pure regex/word-counts.

### `package.json`

Only the mechanical pieces get npm scripts: `aeo:qa` → `node scripts/qa-aeo.mjs`. The judgment
pieces are slash commands, not npm scripts.

## Sequencing

1. **Housekeeping** — fix `brief-strategy.md` drift (no dependencies).
2. **WS4 schema half** — pure code, no model, no prerequisite; start in parallel immediately.
3. **`docs/voice.md` → WS1 command** — highest value, closes the #1 gap.
4. **WS3 fact-flagger** — additive read-only command + helper.
5. **WS4 linter half** — heuristic script.
6. **WS2 drafting spike** — last; depends on WS1 + WS3; stays off the critical path.

## Verification

- **WS1:** run `/voice-score` against every existing post; Brett rates the same set by gut;
  compare — scores should track his judgment before the command is trusted (calibration gate).
- **WS2:** run `/draft-post` on one real idea; confirm a staged draft lands in `/tmp` (nothing
  in `src/content/`); read it for voice against `docs/voice.md`.
- **WS3:** run `/qa-facts` on a post with known third-party stats; confirm the `/tmp` report
  flags the unverified ones; confirm zero writes to the repo.
- **WS4:** `npm run build`, then validate emitted JSON-LD on a Framework page and a briefing
  with Google Rich Results / schema.org; run `npm run aeo:qa` and confirm answer-block flags are
  sane; no new build console errors.

## Decisions

- **Who does the reasoning** → the Claude Code session, via slash commands (replaces the
  draft's separate-service "Prerequisite 0").
- **Search source** → native `WebSearch`/`WebFetch` (provider-native).
- **Drafting output target** → `/tmp` first, Airtable `AI-Draft` row once proven.

## Notes for the implementer

- **Where this runs:** all files above are in `ssp-blog`. This planning session ran in
  `sullivan-street-website` and could not reach `ssp-blog`, so the work is executed where
  `ssp-blog` is checked out, not from here.
- **Confirm anchors first:** the `ssp-blog` paths are carried over from the draft — locate each
  in-repo before editing rather than trusting line numbers: the command convention
  (`.claude/commands/` vs `.claude/skills/`), the escaping chokepoint in
  `src/lib/structured-data.ts`, the schema block in `src/layouts/PostLayout.astro`, the author
  list in `src/data/authors.ts`, the generator chokepoint in
  `scripts/generate-posts-from-airtable.mjs`, the read-only `scripts/qa-listen-player.mjs`
  template the QA commands mirror, the `type` field's exact enum values (`framework` /
  `briefing` / `case-study` / `news`) for WS4 routing, and the actual post count for the WS1
  calibration set.
- **`WebSearch` must be enabled** in the local Claude Code for WS2 step-1 grounding and WS3
  verification; without it, both degrade to model-only and should say so in their reports.
