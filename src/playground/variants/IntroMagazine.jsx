import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { VALUE_PROPS } from '../../constants';

const SECTION_LABEL = 'Opportunity';
const HEADLINE_LINE1 = 'Make Marketing Work';
const HEADLINE_LINE2 = 'For Your Business.';
const BODY =
  'Three ways we embed with your team to drive growth\u2014from strategic guidance to full operational ownership.';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const COL_OFFSETS = ['mt-0', 'mt-10 md:mt-16', 'mt-0 md:mt-8'];

const IntroMagazine = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper-warm py-24 md:py-32 lg:py-40 px-6 md:px-10"
      aria-label="Value proposition"
    >
      <div className="max-w-site mx-auto">
        <motion.div
          className="mb-16 md:mb-20"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
          variants={fadeUp}
        >
          <span className="font-sans text-section-label font-bold tracking-widest uppercase text-label">
            {SECTION_LABEL}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 mb-20 md:mb-24 lg:mb-32">
          <motion.div
            className="md:col-span-8"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.06}
            variants={fadeUp}
          >
            <h2
              className="font-serif text-charcoal leading-[1.08] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.375rem)' }}
            >
              {HEADLINE_LINE1}<br />
              <em className="italic">{HEADLINE_LINE2}</em>
            </h2>
          </motion.div>

          <motion.div
            className="md:col-span-4 md:flex md:flex-col md:justify-end"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0.12}
            variants={fadeUp}
          >
            <div className="w-10 h-px bg-charcoal/30 mb-5 hidden md:block" />
            <p className="font-sans text-body-sm text-secondary leading-relaxed">
              {BODY}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="h-px bg-charcoal/12 mb-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-charcoal/12">
          {VALUE_PROPS.map((prop, idx) => (
            <motion.article
              key={prop.title}
              className={`px-0 md:px-8 md:first:pl-0 md:last:pr-0 py-10 md:py-12 ${COL_OFFSETS[idx]}`}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0.22 + idx * 0.1}
              variants={fadeUp}
            >
              <span className="font-sans text-caption text-faint tracking-widest uppercase block mb-6 select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-body-lg leading-snug text-charcoal mb-3">
                {prop.title}
              </h3>
              <div className="flex items-center gap-3 mb-5">
                <span className="font-serif text-label text-body-sm select-none">&mdash;</span>
                <div className="h-px flex-1 bg-charcoal/10" />
              </div>
              <p className="font-sans text-body-sm text-muted leading-relaxed max-w-[20rem]">
                {prop.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="h-px bg-charcoal/12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
};

export default IntroMagazine;
