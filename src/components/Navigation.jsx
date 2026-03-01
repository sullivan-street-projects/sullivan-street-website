import React from 'react';
import { NAV_ITEMS, ANIMATION } from '../constants';
import { useLenis } from './SmoothScroll';

const Navigation = () => {
  const lenis = useLenis();

  const handleScroll = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: ANIMATION.SCROLL_OFFSET,
        duration: ANIMATION.SCROLL_DURATION
      });
    }
  };

  return (
    <nav
      className="fixed bottom-6 md:bottom-10 left-0 w-full z-[100] pointer-events-none pb-[env(safe-area-inset-bottom)]"
      aria-label="Main navigation"
    >
      <div className="flex justify-center pointer-events-auto">
        <div className="bg-charcoal/5 backdrop-blur-xl border border-charcoal/10 rounded-full p-1 flex items-center gap-1 shadow-2xl overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScroll(item.id)}
              className="px-3 py-3 md:px-5 md:py-2 rounded-full font-sans text-section-label uppercase tracking-wide text-charcoal/70 hover:text-charcoal hover:bg-white/60 transition-all font-bold whitespace-nowrap active:scale-95 flex items-center gap-2"
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.id === 'contact' && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green"></span>
                </span>
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
