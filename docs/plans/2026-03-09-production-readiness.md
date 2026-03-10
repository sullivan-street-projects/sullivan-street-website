# Production Readiness Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship all pre-launch fixes so the SSP site is production-ready on Hostinger.

**Architecture:** 7 tasks covering SPA routing, SEO, accessibility, performance, and cleanup. All changes are in existing files except one new component (`NotFound.jsx`) and one new config file (`.htaccess`).

**Tech Stack:** React 18, Vite, Tailwind CSS v4, Framer Motion, Apache/LiteSpeed (Hostinger)

## Success Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | `public/.htaccess` exists with SPA rewrite rules | `Glob` for `public/.htaccess`, `Grep` for `RewriteRule ^ index.html` |
| 2 | `.htaccess` includes security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy) | `Grep` for all 4 header names in `public/.htaccess` |
| 3 | `public/sitemap.xml` contains 3 URLs with current date | `Grep` for `<url>` count = 3, `Grep` for `2026-03-09` |
| 4 | `src/pages/NotFound.jsx` exists with 404 content | `Glob` for file, `Grep` for `404` in file |
| 5 | `src/App.jsx` has lazy import for NotFound and `path="*"` catch-all route | `Grep` for `import('./pages/NotFound')` and `path="*"` in `src/App.jsx` |
| 6 | `index.html` has `og:site_name` meta tag | `Grep` for `og:site_name` in `index.html` |
| 7 | `index.html` has `theme-color` meta tag with value `#FAFAF8` | `Grep` for `theme-color` in `index.html` |
| 8 | `public/apple-touch-icon.png` exists and is linked in `index.html` | `Glob` for `public/apple-touch-icon.png`, `Grep` for `apple-touch-icon` in `index.html` |
| 9 | Mobile accordion button in `Services.jsx` has `aria-expanded` attribute | `Grep` for `aria-expanded={isExpanded}` in `src/sections/Services.jsx` |
| 10 | `Services.jsx` imports and uses custom `useReducedMotion` hook | `Grep` for `import useReducedMotion from '../hooks/useReducedMotion'` in `src/sections/Services.jsx` |
| 11 | All 4 Framer Motion animations in `Services.jsx` respect `prefersReducedMotion` | `Grep` for `prefersReducedMotion` count >= 5 in `src/sections/Services.jsx` (1 declaration + 4 usages) |
| 12 | `package.json` does not contain gsap, clsx, tailwind-merge, or autoprefixer | `Grep` for each package name in `package.json` — expect 0 matches |
| 13 | Email in `ContactConvergence.jsx` uses `.co` domain, not `.com` | `Grep` for `sullivanstreetprojects.co` in the file, `Grep` for `sullivanstreetprojects.com` returns 0 |
| 14 | `npm run build` succeeds with exit code 0 | Run `npm run build` via Bash |

---

### Task 1: SPA Routing & Security Headers (.htaccess)

**Files:**
- Create: `public/.htaccess`

**Step 1: Create .htaccess**

```apache
# HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# SPA catch-all: serve index.html for all non-file routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [QSA,L]

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

**Step 2: Verify file exists**

Run: `cat public/.htaccess | head -5`
Expected: Shows the HTTPS redirect block

**Step 3: Commit**

```bash
git add public/.htaccess
git commit -m "feat: add .htaccess for Hostinger SPA routing and security headers"
```

---

### Task 2: Update Sitemap

**Files:**
- Modify: `public/sitemap.xml`

**Step 1: Replace sitemap content**

Replace the entire file with:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sullivanstreetprojects.com/</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sullivanstreetprojects.com/privacy-policy</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://sullivanstreetprojects.com/terms-and-conditions</loc>
    <lastmod>2026-03-09</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

**Step 2: Verify**

Run: `grep -c '<url>' public/sitemap.xml`
Expected: `3`

**Step 3: Commit**

```bash
git add public/sitemap.xml
git commit -m "fix: update sitemap with all routes and current date"
```

---

### Task 3: 404 Catch-All Route

**Files:**
- Create: `src/pages/NotFound.jsx`
- Modify: `src/App.jsx` — line 22 (add lazy import after TermsConditions), line 93 (add catch-all route after last route)

**Step 1: Create NotFound component**

```jsx
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-6xl text-charcoal mb-4">404</h1>
        <p className="font-sans text-body text-muted mb-8">
          This page doesn't exist.
        </p>
        <Link
          to="/"
          className="font-sans text-body-sm text-charcoal underline underline-offset-4 hover:text-muted transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Add lazy import to App.jsx**

After line 22 (`const TermsConditions = React.lazy(() => import('./pages/TermsConditions'));`), add:

```jsx
const NotFound = React.lazy(() => import('./pages/NotFound'));
```

**Step 3: Add catch-all route to App.jsx**

After line 93 (`<Route path="/terms-and-conditions" element={<TermsConditions />} />`), add:

```jsx
          <Route path="*" element={<NotFound />} />
```

**Step 4: Run build to verify**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 5: Commit**

```bash
git add src/pages/NotFound.jsx src/App.jsx
git commit -m "feat: add 404 catch-all route"
```

---

### Task 4: Meta Tags & Apple Touch Icon

**Files:**
- Copy: `brand/favicon/apple-touch-icon-180.png` → `public/apple-touch-icon.png`
- Modify: `index.html` — after line 24 (og:image:type), after line 38 (favicon)

**Step 1: Copy apple-touch-icon to public/**

Run: `cp brand/favicon/apple-touch-icon-180.png public/apple-touch-icon.png`

**Step 2: Add og:site_name after line 24**

After `<meta property="og:image:type" content="image/png">` (line 24), add:

```html
    <meta property="og:site_name" content="Sullivan Street Projects">
```

**Step 3: Add theme-color and apple-touch-icon after line 38**

After the `<link rel="icon" type="image/svg+xml" ...>` line (line 38), add:

```html
    <meta name="theme-color" content="#FAFAF8">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**Step 4: Verify meta tags**

Run: `grep -c 'og:site_name\|theme-color\|apple-touch-icon' index.html`
Expected: `3`

**Step 5: Commit**

```bash
git add index.html public/apple-touch-icon.png
git commit -m "feat: add og:site_name, theme-color, and apple-touch-icon"
```

---

### Task 5: Services.jsx Accessibility

**Files:**
- Modify: `src/sections/Services.jsx`

**Context:** The desktop expand/collapse button (line 191) already has `aria-expanded={isDesktopExpanded}`. Only the mobile accordion button (line 65) is missing it. The project uses a custom `useReducedMotion` hook at `src/hooks/useReducedMotion.js` — NOT framer-motion's built-in hook.

**Step 1: Add aria-expanded to mobile accordion button**

At lines 65-67, change:

```jsx
                  <button
                    onClick={() => setExpandedTier(isExpanded ? null : tier.id)}
                    className="w-full py-6 flex items-start justify-between text-left"
```

to:

```jsx
                  <button
                    onClick={() => setExpandedTier(isExpanded ? null : tier.id)}
                    aria-expanded={isExpanded}
                    className="w-full py-6 flex items-start justify-between text-left"
```

**Step 2: Add useReducedMotion import**

After line 2 (`import { motion, AnimatePresence } from 'framer-motion';`), add:

```jsx
import useReducedMotion from '../hooks/useReducedMotion';
```

Do NOT modify the framer-motion import line.

**Step 3: Add useReducedMotion hook call**

After line 20 (`const lenis = useLenis();`), add:

```jsx
  const prefersReducedMotion = useReducedMotion();
```

**Step 4: Apply reduced motion to all 4 Framer Motion animations**

Mobile chevron (lines 81-82):
```jsx
                      animate={{ rotate: prefersReducedMotion ? 0 : (isExpanded ? 90 : 0) }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
```

Mobile accordion (line 95):
```jsx
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
```

Desktop chevron (lines 205-206):
```jsx
              animate={{ rotate: prefersReducedMotion ? 0 : (isDesktopExpanded ? 180 : 0) }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
```

Desktop expand/collapse (line 219):
```jsx
                transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
```

**Step 5: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

**Step 6: Commit**

```bash
git add src/sections/Services.jsx
git commit -m "fix: add aria-expanded and useReducedMotion to Services accordion"
```

---

### Task 6: Remove Unused Dependencies

**Files:**
- Modify: `package.json` and `package-lock.json` (via npm uninstall)

**Context:** None of these 4 packages are imported anywhere in `src/`. No `postcss.config` file exists (Tailwind v4 uses the Vite plugin directly). Safe to remove.

**Step 1: Uninstall unused packages**

Run: `npm uninstall gsap clsx tailwind-merge autoprefixer`

**Step 2: Verify removal**

Run: `grep -c '"gsap"\|"clsx"\|"tailwind-merge"\|"autoprefixer"' package.json`
Expected: `0`

**Step 3: Verify build still works**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused dependencies (gsap, clsx, tailwind-merge, autoprefixer)"
```

---

### Task 7: Fix Playground Email Typo

**Files:**
- Modify: `src/playground/variants/ContactConvergence.jsx` — line 120

**Context:** The website domain is `sullivanstreetprojects.com` but the email domain is `sullivanstreetprojects.co` (the `.co` TLD). The playground variant has the wrong email domain. Note: PrivacyPolicy.jsx and TermsConditions.jsx reference the website URL as `.com` — that is correct and should NOT be changed.

**Step 1: Fix email domain**

At line 120, change:

```jsx
            href="mailto:hello@sullivanstreetprojects.com"
```

to:

```jsx
            href="mailto:hello@sullivanstreetprojects.co"
```

**Step 2: Verify the fix**

Run: `grep -n "sullivanstreetprojects\.com" src/playground/variants/ContactConvergence.jsx`
Expected: No results

**Step 3: Commit**

```bash
git add src/playground/variants/ContactConvergence.jsx
git commit -m "fix: correct email domain typo in playground (.com → .co)"
```
