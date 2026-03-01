import React from 'react';
import { useLenis } from './SmoothScroll';
import { ANIMATION } from '../constants';

const Header = () => {
  const lenis = useLenis();

  return (
    <header className="fixed top-0 left-0 w-full z-[80] bg-paper/80 backdrop-blur-md transition-all duration-300 border-b border-divider/50">
      <div className="max-w-site mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          onClick={() => lenis?.scrollTo(0, { duration: ANIMATION.SCROLL_DURATION })}
          className="font-serif text-xl pointer-events-auto hover:opacity-60 transition-opacity text-charcoal"
          aria-label="Scroll to top"
        >
          Sullivan Street Projects
        </button>
      </div>
    </header>
  );
};

export default Header;
