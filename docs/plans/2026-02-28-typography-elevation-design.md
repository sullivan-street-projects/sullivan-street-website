# Typography Elevation — "Data & Drama" Layer

**Branch:** `feat/typography-elevation`
**Scope:** 5 file changes + 1 HTML line. No new components. No new dependencies. No animation changes.

---

## What This Does

Introduces JetBrains Mono as the third typographic tier ("Data") alongside Libre Baskerville ("Drama") and Inter ("Body"). Applies it to the nav, header, and section labels. Restyles the Intro section to use a contrast pattern (neutral setup → dramatic resolution). All existing content preserved — no copy changes.

---

## Change 1: Load JetBrains Mono

**File:** `index.html` line 29
**What:** Add `JetBrains+Mono:wght@400;500` to the Google Fonts `<link>`.

**Before:**
```
family=Inter:wght@300;400;500;600;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400
```

**After:**
```
family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400
```

**Why two weights:** 400 for labels/nav. 500 for the status indicator (needs slightly more presence against the logo).

**Performance:** ~50KB additional download. `display=swap` already present — browser shows fallback monospace until load completes. `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com` already in place (lines 27–28).

**Fallback:** If Google Fonts is unreachable, the `--font-mono` token falls back to generic `monospace` (typically Courier New). At `text-section-label` (10px) and `text-micro` (12px) this is fine — Courier renders legibly at small sizes and the uppercase + tracking treatment carries the visual intent regardless of face. No `size-adjust` needed.

---

## Change 2: Header Status Indicator

**File:** `src/components/Header.jsx`
**What:** Add "CURRENTLY ACCEPTING NEW PARTNERS" with a green pulsing dot to the right side of the existing `justify-between` flex container.

**Exact markup to add** (inside the `div.flex.items-center.justify-between`, after the logo button):

```jsx
<div className="hidden md:flex items-center gap-2">
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green" />
  </span>
  <span className="font-mono text-micro uppercase tracking-wide text-label font-medium">
    Currently Accepting New Partners
  </span>
</div>
```

**Styling spec:**
- `font-mono` → JetBrains Mono (resolves via `--font-mono` token in index.css:19)
- `text-micro` → 0.75rem / 12px (token in index.css:40)
- `tracking-wide` → 0.12em (token in index.css:48)
- `text-label` → #737373 (token in index.css:11)
- `font-medium` → weight 500

**Mobile:** `hidden md:flex` — hidden below 768px. The header is 80px tall with a logo on the left. On mobile there isn't room for both elements without crowding. The status signal lives in the bottom nav instead (the green dot on the Contact button).

**a11y:** The `animate-ping` pulse is already neutralized by the existing `prefers-reduced-motion` rule in index.css:99–106.

**Green dot pattern:** Identical to Navigation.jsx lines 32–35. Not extracted to a shared component — two instances doesn't justify a new file, and the markup is 4 lines.

---

## Change 3: Navigation Mono Treatment

**File:** `src/components/Navigation.jsx` line 28
**What:** One class swap on the nav button.

**Before:**
```
font-sans text-section-label uppercase tracking-wide text-charcoal/70
```

**After:**
```
font-mono text-section-label uppercase tracking-wide text-charcoal/70
```

**That's it.** `font-sans` → `font-mono`. Everything else stays. The labels are already uppercase with wide tracking — JetBrains Mono slots in naturally.

---

## Change 4: Section Numbering

**File:** `src/components/Section.jsx`
**What:** Add an `index` prop. Render as a zero-padded prefix with `//` separator.

**Full component — before:**
```jsx
const Section = ({
  id,
  label,
  children,
  className = "",
  divider = true,
  padding = "py-24 md:py-32 lg:py-48"
}) => (
```

**Full component — after:**
```jsx
const Section = ({
  id,
  index,
  label,
  children,
  className = "",
  divider = true,
  padding = "py-24 md:py-32 lg:py-48"
}) => (
```

**Label render — before (line 18):**
```jsx
<span className="font-sans text-section-label text-label uppercase tracking-widest font-bold">
  {label}
</span>
```

**Label render — after:**
```jsx
<span className="font-mono text-section-label text-label uppercase tracking-widest font-medium">
  {index != null && (
    <span className="text-faint">{String(index).padStart(2, '0')} // </span>
  )}
  {label}
</span>
```

**Changes:**
- `font-sans` → `font-mono` (JetBrains Mono for all section labels)
- `font-bold` → `font-medium` (mono fonts read heavier than sans at the same weight — medium is the equivalent visual weight)
- Index prefix in `text-faint` (#999999) — lighter than the label text (#737373) so it reads as metadata, not content
- `index` prop is optional — if not passed, no number renders. Safe for any future sections.

**Callers — add `index` prop:**

| File | Current | Change |
|------|---------|--------|
| `src/sections/Intro.jsx:16` | `<Section id="intro" label="Opportunity">` | Add `index={1}` |
| `src/sections/Approach.jsx:20` | `<Section id="approach" label="Approach">` | Add `index={2}` |
| `src/sections/Services.jsx:47` | `<Section id="services" label="Services" ...>` | Add `index={3}` |
| `src/sections/PartnerOutcomes.jsx:37` | `<Section id="outcomes" label="Partner Outcomes" ...>` | Add `index={4}` |
| `src/sections/About.jsx:7` | `<Section id="about" label="About">` | Add `index={5}` |
| `src/sections/Contact.jsx:10` | `<Section id="contact" label="Call" ...>` | Add `index={6}` |

**Why manual indices, not a lookup:** There are 6 sections. The order is stable. A registry or auto-incrementing system would add complexity for zero benefit. If a section is added or reordered, updating one number is trivial.

---

## Change 5: Intro Philosophy Contrast

**File:** `src/sections/Intro.jsx`
**What:** Swap the order of the body text and h2, and mute the body text color to create a "setup → punchline" contrast.

**Full JSX — before (lines 17–28):**
```jsx
<div className="mb-20 md:mb-24">
  <FocusText>
    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-charcoal mb-8 md:mb-12">
      Make Marketing Work<br /><span className="italic">For Your Business.</span>
    </h2>
  </FocusText>
  <FocusText>
    <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light max-w-narrow">
      Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
    </p>
  </FocusText>
</div>
```

**Full JSX — after:**
```jsx
<div className="mb-20 md:mb-24">
  <FocusText>
    <p className="font-sans text-body md:text-body-md text-label leading-relaxed font-light max-w-narrow mb-6 md:mb-8">
      Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
    </p>
  </FocusText>
  <FocusText>
    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-charcoal">
      Make Marketing Work<br /><span className="italic">For Your Business.</span>
    </h2>
  </FocusText>
</div>
```

**Three changes:**
1. `<p>` moves above `<h2>` — setup before punchline
2. Body text: `text-secondary` (#404040) → `text-label` (#737373) — muted so the h2 hits harder
3. Body text gets `mb-6 md:mb-8` — tighter than the original `mb-8 md:mb-12` gap because setup and punchline should feel connected. The h2 loses its bottom margin (`mb-8 md:mb-12` removed) since the parent `div.mb-20.md:mb-24` already provides spacing to the value prop cards below.

**Spacing context:** The Section label area has `mb-12 md:mb-16` before this content block. With the reorder, the flow is: `01 // OPPORTUNITY` label → 48–64px gap → setup text → 24–32px gap → h2 → 80–96px gap → value prop cards. This creates a clear hierarchy: section marker → context → statement → content.

---

## What Does NOT Change

- Hero content, structure, or TypewriterText behavior
- Any animation (Framer Motion, FocusText, Lenis)
- Any layout or spacing beyond the Intro reorder
- Mobile layouts (status indicator hides, everything else adapts naturally)
- Bundle size (font loaded via external CDN, not bundled)
- Reduced-motion support
- Credentials section — the brand names (`Apple`, `Google`, etc.) stay `font-sans` because they're proper nouns, not data labels. The Credentials label line ("Our team has managed $2B+ for") is `font-sans` and could arguably go mono since "$2B+" is a data point, but it currently sits as a `text-tag` label paired with the brand list. Switching it would visually disconnect it from the brand names it introduces. Leave it for now — revisit if the mono treatment extends site-wide in a future pass.

---

## Verification

1. `npm run build` succeeds with zero warnings
2. `scripts/capture-baselines.sh` at 1440/768/375 — compare against existing baselines
3. Visual checks:
   - Header: JetBrains Mono renders for status text, green dot pulses
   - Nav: labels render in JetBrains Mono
   - Section labels: "01 // OPPORTUNITY" through "06 // CALL" render correctly
   - Intro: body text appears above h2, reads as setup → punchline
4. Mobile (375px): status indicator hidden, nav labels readable, section numbers don't wrap awkwardly
5. Reduced-motion: `animate-ping` disabled, no other changes needed
