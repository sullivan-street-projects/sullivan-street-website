import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const milestones = [
  {
    company: 'Publicis Groupe',
    years: '2014\u20132018',
    cumulative: '$650M',
    context: 'Global media planning across Apple, Samsung, JPMorgan Chase',
  },
  {
    company: 'Google',
    years: '2019\u20132021',
    cumulative: '$1.35B',
    context: 'Performance media and growth strategy for enterprise clients',
  },
  {
    company: 'Navan',
    years: '2022\u20132023',
    cumulative: '$1.8B',
    context: 'Led demand generation for Series F travel-tech unicorn',
  },
  {
    company: 'SSP',
    years: '2024\u2013present',
    cumulative: '$2B+',
    context: 'Fractional growth leadership for high-growth brands',
  },
];

function TimelineNode({ milestone, index, prefersReducedMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const shouldAnimate = !prefersReducedMotion && isInView;

  return (
    <div ref={ref} className="flex gap-6 md:gap-8">
      {/* Dot column */}
      <div className="relative flex flex-col items-center" style={{ width: 40 }}>
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 16,
            height: 16,
            top: 6,
            backgroundColor: 'rgba(26, 26, 26, 0.1)',
          }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: index * 0.15 }}
        />
        {/* Inner dot */}
        <motion.div
          className="relative rounded-full"
          style={{
            width: 8,
            height: 8,
            top: 10,
            backgroundColor: '#1a1a1a',
          }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.1 }}
        />
      </div>

      {/* Content card */}
      <motion.div
        className="flex-1 pb-16 md:pb-20"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.05, ease: 'easeOut' }}
      >
        {/* Company name */}
        <h3
          className="font-serif text-xl"
          style={{ color: '#1a1a1a' }}
        >
          {milestone.company}
        </h3>

        {/* Years */}
        <p
          className="font-sans text-caption mt-1"
          style={{ color: '#999999' }}
        >
          {milestone.years}
        </p>

        {/* Cumulative spend */}
        <motion.p
          className="font-serif text-2xl font-bold mt-3"
          style={{ color: '#1a1a1a' }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: 'easeOut' }}
        >
          {milestone.cumulative}
        </motion.p>

        {/* Context */}
        <p
          className="font-sans text-body-sm font-light italic mt-2"
          style={{ color: '#525252' }}
        >
          {milestone.context}
        </p>
      </motion.div>
    </div>
  );
}

export default function CredentialsTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-40px' });

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-prose mx-auto px-6">
        {/* Section header */}
        <p
          className="font-sans uppercase tracking-widest text-section-label mb-4"
          style={{ color: '#737373' }}
        >
          Career Media Managed
        </p>
        <h2
          className="font-serif text-2xl md:text-3xl mb-16 md:mb-20"
          style={{ color: '#1a1a1a' }}
        >
          $2B+ across four career chapters
        </h2>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[20px] top-0 bottom-0"
            style={{
              width: 1,
              backgroundColor: 'rgba(26, 26, 26, 0.2)',
              transformOrigin: 'top',
            }}
            initial={prefersReducedMotion ? false : { scaleY: 0 }}
            animate={
              prefersReducedMotion
                ? undefined
                : lineInView
                  ? { scaleY: 1 }
                  : undefined
            }
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          {/* Milestone nodes */}
          {milestones.map((milestone, index) => (
            <TimelineNode
              key={milestone.company}
              milestone={milestone}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Bottom caption */}
        <div
          className="border-t pt-4 mt-4"
          style={{ borderColor: '#e5e5e5' }}
        >
          <p
            className="font-sans text-caption italic"
            style={{ color: '#999999' }}
          >
            Cumulative media spend across Publicis Groupe, Google, Navan, and SSP clients
          </p>
        </div>
      </div>
    </section>
  );
}
