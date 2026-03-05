import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Word-by-word reveal tied to scroll
const WordReveal = ({ text, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0.15 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.04 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const AboutImmersive = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-label="About"
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

      <div className="relative z-20 max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-14 md:mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold">
            About
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <div className="max-w-content mb-16 md:mb-20">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-snug tracking-tight text-paper">
            <WordReveal text="Yesterday's agencies aren't built for tomorrow's brands." />
          </h2>
        </div>

        {/* Body */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 mb-20 md:mb-28">
          <motion.div
            className="col-span-12 lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="font-sans text-body md:text-body-md text-paper/50 leading-relaxed font-light">
              They were built for a world where scale meant headcount. Today, the advantage belongs to teams that orchestrate — managing systems, aligning talent, and making the business decisions AI can't make without a human in the loop.
            </p>
          </motion.div>
          <motion.div
            className="col-span-12 lg:col-span-5 lg:col-start-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
          >
            <p className="font-sans text-body md:text-body-md text-paper/50 leading-relaxed font-light">
              Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We partner with you, look across your business, translate goals into a clear plan, and manage marketing like the investment it is.
            </p>
          </motion.div>
        </div>

        {/* Founder band */}
        <motion.div
          className="border-t border-paper/10 pt-12 md:pt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 items-center">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 flex items-center gap-5">
              <motion.div
                className="w-14 h-14 md:w-16 md:h-16 shrink-0 overflow-hidden rounded-full bg-paper/5"
                style={{ y: photoY }}
              >
                <img
                  src="image.webp"
                  alt="Brett Wohl"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </motion.div>
              <div>
                <h4 className="font-serif text-lg text-paper leading-tight">Brett Wohl</h4>
                <p className="font-sans text-micro uppercase tracking-widest font-bold text-paper/30 mt-1">
                  Founder
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-8 lg:col-start-5">
              <p className="font-sans text-caption text-paper/40 leading-relaxed font-light italic">
                Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutImmersive;
