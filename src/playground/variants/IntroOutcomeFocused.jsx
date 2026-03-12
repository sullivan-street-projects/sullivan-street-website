import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const valueProps = [
  {
    title: 'Enterprise Strategy. Startup Speed.',
    description:
      'CMO, VP, or Director-level leadership embedded with your team. We own the strategy and the execution — so growth doesn\u2019t stall waiting for the next hire.',
  },
  {
    title: 'We Manage the Work. You Get the Results.',
    description:
      'Best-in-class specialists across media, creative, analytics, and operations — managed as one team, accountable to your numbers.',
  },
  {
    title: 'Every Dollar Tracked to Revenue.',
    description:
      'AI-powered research, strategy, and reporting connects your spend to your pipeline. You always know what\u2019s working and what to cut.',
  },
];

function ValuePropColumn({ title, description, index, prefersReducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="flex flex-col gap-4"
    >
      <h3 className="font-serif text-body-lg text-charcoal">{title}</h3>
      <div className="border-t border-divider" />
      <p className="font-sans text-body-sm text-muted font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function IntroOutcomeFocused() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-paper py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-content px-6 space-y-16 md:space-y-20">
        {/* Headline area */}
        <div className="max-w-prose">
          <h2 className="font-serif text-body-lg leading-relaxed text-charcoal">
            Make Marketing Work.
            <br />
            <span className="italic">For Your Bottom Line.</span>
          </h2>
          <p className="mt-6 font-sans text-body leading-relaxed text-muted font-light">
            Three ways we embed with your team to drive growth &mdash; from
            strategic guidance to full operational ownership.
          </p>
        </div>

        {/* Value props grid with vertical dividers on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {valueProps.map((prop, i) => (
            <div
              key={prop.title}
              className={`${
                i > 0 ? 'md:border-l md:border-divider md:pl-10' : ''
              } ${i < valueProps.length - 1 ? 'md:pr-10' : ''}`}
            >
              <ValuePropColumn
                title={prop.title}
                description={prop.description}
                index={i}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
