import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BRANDS } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

const CredentialsMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-paper py-20 md:py-28 lg:py-32" aria-label="Credentials">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8">
          {/* Left column — editorial intro */}
          <motion.div
            className="col-span-12 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-6">
              Track Record
            </span>
            <p className="font-serif text-2xl md:text-3xl italic text-charcoal leading-snug">
              Before SSP, our team managed $2B+ for the world's most recognized brands.
            </p>
          </motion.div>

          {/* Right column — brand names as inline editorial list */}
          <motion.div
            className="col-span-12 lg:col-span-7 lg:col-start-6 lg:border-l lg:border-charcoal/15 lg:pl-8 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          >
            <p className="font-sans text-body md:text-body-md text-secondary leading-loose font-light">
              {BRANDS.map((brand, i) => (
                <span key={brand}>
                  <span className="text-charcoal font-normal">{brand}</span>
                  {i < BRANDS.length - 1 && (
                    <span className="text-faint mx-2">·</span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-12 md:mt-16"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.4 }}
        />
      </div>
    </section>
  );
};

export default CredentialsMagazine;
