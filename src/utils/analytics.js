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
    catch { return true; }
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
