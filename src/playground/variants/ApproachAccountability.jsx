import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const STEPS = [
  {
    number: '01',
    title: 'Business Planning',
    description:
      'Every engagement starts with your commercial objectives, market realities, and unit economics. We keep marketing in lockstep with your P&L.',
    aside:
      "This isn't just the first step. It's the one we keep coming back to.",
  },
  {
    number: '02',
    title: 'Marketing Strategy',
    description:
      'We distill brand, audience, and lifecycle into a clear roadmap: who to reach, what to say, and why it converts.',
  },
  {
    number: '03',
    title: 'Media Activation',
    description:
      'We activate the channels that drive your growth\u2014Meta, Google, Microsoft, email, and beyond.',
  },
  {
    number: '04',
    title: 'Campaign Execution',
    description:
      'Creative and content that convert attention into revenue while reinforcing brand equity.',
  },
];

function Step({ step, index, reducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref}>
      <div className="h-px bg-divider" />
      <motion.div
        variants={reducedMotion ? undefined : variants}
        initial={reducedMotion ? false : 'hidden'}
        animate={reducedMotion ? false : isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
        className="grid grid-cols-12 py-10 md:py-14 lg:py-16"
      >
        {/* Large serif number */}
        <div className="col-span-3 md:col-span-2">
          <span className="font-serif text-[56px] md:text-[72px] lg:text-[88px] leading-none text-charcoal opacity-10 select-none">
            {step.number}
          </span>
        </div>

        {/* Content */}
        <div className="col-span-9 md:col-span-8 lg:col-span-6 pt-2 md:pt-3">
          <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4 md:mb-5">
            {step.title}
          </h3>
          <p className="font-sans text-body-sm md:text-body text-muted font-light leading-relaxed">
            {step.description}
          </p>
          {step.aside && (
            <p className="font-sans text-body-sm text-label italic mt-3">
              {step.aside}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function ApproachAccountability() {
  const reducedMotion = useReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  const headVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-content px-6">
        {/* Headline area */}
        <motion.div
          ref={headRef}
          variants={reducedMotion ? undefined : headVariants}
          initial={reducedMotion ? false : 'hidden'}
          animate={reducedMotion ? false : headInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-20 md:mb-28 lg:mb-36"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-8 md:mb-12">
            Built to prove<br />
            <span className="italic">what's working.</span>
          </h2>
          <p className="font-sans text-body text-muted font-light leading-relaxed max-w-narrow">
            You know what's working in your business and what isn't. What you
            need is a strategy to grow — and the data to prove it. We build that
            strategy, tailored to you.
          </p>
        </motion.div>

        {/* Steps */}
        {STEPS.map((step, idx) => (
          <Step
            key={step.number}
            step={step}
            index={idx}
            reducedMotion={reducedMotion}
          />
        ))}
        <div className="h-px bg-divider" />
      </div>
    </section>
  );
}
