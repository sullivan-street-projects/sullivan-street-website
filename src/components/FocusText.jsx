import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * FocusText - Scroll-based focus/blur effect component
 *
 * Creates a "camera lens" effect where content comes into focus as it
 * enters the viewport and blurs out as it exits.
 *
 * @param {ReactNode} children - Content to wrap
 * @param {string} className - Additional CSS classes
 * @param {boolean} noBlur - When true, disables blur effect (for UI elements like headers)
 *
 * Scroll Progress Keyframes:
 * - 0.0: Element at bottom edge of viewport - blurred, faded, offset
 * - 0.01: Element comes into focus almost instantly (prevents blur on page load)
 * - 0.98: Element stays focused until nearly scrolled out
 * - 1.0: Element exits viewport (top) - heavily blurred, faded out
 */
const FocusText = ({ children, className = "", noBlur = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // start 110%: animation begins when element is still below viewport
    // This ensures elements visible on page load already have positive scroll progress
    offset: ["start 110%", "center 50%", "top -100px"]
  });

  // Entry: nearly instant (0.01) so elements visible on load are focused
  // Exit: very late (0.98) to prevent premature blur on short viewports
  const blurValue = useTransform(scrollYProgress, [0, 0.01, 0.98, 1], [noBlur ? 0 : 3.5, 0, 0, 40]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.01, 0.98, 1], [noBlur ? 1 : 0.4, 1, 1, 0]);
  const yValue = useTransform(scrollYProgress, [0, 0.01], [noBlur ? 0 : 8, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        filter: useTransform(blurValue, (v) => `blur(${v}px)`),
        opacity: opacityValue,
        y: yValue,
        transform: 'translateZ(0)',
      }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FocusText;
