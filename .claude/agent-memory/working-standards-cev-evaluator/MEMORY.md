# CEV Evaluator Memory

## Past Decisions

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
