import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BRANDS } from '../../constants';

const EASE = [0.25, 0.1, 0.25, 1];

const CredentialsMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-paper py-20 md:py-28 lg:py-36" aria-label="Credentials">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with figure */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 items-baseline mb-16 md:mb-20">
          <motion.div
            className="col-span-12 md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="font-serif text-display-sm md:text-display tracking-tight text-charcoal block leading-none">
              $2B+
            </span>
          </motion.div>
          <motion.div
            className="col-span-12 md:col-span-8 lg:col-span-5 mt-4 md:mt-0"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light">
              Before SSP, our team managed $2B+ in media investment across the world's most recognized brands.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-charcoal/10 mb-12 md:mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
        />

        {/* Brand grid — Swiss 5-column layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-6">
          {BRANDS.map((brand, i) => (
            <motion.span
              key={brand}
              className="font-sans text-caption font-medium text-label uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsMinimalist;
