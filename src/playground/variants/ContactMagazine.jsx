import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const ContactMagazine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="bg-paper-warm py-24 md:py-32 lg:py-40" aria-label="Contact">
      <div className="max-w-site mx-auto px-6 md:px-10 lg:px-16">
        {/* Top rule */}
        <motion.div
          className="h-px bg-charcoal mb-8 md:mb-12"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE }}
        />

        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-10">
          {/* Left: large headline area */}
          <motion.div
            className="col-span-12 lg:col-span-8"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <span className="font-sans text-section-label tracking-widest uppercase text-label font-bold block mb-8 md:mb-12">
              Contact
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-display-sm leading-[1.1] tracking-tight text-charcoal">
              Ready to build<br />
              <span className="italic">tomorrow's billion-dollar brand?</span>
            </h2>
          </motion.div>

          {/* Right: bordered CTA box */}
          <motion.div
            className="col-span-12 lg:col-span-3 lg:col-start-10 flex items-end"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <div className="w-full border border-charcoal/15 p-6 md:p-8">
              <span className="font-sans text-micro uppercase tracking-widest text-label block mb-4">
                Start a conversation
              </span>
              <a
                href="mailto:hello@sullivanstreetprojects.co"
                className="group flex items-center justify-between w-full font-sans text-body text-charcoal font-medium no-underline py-3 border-t border-b border-charcoal/15 hover:border-charcoal transition-colors duration-300"
              >
                <span>Schedule a call</span>
                <span className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <p className="font-sans text-caption text-label mt-4">
                hello@sullivanstreetprojects.co
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom rule */}
        <motion.div
          className="h-px bg-charcoal mt-16 md:mt-20"
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, ease: EASE, delay: 0.5 }}
        />
      </div>
    </section>
  );
};

export default ContactMagazine;
