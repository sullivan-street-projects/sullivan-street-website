import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BRANDS } from '../../constants';

const EASE = [0.16, 1, 0.3, 1];

// Infinite horizontal marquee using CSS animation for smooth, glitch-free loop
const Marquee = ({ children, speed = 30, reverse = false }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

const CredentialsImmersive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const firstHalf = BRANDS.slice(0, 7);
  const secondHalf = BRANDS.slice(7);

  return (
    <section
      ref={ref}
      className="relative bg-charcoal py-24 md:py-32 lg:py-40 overflow-hidden"
      aria-label="Credentials"
    >
      {/* Background watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
        aria-hidden="true"
      >
        <span className="font-serif text-[20vw] text-paper leading-none tracking-tighter select-none">
          $2B+
        </span>
      </div>

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20">
        {/* Label */}
        <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 mb-12 md:mb-16">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-green"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-sans text-section-label tracking-widest uppercase text-paper/40 font-bold">
              Before SSP, our team managed $2B+ for
            </span>
          </motion.div>
        </div>

        {/* Marquee rows */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Marquee speed={35}>
            <div className="flex items-center gap-8 px-4">
              {firstHalf.map((brand) => (
                <span
                  key={brand}
                  className="font-sans text-xl md:text-2xl lg:text-3xl font-light text-paper/25 uppercase tracking-widest whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Marquee>
          <Marquee speed={40} reverse>
            <div className="flex items-center gap-8 px-4">
              {secondHalf.map((brand) => (
                <span
                  key={brand}
                  className="font-sans text-xl md:text-2xl lg:text-3xl font-light text-paper/25 uppercase tracking-widest whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default CredentialsImmersive;
