---
description: Capture screenshots of the SSP website for visual verification
---

# Screenshot Command

Capture screenshots of the SSP website. Uses `scripts/screenshot.js` with animation-aware defaults.

## Usage

The user may specify a section name, or "full" for full-page, or a custom command.

## Section Presets

Map section names to their scroll-to selectors and settle times:

| Section | Selector | Settle |
|---------|----------|--------|
| hero | `#hero` | 4000ms (TypewriterText) |
| credentials | `#credentials` | 1500ms |
| statement | `#statement` | 1500ms |
| intro | `#intro` | 1500ms |
| approach | `#approach` | 1500ms |
| services | `#services` | 1500ms |
| outcomes | `#outcomes` | 1500ms |
| about | `#about` | 1500ms |
| contact | `#contact` | 4000ms (TypewriterText) |
| footer | `footer` (tag selector) | 1500ms |
| full | `--full-page` | N/A |

## Instructions

1. Parse the user's argument to determine which section(s) to capture
2. If no argument, capture all sections at 1440px width
3. For each section, run the appropriate command:

```bash
# Single section example:
node scripts/screenshot.js http://localhost:5173 --selector "#hero" --scroll-to "#hero" --settle 4000 -w 1440 -o ./screenshot-hero.png

# Full page:
node scripts/screenshot.js http://localhost:5173 --full-page -w 1440 -o ./screenshot-full.png
```

4. If the user says "baselines", run `bash scripts/capture-baselines.sh` instead
5. After capturing, read the screenshot file to display it for visual review
