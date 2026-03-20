import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import useReducedMotion from '../hooks/useReducedMotion';

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenisInstance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    setLenis(lenisInstance);

    let rafId;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
};
