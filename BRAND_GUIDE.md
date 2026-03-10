# Sullivan Street Projects — Brand Style Guide

## 1. Brand Identity
**Sullivan Street Projects** is a fractional growth consultancy that bridges the gap between high-level strategy and tactical execution. We are "Marketing for Tomorrow's Billion-Dollar Brands."

*   **Tagline:** Growth Marketing Partners
*   **Core Promise:** AI-powered strategy, media, and execution. Faster growth, sharper focus, higher profit.
*   **Differentiation:** We are not a traditional agency. We are a "General Contractor" for marketing—embedding leadership, managing specialists, and owning outcomes.
*   **Personality:** Authoritative, Modern, Direct, Outcome Obsessed.

## 2. Voice & Tone
Our voice is that of a seasoned executive: confident, concise, and focused on the bottom line.

*   **Direct & Action-Oriented:** We don't use fluff. We focus on verbs: *build, execute, scale, convert.*
    *   *Yes:* "We cut through the chaos and focus on the only metric that matters—growth."
    *   *No:* "We help brands navigate the complex marketing landscape to find synergy."
*   **Business-First:** We speak the language of the C-Suite (P&L, unit economics, ROI), not just marketing jargon (impressions, buzz).
    *   *Key Phrase:* "We keep marketing in lockstep with your P&L."
*   **Forward-Looking:** We embrace the future (AI, automation) but ground it in timeless business principles.

## 3. Typography
A classic pairing of a serif headline font with a clean sans-serif body font. Established and modern.

### Primary Typeface — Libre Baskerville (Headlines)
*   **Usage:** Headlines, key statements, emotional content.
*   **Characteristics:** Traditional, editorial, authoritative.
*   **Weights:** Regular (400), Bold (700), Italic.
*   **Italic Convention:** Section headlines end with an italic Libre Baskerville closer to land the key phrase. The regular-to-italic shift within a single heading creates emphasis without bold or color — the italic word is the one the reader remembers.

### Secondary Typeface — Instrument Sans (Body & UI)
*   **Usage:** Body paragraphs, navigation, UI elements, labels, taglines.
*   **Characteristics:** Clean geometry with humanist warmth. Variable weight axis.
*   **Weights:** Light (300), Regular (400), Medium (500), Bold (700).

## 4. Color Palette
A minimal, high-contrast palette designed to feel like premium printed stationery.

### Primary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Charcoal | `#1a1a1a` | Primary text, headings, dark backgrounds |
| Paper | `#FAFAF8` | Page background, light surfaces |

### Secondary Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Paper Warm | `#f0f0ee` | Subtle background variation, spec boxes |
| Secondary | `#404040` | Subheadlines, secondary text |
| Muted | `#525252` | Body text, descriptions |
| Label | `#737373` | Labels, captions, tagline text |
| Faint | `#999999` | Placeholder text, section labels |
| Divider | `#e5e5e5` | Borders, horizontal rules |

### Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Green | `#4ADE80` | Active indicators, success metrics |
| Green Dark | `#22c55e` | Hover/emphasis variant of green |

## 5. Logo System
Four lockups, all based on Libre Baskerville. Each produced in charcoal-on-paper and paper-on-charcoal variants.

### A. Wordmark — Single Line
"Sullivan Street Projects" in one clean line with subtle letter-spacing.
*   **Use for:** LinkedIn banners, slide headers, email signatures, proposals.

### B. Wordmark — Stacked + Tagline
Each word on its own line (Sullivan / Street / Projects), left-aligned with group centered. "GROWTH MARKETING PARTNERS" tagline underneath in Instrument Sans uppercase.
*   **Use for:** Title slides, hero moments, OG images, print.
*   **Reference:** `brand/og-image.pen` is the authoritative design source.
*   **Specs:** 42px Libre Baskerville, 3px letter-spacing, 14px Instrument Sans tagline, 5px tagline letter-spacing, `#737373` tagline color.

### C. Monogram — SSP
Three capitals, generously letter-spaced (0.15em). Editorial feel.
*   **Use for:** OG images, social cards, document watermarks.

### D. S Mark (Bare)
Capital "S" in Libre Baskerville, centered in square. No frame at small sizes.
*   **Use for:** Favicon, LinkedIn company logo, app icon, profile thumbnails.

## 6. Visual Effects & Texture
*   **Grain Overlay:** A subtle SVG noise filter (`opacity: 0.05`) is applied as a fixed full-page overlay. `feTurbulence` fractalNoise, `baseFrequency: 0.6`, `numOctaves: 3`, `z-index: 50`. It gives the digital interface a "physical" texture — felt, not seen.
*   **Focus/Blur:** A `blur` effect triggered by scroll position directs user attention. Elements fade in and out of focus (FocusText component: opacity 0.4→1, blur 3.5px→0, Y 8px→0).
*   **Motion:** Animations are smooth and physics-based (Lenis for scrolling, Framer Motion for transitions). Deliberate, reinforcing weight and quality.

## 7. Layout Principles
*   **Whitespace:** Generous padding and margins (`py-24`, `py-32`) allow content to breathe.
*   **Center Alignment:** Key headlines and introductory text are often centered for impact.
*   **Grid:** A max-width container (`max-w-[1200px]`) keeps content readable on large screens.

## 8. Naming
*   **Name:** Sullivan Street Projects
*   **Tagline:** Growth Marketing Partners
*   **Short Name:** SSP (internal use only, avoid in public-facing copy)
*   **Logo Text:** Rendered in Libre Baskerville, giving it a logotype feel without a graphical mark.

## 9. Asset Files
All brand assets live in the `brand/` directory:

```
brand/
  logos/          8 SVGs (wordmark, stacked, monogram, s-mark × light/dark)
  linkedin/       6 PNGs (company logo, company banner, profile banner × light/dark)
  favicon/        3 PNGs (32px, 180px, 512px)
  social/         2 PNGs (OG image × light/dark)
  email/          2 PNGs (signature × light/dark)
  decks/          4 PNGs (header, title slide × light/dark)
  index.html      Interactive HTML brand guide
  style-guide.pen Visual style guide (Pencil)
```
