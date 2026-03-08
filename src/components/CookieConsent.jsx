import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { disableGA4, loadGA4 } from '../utils/analytics';

const CONSENT_KEY = 'cookie-consent';
const PREFS_KEY = 'cookie-preferences';

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

function setConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch {}
}

function getPrefs() {
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch { return null; }
}

function setPrefs(prefs) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(prefs)); } catch {}
}

const DEFAULT_PREFS = {
  analytics: true,
};

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

  useEffect(() => {
    const consent = getConsent();

    // Listen for manual open (footer link)
    const handleOpen = () => {
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

  const closeBanner = () => {
    setVisible(false);
    setShowPrefs(false);
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
    } else {
      setConsent('opted-out');
      disableGA4();
    }
    closeBanner();
  };

  const animationProps = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          {...animationProps}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[100] bg-charcoal/95 backdrop-blur-sm px-6 py-4 md:px-10 md:py-5"
        >
          <div className="max-w-site mx-auto">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-paper/90 font-sans text-ui leading-relaxed max-w-prose">
                We use cookies to understand how visitors engage with our site.{' '}
                <Link
                  to="/privacy-policy"
                  className="underline underline-offset-2 text-paper hover:text-paper/70 transition-colors"
                >
                  Privacy Policy
                </Link>
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
                  className="text-ui font-sans text-paper/50 underline underline-offset-2 hover:text-paper/70 transition-colors cursor-pointer"
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
                      description="Helps us understand how visitors use the site so we can improve it."
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
