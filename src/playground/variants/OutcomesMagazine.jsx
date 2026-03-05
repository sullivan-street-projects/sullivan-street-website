import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PARTNER_OUTCOMES } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

const OutcomeCard = ({ outcome }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      className="border-t border-charcoal/15 py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={cardInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6">
        <div className="col-span-12 md:col-span-1">
          <span className="font-serif text-6xl text-charcoal/10 leading-none select-none" aria-hidden="true">
            &ldquo;
          </span>
        </div>

        <div className="col-span-12 md:col-span-7">
          <blockquote>
            <p className="font-serif text-xl md:text-2xl lg:text-3xl text-charcoal leading-[1.35] font-light">
              {outcome.metric}
            </p>
          </blockquote>
        </div>

        <div className="col-span-12 md:col-span-3 md:col-start-10 md:border-l md:border-charcoal/10 md:pl-6 flex items-end">
          <div>
            <span className="font-sans text-micro uppercase tracking-widest text-label block mb-1">Client</span>
            <span className="font-serif text-lg text-charcoal">{outcome.client}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const OutcomesMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper-warm py-24 md:py-32 lg:py-40" aria-label="Partner Outcomes">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 mb-16 md:mb-20">
          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold">
              Case Studies
            </span>
          </motion.div>
        </div>

        {/* Outcome cards — editorial stacked */}
        <div className="space-y-0">
          {PARTNER_OUTCOMES.map((outcome) => (
            <OutcomeCard key={outcome.id} outcome={outcome} />
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
        />
      </div>
    </section>
  );
};

export default OutcomesMagazine;
