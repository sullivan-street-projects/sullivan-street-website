const GA4_ID = 'G-S025DFF5N0';
const CLARITY_ID = 'r8b7ctb5d6';
const REB2B_KEY = '4N210HX7X96Z';
const CONSENT_KEY = 'cookie-consent';

// Booking links live on TWO hosts and both must fire `book_call_click`:
// the branded `call.` domain (what the site CTA uses) and the raw tidycal.com
// URL, which is still baked into decks, email signatures and old links in the
// wild. Matching only the site's own href would undercount real booking intent.
const BOOKING_LINK_SELECTOR = [
  'a[href*="call.sullivanstreetprojects.com"]',
  'a[href*="tidycal.com/sullivan-street-projects"]',
].join(',');

// On-page asks that only scroll to #contact (Hero button, nav-pill "Call").
// Tagged with `data-cta="<location>"` at the source rather than matched by
// href, so the location travels with the element and a future third ask is
// one attribute away.
const CTA_ANCHOR_SELECTOR = 'a[data-cta]';

// The ONLY hosts analytics may run on. Deliberately an allowlist, not a
// blocklist: the previous blocklist covered localhost/127.0.0.1 but missed
// Hostinger preview domains, and `sienna-quetzal-509661.hostingersite.com`
// logged 19 events including a phantom booking-CTA click (found 2026-07-30).
// Preview hostnames are generated and unguessable, so they can never be
// enumerated ahead of time — anything not on this list is not real traffic.
const ANALYTICS_HOSTS = ['sullivanstreetprojects.com', 'www.sullivanstreetprojects.com'];

function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

/**
 * Initialize analytics on app boot. Checks localStorage for opt-out.
 * If not opted out, sets consent to granted and loads GA4 + Clarity.
 * If opted out, sets consent to denied and skips both.
 */
export function initAnalytics() {
  // Dev and preview sessions were polluting GA4 (localhost:4321 was the
  // #2 traffic source, 2026-07-15). Analytics only runs on the real hosts.
  if (!ANALYTICS_HOSTS.includes(window.location.hostname)) {
    console.info(`[analytics] skipped on non-production host: ${window.location.hostname}`);
    return;
  }

  window.gtag = gtag;

  // Global Privacy Control: the privacy policy commits to honoring GPC,
  // so a browser-level signal counts as an opt-out for the whole stack.
  const gpcSignal = navigator.globalPrivacyControl === true;

  const isOptedOut =
    gpcSignal ||
    (() => {
      try {
        return localStorage.getItem(CONSENT_KEY) === 'opted-out';
      } catch {
        return true;
      }
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
    loadClarity();
    loadReb2b();
    trackBookingClicks();
    trackCtaClicks();
  }
}

/**
 * Engagement event for the on-page asks that never leave the site.
 * The Hero button and the nav pill both just scroll to #contact, so no
 * outbound-link event ever fired for them — we could not tell whether the
 * top-of-page asks were being used at all.
 *
 * Naming, per GA4's rules:
 *  - `click` is RESERVED (enhanced measurement owns it), so this is `cta_click`
 *  - snake_case, starts with a letter, letters/numbers/underscores only
 *  - names are case-sensitive; `cta_click` is the only spelling
 *  - deliberately NOT `book_call_click`: that stays a clean Key Event meaning
 *    "left for the booking page". Merging the two would inflate conversions.
 *
 * `cta_location` must be registered in GA4 as a custom dimension before it
 * appears in standard reports — the data is collected either way, but the
 * hero-vs-nav split stays invisible until that's done.
 */
function trackCtaClicks() {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest(CTA_ANCHOR_SELECTOR);
    if (!anchor) return;
    const location = anchor.dataset.cta;
    gtag('event', 'cta_click', {
      cta_location: location,
      link_url: anchor.getAttribute('href'),
    });
    // Clarity events carry no parameters, so the location goes in the name.
    if (window.clarity) window.clarity('event', `cta_click_${location}`);
  });
}

/**
 * First-party conversion event for the TidyCal booking CTA.
 * GA4's enhanced-measurement `click` lumps all outbound links together
 * (AI-summary links included) — `book_call_click` isolates booking intent
 * and is marked as a GA4 Key Event. Mirrored to Clarity for session filtering.
 *
 * Matches BOTH booking hosts (see BOOKING_LINK_SELECTOR): changing the CTA
 * href without widening this selector silently kills the Key Event.
 */
function trackBookingClicks() {
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest(BOOKING_LINK_SELECTOR);
    if (!anchor) return;
    gtag('event', 'book_call_click', { link_url: anchor.href });
    if (window.clarity) window.clarity('event', 'book_call_click');
  });
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
  // Cross-domain linking: decorate outbound links to the TidyCal booking
  // surfaces with the _gl session parameter, so a visitor's original source
  // survives the hop and bookings attribute to the real channel. The
  // GA4-UI "Configure your domains" setting is the server-side complement
  // (covers the accepting side) — this covers the sending side in code.
  gtag('set', 'linker', {
    domains: ['sullivanstreetprojects.com', 'tidycal.com', 'call.sullivanstreetprojects.com'],
  });
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

/**
 * Dynamically load the Microsoft Clarity tracking script.
 * Safe to call multiple times — re-affirms consent if already loaded.
 * Uses Clarity's Consent API v2 to signal analytics_Storage granted.
 */
export function loadClarity() {
  if (window.clarity) {
    window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
    return;
  }

  // Official Microsoft Clarity snippet — creates window.clarity command queue
  // and async-loads the real tag. Commands pushed before load are buffered.
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', CLARITY_ID);

  // SSP does not run ads — ad_Storage stays denied regardless of user choice.
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
}

/**
 * RB2B visitor identification (person-level company/contact resolution).
 * Identifies individual visitors, so it rides the same consent gate as
 * GA4/Clarity — never load it without analytics consent. RB2B has no
 * consent-revoke API: opt-out means we don't load it, and a mid-session
 * opt-out takes effect on the next page load.
 * Safe to call multiple times — the window.reb2b stub guards double-load.
 */
export function loadReb2b() {
  if (window.reb2b) return;
  window.reb2b = { loaded: true };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://ddwl4m2hdecbv.cloudfront.net/b/${REB2B_KEY}/${REB2B_KEY}.js.gz`;
  document.head.appendChild(script);
}

/**
 * Revoke Clarity consent for mid-session opt-out.
 * Per Microsoft docs, clarity('consent', false) clears Clarity cookies
 * and restarts tracking in no-consent mode (no cookies, no cross-page session).
 */
export function disableClarity() {
  if (!window.clarity) return;
  window.clarity('consent', false);
}
