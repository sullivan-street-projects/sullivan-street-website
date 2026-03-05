import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Scroll-reveal wrapper: opacity 0.4→1, blur 3.5→0, Y 8→0.
 *
 * Convention:
 * - Wrap content blocks, not individual paragraphs within a block.
 * - Grid/list items each get their own FocusText for staggered reveal.
 * - Hero is above the fold — no FocusText wrapping.
 * - Each FocusText boundary = one scroll-reveal unit.
 */
const FocusText = ({ children, className = "", noBlur = false }) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"]
  });

  const blurValue = useTransform(scrollYProgress, [0, 1], [noBlur ? 0 : 3.5, 0]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.6], [noBlur ? 1 : 0.4, 1]);
  const yValue = useTransform(scrollYProgress, [0, 0.6], [noBlur ? 0 : 8, 0]);
  const filterValue = useTransform(blurValue, (v) => `blur(${v}px)`);

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        filter: filterValue,
        opacity: opacityValue,
        y: yValue,
        transform: 'translateZ(0)',
      }}
      className={`will-change-[filter,opacity,transform] -mx-1 px-1 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FocusText;
