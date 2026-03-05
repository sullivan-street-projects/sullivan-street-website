import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { PARTNER_OUTCOMES } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

const OutcomesImmersive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % PARTNER_OUTCOMES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + PARTNER_OUTCOMES.length) % PARTNER_OUTCOMES.length);
  }, []);

  const outcome = PARTNER_OUTCOMES[currentIndex];

  return (
    <section
      ref={ref}
      className="relative bg-charcoal min-h-screen flex items-center overflow-hidden"
      aria-label="Partner Outcomes"
      aria-roledescription="carousel"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-site mx-auto px-6 md:px-10 lg:px-16 w-full py-24 md:py-32">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold">
            Partner Outcomes
          </span>
        </motion.div>

        {/* Outcome display */}
        <div className="min-h-[280px] md:min-h-[240px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-paper leading-[1.2] tracking-tight font-light max-w-content">
                {outcome.metric}
              </p>
              <div className="w-12 h-px bg-paper/15 my-8 md:my-10" />
              <span className="font-sans text-section-label font-bold uppercase tracking-widest text-paper/40">
                {outcome.client}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 md:mt-20">
          {/* Progress */}
          <div className="flex gap-2">
            {PARTNER_OUTCOMES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="group relative h-1 w-12 bg-paper/10 overflow-hidden rounded-full"
                aria-label={`Go to outcome ${idx + 1}`}
              >
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
                    idx === currentIndex ? 'w-full bg-paper/60' : 'w-0 bg-paper/30'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-paper/15 flex items-center justify-center text-paper/40 hover:text-paper hover:border-paper/40 transition-colors"
              aria-label="Previous outcome"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-paper/15 flex items-center justify-center text-paper/40 hover:text-paper hover:border-paper/40 transition-colors"
              aria-label="Next outcome"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutcomesImmersive;
