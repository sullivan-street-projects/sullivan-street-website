import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const FooterImmersive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer ref={ref} className="relative bg-charcoal pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden" aria-label="Footer">
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

      {/* Animated gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="h-full w-1/3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(250,250,248,0.3), transparent)' }}
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
      </motion.div>

      {/* Background company name watermark */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 overflow-hidden" aria-hidden="true">
        <motion.span
          className="font-serif text-[8vw] md:text-[6vw] text-paper/[0.025] leading-none block text-center whitespace-nowrap select-none translate-y-1/4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Sullivan Street Projects
        </motion.span>
      </div>

      <div className="relative z-20 max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-16 md:mb-20">
          {/* Company + motto */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="font-serif text-2xl font-bold text-paper block mb-6">
              Sullivan Street Projects
            </span>
            <p className="font-serif text-body-sm italic text-paper/40 mb-1">
              Growth Marketing Partners
            </p>
            <p className="font-sans text-body-sm text-paper/60 font-light">
              Stop guessing. Start growing.
            </p>
          </motion.div>

          {/* Address */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <span className="font-sans text-section-label font-bold uppercase tracking-wider text-paper/30 block mb-5">
              Location
            </span>
            <p className="font-sans text-ui text-paper/50 leading-relaxed">
              1178 Broadway<br />
              New York, NY 10001
            </p>
          </motion.div>

          {/* Legal */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <span className="font-sans text-section-label font-bold uppercase tracking-wider text-paper/30 block mb-5">
              Legal
            </span>
            <div className="flex flex-col gap-3 font-sans text-caption text-paper/40">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule + copyright */}
        <motion.div
          className="h-px bg-paper/10 mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
        />
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <p className="font-sans text-caption text-paper/20">
            © {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.
          </p>
          <span className="font-sans text-micro text-paper/15 tracking-wider uppercase hidden md:block">
            New York
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterImmersive;
