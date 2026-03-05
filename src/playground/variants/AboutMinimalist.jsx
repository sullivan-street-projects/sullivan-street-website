import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

const FadeUp = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

const AboutMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper py-24 md:py-32 lg:py-40" aria-label="About">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <FadeUp>
          <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-10 md:mb-14">
            About
          </span>
        </FadeUp>

        {/* Headline */}
        <div className="max-w-prose mb-16 md:mb-20">
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-3xl md:text-5xl italic text-charcoal leading-snug tracking-tight mb-10 md:mb-12">
              Yesterday's agencies aren't built for tomorrow's brands.
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light space-y-8">
              <p>
                They were built for a world where scale meant headcount. Today, the advantage belongs to teams that orchestrate — managing systems, aligning talent, and making the business decisions AI can't make without a human in the loop.
              </p>
              <p>
                Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We're who businesses call when they need more than point solutions and disconnected vendors. We partner with you, look across your business, translate goals into a clear plan, and manage marketing like the investment it is.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-charcoal/10 mb-12 md:mb-16"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
        />

        {/* Founder card */}
        <FadeUp delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <div className="flex flex-row items-center gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-full bg-charcoal/5">
                  <img
                    src="image.webp"
                    alt="Brett Wohl"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div>
                  <h4 className="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h4>
                  <p className="font-sans text-section-label uppercase tracking-widest font-bold text-label">
                    Founder, Managing Partner
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="font-sans text-caption text-muted leading-relaxed font-light italic">
                Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default AboutMinimalist;
