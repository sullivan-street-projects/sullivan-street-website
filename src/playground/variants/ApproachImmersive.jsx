import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

const PANEL_COLORS = [
  { bg: 'bg-charcoal', text: 'text-paper', muted: 'text-paper/50', accent: 'bg-paper/10', line: 'bg-paper/20' },
  { bg: 'bg-[#1f1f1f]', text: 'text-paper', muted: 'text-paper/50', accent: 'bg-paper/10', line: 'bg-paper/20' },
  { bg: 'bg-[#2a2a2a]', text: 'text-paper', muted: 'text-paper/50', accent: 'bg-paper/10', line: 'bg-paper/20' },
  { bg: 'bg-paper-warm', text: 'text-charcoal', muted: 'text-muted', accent: 'bg-charcoal/10', line: 'bg-charcoal/15' },
];

const ApproachImmersive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={containerRef} className="relative" aria-label="Approach" style={{ height: '400vh' }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {CAPABILITIES.map((cap, idx) => {
            const colors = PANEL_COLORS[idx];
            return (
              <div
                key={cap.title}
                className={`flex-shrink-0 w-screen h-full ${colors.bg} flex items-center relative overflow-hidden`}
              >
                {/* Panel number watermark */}
                <div className="pointer-events-none absolute top-8 right-8 md:top-12 md:right-12" aria-hidden="true">
                  <span className={`font-serif text-[8rem] md:text-[12rem] leading-none ${colors.text} opacity-[0.04] select-none`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="max-w-site mx-auto px-8 md:px-16 lg:px-24 w-full">
                  {idx === 0 ? (
                    <div>
                      <span className={`font-sans text-section-label tracking-widest uppercase ${colors.muted} font-bold block mb-6`}>
                        Approach
                      </span>
                      <h2 className={`font-serif text-3xl md:text-5xl lg:text-6xl ${colors.text} leading-tight tracking-tight mb-6`}>
                        Tailor made<br />
                        <span className="italic">growth marketing.</span>
                      </h2>
                      <p className={`font-sans text-body md:text-body-md ${colors.muted} leading-relaxed font-light max-w-narrow`}>
                        {cap.description}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className={`w-12 h-px ${colors.line} mb-8`} />
                      <span className={`font-sans text-section-label tracking-widest uppercase ${colors.muted} font-bold block mb-4`}>
                        Step {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`font-serif text-3xl md:text-4xl lg:text-5xl ${colors.text} leading-tight tracking-tight mb-6`}>
                        {cap.title}
                      </h3>
                      <p className={`font-sans text-body md:text-body-md ${colors.muted} leading-relaxed font-light max-w-narrow`}>
                        {cap.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Scroll hint on first panel */}
                {idx === 0 && (
                  <div className="absolute bottom-10 right-10 md:bottom-14 md:right-14 flex items-center gap-3">
                    <span className={`font-sans text-micro ${colors.muted} uppercase tracking-widest`}>
                      Scroll
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={colors.muted}>
                      <path d="M5 12h14M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachImmersive;
