# Sullivan Street Projects — Website

## Project Overview
Single-page marketing site for a growth marketing consultancy. React 18 + Vite + Tailwind CSS v4 + Framer Motion + Lenis smooth scroll.

## Architecture
- **Sections:** Hero > Credentials > Statement > Intro > Approach > Services > PartnerOutcomes > About > Contact > Footer
- **Constants:** All structured data in `src/constants/index.js`, typography classes in `src/constants/typography.js`
- **Content:** `src/CONTENT.md` is the single source of truth for all copy. After editing, update the corresponding JSX in `src/sections/`. Also check if `public/llms.txt` needs syncing.
- **Design tokens:** All colors, fonts, type scale, spacing defined as Tailwind v4 `@theme` variables in `src/index.css`. No hardcoded hex values in components.
- **Playground:** Design exploration at `#playground` hash route — lazy-loaded, never in production bundle. Use for prototyping before shipping to production sections.

## Brand & Typography
- **Serif (Drama):** Libre Baskerville — headlines, statements, emotional content
- **Sans (Body):** Instrument Sans — body copy, UI, labels (swapped from Inter, Mar 2026)
- **Mono (Data):** JetBrains Mono — designed but not yet shipped to production
- **Colors:** Charcoal `#1a1a1a` on paper `#FAFAF8`. See `src/index.css` @theme block for full palette.

## FocusText Rules
FocusText is a scroll-reveal wrapper (opacity 0.4>1, blur 3.5px>0, Y 8px>0). Usage conventions:
- Wrap content blocks, NOT individual paragraphs within a block
- Grid/list items each get their own FocusText for staggered reveal
- Hero is above the fold — NO FocusText wrapping
- Each FocusText boundary = one scroll-reveal unit
- Do NOT add FocusText to: section labels, brand name lists, footnotes, CTAs, founder bio

## Animation & Accessibility
- Every animated component must call `useReducedMotion()` and skip animation when true
- Global CSS rule in `index.css` disables all CSS animations for `prefers-reduced-motion`
- TypewriterText triggers on scroll-into-view, takes ~4s to complete
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

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run screenshot` — alias for `node scripts/screenshot.js`
