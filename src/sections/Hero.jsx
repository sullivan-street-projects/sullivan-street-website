import React from 'react';
import TypewriterText from '../components/TypewriterText';
import FocusText from '../components/FocusText';
import CTAButton from '../components/CTAButton';
import { useLenis } from '../components/SmoothScroll';
import { ANIMATION } from '../constants';

const Hero = () => {
  const lenis = useLenis();

  return (
    <header id="hero" className="max-w-site w-full mx-auto px-6 lg:px-8 pt-40 pb-32 md:pt-48 lg:pt-64 lg:pb-48">
      <div className="max-w-content">
        <FocusText noBlur={true}>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-display leading-[1.26] tracking-tight mb-8 md:mb-12 text-charcoal">
            Marketing for Tomorrow's <br />
            <TypewriterText text="Billion-Dollar Brands" />
          </h1>
        </FocusText>
        <FocusText noBlur={true}>
          <p className="font-sans text-body md:text-body-lg leading-relaxed mb-10 text-secondary font-light">
            AI-powered strategy, media, and execution. <br className="hidden md:block" />
            Faster growth. Sharper focus. Higher profit.
          </p>
        </FocusText>
        <FocusText noBlur={true}>
          <CTAButton onClick={() => lenis?.scrollTo('#contact', {
            offset: ANIMATION.SCROLL_OFFSET,
            duration: ANIMATION.SCROLL_DURATION
          })}>
            Schedule a call
          </CTAButton>
        </FocusText>
      </div>
    </header>
  );
};

export default Hero;
