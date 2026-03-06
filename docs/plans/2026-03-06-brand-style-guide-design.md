# SSP Brand Style Guide & Asset Kit — Design Document

**Date:** 2026-03-06
**Status:** Approved

## Goal

Codify Sullivan Street Projects' existing brand identity into a visual style guide and generate a complete set of production-ready assets for LinkedIn, favicon, email, social sharing, and slide decks.

## Approach

Two parallel deliverables:
1. **Visual style guide** — Pencil (.pen) design document as the brand bible
2. **Asset kit** — SVG logos + PNG exports at all required dimensions, light and dark variants

## Logo System

Three lockups, all based on Libre Baskerville (brand serif):

### Wordmark (large formats)
- "Sullivan Street Projects" in Libre Baskerville regular
- Slightly wider tracking than body text
- Single line or stacked ("Sullivan Street" / "Projects") for constrained widths
- Use for: LinkedIn banners, slide headers, email signatures, proposals

### Monogram (medium formats)
- "S S P" — three capitals, generously letter-spaced
- Editorial feel with thin separators or generous spacing
- Use for: OG images, social cards, document watermarks, title slides

### Single S (small formats)
- Capital "S" in Libre Baskerville, centered in square
- **Framed variant:** S inside thin 1px border square (street-sign nod)
- **Bare variant:** S alone, no frame (favicon at 32px and below)
- Use for: Favicon, LinkedIn company logo, app icon, profile thumbnails

## Color Variants

All lockups produced in two treatments:

| Variant | Foreground | Background |
|---------|-----------|------------|
| Light   | `#1a1a1a` (charcoal) | `#FAFAF8` (paper) |
| Dark    | `#FAFAF8` (paper) | `#1a1a1a` (charcoal) |

## Clear Space

Minimum clear space = cap-height of the "S" on all sides.

## Asset Deliverables

### LinkedIn
| Asset | Dimensions | Lockup |
|-------|-----------|--------|
| Company logo | 300x300 | S mark (framed) |
| Company banner | 1128x191 | Wordmark |
| Profile banner | 1584x396 | Wordmark + tagline |

### Favicon / App Icon
| Asset | Dimensions | Lockup |
|-------|-----------|--------|
| Favicon | 32x32 | S mark (bare) |
| Apple touch icon | 180x180 | S mark (framed) |
| Android icon | 512x512 | S mark (framed) |

### Email Signature
| Asset | Dimensions | Lockup |
|-------|-----------|--------|
| Signature logo | ~200x40 | Wordmark (single line) |

### Social / OG
| Asset | Dimensions | Lockup |
|-------|-----------|--------|
| OG image | 1200x630 | Monogram + wordmark |

### Slide Decks
| Asset | Dimensions | Lockup |
|-------|-----------|--------|
| Deck header | 400x80 | Wordmark |
| Title slide | 1920x1080 | Monogram + wordmark |

## Style Guide Contents (Pencil doc)

1. Color palette — all 10 theme colors with hex, usage labels
2. Typography specimens — Libre Baskerville, Instrument Sans, JetBrains Mono at key scale points
3. Logo lockups — all marks in both color treatments with clear space
4. Asset preview grid — mockups in context (LinkedIn, browser tab, email)
5. Usage rules — minimum sizes, no color mods, no rotation

## File Structure

```
brand/
  style-guide.pen
  logos/          (8 SVGs)
  linkedin/       (6 PNGs)
  favicon/        (3 PNGs)
  social/         (2 PNGs)
  email/          (2 PNGs)
  decks/          (4 PNGs)
```

## Implementation Plan

1. Create brand/ directory structure
2. Generate SVG logo files (wordmark, monogram, S mark variants x light/dark)
3. Export PNGs at all required dimensions using sharp/canvas
4. Build visual style guide in Pencil
5. Replace existing favicon and OG image with new brand assets
