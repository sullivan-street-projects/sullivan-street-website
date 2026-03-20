import Section from '../components/Section';
import TypewriterText from '../components/TypewriterText';
import CTAButton from '../components/CTAButton';
import { useLenis } from '../components/SmoothScroll';
import { ANIMATION, HEADING_DISPLAY_CLASSES, BODY_CLASSES } from '../constants';

const Hero = () => {
  const lenis = useLenis();

  return (
    <Section id="hero" divider={false} padding="pt-40 pb-32 md:pt-48 lg:pt-64 lg:pb-48">
      <div className="max-w-content">
        <h1 className={`${HEADING_DISPLAY_CLASSES} mb-8 md:mb-12`}>
          Marketing for Tomorrow's <br />
          <TypewriterText text="Billion-Dollar Brands" />
        </h1>
        <p className={`${BODY_CLASSES} mb-10`}>
          AI-powered strategy, media, and execution. <br className="hidden md:block" />
          Faster growth. Sharper focus. Higher profit.
        </p>
        <CTAButton onClick={() => {
          if (lenis) {
            lenis.scrollTo('#contact', {
              offset: ANIMATION.SCROLL_OFFSET,
              duration: ANIMATION.SCROLL_DURATION
            });
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'auto' });
          }
        }}>
          Schedule a call
        </CTAButton>
      </div>
    </Section>
  );
};

export default Hero;
