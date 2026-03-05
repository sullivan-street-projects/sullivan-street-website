import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const FooterMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer ref={ref} className="bg-paper border-t border-charcoal pt-16 pb-12 md:pt-20 md:pb-16" aria-label="Footer">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Masthead */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="font-serif text-3xl md:text-4xl font-bold text-charcoal block">
            Sullivan Street Projects
          </span>
        </motion.div>

        {/* Editorial grid */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10 mb-12 md:mb-16">
          {/* Our Promise */}
          <motion.div
            className="col-span-12 md:col-span-5 lg:col-span-4"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-4">
              Our Promise
            </span>
            <p className="font-serif text-body-md italic text-charcoal leading-relaxed">
              Stop guessing. Start growing.
            </p>
            <p className="font-sans text-caption text-muted mt-3 font-light">
              Growth marketing partners for tomorrow's billion-dollar brands.
            </p>
          </motion.div>

          {/* Thin vertical rule — desktop only */}
          <div className="hidden lg:flex col-span-1 justify-center">
            <motion.div
              className="w-px h-full bg-charcoal/15"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            />
          </div>

          {/* Location */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-4">
              Office
            </span>
            <p className="font-sans text-ui text-secondary leading-relaxed">
              1178 Broadway<br />
              New York, NY 10001
            </p>
          </motion.div>

          {/* Legal */}
          <motion.div
            className="col-span-12 md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-4">
              Legal
            </span>
            <div className="flex flex-col gap-3 font-sans text-caption text-label">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom dateline bar */}
        <motion.div
          className="h-px bg-charcoal mb-5"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
        />
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-sans text-caption text-faint">
            © {new Date().getFullYear()} Sullivan Street Projects LLC
          </p>
          <span className="font-sans text-micro text-faint tracking-wider uppercase hidden md:block">
            Est. New York, NY
          </span>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterMagazine;
