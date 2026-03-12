import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const PHASES = [
  { company: 'Publicis Groupe', years: '2014–2018', cumulative: 650, label: '$650M', opacity: 0.15 },
  { company: 'Google', years: '2019–2021', cumulative: 1350, label: '$1.35B', opacity: 0.25 },
  { company: 'Navan', years: '2022–2023', cumulative: 1800, label: '$1.8B', opacity: 0.4 },
  { company: 'SSP', years: '2024–2026', cumulative: 2150, label: '$2.15B', opacity: 1 },
];

const MAX_VALUE = 2150;

export default function ChartStepped() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="mx-auto max-w-[600px] px-4 py-12">
      {/* Section label */}
      <p className="mb-8 font-sans text-section-label uppercase tracking-widest text-label">
        Career Media Managed
      </p>

      {/* Stepped bars */}
      <div className="flex flex-col gap-4">
        {PHASES.map((phase, i) => {
          const widthPercent = (phase.cumulative / MAX_VALUE) * 100;
          const isLast = i === PHASES.length - 1;

          return (
            <div key={phase.company} className="relative">
              {/* Bar container */}
              <div className="relative" style={{ height: 36 }}>
                {/* Animated bar */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-r-sm"
                  style={{
                    backgroundColor: `rgba(26, 26, 26, ${phase.opacity})`,
                  }}
                  initial={reducedMotion ? { width: `${widthPercent}%` } : { width: 0 }}
                  animate={
                    shouldAnimate
                      ? { width: `${widthPercent}%` }
                      : reducedMotion
                        ? { width: `${widthPercent}%` }
                        : undefined
                  }
                  transition={{
                    duration: 0.8,
                    delay: reducedMotion ? 0 : i * 0.3,
                    ease: 'easeOut',
                  }}
                />

                {/* Company name — inside bar, left-aligned */}
                <motion.span
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 font-sans uppercase tracking-wider"
                  style={{
                    fontSize: 11,
                    color: phase.opacity >= 0.4 ? '#FAFAF8' : '#1a1a1a',
                    whiteSpace: 'nowrap',
                  }}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={
                    shouldAnimate
                      ? { opacity: 1 }
                      : reducedMotion
                        ? { opacity: 1 }
                        : undefined
                  }
                  transition={{
                    duration: 0.3,
                    delay: reducedMotion ? 0 : i * 0.3 + 0.5,
                  }}
                >
                  {phase.company}
                </motion.span>

                {/* Cumulative value — right end of bar */}
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 font-serif font-bold"
                  style={{
                    fontSize: 13,
                    left: `${widthPercent}%`,
                    transform: 'translate(8px, -50%)',
                    color: '#1a1a1a',
                    whiteSpace: 'nowrap',
                  }}
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={
                    shouldAnimate
                      ? { opacity: 1 }
                      : reducedMotion
                        ? { opacity: 1 }
                        : undefined
                  }
                  transition={{
                    duration: 0.3,
                    delay: reducedMotion ? 0 : i * 0.3 + 0.6,
                  }}
                >
                  {phase.label}
                </motion.span>

                {/* "$2B+" callout for SSP */}
                {isLast && (
                  <motion.span
                    className="absolute top-1/2 font-serif font-bold"
                    style={{
                      fontSize: 18,
                      left: `${widthPercent}%`,
                      transform: 'translate(60px, -50%)',
                      color: '#1a1a1a',
                      whiteSpace: 'nowrap',
                    }}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={
                      shouldAnimate
                        ? { opacity: 1 }
                        : reducedMotion
                          ? { opacity: 1 }
                          : undefined
                    }
                    transition={{
                      duration: 0.4,
                      delay: reducedMotion ? 0 : 3 * 0.3 + 0.8,
                    }}
                  >
                    $2B+
                  </motion.span>
                )}
              </div>

              {/* Years label below bar */}
              <motion.span
                className="mt-0.5 block font-sans"
                style={{
                  fontSize: 9,
                  color: '#999',
                  paddingLeft: 10,
                }}
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={
                  shouldAnimate
                    ? { opacity: 1 }
                    : reducedMotion
                      ? { opacity: 1 }
                      : undefined
                }
                transition={{
                  duration: 0.3,
                  delay: reducedMotion ? 0 : i * 0.3 + 0.5,
                }}
              >
                {phase.years}
              </motion.span>
            </div>
          );
        })}
      </div>

      {/* Thin baseline */}
      <div className="mt-4" style={{ height: 1, backgroundColor: '#e5e5e5' }} />

      {/* Caption */}
      <p className="mt-3 font-sans text-caption italic text-faint text-left">
        Cumulative media spend across Publicis Groupe, Google, Navan, and SSP clients
      </p>
    </div>
  );
}
