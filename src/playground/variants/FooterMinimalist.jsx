import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
};

const FooterMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer ref={ref} className="bg-paper border-t border-charcoal/10 pt-20 pb-16 md:pt-28 md:pb-20" aria-label="Footer">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-16 md:mb-20">
          {/* Company */}
          <FadeUp className="lg:col-span-5">
            <span className="font-serif text-2xl font-bold text-charcoal block mb-6">
              Sullivan Street Projects
            </span>
            <p className="font-serif text-body-sm italic text-muted mb-1">
              Growth Marketing Partners
            </p>
            <p className="font-sans text-caption text-label tracking-wide">
              Stop guessing. Start growing.
            </p>
          </FadeUp>

          {/* Address */}
          <FadeUp delay={0.1} className="lg:col-span-3">
            <span className="font-sans text-section-label font-bold uppercase tracking-wider text-label block mb-5">
              Location
            </span>
            <p className="font-sans text-ui text-secondary leading-relaxed">
              1178 Broadway<br />
              New York, NY 10001
            </p>
          </FadeUp>

          {/* Legal */}
          <FadeUp delay={0.2} className="lg:col-span-4">
            <span className="font-sans text-section-label font-bold uppercase tracking-wider text-label block mb-5">
              Legal
            </span>
            <div className="flex flex-col gap-3 font-sans text-caption text-label">
              <span>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </FadeUp>
        </div>

        {/* Bottom rule + copyright */}
        <motion.div
          className="h-px bg-charcoal/10 mb-6"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.3 }}
        />
        <FadeUp delay={0.35}>
          <p className="font-sans text-caption text-faint">
            © {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.
          </p>
        </FadeUp>
      </div>
    </footer>
  );
};

export default FooterMinimalist;
