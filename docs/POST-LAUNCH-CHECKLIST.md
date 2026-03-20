# Post-Launch Checklist — Sullivan Street Projects

> Created: March 19, 2026
> Domain: sullivanstreetprojects.com

## Pre-Launch Verification (Completed)

- [x] Production build passes (`npm run build` — clean, no warnings)
- [x] Meta tags: title, description, OG, Twitter Card all set
- [x] SEO files: robots.txt, sitemap.xml, llms.txt, 404 page
- [x] Accessibility: WCAG AA contrast, focus-visible outlines, reduced-motion support
- [x] Security headers: HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Permissions-Policy
- [x] Legal: Privacy Policy, Terms & Conditions, Cookie Consent with GA4 gating
- [x] Structured data: JSON-LD (Organization, Service, WebSite)
- [x] Content: no placeholders, CTAs live (TidyCal booking), copyright dynamic
- [x] All external links have `rel="noopener noreferrer"`
- [x] HTTPS redirect enforced in .htaccess

---

## Day 1 — Immediate Post-Deploy

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add **Domain property**: `sullivanstreetprojects.com` (covers all subdomains, http/https, www/non-www)
- [ ] Verify via **DNS TXT record** (most reliable — persists independently of code)
- [ ] Also add **URL prefix** property (`https://sullivanstreetprojects.com`) as backup — verify via HTML file upload to `/public/`
- [ ] Submit sitemap: `https://sullivanstreetprojects.com/sitemap.xml`
- [ ] URL Inspection → "Request Indexing" on homepage
- [ ] URL Inspection → "Request Indexing" on `/privacy-policy`
- [ ] URL Inspection → "Request Indexing" on `/terms-and-conditions`
- [ ] After 48-72 hours: check "Pages" report to confirm Google can render SPA content

> **SPA note:** Google uses a two-pass crawl — fetches raw HTML first, then queues JS rendering separately (can take hours to weeks). Your `index.html` has good static meta tags and JSON-LD, which helps the first pass. Confirm the `.htaccess` SPA catch-all works on the live server by loading `/privacy-policy` directly.

### Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmasters
- [ ] Import from Google Search Console (saves doing verification twice)
- [ ] Confirm sitemap was imported
- [ ] Set up IndexNow (see IndexNow section below)

> **Why Bing matters in 2026:** ChatGPT Search primarily uses Bing's index. Good Bing indexing increases your odds of being cited by ChatGPT and Microsoft Copilot.

### Social Preview Verification
- [ ] **Facebook/Meta**: https://developers.facebook.com/tools/debug/ — paste URL, click "Scrape Again"
- [ ] **LinkedIn**: https://www.linkedin.com/post-inspector/ — paste URL to preview
- [ ] **Twitter/X**: https://cards-dev.twitter.com/validator — verify summary_large_image card
- [ ] **Multi-platform**: https://www.opengraph.xyz — previews across all platforms at once
- [ ] Paste URL into Slack — confirm OG image + title render
- [ ] Paste URL into iMessage / WhatsApp — confirm link preview
- [ ] Verify `https://sullivanstreetprojects.com/og-image.png` resolves (OG image must be accessible)

> **Cache gotcha:** Slack caches ~30 min. Facebook/LinkedIn cache indefinitely until you manually re-scrape. LinkedIn is the most stubborn — if stale, append `?v=2` to the og:image URL.

### SSL & Security Headers
- [ ] Run https://securityheaders.com — confirm all headers green
- [ ] Run https://www.ssllabs.com/ssltest/ — confirm TLS grade A or A+
- [ ] Verify HTTPS redirect works (visit http:// → should redirect to https://)

### Uptime Monitoring
- [ ] Set up **UptimeRobot** (free): https://uptimerobot.com
  - Monitor 1: HTTPS check on `https://sullivanstreetprojects.com`
  - Monitor 2: Keyword check — verify response contains "Sullivan Street" (catches silent failures)
  - Enable SSL certificate expiry monitoring (free tier includes this)
- [ ] Configure alerts: email + Slack (if you use Slack)

### Email Deliverability (SPF / DKIM / DMARC)
Your contact email is `hello@sullivanstreetprojects.co`. Without email authentication, replies and outreach will increasingly land in spam. Google and Microsoft now require SPF or DKIM for all senders.

- [ ] **SPF** — Add DNS TXT record to `sullivanstreetprojects.co`:
  ```
  v=spf1 include:{your-email-provider} ~all
  ```
  (e.g., `include:_spf.google.com` for Google Workspace, `include:spf.protection.outlook.com` for Microsoft 365)

- [ ] **DKIM** — Add the CNAME/TXT records your email provider generates (cryptographically signs outgoing mail)

- [ ] **DMARC** — Add DNS TXT record to `sullivanstreetprojects.co` (set up SPF + DKIM first, wait 48 hours):
  ```
  v=DMARC1; p=none; rua=mailto:dmarc-reports@sullivanstreetprojects.co
  ```
  Start with `p=none` (monitor mode) for 2-4 weeks, then move to `p=quarantine`, then `p=reject`.

- [ ] Verify with https://mxtoolbox.com (SPF, DKIM, DMARC lookup tools)
- [ ] Send a test email to https://mail-tester.com for a full deliverability score

---

## First Week

### Analytics Verification
- [ ] Visit site with cookie consent accepted
- [ ] Confirm real-time data appears in GA4 (`G-S025DFF5N0`)
- [ ] Verify cookie consent toggle blocks/unblocks GA script
- [ ] Test with consent rejected — confirm no GA network requests fire
- [ ] Set GA4 data retention to 14 months (default is 2 months)

### Core Web Vitals Baseline
- [ ] Run PageSpeed Insights on live production URL: https://pagespeed.web.dev
- [ ] Record LCP, INP, CLS scores for mobile and desktop
- [ ] 2026 tightened thresholds: **LCP < 2.0s**, **INP < 150ms**, **CLS < 0.08**
- [ ] Consider installing `web-vitals` npm package (~10 lines in main.jsx) to send real-user CWV data to GA4

### Structured Data Validation
- [ ] **Rich Results Test**: https://search.google.com/test/rich-results — paste live URL
- [ ] **Schema Validator**: https://validator.schema.org/ — catches syntax errors Rich Results Test might miss
- [ ] Consider adding `"sameAs"` to Organization schema with LinkedIn/Twitter profile URLs
- [ ] Consider adding a square logo (112x112px min) — Google recommends square for the `"logo"` field vs the 1200x630 OG image

### Functional Spot-Check
- [ ] Test TidyCal booking link opens correctly
- [ ] Test Privacy Policy page loads at `/privacy-policy`
- [ ] Test Terms page loads at `/terms-and-conditions`
- [ ] Test 404 page renders for invalid URLs
- [ ] Test smooth scroll from Hero CTA to Contact section
- [ ] Test on iOS Safari (real device)
- [ ] Test on Android Chrome (real device)
- [ ] Run broken link check: https://www.deadlinkchecker.com
- [ ] Run accessibility audit on live URL: https://wave.webaim.org/
- [ ] Run favicon check: https://realfavicongenerator.net/favicon_checker

---

## First Month

### Search Console Monitoring
- [ ] Check "Pages" report for crawl errors or excluded pages
- [ ] Check "Core Web Vitals" report (needs ~28 days of field data)
- [ ] Monitor "Performance" for initial impressions, clicks, avg position
- [ ] Check "Enhancements" for structured data errors found during actual crawling
- [ ] Check for any manual actions or security issues
- [ ] 2026: Check AI Overviews data in Performance report (new — shows when your site appears in AI answers)

### Google Business Profile
Even without a physical storefront, GBP data feeds into Google AI Overviews and the Knowledge Panel.

- [ ] Claim listing at https://business.google.com
- [ ] Select "Service area business" (hides street address, shows service area)
- [ ] Category: "Marketing consultant" or "Marketing agency"
- [ ] Set website URL to `https://sullivanstreetprojects.com`
- [ ] Add contact info, hours, service area, description, photos
- [ ] Verification: likely requires video call or postcard to 1178 Broadway address

### IndexNow Protocol
Instant indexing for Bing, Yandex, Naver, Seznam. Google does NOT support IndexNow as of March 2026.

- [ ] Generate API key at https://www.bing.com/indexnow/getstarted
- [ ] Create key file at `/public/{your-key}.txt` containing just the key string
- [ ] After each deploy, submit via GET request:
  ```
  curl "https://api.indexnow.org/indexnow?url=https://sullivanstreetprojects.com/&key={your-key}"
  ```
  (Submitting to api.indexnow.org notifies ALL participating search engines at once)

### AI Search Presence
There is NO formal registration for any AI search engine (Perplexity, ChatGPT, Google AI Overviews, Claude). What drives citations:

- [x] `robots.txt` allows GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot — already done
- [x] `llms.txt` with structured company overview — already done
- [x] JSON-LD structured data — already done
- [ ] Monitor AI citations at https://www.amicited.com (tracks if AI tools cite your site)
- [ ] Keep content authoritative and well-structured — 99.5% of AI Overview sources come from pages already in Google's top 10

### Ongoing
- [ ] Review GA4 conversion events monthly
- [ ] Keep sitemap.xml lastmod dates current when content changes
- [ ] Keep llms.txt current when services/positioning changes (currently shows 2026-03-06)
- [ ] DMARC: after 2-4 weeks of monitoring, escalate from `p=none` → `p=quarantine` → `p=reject`
