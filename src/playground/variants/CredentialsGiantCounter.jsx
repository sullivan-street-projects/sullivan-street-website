import { useRef, useEffect } from 'react';
import { useSpring, useTransform, motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

function AnimatedNumber({ value, isInView, reducedMotion }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (reducedMotion) {
      spring.set(value);
      return;
    }
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring, reducedMotion]);

  return (
    <motion.span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}
    </motion.span>
  );
}

export default function CredentialsGiantCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reducedMotion = useReducedMotion();

  const showDetails = reducedMotion || isInView;

  return (
    <section
      ref={ref}
      className="py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-site px-6 text-center">
        {/* Section label */}
        <p className="font-sans text-section-label uppercase tracking-widest text-label">
          Career Media Managed
        </p>

        {/* The number */}
        <p className="mt-6 font-serif text-[120px] md:text-[180px] lg:text-[240px] leading-none text-charcoal">
          <span>$</span>
          <AnimatedNumber
            value={2}
            isInView={isInView}
            reducedMotion={reducedMotion}
          />
          <span>B+</span>
        </p>

        {/* Qualifier */}
        <motion.p
          className="mt-4 font-sans text-body-sm italic text-muted"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={showDetails ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 1.5, duration: 0.8 }}
        >
          in managed media
        </motion.p>

        {/* Context */}
        <motion.p
          className="mt-8 font-sans text-caption text-faint"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={showDetails ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reducedMotion ? 0 : 1.5, duration: 0.8 }}
        >
          Publicis Groupe · Google · Navan · SSP
        </motion.p>
      </div>
    </section>
  );
}
