import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { TIERS, MOBILE_TIERS } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

const ServicesImmersive = () => {
  const [activeTier, setActiveTier] = useState('management');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const currentTier = MOBILE_TIERS.find((t) => t.id === activeTier);

  return (
    <section
      ref={ref}
      className="relative bg-charcoal py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-label="Services"
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
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold block mb-8">
            Services
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-paper leading-tight tracking-tight mb-6">
            Your marketing investment,<br />
            <span className="italic text-paper/70">managed.</span>
          </h2>
          <p className="font-sans text-body md:text-body-md text-paper/50 leading-relaxed font-light max-w-narrow">
            Three ways to work together. One point of contact. The right team for the job.
          </p>
        </motion.div>

        {/* Tier selector tabs */}
        <motion.div
          className="flex gap-0 border-b border-paper/10 mb-12 md:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`relative px-6 py-4 font-sans text-body-sm font-medium transition-colors duration-300 ${
                activeTier === tier.id ? 'text-paper' : 'text-paper/30 hover:text-paper/60'
              }`}
            >
              {tier.title}
              {activeTier === tier.id && (
                <motion.div
                  layoutId="active-tier-tab"
                  className="absolute bottom-0 left-0 right-0 h-px bg-paper"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Active tier content */}
        <AnimatePresence mode="wait">
          {currentTier && (
            <motion.div
              key={currentTier.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-8">
                {/* Description */}
                <div className="col-span-12 md:col-span-5">
                  <span className="font-sans text-micro uppercase tracking-widest font-bold text-paper/30 block mb-3">
                    {currentTier.subtitle}
                  </span>
                  <p className="font-sans text-body md:text-body-md text-paper/60 leading-relaxed font-light">
                    {currentTier.description}
                  </p>
                </div>

                {/* Features */}
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <span className="font-sans text-caption italic text-paper/30 block mb-5">
                    {currentTier.includesText}
                  </span>
                  <ul className="space-y-3.5">
                    {currentTier.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        className="font-sans text-body-sm text-paper/60 font-light flex items-start"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                      >
                        <span className="text-green/60 mr-3 mt-1 text-[10px]">●</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footnote */}
        <motion.p
          className="font-sans text-caption italic text-paper/25 mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Diagnostic assessments available by request.
        </motion.p>
      </div>
    </section>
  );
};

export default ServicesImmersive;
