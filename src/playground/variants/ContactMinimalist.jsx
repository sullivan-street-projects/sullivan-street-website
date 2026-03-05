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

const ContactMinimalist = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper min-h-screen flex items-center" aria-label="Contact">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16 w-full py-24 md:py-32">
        <div className="max-w-prose mx-auto text-center">
          {/* Label */}
          <FadeUp>
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-10 md:mb-14">
              Get in Touch
            </span>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-display-sm leading-[1.1] tracking-tight text-charcoal mb-6">
              Ready to build<br />
              <span className="italic">tomorrow's billion-dollar brand?</span>
            </h2>
          </FadeUp>

          {/* Vertical hairline */}
          <motion.div
            className="w-px h-12 md:h-16 bg-charcoal/15 mx-auto my-10 md:my-14"
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          />

          {/* CTA link */}
          <FadeUp delay={0.35}>
            <a
              href="mailto:hello@sullivanstreetprojects.co"
              className="group inline-flex items-center gap-4 font-sans text-body-md md:text-body-lg text-charcoal font-medium no-underline"
            >
              <span className="relative">
                Schedule a call
                <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300 ease-in-out" />
              </span>
              <span className="inline-block w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default ContactMinimalist;
