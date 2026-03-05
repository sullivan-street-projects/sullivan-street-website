import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PARTNER_OUTCOMES } from '../../constants';

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

const OutcomesMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="Partner Outcomes">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <FadeUp>
          <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-10 md:mb-14">
            Partner Outcomes
          </span>
        </FadeUp>

        {/* Divider */}
        <motion.div
          className="h-px bg-charcoal/10 mb-12 md:mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.1 }}
        />

        {/* Two outcomes side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16">
          {PARTNER_OUTCOMES.map((outcome, idx) => (
            <FadeUp key={outcome.id} delay={0.2 + idx * 0.15}>
              <div className={`${idx === 0 ? 'lg:pr-12 lg:border-r lg:border-charcoal/10' : 'lg:pl-12'}`}>
                <blockquote>
                  <p className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal leading-[1.4] font-light">
                    {outcome.metric}
                  </p>
                </blockquote>
                <div className="w-8 h-px bg-charcoal/15 my-6" />
                <cite className="font-sans text-section-label font-bold uppercase tracking-widest text-label not-italic block">
                  {outcome.client}
                </cite>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesMinimalist;
