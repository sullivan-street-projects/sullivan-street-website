import { motion } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease: EASE, delay },
});

const HeroMinimalist = () => {
  return (
    <section
      className="relative bg-paper min-h-screen flex flex-col"
      aria-label="Hero"
    >
      <motion.div
        className="w-full px-6 md:px-10 lg:px-16 pt-10 md:pt-14 flex items-center justify-between"
        {...fadeUp(0)}
      >
        <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold">
          Sullivan Street Projects
        </span>
        <span className="font-sans text-section-label tracking-wider uppercase text-faint hidden md:block">
          Marketing Consultancy
        </span>
      </motion.div>

      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16">
        <div className="max-w-site mx-auto w-full">
          <div className="grid grid-cols-12 items-end gap-x-6 md:gap-x-10">
            <div className="col-span-12 lg:col-span-10">
              <motion.p
                className="font-sans text-section-label tracking-widest uppercase text-label mb-8 md:mb-12"
                {...fadeUp(0.1)}
              >
                Strategy — Media — Execution
              </motion.p>

              <h1 className="font-serif text-charcoal leading-[1.12] tracking-tight">
                <motion.span className="block text-4xl md:text-5xl lg:text-display" {...fadeUp(0.2)}>
                  Marketing for
                </motion.span>
                <motion.span className="block text-4xl md:text-5xl lg:text-display italic mt-1" {...fadeUp(0.32)}>
                  Tomorrow's
                </motion.span>
                <motion.span className="block text-4xl md:text-5xl lg:text-display mt-1" {...fadeUp(0.44)}>
                  Billion-Dollar Brands
                </motion.span>
              </h1>
            </div>

            <div className="col-span-2 hidden lg:flex flex-col items-end gap-3 pb-2">
              <motion.span
                className="font-sans text-micro text-faint tracking-wider uppercase"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                {...fadeUp(0.5)}
              >
                Est. New York
              </motion.span>
            </div>
          </div>

          <motion.div
            className="h-px bg-charcoal/10 my-10 md:my-14 lg:my-16"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.55 }}
          />

          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8">
            <motion.div className="col-span-12 md:col-span-7 lg:col-span-6" {...fadeUp(0.65)}>
              <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light">
                AI-powered strategy, media, and execution.{' '}
                <span className="text-charcoal font-normal">Faster growth. Sharper focus. Higher profit.</span>
              </p>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-5 lg:col-span-6 flex md:justify-end items-start md:items-center"
              {...fadeUp(0.75)}
            >
              <a href="#contact" className="group inline-flex items-center gap-4 font-sans text-body text-charcoal font-medium no-underline">
                <span className="relative">
                  Schedule a call
                  <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300 ease-in-out" />
                </span>
                <span className="inline-block w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full px-6 md:px-10 lg:px-16 pb-10 md:pb-14 flex items-center justify-between"
        {...fadeUp(0.85)}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-px h-8 bg-faint overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-charcoal"
              animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1.2 }}
            />
          </div>
          <span className="font-sans text-micro text-faint uppercase tracking-widest">Scroll</span>
        </div>
        <span className="font-sans text-micro text-faint tabular-nums">01 / 08</span>
      </motion.div>
    </section>
  );
};

export default HeroMinimalist;
