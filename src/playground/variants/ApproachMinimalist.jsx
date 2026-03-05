import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

const EASE = [0.25, 0.1, 0.25, 1];

const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

const ApproachMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="Approach">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <FadeUp>
          <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-10 md:mb-14">
            Approach
          </span>
        </FadeUp>

        {/* Headline */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight tracking-tight mb-8">
              Tailor made<br />
              <span className="italic">growth marketing.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light max-w-narrow">
              You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
            </p>
          </FadeUp>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-charcoal/10 mb-12 md:mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
        />

        {/* 4-column grid with ghost numerals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {CAPABILITIES.map((cap, idx) => (
            <FadeUp key={cap.title} delay={0.3 + idx * 0.1}>
              <div className={`lg:pr-8 ${idx < 3 ? 'lg:border-r lg:border-charcoal/10' : ''} ${idx > 0 ? 'lg:pl-8' : ''}`}>
                {/* Ghost numeral */}
                <span className="font-serif text-6xl md:text-7xl text-charcoal/[0.06] leading-none block mb-4 select-none" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-xl text-charcoal leading-tight mb-3">
                  {cap.title}
                </h3>
                <div className="w-8 h-px bg-charcoal/15 mb-4" />
                <p className="font-sans text-body-sm text-muted leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachMinimalist;
