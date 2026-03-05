import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const ContactImmersive = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Word-by-word reveal for headline
  const headline = 'Ready to build tomorrow\'s billion-dollar brand?';
  const words = headline.split(' ');

  return (
    <section
      ref={ref}
      className="relative bg-charcoal min-h-screen flex items-center overflow-hidden"
      aria-label="Contact"
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

      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #4ADE80 0%, transparent 70%)' }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-site mx-auto px-6 md:px-10 lg:px-16 w-full py-24 md:py-32">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-24"
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
            Let's Talk
          </span>
        </motion.div>

        {/* Headline — word reveal */}
        <h2 className="font-serif text-4xl md:text-6xl lg:text-display leading-[1.1] tracking-tight text-paper mb-16 md:mb-20 max-w-content">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${word === "tomorrow's" || word === 'billion-dollar' || word === 'brand?' ? 'italic text-paper/70' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
        >
          <a
            href="mailto:hello@sullivanstreetprojects.co"
            className="group inline-flex items-center gap-3 bg-paper text-charcoal font-sans text-body font-medium px-8 py-4 rounded-full no-underline hover:bg-paper/90 transition-colors duration-300"
          >
            Schedule a call
            <span className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Email */}
        <motion.p
          className="font-sans text-caption text-paper/25 mt-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          hello@sullivanstreetprojects.co
        </motion.p>
      </div>
    </section>
  );
};

export default ContactImmersive;
