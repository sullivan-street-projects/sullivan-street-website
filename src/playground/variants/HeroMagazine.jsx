import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const HeroMagazine = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={containerRef}
      className="relative bg-paper min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      <div className="w-full border-b border-charcoal/10">
        <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
          <motion.span
            className="font-sans text-section-label tracking-widest uppercase text-label font-bold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sullivan Street Projects
          </motion.span>
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="font-sans text-section-label tracking-wider uppercase text-faint hidden md:block">New York</span>
            <span className="w-px h-3 bg-divider hidden md:block" />
            <span className="font-sans text-section-label tracking-wider uppercase text-faint hidden md:block">Issue No. 1</span>
          </motion.div>
        </div>
      </div>

      <div className="flex-1 max-w-site mx-auto w-full px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 items-start">
        <div className="col-span-12 lg:col-span-8 flex flex-col">
          <motion.div
            className="flex items-center gap-4 mb-10 md:mb-14"
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <div className="w-6 h-px bg-charcoal" />
            <span className="font-sans text-section-label tracking-widest uppercase text-charcoal font-bold">Growth Marketing</span>
          </motion.div>

          <motion.h1 className="font-serif text-charcoal leading-[1.08] tracking-tight" style={{ y: headlineY }}>
            <motion.span
              className="block text-[2.75rem] md:text-[4rem] lg:text-[5.25rem] xl:text-[6rem]"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            >
              Marketing
            </motion.span>
            <motion.span
              className="block text-[2.75rem] md:text-[4rem] lg:text-[5.25rem] xl:text-[6rem] italic text-secondary"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.36 }}
            >
              for Tomorrow's
            </motion.span>
            <motion.span
              className="block text-[2rem] md:text-[2.75rem] lg:text-[3.5rem] text-label mt-3"
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.47 }}
            >
              Billion-Dollar Brands
            </motion.span>
          </motion.h1>

          <motion.div
            className="h-px bg-charcoal/15 mt-10 md:mt-14"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
          />
        </div>

        <div className="col-span-12 lg:col-span-4 lg:pt-[7.5rem] flex flex-col gap-8 lg:border-l lg:border-charcoal/10 lg:pl-8">
          <motion.p
            className="font-sans text-section-label tracking-widest uppercase text-label hidden lg:block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
          >
            Overview
          </motion.p>

          <motion.p
            className="font-sans text-body-sm md:text-body text-secondary leading-relaxed font-light"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            AI-powered strategy, media, and execution. Faster growth. Sharper focus. Higher profit.
          </motion.p>

          <motion.div
            className="h-px bg-divider"
            initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          >
            <a href="#contact" className="group inline-flex items-center justify-between w-full font-sans text-body-sm text-charcoal font-medium no-underline py-3 border-t border-b border-charcoal/15 hover:border-charcoal transition-colors duration-300">
              <span>Schedule a call</span>
              <span className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          </motion.div>

          <motion.div
            className="mt-auto pt-6 hidden lg:block"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.9 }}
          >
            <p className="font-serif text-[2rem] text-charcoal leading-none mb-1">10+</p>
            <p className="font-sans text-caption text-label">Years of growth marketing experience</p>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 py-5 flex items-center justify-between">
          <motion.div className="flex items-center gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.95 }}>
            <span className="font-sans text-micro text-faint uppercase tracking-widest">AI Strategy</span>
            <span className="w-px h-3 bg-divider hidden md:block" />
            <span className="font-sans text-micro text-faint uppercase tracking-widest hidden md:block">Paid Media</span>
            <span className="w-px h-3 bg-divider hidden md:block" />
            <span className="font-sans text-micro text-faint uppercase tracking-widest hidden md:block">Performance</span>
          </motion.div>
          <motion.span className="font-sans text-micro text-faint tabular-nums" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }}>
            Est. New York, NY
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default HeroMagazine;
