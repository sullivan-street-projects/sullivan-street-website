import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VALUE_PROPS } from '../../constants';

const SECTION_LABEL = 'Opportunity';
const HEADLINE_LINE1 = 'Make Marketing Work';
const HEADLINE_LINE2 = 'For Your Business.';
const BODY =
  'Three ways we embed with your team to drive growth\u2014from strategic guidance to full operational ownership.';

const PropRow = ({ prop, index, total }) => {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { once: true, margin: '-15% 0px' });
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      ref={rowRef}
      className="relative border-t border-paper/10 group"
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
    >
      <div className="relative py-10 md:py-14 lg:py-16 overflow-hidden">
        <span
          className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 font-serif text-paper/[0.06] leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(7rem, 16vw, 14rem)' }}
          aria-hidden="true"
        >
          {num}
        </span>

        <div className="relative grid grid-cols-12 gap-x-6 md:gap-x-10 items-start">
          <div className="col-span-2 md:col-span-1 pt-1">
            <span className="font-mono text-caption text-paper/30 tracking-widest select-none">
              {num}
            </span>
          </div>
          <div className="col-span-10 md:col-span-5 lg:col-span-4">
            <h3
              className="font-serif text-paper leading-tight transition-colors duration-300 group-hover:text-paper/90"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
            >
              {prop.title}
            </h3>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-7 mt-4 md:mt-0 md:flex md:items-center">
            <motion.p
              className="font-sans text-body-sm text-paper/50 leading-relaxed max-w-[30rem] transition-colors duration-300 group-hover:text-paper/70"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.08 }}
            >
              {prop.description}
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px w-0 bg-paper/20 transition-all duration-500 group-hover:w-full" />
      </div>

      {index === total - 1 && <div className="h-px bg-paper/10" />}
    </motion.div>
  );
};

const IntroImmersive = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  return (
    <section
      className="w-full bg-charcoal py-24 md:py-32 lg:py-40 px-6 md:px-10"
      aria-label="Value proposition"
    >
      <div className="max-w-site mx-auto">
        <motion.div
          ref={headerRef}
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-section-label font-bold tracking-widest uppercase text-paper/40">
            {SECTION_LABEL}
          </span>
        </motion.div>

        <div className="mb-16 md:mb-20 lg:mb-24 grid grid-cols-1 md:grid-cols-12">
          <motion.div
            className="md:col-span-9 lg:col-span-8"
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="font-serif text-paper leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 4.375rem)' }}
            >
              {HEADLINE_LINE1}<br />
              <em className="italic text-paper/70">{HEADLINE_LINE2}</em>
            </h2>
          </motion.div>
          <motion.div
            className="md:col-span-3 lg:col-span-4 md:flex md:items-end md:pl-8 mt-8 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-body-sm text-paper/45 leading-relaxed">
              {BODY}
            </p>
          </motion.div>
        </div>

        <div>
          {VALUE_PROPS.map((prop, idx) => (
            <PropRow
              key={prop.title}
              prop={prop}
              index={idx}
              total={VALUE_PROPS.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroImmersive;
