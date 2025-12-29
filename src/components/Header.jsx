import React from 'react';
import { useLenis } from './SmoothScroll';

const Header = () => {
  const lenis = useLenis();

  return (
    <header className="fixed top-0 left-0 w-full z-[80] bg-[#FAFAF8]/80 backdrop-blur-md transition-all duration-300 border-b border-[#e5e5e5]/50">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <button 
          onClick={() => lenis?.scrollTo(0, { duration: 1.5 })}
          className="font-serif text-xl pointer-events-auto hover:opacity-60 transition-opacity text-[#1a1a1a]"
        >
          Sullivan Street Projects
        </button>
      </div>
    </header>
  );
};

export default Header;
