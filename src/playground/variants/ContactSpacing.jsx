import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Section from '../../components/Section';
import FocusText from '../../components/FocusText';
import TypewriterText from '../../components/TypewriterText';
import CTAButton from '../../components/CTAButton';
import { HEADING_CTA_CLASSES } from '../../constants';

const VARIANTS = [
  {
    label: 'A — Two-line reflow',
    desc: '"Ready to build tomorrow\'s" / typewriter: "billion-dollar brand?"',
    render: () => (
      <h2 className={HEADING_CTA_CLASSES}>
        Ready to build tomorrow's
        <br />
        <TypewriterText text="billion-dollar brand?" />
      </h2>
    ),
  },
  {
    label: 'B — Three tight lines',
    desc: '"Ready to build" / typewriter: "tomorrow\'s" / typewriter: "billion-dollar brand?"',
    render: () => (
      <h2 className={HEADING_CTA_CLASSES}>
        Ready to build
        <br />
        <TypewriterText text="tomorrow's" />
        <br />
        <TypewriterText text="billion-dollar brand?" />
      </h2>
    ),
  },
  {
    label: 'C — Single typewriter line',
    desc: '"Ready to build" / typewriter: "tomorrow\'s billion-dollar brand?" (nowrap)',
    render: () => (
      <h2 className={HEADING_CTA_CLASSES}>
        Ready to build
        <br />
        <span className="whitespace-nowrap">
          <TypewriterText text="tomorrow's billion-dollar brand?" />
        </span>
      </h2>
    ),
  },
  {
    label: 'D — Stacked short lines',
    desc: '"Ready to build" / "tomorrow\'s" / typewriter: "billion-dollar brand?"',
    render: () => (
      <h2 className={HEADING_CTA_CLASSES}>
        Ready to build
        <br />
        <span className="italic">tomorrow's</span>
        <br />
        <TypewriterText text="billion-dollar brand?" />
      </h2>
    ),
  },
  {
    label: 'Current',
    desc: 'Static italic, no typewriter',
    render: () => (
      <h2 className={HEADING_CTA_CLASSES}>
        Ready to build <br />
        <span className="italic">tomorrow's billion-dollar brand?</span>
      </h2>
    ),
  },
];

export default function ContactSpacing() {
  const [selected, setSelected] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      {/* Toggle bar */}
      <div className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm px-6 py-3 flex flex-wrap items-center gap-2">
        <span className="text-paper/50 font-sans text-xs uppercase tracking-wider font-bold mr-2">
          Line breaks
        </span>
        {VARIANTS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded font-sans text-sm transition-colors cursor-pointer ${
              selected === i
                ? 'bg-paper text-charcoal font-medium'
                : 'text-paper/60 hover:text-paper/90'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="bg-charcoal/5 px-6 py-2">
        <p className="font-sans text-xs text-charcoal/50">
          {VARIANTS[selected].desc}
        </p>
      </div>

      {/* Contact section with selected treatment */}
      <div className="bg-paper-warm">
        <Section id="contact-spacing" label="Call" divider={false}>
          <div className="max-w-content py-16 md:py-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-10 md:space-y-12"
              >
                <FocusText>
                  {VARIANTS[selected].render()}
                </FocusText>
                <div>
                  <CTAButton href="https://tidycal.com/sullivan-street-projects/growth-consultation" variant="lg">
                    Schedule a call
                  </CTAButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Section>
      </div>
    </div>
  );
}
