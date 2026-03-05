import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.25, 0.1, 0.25, 1];

const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

const StatementMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative bg-paper py-40 md:py-52 lg:py-64" aria-label="Statement">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-narrow mx-auto text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-14 md:mb-20">
              <span className="w-8 h-px bg-charcoal/20" />
              <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold">
                Thesis
              </span>
              <span className="w-8 h-px bg-charcoal/20" />
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl leading-snug tracking-tight text-charcoal">
              Most growth-stage companies have agencies, freelancers, and tools.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl leading-snug tracking-tight text-charcoal italic mt-4 md:mt-6">
              What they don't have is someone owning the outcome.
            </p>
          </FadeUp>

          <motion.div
            className="w-px h-12 md:h-16 bg-charcoal/15 mx-auto my-12 md:my-16"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          />

          <FadeUp delay={0.55}>
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light max-w-prose mx-auto">
              We're the AI-native growth partner that aligns brand, performance, systems, and talent under one team — and stays accountable to revenue, not a percentage of your ad spend.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default StatementMinimalist;
