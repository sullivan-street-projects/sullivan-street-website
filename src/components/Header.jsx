import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLenis } from './SmoothScroll';
import { ANIMATION } from '../constants';

const Header = () => {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (location.pathname === '/') {
      if (lenis) {
        lenis.scrollTo(0, { duration: ANIMATION.SCROLL_DURATION });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[80] bg-paper/80 backdrop-blur-md transition-all duration-300 border-b border-divider/50">
      <div className="max-w-site mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <button
          onClick={handleClick}
          className="font-serif text-xl pointer-events-auto hover:opacity-60 transition-opacity text-charcoal"
          aria-label={location.pathname === '/' ? 'Scroll to top' : 'Go to homepage'}
        >
          Sullivan Street Projects
        </button>
      </div>
    </header>
  );
};

export default Header;
