import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from '../components/TypewriterText';
import FocusText from '../components/FocusText';
import { useLenis } from '../components/SmoothScroll';

const Hero = () => {
  const lenis = useLenis();

  return (
    <header className="max-w-[1200px] w-full mx-auto px-6 lg:px-8 pt-40 pb-32 md:pt-48 lg:pt-64 lg:pb-48">
      <div className="max-w-[1000px]">
        <FocusText noBlur={true}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[76px] leading-[1.26] tracking-tight mb-8 md:mb-12 text-[#1a1a1a]">
            Marketing for Tomorrow’s <br />
            <TypewriterText text="Billion-Dollar Brands" />
          </h1>
        </FocusText>
        <FocusText noBlur={true}>
          <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed max-w-[650px] mb-12 md:mb-14 font-light">
            AI-powered strategy, media, and execution. Faster growth, sharper focus, higher profit.
          </p>
        </FocusText>
        <FocusText noBlur={true}>
          <div className="group relative inline-block">
            <button
              onClick={() => lenis?.scrollTo('#contact', { offset: -80, duration: 1.5 })}
              className="font-sans text-[12px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-4 hover:opacity-70 transition-all text-[#1a1a1a]"
            >
              Schedule a call
              <motion.span 
                animate={{ x: [0, 4, 0] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                className="text-lg"
              >→</motion.span>
            </button>
            <div className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-[#1a1a1a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </div>
        </FocusText>
      </div>
    </header>
  );
};

export default Hero;
