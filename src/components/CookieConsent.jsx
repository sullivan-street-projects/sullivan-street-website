import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';
import { disableGA4, loadGA4, disableClarity, loadClarity, loadReb2b } from '../utils/analytics';

const CONSENT_KEY = 'cookie-consent';
const PREFS_KEY = 'cookie-preferences';

function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch (e) {
    console.warn('Could not save consent preference:', e);
  }
}

function getPrefs() {
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setPrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Could not save cookie preferences:', e);
  }
}

const DEFAULT_PREFS = {
  analytics: true,
};

const RAIL_VAR = '--consent-bar-height';
const RAIL_SETTLING = 'data-rail-settling';
const RAIL_SETTLE_MS = 400; // keep in sync with the transition in global.css

function setRail(value) {
  document.documentElement.style.setProperty(RAIL_VAR, value);
}

// The rail only animates for the discrete close. Any tracking write (the
// ResizeObserver following the preferences panel) must clear the flag first,
// or the nav would lag behind the banner it's supposed to stay clear of.
let settleTimer = null;

function stopSettling() {
  clearTimeout(settleTimer);
  document.documentElement.removeAttribute(RAIL_SETTLING);
}

function settleRailToRest() {
  const root = document.documentElement;
  clearTimeout(settleTimer);
  root.setAttribute(RAIL_SETTLING, '');
  setRail('0px');
  // Self-healing: if the banner re-opens mid-settle, the layout effect clears
  // the flag anyway, so a stale timer can never leave the rail animating.
  settleTimer = setTimeout(() => root.removeAttribute(RAIL_SETTLING), RAIL_SETTLE_MS + 100);
}

// Astro server-renders islands, so useLayoutEffect must not run on the server.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function Toggle({ checked, onChange, label, description, disabled }) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer">
      <div>
        <span className="text-ui font-sans font-medium text-paper">{label}</span>
        {description && (
          <p className="text-caption font-sans text-paper/50 mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={onChange}
        className={`relative shrink-0 w-9 h-5 rounded-full transition-colors ${
          checked ? 'bg-green' : 'bg-paper/20'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-paper transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefsState] = useState(DEFAULT_PREFS);
  const prefersReducedMotion = useReducedMotion();

  const barRef = useRef(null);
  // Focus is only moved for the user-initiated (footer) open, never for the
  // passive scroll-triggered one — see the region semantics below.
  const openerRef = useRef(null);
  const manualRef = useRef(false);

  useEffect(() => {
    const consent = getConsent();

    // Listen for manual open (footer link)
    const handleOpen = () => {
      openerRef.current = document.activeElement;
      manualRef.current = true;
      const stored = getPrefs();
      if (stored) setPrefsState(stored);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener('open-cookie-consent', handleOpen);

    if (consent !== 'acknowledged' && consent !== 'opted-out') {
      const handleScroll = () => {
        setVisible(true);
        window.removeEventListener('scroll', handleScroll);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('open-cookie-consent', handleOpen);
      };
    }

    return () => window.removeEventListener('open-cookie-consent', handleOpen);
  }, []);

  // Publish the height we occupy so .bottom-rail consumers (the nav pill)
  // lift clear of us. A layout effect, not useEffect: useEffect runs after
  // paint, which would show the banner over the nav for a frame.
  useIsomorphicLayoutEffect(() => {
    const el = barRef.current;
    if (!visible || !el) return;

    // Opening (or re-opening mid-settle): never animate the lift, or the nav
    // would slide up through the banner instead of being clear of it.
    stopSettling();

    let last = null;
    const publish = (height) => {
      const next = `${Math.ceil(height)}px`;
      if (next === last) return; // avoid redundant style invalidation
      last = next;
      setRail(next);
    };

    publish(el.getBoundingClientRect().height);

    // Guard: a throw here would take down the whole consent island, which
    // also gates analytics loading. Without ResizeObserver the nav lifts by
    // the collapsed height and won't track the preferences panel.
    if (!('ResizeObserver' in window)) return;

    const ro = new ResizeObserver(([entry]) => {
      const box = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
      publish(box?.blockSize ?? el.getBoundingClientRect().height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [visible]);

  // Move focus in only when the user asked for the banner (footer button).
  useEffect(() => {
    if (visible && manualRef.current) barRef.current?.focus();
  }, [visible]);

  // Escape dismisses without recording consent — analytics stay unloaded,
  // which is the privacy-safe default.
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeBanner();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  // A view transition or HMR must never strand a lifted nav (or a live timer).
  useEffect(
    () => () => {
      stopSettling();
      setRail('0px');
    },
    [],
  );

  const closeBanner = () => {
    setVisible(false);
    setShowPrefs(false);
    if (manualRef.current) {
      openerRef.current?.focus?.();
      manualRef.current = false;
    }
  };

  const handleGotIt = () => {
    setConsent('acknowledged');
    setPrefs(prefs);
    closeBanner();
  };

  const handleSavePrefs = () => {
    setPrefs(prefs);
    if (prefs.analytics) {
      setConsent('acknowledged');
      loadGA4();
      loadClarity();
      loadReb2b();
    } else {
      setConsent('opted-out');
      disableGA4();
      disableClarity();
      // RB2B has no revoke API — opt-out stops it on the next page load.
    }
    closeBanner();
  };

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      };

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Only now is the banner actually gone. Resetting when `visible`
        // flips would drop the nav while a full-height, still-opaque banner
        // is exiting on top of it, so the nav would dive behind the bar.
        // Nothing left to collide with, so this one write gets to animate.
        settleRailToRest();
      }}
    >
      {visible && (
        <motion.div
          ref={barRef}
          {...animationProps}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="region"
          aria-labelledby="cookie-consent-heading"
          tabIndex={-1}
          data-lenis-prevent
          className="consent-bar fixed bottom-0 left-0 right-0 z-[150] bg-charcoal/95 backdrop-blur-sm px-6 pt-4 md:px-10 md:pt-5"
        >
          <div className="max-w-site mx-auto">
            <h2 id="cookie-consent-heading" className="sr-only">
              Cookie consent
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-paper/90 font-sans text-ui leading-relaxed max-w-prose">
                We use cookies to understand how visitors engage with our site.{' '}
                <a
                  href="/privacy-policy"
                  className="underline underline-offset-2 text-paper hover:text-paper/70 transition-colors"
                >
                  Privacy Policy
                </a>
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 shrink-0">
                <button
                  onClick={showPrefs ? handleSavePrefs : handleGotIt}
                  className="w-full sm:w-auto order-first sm:order-last px-4 py-2 text-ui font-sans font-medium text-charcoal bg-paper rounded hover:bg-paper/90 transition-colors cursor-pointer"
                >
                  {showPrefs ? 'Save' : 'OK'}
                </button>
                <button
                  onClick={() => setShowPrefs(!showPrefs)}
                  className={`text-ui font-sans text-paper/50 underline underline-offset-2 hover:text-paper/70 transition-colors cursor-pointer ${showPrefs ? 'hidden sm:block' : ''}`}
                >
                  Privacy Preferences
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showPrefs && (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-paper/10 space-y-3">
                    <Toggle
                      label="Essential"
                      description="Required for the site to function. Cannot be disabled."
                      checked={true}
                      disabled={true}
                    />
                    <Toggle
                      label="Analytics"
                      description="Pageview metrics, session replays (with form fields masked), and business visitor identification so we can understand and improve the site."
                      checked={prefs.analytics}
                      onChange={() => setPrefsState({ ...prefs, analytics: !prefs.analytics })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
