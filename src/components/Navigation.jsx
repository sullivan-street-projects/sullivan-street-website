import React from 'react';
import { NAV_ITEMS } from '../constants';
import { useLenis } from './SmoothScroll';

const Navigation = () => {
  const lenis = useLenis();

  const handleScroll = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <nav className="fixed bottom-6 md:bottom-10 left-0 w-full z-[100] pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-center pointer-events-auto">
        <div className="bg-[#1a1a1a]/5 backdrop-blur-xl border border-[#1a1a1a]/10 rounded-full p-1 flex items-center gap-1 shadow-2xl overflow-hidden">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleScroll(item.id)}
              className="px-3 py-3 md:px-5 md:py-2 rounded-full font-sans text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-white/60 transition-all font-bold whitespace-nowrap active:scale-95 flex items-center gap-2"
            >
              {item.id === 'contact' && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4ADE80]"></span>
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
