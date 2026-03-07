# GA4 + Cookie Consent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add GA4 tracking with a US-style opt-out consent banner — GA4 loads by default, users can opt out via a scroll-triggered bottom bar.

**Architecture:** An analytics utility initializes Google Consent Mode v2 and loads GA4 immediately on boot (unless the user previously opted out). A React banner component appears on first scroll for new visitors, offering OK (dismiss) or Opt Out. Consent state persists in localStorage.

**Tech Stack:** React 18, Framer Motion (animation), Tailwind CSS v4 (styling), Google Analytics 4 (gtag.js), Google Consent Mode v2

---

### Task 1: Create the Analytics Utility

**Files:**
- Create: `src/utils/analytics.js`

**Step 1: Create the analytics module**

```js
const GA4_ID = 'G-S025DFF5N0';
const CONSENT_KEY = 'cookie-consent';

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

/**
 * Initialize analytics on app boot. Checks localStorage for opt-out.
 * If not opted out, sets consent to granted and loads GA4 immediately.
 * If opted out, sets consent to denied and skips GA4.
 */
export function initAnalytics() {
  window.gtag = gtag;

  const isOptedOut = (() => {
    try { return localStorage.getItem(CONSENT_KEY) === 'opted-out'; }
    catch { return false; }
  })();

  if (isOptedOut) {
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  } else {
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    loadGA4();
  }
}

/**
 * Dynamically load the GA4 script.
 * Safe to call multiple times — only injects the script once.
 */
export function loadGA4() {
  if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  script.async = true;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA4_ID);
}

/**
 * Revoke analytics consent for mid-session opt-out.
 * Updates Consent Mode and removes GA cookies.
 */
export function disableGA4() {
  gtag('consent', 'update', {
    analytics_storage: 'denied',
  });

  // Remove GA cookies
  document.cookie.split(';').forEach((c) => {
    const name = c.trim().split('=')[0];
    if (name.startsWith('_ga')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    }
  });
}
```

**Step 2: Verify module exports**

Run: `grep -c "export function" src/utils/analytics.js`

Expected: `3` (initAnalytics, loadGA4, disableGA4)

**Step 3: Commit**

```bash
git add src/utils/analytics.js
git commit -m "Add analytics utility with opt-out consent model and GA4 loader"
```

---

### Task 2: Create the Cookie Consent Banner Component

**Files:**
- Create: `src/components/CookieConsent.jsx`

**Context:**
- The site uses `useReducedMotion()` from Framer Motion for accessibility — see `src/components/FocusText.jsx` for the pattern.
- Design tokens are in `src/index.css` — use Tailwind classes like `bg-charcoal`, `text-paper`, `font-sans`, `text-ui`.
- The banner should match the SSP editorial aesthetic — minimal, refined.

**Step 1: Create the component**

```jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { disableGA4 } from '../utils/analytics';

const CONSENT_KEY = 'cookie-consent';

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch {}
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const consent = getConsent();

    // Returning visitor with stored preference — don't show banner
    if (consent === 'acknowledged' || consent === 'opted-out') return;

    // First-time visitor — show banner on first scroll
    const handleScroll = () => {
      setVisible(true);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOk = () => {
    setConsent('acknowledged');
    setVisible(false);
  };

  const handleOptOut = () => {
    setConsent('opted-out');
    disableGA4();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[100] bg-charcoal/95 backdrop-blur-sm px-6 py-4 md:px-10 md:py-5"
        >
          <div className="max-w-site mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-paper/90 font-sans text-ui leading-relaxed max-w-prose">
              We use cookies to understand how visitors engage with our site.{' '}
              <Link
                to="/privacy-policy"
                className="underline underline-offset-2 text-paper hover:text-paper/70 transition-colors"
              >
                Privacy Policy
              </Link>
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleOptOut}
                className="px-4 py-2 text-ui font-sans font-medium text-paper/70 border border-paper/30 rounded hover:text-paper hover:border-paper/60 transition-colors cursor-pointer"
              >
                Opt Out
              </button>
              <button
                onClick={handleOk}
                className="px-4 py-2 text-ui font-sans font-medium text-charcoal bg-paper rounded hover:bg-paper/90 transition-colors cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/CookieConsent.jsx
git commit -m "Add cookie consent banner with opt-out model and scroll trigger"
```

---

### Task 3: Wire Analytics into App Boot

**Files:**
- Modify: `src/main.jsx` (add `initAnalytics()` call before render)

**Step 1: Update main.jsx**

The file currently looks like this:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

Add the import and call `initAnalytics()` before `ReactDOM.createRoot()`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { initAnalytics } from './utils/analytics'
import './index.css'

initAnalytics()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

**Step 2: Commit**

```bash
git add src/main.jsx
git commit -m "Initialize GA4 analytics on app boot with opt-out check"
```

---

### Task 4: Mount the Consent Banner in App.jsx

**Files:**
- Modify: `src/App.jsx` (add `<CookieConsent />` at root level)

**Step 1: Import and mount CookieConsent**

Add the import at the top of `App.jsx`:

```jsx
import CookieConsent from './components/CookieConsent';
```

Mount it inside the `App` component, outside `<Routes>` so it appears on all pages:

```jsx
export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </ErrorBoundary>
  );
}
```

**Step 2: Commit**

```bash
git add src/App.jsx
git commit -m "Mount cookie consent banner at app root"
```

---

### Task 5: Verification

**No files modified — verification only.**

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Test first-visit flow (default — GA4 active)**

1. Open DevTools → Application → Local Storage → delete `cookie-consent` key
2. Load `http://localhost:5173`
3. Verify: banner is NOT visible on load
4. Check Network tab: `googletagmanager.com/gtag/js?id=G-S025DFF5N0` should already be loading
5. Scroll down slightly
6. Verify: banner slides in from bottom
7. Click "OK"
8. Verify: banner disappears, `cookie-consent` = `"acknowledged"` in localStorage
9. GA4 continues running (no interruption)

**Step 3: Test opt-out flow**

1. Clear localStorage `cookie-consent` key
2. Reload page, scroll to trigger banner
3. Click "Opt Out"
4. Verify: banner disappears, `cookie-consent` = `"opted-out"` in localStorage
5. Verify: consent updated to denied (check `window.dataLayer` for consent update event)

**Step 4: Test returning visitor (acknowledged)**

1. Ensure localStorage `cookie-consent` = `"acknowledged"`
2. Reload page
3. Verify: no banner appears, GA4 loads normally

**Step 5: Test returning visitor (opted out)**

1. Set localStorage `cookie-consent` to `"opted-out"`
2. Reload page
3. Verify: no banner appears, no GA4 script loads (check Network tab)

**Step 6: Test reduced motion**

1. DevTools → Rendering → check "Emulate CSS prefers-reduced-motion: reduce"
2. Clear localStorage, reload, scroll
3. Verify: banner appears with fade only (no slide animation)

**Step 7: Test on legal pages**

1. Navigate to `/privacy-policy`
2. Verify: banner still works (scroll-triggered, app-level)
3. Verify: "Privacy Policy" link in banner navigates correctly

**Step 8: Build verification**

Run: `npm run build`

Verify: no build errors, `dist/index.html` contains no hardcoded GA4 scripts.

**Step 9: Commit (if fixes needed)**

```bash
git add -A
git commit -m "Fix issues found during consent banner verification"
```

---

## Success Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | `src/utils/analytics.js` exists with 3 exported functions | `grep -c "export function" src/utils/analytics.js` returns `3` |
| 2 | `src/components/CookieConsent.jsx` exists and imports `disableGA4` | `grep "disableGA4" src/components/CookieConsent.jsx` returns a match |
| 3 | `main.jsx` calls `initAnalytics()` before `ReactDOM.createRoot()` | `grep -n "initAnalytics\|createRoot" src/main.jsx` shows initAnalytics on an earlier line |
| 4 | `App.jsx` mounts `<CookieConsent />` outside Routes | `grep "CookieConsent" src/App.jsx` returns matches for import and JSX |
| 5 | GA4 Measurement ID is `G-S025DFF5N0` | `grep "G-S025DFF5N0" src/utils/analytics.js` returns a match |
| 6 | Consent default is `granted` for `analytics_storage` (opt-out model) | `grep -A1 "analytics_storage" src/utils/analytics.js` shows `'granted'` in the non-opted-out branch |
| 7 | Banner uses `"acknowledged"` and `"opted-out"` localStorage values | `grep -c "acknowledged\|opted-out" src/components/CookieConsent.jsx` returns at least 3 |
| 8 | Banner respects `prefers-reduced-motion` | `grep "useReducedMotion" src/components/CookieConsent.jsx` returns a match |
| 9 | No GA4 script in `index.html` | `grep -c "googletagmanager\|gtag" index.html` returns `0` |
| 10 | `npm run build` succeeds | Exit code 0 |
