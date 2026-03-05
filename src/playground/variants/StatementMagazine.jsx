import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const EASE = [0.16, 1, 0.3, 1];

const StatementMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-paper py-24 md:py-32 lg:py-40" aria-label="Statement">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Topline rule */}
        <motion.div
          className="h-px bg-charcoal mb-10 md:mb-14"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">
          {/* Large editorial hook — spans most of the grid */}
          <motion.div
            className="col-span-12 lg:col-span-9"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-charcoal">
              Most growth-stage companies have agencies, freelancers, and tools.{' '}
              <em className="italic text-secondary">
                What they don't have is someone owning the outcome.
              </em>
            </p>
          </motion.div>

          {/* Sidebar annotation */}
          <motion.div
            className="col-span-12 lg:col-span-3 lg:border-l lg:border-charcoal/15 lg:pl-8 flex flex-col justify-end"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold mb-4 block">
              Our Position
            </span>
            <div className="w-6 h-px bg-charcoal/30 mb-4" />
          </motion.div>
        </div>

        {/* Dividing rule */}
        <motion.div
          className="h-px bg-charcoal/15 my-12 md:my-16"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
        />

        {/* Body — offset right, editorial style */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10">
          <div className="col-span-12 lg:col-start-5 lg:col-span-7">
            <motion.div
              className="lg:border-l lg:border-charcoal/15 lg:pl-8"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            >
              <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light">
                We're the AI-native growth partner that aligns brand, performance, systems, and talent under one team — and stays accountable to revenue, not a percentage of your ad spend.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-12 md:mt-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default StatementMagazine;
