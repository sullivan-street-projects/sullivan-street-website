# GA4 + Cookie Consent — Design Document

**Date:** 2026-03-07
**Status:** Approved (revised — opt-out model)

## Overview

Add Google Analytics 4 tracking (Measurement ID: `G-S025DFF5N0`) to the SSP website with a US-style opt-out consent model. GA4 loads immediately by default. A minimal bottom-bar banner informs visitors and offers an opt-out option.

## Decisions

- **Consent model:** US opt-out (not GDPR opt-in) — GA4 loads by default, users can opt out
- **Approach:** Custom-built consent component (no library, no SaaS CMP)
- **GA4 only for now** — Meta Pixel and Microsoft Ads coming later
- **Privacy Policy:** Left as-is (no updates)
- **Google Fonts:** Remain on Google CDN (no self-hosting)

## Components

### 1. Cookie Consent Banner (`src/components/CookieConsent.jsx`)

- Fixed bottom bar, full-width
- Background: `charcoal/95` with `backdrop-blur-sm`
- Text: `paper` color in Instrument Sans
- Two buttons: **OK** (solid, dismiss) and **Opt Out** (ghost/outlined)
- Link to `/privacy-policy`
- Copy: "We use cookies to understand how visitors engage with our site."
- Subtle slide-up entrance animation, respects `prefers-reduced-motion`
- z-index above content, below modals

**Trigger behavior:**
- First-time visitors: banner appears on first scroll event (not on page load). GA4 is already running.
- Scroll listener removes itself after firing once
- Returning visitors who acknowledged (clicked OK): no banner, GA4 loads normally
- Returning visitors who opted out: no banner, no GA4

**Consent storage:**
- `localStorage` key: `cookie-consent` → `"acknowledged"` or `"opted-out"`

### 2. Analytics Utility (`src/utils/analytics.js`)

- `initAnalytics()` — called on app boot in `main.jsx`. Checks localStorage for opt-out state. If not opted out, initializes Google Consent Mode v2 with `analytics_storage: 'granted'` and loads GA4 immediately. If opted out, sets consent defaults to `denied` and does not load GA4.
- `loadGA4()` — dynamically injects `gtag.js` script into `<head>` with Measurement ID `G-S025DFF5N0`.
- `disableGA4()` — revokes consent (`analytics_storage: 'denied'`), removes GA4 cookies, used when user opts out mid-session.
- Extensible: future `loadMetaPixel()` / `loadMSAds()` functions added to same file.

### 3. Integration

- `<CookieConsent />` mounted in `App.jsx` at root level (outside routes)
- `initAnalytics()` called in `main.jsx` before React renders
- No GA4 script in `index.html` — purely dynamic loading

## Architecture Flow

```
App boot (main.jsx)
  └─ initAnalytics()
       └─ Check localStorage:
            ├─ "opted-out" → set consent defaults to "denied", do NOT load GA4
            └─ anything else → set consent to "granted", loadGA4() immediately
  └─ React renders App.jsx
       └─ <CookieConsent /> mounts (hidden)
            └─ Check localStorage:
                 ├─ "acknowledged" or "opted-out" → don't show banner
                 └─ no value → attach scroll listener
                      └─ on first scroll → show banner
                           ├─ OK → localStorage="acknowledged", banner disappears
                           └─ Opt Out → localStorage="opted-out", disableGA4(), banner disappears
```

## Future Extensibility

When adding Meta Pixel or Microsoft Ads:
1. Add `loadMetaPixel()` / `loadMSAds()` to `src/utils/analytics.js`
2. Call them from `initAnalytics()` alongside `loadGA4()`
3. Add corresponding `disable` functions for opt-out
4. Optionally add category-based consent (analytics vs advertising) to the banner
