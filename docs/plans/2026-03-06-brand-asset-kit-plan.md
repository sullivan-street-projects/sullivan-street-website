# SSP Brand Asset Kit — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Generate a complete brand asset kit (SVG logos + PNG exports) and visual style guide for Sullivan Street Projects.

**Architecture:** SVG logos are hand-authored as clean, minimal markup. A single Puppeteer-based Node script renders each SVG as an HTML page at exact pixel dimensions and screenshots to PNG. The visual style guide is built in Pencil (.pen).

**Tech Stack:** SVG (hand-authored), Puppeteer (already installed), Pencil MCP, Google Fonts (Libre Baskerville)

## Success Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | brand/ directory with 6 subdirs exists | `ls brand/` shows logos, linkedin, favicon, social, email, decks |
| 2 | 8 SVG logo files exist | `ls brand/logos/*.svg | wc -l` returns 8 |
| 3 | Export script exists and runs | `node scripts/export-brand-assets.js` exits 0 |
| 4 | 17+ PNG assets generated | `find brand -name "*.png" | wc -l` >= 17 |
| 5 | Pencil style guide exists | `brand/style-guide.pen` exists |
| 6 | Site uses new favicon | `index.html` contains `favicon-32.png` link |
| 7 | Site uses new OG image | `public/og-image.png` updated (different hash from current) |

---

### Task 1: Create directory structure

**Files:**
- Create: `brand/logos/` `brand/linkedin/` `brand/favicon/` `brand/social/` `brand/email/` `brand/decks/`

**Step 1: Create all brand directories**

```bash
mkdir -p brand/{logos,linkedin,favicon,social,email,decks}
```

**Step 2: Commit**

```bash
git add brand/
git commit -m "chore: scaffold brand asset directory structure"
```

---

### Task 2: Create SVG logo — Wordmark (light + dark)

**Files:**
- Create: `brand/logos/wordmark-light.svg`
- Create: `brand/logos/wordmark-dark.svg`

**Step 1: Create wordmark-light.svg**

Libre Baskerville, regular weight, `#1a1a1a` on transparent. Letter-spacing: 0.04em. Viewbox sized to text bounding box with clear-space padding equal to cap-height on all sides.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 60">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&amp;display=swap');
  </style>
  <text x="300" y="42" text-anchor="middle"
        font-family="'Libre Baskerville', Georgia, serif"
        font-size="36" fill="#1a1a1a" letter-spacing="0.04em">
    Sullivan Street Projects
  </text>
</svg>
```

**Step 2: Create wordmark-dark.svg**

Same as above but `fill="#FAFAF8"`.

**Step 3: Verify both render correctly**

Open in browser or use Puppeteer to screenshot at 600x60 and visually verify.

**Step 4: Commit**

```bash
git add brand/logos/wordmark-*.svg
git commit -m "feat(brand): add wordmark logo SVGs (light + dark)"
```

---

### Task 3: Create SVG logo — Monogram (light + dark)

**Files:**
- Create: `brand/logos/monogram-light.svg`
- Create: `brand/logos/monogram-dark.svg`

**Step 1: Create monogram-light.svg**

"S S P" with generous letter-spacing (0.5em). Libre Baskerville regular, centered in viewbox.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&amp;display=swap');
  </style>
  <text x="150" y="55" text-anchor="middle"
        font-family="'Libre Baskerville', Georgia, serif"
        font-size="48" fill="#1a1a1a" letter-spacing="0.5em">
    SSP
  </text>
</svg>
```

**Step 2: Create monogram-dark.svg**

Same with `fill="#FAFAF8"`.

**Step 3: Commit**

```bash
git add brand/logos/monogram-*.svg
git commit -m "feat(brand): add monogram logo SVGs (light + dark)"
```

---

### Task 4: Create SVG logo — S Mark framed + bare (light + dark)

**Files:**
- Create: `brand/logos/s-mark-framed-light.svg`
- Create: `brand/logos/s-mark-framed-dark.svg`
- Create: `brand/logos/s-mark-bare-light.svg`
- Create: `brand/logos/s-mark-bare-dark.svg`

**Step 1: Create s-mark-framed-light.svg**

Capital "S" centered in a square with a thin 1.5px border. Square is the container; clear space is built into the SVG padding.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&amp;display=swap');
  </style>
  <rect x="20" y="20" width="160" height="160" fill="none" stroke="#1a1a1a" stroke-width="1.5"/>
  <text x="100" y="120" text-anchor="middle"
        font-family="'Libre Baskerville', Georgia, serif"
        font-size="96" fill="#1a1a1a">
    S
  </text>
</svg>
```

**Step 2: Create dark variant** — swap `stroke` and `fill` to `#FAFAF8`.

**Step 3: Create bare variants** — same but remove the `<rect>` element.

**Step 4: Commit**

```bash
git add brand/logos/s-mark-*.svg
git commit -m "feat(brand): add S mark logo SVGs (framed + bare, light + dark)"
```

---

### Task 5: Create PNG export script

**Files:**
- Create: `scripts/export-brand-assets.js`

**Step 1: Write the export script**

A Puppeteer script that:
1. Launches headless Chrome
2. For each asset definition (name, SVG source, width, height, background color):
   - Creates an HTML page embedding the SVG centered on a solid background
   - Loads Google Fonts (Libre Baskerville) via `<link>`
   - Sets viewport to exact pixel dimensions
   - Screenshots to the target PNG path
3. Asset definitions cover all 25 deliverables from the design doc

Key asset list:
- `linkedin/company-logo-light.png` — 300x300, s-mark-framed, paper bg
- `linkedin/company-logo-dark.png` — 300x300, s-mark-framed, charcoal bg
- `linkedin/company-banner-light.png` — 1128x191, wordmark, paper bg
- `linkedin/company-banner-dark.png` — 1128x191, wordmark, charcoal bg
- `linkedin/profile-banner-light.png` — 1584x396, wordmark + "Growth Marketing Partners", paper bg
- `linkedin/profile-banner-dark.png` — 1584x396, wordmark + "Growth Marketing Partners", charcoal bg
- `favicon/favicon-32.png` — 32x32, s-mark-bare, charcoal bg (dark works best at tiny sizes)
- `favicon/apple-touch-icon-180.png` — 180x180, s-mark-framed, paper bg
- `favicon/android-icon-512.png` — 512x512, s-mark-framed, paper bg
- `social/og-image-light.png` — 1200x630, monogram + wordmark, paper bg
- `social/og-image-dark.png` — 1200x630, monogram + wordmark, charcoal bg
- `email/signature-light.png` — 200x40, wordmark, transparent/paper bg
- `email/signature-dark.png` — 200x40, wordmark, transparent/charcoal bg
- `decks/header-light.png` — 400x80, wordmark, paper bg
- `decks/header-dark.png` — 400x80, wordmark, charcoal bg
- `decks/title-slide-light.png` — 1920x1080, monogram + wordmark, paper bg
- `decks/title-slide-dark.png` — 1920x1080, monogram + wordmark, charcoal bg

**Step 2: Run the script and verify output**

```bash
node scripts/export-brand-assets.js
```

Verify files exist and spot-check dimensions:
```bash
file brand/linkedin/company-logo-light.png
file brand/favicon/favicon-32.png
```

**Step 3: Visually verify key assets**

Open a few PNGs to confirm font rendering, centering, and color correctness.

**Step 4: Commit**

```bash
git add scripts/export-brand-assets.js brand/
git commit -m "feat(brand): add Puppeteer export script and generate all PNG assets"
```

---

### Task 6: Build visual style guide in Pencil

**Files:**
- Create: `brand/style-guide.pen`

**Step 1: Open new Pencil document**

Use `open_document('new')` to create a blank canvas.

**Step 2: Build Color Palette frame**

Insert a frame with all 10 brand colors as swatches:
- charcoal `#1a1a1a`, paper `#FAFAF8`, paper-warm `#f0f0ee`, divider `#e5e5e5`
- secondary `#404040`, muted `#525252`, label `#737373`, faint `#999999`
- green `#4ADE80`, green-dark `#22c55e`

Each swatch: colored rectangle + hex label + usage description.

**Step 3: Build Typography Specimens frame**

Three font families at key scale points:
- Libre Baskerville: display (4.75rem), body-lg (1.25rem), body (1.0625rem)
- Instrument Sans: body-lg, body, caption, micro
- JetBrains Mono: body, caption

Show weight variants and sample text.

**Step 4: Build Logo Lockups frame**

All three marks (wordmark, monogram, S mark) in both light and dark treatments.
Include clear space visualization (dashed guidelines).

**Step 5: Build Asset Preview Grid frame**

Mockups showing assets in context:
- LinkedIn company page with logo + banner
- Browser tab with favicon
- Email signature block

**Step 6: Build Usage Rules frame**

Do/Don't examples:
- Do: use on brand colors only
- Don't: stretch, rotate, recolor, drop shadow
- Minimum sizes: S mark framed 32px, wordmark 120px wide

**Step 7: Take screenshot to verify**

Use `get_screenshot` to visually validate the full style guide.

**Step 8: Commit**

```bash
git add brand/style-guide.pen
git commit -m "feat(brand): add visual style guide in Pencil"
```

---

### Task 7: Update site with new brand assets

**Files:**
- Modify: `public/og-image.png` (replace with new OG image)
- Modify: `index.html` (add apple-touch-icon and favicon links if not present)

**Step 1: Copy new OG image to public/**

```bash
cp brand/social/og-image-dark.png public/og-image.png
```

Dark variant recommended — reads better as a link preview on most platforms.

**Step 2: Copy favicon assets to public/**

```bash
cp brand/favicon/favicon-32.png public/favicon-32.png
cp brand/favicon/apple-touch-icon-180.png public/apple-touch-icon.png
```

**Step 3: Update index.html with favicon links**

Add to `<head>` if not already present:
```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

**Step 4: Verify dev server shows new favicon**

```bash
npm run dev
```

Check browser tab for new S mark.

**Step 5: Commit**

```bash
git add public/ index.html
git commit -m "feat(brand): update site OG image and favicon with new brand assets"
```
