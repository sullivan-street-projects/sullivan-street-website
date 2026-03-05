import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VALUE_PROPS } from '../../constants';

const SECTION_LABEL = 'Opportunity';
const HEADLINE_LINE1 = 'Make Marketing Work';
const HEADLINE_LINE2 = 'For Your Business.';
const BODY =
  'Three ways we embed with your team to drive growth\u2014from strategic guidance to full operational ownership.';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const PropItem = ({ prop, index, inView }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      className="relative pt-8 pb-12 md:pb-16"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={0.15 + index * 0.1}
      variants={fadeUp}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-charcoal/15" />
      <span
        className="font-mono text-caption text-label tracking-widest uppercase block mb-6 select-none"
        aria-hidden="true"
      >
        {num}
      </span>
      <h3 className="font-serif text-body-lg leading-snug text-charcoal mb-5">
        {prop.title}
      </h3>
      <p className="font-sans text-body-sm text-muted leading-relaxed max-w-[22rem]">
        {prop.description}
      </p>
    </motion.div>
  );
};

const IntroMinimalist = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper py-24 md:py-32 lg:py-40 px-6 md:px-10"
      aria-label="Value proposition"
    >
      <div className="max-w-site mx-auto">
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <div className="h-px flex-1 bg-charcoal/12" />
          <motion.span
            className="font-sans text-section-label font-bold tracking-widest uppercase text-label shrink-0"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
            variants={fadeUp}
          >
            {SECTION_LABEL}
          </motion.span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 mb-20 md:mb-28">
          <motion.div
            className="md:col-span-8"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.05}
            variants={fadeUp}
          >
            <h2 className="font-serif text-hero-sub md:text-display-sm leading-[1.1] text-charcoal">
              {HEADLINE_LINE1}<br />
              <em className="italic">{HEADLINE_LINE2}</em>
            </h2>
          </motion.div>
          <motion.div
            className="md:col-span-4 md:flex md:items-end"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.1}
            variants={fadeUp}
          >
            <p className="font-sans text-body-sm text-muted leading-relaxed mt-8 md:mt-0 md:pl-8 max-w-[28rem]">
              {BODY}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-12 lg:gap-x-16">
          {VALUE_PROPS.map((prop, idx) => (
            <PropItem key={prop.title} prop={prop} index={idx} inView={inView} />
          ))}
        </div>

        <motion.div
          className="h-px bg-charcoal/12 mt-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
};

export default IntroMinimalist;
