import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MOBILE_TIERS } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

const TierBand = ({ tier, idx }) => {
  const tierRef = useRef(null);
  const tierInView = useInView(tierRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={tierRef}
      className="border-t border-charcoal/15 py-10 md:py-14"
      initial={{ opacity: 0, y: 20 }}
      animate={tierInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
    >
      <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6">
        <div className="col-span-12 md:col-span-3">
          <span className="font-serif text-3xl text-charcoal/10 block mb-2 select-none" aria-hidden="true">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-tight">
            {tier.title}
          </h3>
          <span className="font-sans text-micro uppercase tracking-widest font-bold text-label block mt-1">
            {tier.subtitle}
          </span>
        </div>

        <div className="col-span-12 md:col-span-4 md:border-l md:border-charcoal/10 md:pl-6">
          <p className="font-sans text-body-sm text-secondary leading-relaxed font-light">
            {tier.description}
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:border-l md:border-charcoal/10 md:pl-6">
          <p className="font-sans text-caption italic text-label mb-3">
            {tier.includesText}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {tier.features.map((feature) => (
              <span key={feature} className="font-sans text-caption text-muted">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="Services">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 mb-16 md:mb-20">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight tracking-tight">
              Your marketing investment,<br />
              <span className="italic">managed.</span>
            </h2>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-charcoal/15 lg:pl-8 flex items-end"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          >
            <p className="font-sans text-body text-secondary leading-relaxed font-light">
              Three ways to work together. One point of contact. The right team for the job.
            </p>
          </motion.div>
        </div>

        {/* Editorial horizontal bands per tier */}
        <div className="space-y-0">
          {MOBILE_TIERS.map((tier, idx) => (
            <TierBand key={tier.id} tier={tier} idx={idx} />
          ))}
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-2"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
        />

        {/* Footnote */}
        <motion.p
          className="font-sans text-caption italic text-label mt-8"
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

export default ServicesMagazine;
