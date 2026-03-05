import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1];

const AnimatedWord = ({ text, delay = 0, className = '' }) => {
  const letters = text.split('');
  return (
    <span className={`inline-block overflow-hidden ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: delay + i * 0.025 }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

const HeroImmersive = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.15, 0.5]);

  return (
    <section ref={containerRef} className="relative bg-charcoal min-h-screen flex flex-col overflow-hidden" aria-label="Hero">
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #2a2a2a 0%, #1a1a1a 100%)', opacity: overlayOpacity }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full z-0 opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #4ADE80 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-20 w-full px-6 md:px-10 lg:px-16 pt-10 md:pt-14 flex items-center justify-between">
        <motion.span className="font-sans text-section-label tracking-widest uppercase text-paper/50 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          Sullivan Street Projects
        </motion.span>
        <motion.a href="#contact" className="font-sans text-micro tracking-wider uppercase text-paper/50 border border-paper/15 rounded-full px-4 py-2 hover:border-paper/40 hover:text-paper/80 transition-colors duration-300 no-underline hidden md:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          Schedule a call
        </motion.a>
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-10 lg:px-16">
        <div className="max-w-site mx-auto w-full">
          <motion.div className="flex items-center gap-3 mb-10 md:mb-14" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
            <motion.span className="w-1.5 h-1.5 rounded-full bg-green" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
            <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold">AI-Powered Growth Marketing</span>
          </motion.div>

          <motion.h1 className="font-serif text-paper leading-[1.06] tracking-tight" style={{ y: headlineY }}>
            <span className="block text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem]">
              <AnimatedWord text="Marketing" delay={0.2} />{' '}
              <AnimatedWord text="for" delay={0.38} className="text-paper/40" />
            </span>
            <span className="block text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] italic lg:pl-12 mt-1">
              <AnimatedWord text="Tomorrow's" delay={0.52} />
            </span>
            <span className="block text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[4.75rem] text-paper/70 mt-2">
              <AnimatedWord text="Billion-Dollar" delay={0.68} />{' '}
              <AnimatedWord text="Brands" delay={0.95} />
            </span>
          </motion.h1>

          <motion.div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 mt-12 md:mt-16 lg:mt-20" style={{ y: subY }}>
            <motion.p className="col-span-12 md:col-span-7 lg:col-span-5 font-sans text-body md:text-body-md text-paper/50 leading-relaxed font-light" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.1 }}>
              AI-powered strategy, media, and execution.{' '}
              <span className="text-paper/75">Faster growth. Sharper focus. Higher profit.</span>
            </motion.p>
            <motion.div className="col-span-12 md:col-span-5 lg:col-span-7 flex md:justify-end items-end" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.2 }}>
              <a href="#contact" className="group inline-flex items-center gap-3 bg-paper text-charcoal font-sans text-body-sm font-medium px-6 py-3.5 rounded-full no-underline hover:bg-paper/90 transition-colors duration-300">
                Schedule a call
                <span className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div className="relative z-20 w-full px-6 md:px-10 lg:px-16 pb-10 md:pb-14 flex items-end justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }}>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {['Strategy', 'Paid Media', 'Creative', 'Analytics'].map((tag) => (
            <span key={tag} className="font-sans text-micro text-paper/25 uppercase tracking-widest">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-sans text-micro text-paper/25 uppercase tracking-widest hidden md:block">Scroll</span>
          <div className="relative w-px h-8 bg-paper/10 overflow-hidden">
            <motion.div className="absolute top-0 left-0 w-full bg-paper/40" animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 1.5 }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroImmersive;
