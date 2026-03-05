import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];
const ROMAN = ['I', 'II', 'III', 'IV'];

const CapabilityRow = ({ cap, idx }) => {
  const isLeft = idx % 2 === 0;
  const capRef = useRef(null);
  const capInView = useInView(capRef, { once: true, margin: '-40px' });

  return (
    <div
      ref={capRef}
      className="grid grid-cols-12 gap-x-6 md:gap-x-10 lg:py-12"
    >
      <motion.div
        className={`col-span-12 lg:col-span-5 ${isLeft ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-8'}`}
        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
        animate={capInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <span className="font-serif text-3xl md:text-4xl text-charcoal/10 block mb-3 select-none" aria-hidden="true">
          {ROMAN[idx]}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-charcoal leading-tight mb-3">
          {cap.title}
        </h3>
        <p className="font-sans text-body-sm text-muted leading-relaxed font-light">
          {cap.description}
        </p>
      </motion.div>

      <motion.div
        className="hidden lg:flex col-span-2 lg:col-start-6 justify-center items-start pt-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={capInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-charcoal" />
      </motion.div>
    </div>
  );
};

const ApproachMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="Approach">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        {/* Header grid */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 mb-16 md:mb-20">
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight tracking-tight">
              Tailor made<br />
              <span className="italic">growth marketing.</span>
            </h2>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-4 lg:col-start-9 lg:border-l lg:border-charcoal/15 lg:pl-8 flex items-end"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          >
            <p className="font-sans text-body text-secondary leading-relaxed font-light">
              You know what's working in your business and what isn't. What you need is a strategy to grow.
            </p>
          </motion.div>
        </div>

        {/* Editorial timeline — alternating sides */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-charcoal/10 -translate-x-1/2"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />

          <div className="space-y-12 md:space-y-16 lg:space-y-0">
            {CAPABILITIES.map((cap, idx) => (
              <CapabilityRow key={cap.title} cap={cap} idx={idx} />
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-16 md:mt-20"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
        />
      </div>
    </section>
  );
};

export default ApproachMagazine;
