import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MOBILE_TIERS } from '../../constants';

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

const ServicesMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="Services">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <FadeUp>
          <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-10 md:mb-14">
            Services
          </span>
        </FadeUp>

        {/* Headline */}
        <div className="mb-16 md:mb-20">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight tracking-tight mb-8">
              Your marketing investment,<br />
              <span className="italic">managed.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light max-w-narrow">
              Three ways to work together. One point of contact. The right team for the job.
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

        {/* 3-column tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0">
          {MOBILE_TIERS.map((tier, idx) => (
            <FadeUp key={tier.id} delay={0.3 + idx * 0.1}>
              <div className={`md:pr-8 ${idx < 2 ? 'md:border-r md:border-charcoal/10' : ''} ${idx > 0 ? 'md:pl-8' : ''}`}>
                {/* Ghost numeral */}
                <span className="font-serif text-5xl text-charcoal/[0.06] leading-none block mb-3 select-none" aria-hidden="true">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-xl text-charcoal leading-tight mb-1">
                  {tier.title}
                </h3>
                <span className="font-sans text-micro uppercase tracking-widest font-bold text-label block mb-4">
                  {tier.subtitle}
                </span>
                <div className="w-8 h-px bg-charcoal/15 mb-4" />
                <p className="font-sans text-body-sm text-muted leading-relaxed font-light mb-6">
                  {tier.description}
                </p>

                <p className="font-sans text-caption italic text-label mb-4">
                  {tier.includesText}
                </p>
                <ul className="space-y-2.5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="font-sans text-body-sm text-muted font-light flex items-start">
                      <span className="text-charcoal/30 mr-2.5 text-[10px] mt-1.5">●</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          className="font-sans text-caption italic text-label mt-12 md:mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Diagnostic assessments available by request.
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesMinimalist;
