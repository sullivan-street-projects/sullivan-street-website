import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const AboutMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="About">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        {/* Pull quote */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          <span className="font-serif text-6xl md:text-7xl text-charcoal/10 leading-none select-none block mb-4" aria-hidden="true">
            "
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl italic text-charcoal leading-snug tracking-tight max-w-content mx-auto">
            Yesterday's agencies aren't built for tomorrow's brands.
          </h2>
        </motion.div>

        {/* Two-column body */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8 mb-16 md:mb-20">
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          >
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light">
              <span className="font-serif text-3xl text-charcoal float-left mr-2 mt-1 leading-none">T</span>hey were built for a world where scale meant headcount. Today, the advantage belongs to teams that orchestrate — managing systems, aligning talent, and making the business decisions AI can't make without a human in the loop.
            </p>
          </motion.div>

          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7 md:border-l md:border-charcoal/10 md:pl-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          >
            <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light">
              Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We're who businesses call when they need more than point solutions and disconnected vendors.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-charcoal/15 mb-12 md:mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        />

        {/* Founder — contributor box style */}
        <motion.div
          className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-6 items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
        >
          <div className="col-span-12 md:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-full bg-charcoal/5 grayscale">
              <img
                src="image.webp"
                alt="Brett Wohl"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <h4 className="font-serif text-lg text-charcoal leading-tight">Brett Wohl</h4>
            <p className="font-sans text-micro uppercase tracking-widest font-bold text-label mt-1">
              Founder
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-8 md:border-l md:border-charcoal/10 md:pl-8">
            <p className="font-sans text-caption text-muted leading-relaxed font-light italic">
              Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
            </p>
          </div>
        </motion.div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-12 md:mt-16"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default AboutMagazine;
