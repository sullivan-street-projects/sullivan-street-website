import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

// A single stacking card — pins to viewport, scales down as the next one arrives
const StackCard = ({ cap, index, total }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // As the NEXT card scrolls up, this card scales down and dims
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4]);
  const isLast = index === total - 1;

  return (
    // Outer container provides the scroll runway
    <div ref={ref} className="h-[80vh] relative" style={{ zIndex: index + 1 }}>
      <motion.div
        className="sticky overflow-hidden"
        style={{
          top: `${100 + index * 28}px`,
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
        }}
      >
        <div
          className="border border-[#e5e5e5] p-8 md:p-12 lg:p-14"
          style={{
            background: 'var(--color-paper, #FAFAF8)',
            boxShadow: '0 -2px 20px rgba(0,0,0,0.03)',
            minHeight: '320px',
          }}
        >
          {/* Card interior — asymmetric grid matching the site's editorial voice */}
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left: large number */}
            <div className="col-span-3 md:col-span-2">
              <span
                className="font-serif leading-none select-none block"
                style={{
                  fontSize: 'clamp(64px, 8vw, 120px)',
                  color: 'rgba(26, 26, 26, 0.06)',
                }}
              >
                {index + 1}
              </span>
            </div>

            {/* Right: content */}
            <div className="col-span-9 md:col-span-8 lg:col-span-7 pt-3 md:pt-4">
              <div className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#737373] mb-5">
                Step {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
              </div>

              <h3
                className="font-serif leading-snug text-[#1a1a1a] mb-5"
                style={{ fontSize: 'clamp(22px, 2.5vw, 32px)' }}
              >
                {cap.title}
              </h3>

              <div className="w-12 h-px bg-[#1a1a1a]/10 mb-5" />

              <p className="font-sans text-[15px] md:text-[16px] text-[#525252] leading-[1.75] font-light max-w-[34rem]">
                {cap.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ApproachStacking = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Scroll-driven stacking cards
      </p>

      {/* Section header */}
      <div className="mb-12 md:mb-16">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a] mb-6">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-[#404040] font-light max-w-[50rem]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {/* Stacking cards */}
      {CAPABILITIES.map((cap, idx) => (
        <StackCard
          key={idx}
          cap={cap}
          index={idx}
          total={CAPABILITIES.length}
        />
      ))}

      {/* Closing space */}
      <div className="h-[20vh]" />

      <p className="font-sans text-[12px] text-[#a3a3a3] italic">
        Scroll-driven stacking. Each card pins to the viewport and scales down as the next arrives. Uses Framer Motion useScroll/useTransform — the same scroll infrastructure as FocusText. Cards use the site's paper surface, border-divider, and editorial type grid.
      </p>
    </div>
  );
};

export default ApproachStacking;
