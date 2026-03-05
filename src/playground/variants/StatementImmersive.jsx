import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const StatementImmersive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Stagger line reveals based on scroll position
  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);
  const line2Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);
  const dividerScale = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-charcoal min-h-screen flex items-center overflow-hidden"
      aria-label="Statement"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-site mx-auto px-6 md:px-10 lg:px-16 w-full py-32 md:py-40">
        <div className="max-w-content">
          <motion.div
            className="flex items-center gap-3 mb-12 md:mb-16"
            style={{ opacity: line1Opacity }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold">
              Our Position
            </span>
          </motion.div>

          <motion.p
            className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-tight text-paper/90"
            style={{ opacity: line1Opacity, y: line1Y }}
          >
            Most growth-stage companies have agencies, freelancers, and tools.
          </motion.p>

          <motion.p
            className="font-serif text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-tight text-paper italic mt-3 md:mt-4"
            style={{ opacity: line2Opacity, y: line2Y }}
          >
            What they don't have is someone owning the outcome.
          </motion.p>

          <motion.div
            className="w-16 h-px bg-paper/20 my-12 md:my-16 origin-left"
            style={{ scaleX: dividerScale }}
          />

          <motion.p
            className="font-sans text-body md:text-body-md text-paper/50 leading-relaxed font-light max-w-narrow"
            style={{ opacity: bodyOpacity, y: bodyY }}
          >
            We're the AI-native growth partner that aligns brand, performance, systems, and talent under one team — and stays accountable to revenue, not a percentage of your ad spend.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default StatementImmersive;
