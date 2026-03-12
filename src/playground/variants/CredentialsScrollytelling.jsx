import { useRef, useMemo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import useReducedMotion from '../../hooks/useReducedMotion';

const CAREER_CHAPTERS = [
  { label: 'Publicis Groupe \u00b7 2014\u20132018', threshold: 0.25 },
  { label: 'Google \u00b7 2019\u20132021', threshold: 0.50 },
  { label: 'Navan \u00b7 2022\u20132023', threshold: 0.75 },
  { label: 'SSP \u00b7 2024\u20132026', threshold: 1.0 },
];

const VALUE_STOPS = [0, 0.25, 0.50, 0.75, 1.0];
const DOLLAR_STOPS = [0, 650_000_000, 1_350_000_000, 1_800_000_000, 2_150_000_000];

function formatDollars(value) {
  if (value <= 0) return '$0';
  if (value >= 2_100_000_000) return '$2B+';
  if (value >= 1_000_000_000) {
    const billions = value / 1_000_000_000;
    // Show one decimal place, but drop trailing zero
    const formatted = billions.toFixed(1);
    return `$${formatted}B`;
  }
  const millions = Math.round(value / 1_000_000);
  return `$${millions}M`;
}

function getActiveChapter(progress) {
  for (let i = 0; i < CAREER_CHAPTERS.length; i++) {
    const start = i === 0 ? 0 : CAREER_CHAPTERS[i - 1].threshold;
    if (progress >= start && progress < CAREER_CHAPTERS[i].threshold) {
      return i;
    }
  }
  return CAREER_CHAPTERS.length - 1;
}

export default function CredentialsScrollytelling() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [displayValue, setDisplayValue] = useState('$0');
  const [activeChapter, setActiveChapter] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const dollarValue = useTransform(scrollYProgress, VALUE_STOPS, DOLLAR_STOPS);

  useMotionValueEvent(dollarValue, 'change', (latest) => {
    if (prefersReducedMotion) return;
    setDisplayValue(formatDollars(latest));
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion) return;
    setActiveChapter(getActiveChapter(latest));
    setFillHeight(Math.min(latest, 1) * 100);
  });

  // Reduced motion: show final state
  if (prefersReducedMotion) {
    return (
      <section className="relative py-32">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="font-sans uppercase tracking-widest text-section-label text-label">
            Career Media Managed
          </p>
          <p
            className="font-serif text-[100px] md:text-[160px] lg:text-[200px] leading-none text-charcoal"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            $2B+
          </p>
          <p className="font-sans text-body-sm text-muted uppercase tracking-wider">
            SSP &middot; 2024&ndash;2026
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Progress line — left side */}
        <div
          className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2"
          style={{ width: 4, height: 200 }}
        >
          {/* Track */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(26, 26, 26, 0.15)' }}
          />
          {/* Fill */}
          <div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{
              backgroundColor: '#1a1a1a',
              height: `${fillHeight}%`,
              transition: 'height 0.05s linear',
            }}
          />
        </div>

        {/* Content stack */}
        <div className="flex flex-col items-center gap-4 px-16">
          {/* Label */}
          <p className="font-sans uppercase tracking-widest text-section-label text-label">
            Career Media Managed
          </p>

          {/* The number */}
          <p
            className="font-serif text-[100px] md:text-[160px] lg:text-[200px] leading-none text-charcoal"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {displayValue}
          </p>

          {/* Company crossfade */}
          <div className="h-8 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeChapter}
                className="font-sans text-body-sm text-muted uppercase tracking-wider whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {CAREER_CHAPTERS[activeChapter].label}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
