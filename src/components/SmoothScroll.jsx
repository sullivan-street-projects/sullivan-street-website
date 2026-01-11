import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

// Section IDs to snap to (in order)
const SNAP_SECTIONS = ['approach', 'services', 'about', 'contact'];
const HEADER_OFFSET = 80;

export const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const isSnapping = useRef(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    // Snap to nearest section when scrolling stops
    const handleScrollStop = () => {
      if (isSnapping.current) return;

      const scrollY = window.scrollY + HEADER_OFFSET;
      const windowHeight = window.innerHeight;

      // Find the section closest to the current viewport
      let closestSection = null;
      let closestDistance = Infinity;

      for (const id of SNAP_SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const distance = Math.abs(sectionTop - scrollY);

        // Only snap if we're within 40% of the viewport height of a section
        if (distance < windowHeight * 0.4 && distance < closestDistance) {
          closestDistance = distance;
          closestSection = el;
        }
      }

      // Snap if we found a close section and we're not already at it
      if (closestSection && closestDistance > 10) {
        isSnapping.current = true;
        lenisInstance.scrollTo(closestSection, {
          offset: -HEADER_OFFSET,
          duration: 0.8,
          onComplete: () => {
            isSnapping.current = false;
          }
        });
      }
    };

    // Debounced scroll stop detection
    lenisInstance.on('scroll', () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(handleScrollStop, 150);
    });

    let rafId;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
