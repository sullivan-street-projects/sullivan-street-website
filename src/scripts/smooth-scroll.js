import Lenis from 'lenis';
import { ANIMATION } from '../constants';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;

if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 2,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

// React islands (Services CTA) and per-component scripts (Header wordmark)
// reach Lenis through this global instead of the old React Context.
window.__lenis = lenis;

// One delegated handler replaces the per-component useLenis() click handlers
// (Navigation pills, Hero CTA). Anchors that need native jump behavior
// (e.g. the keyboard skip link) opt out with data-native-anchor.
document.addEventListener('click', (event) => {
  if (!lenis) return;
  const anchor = event.target.closest('a[href^="#"]');
  if (!anchor || anchor.hasAttribute('data-native-anchor')) return;
  const hash = anchor.getAttribute('href');
  if (hash.length < 2 || !document.querySelector(hash)) return;
  event.preventDefault();
  lenis.scrollTo(hash, {
    offset: ANIMATION.SCROLL_OFFSET,
    duration: ANIMATION.SCROLL_DURATION,
  });
});
