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
 * - 0.2: Element comes into focus (visible blur-to-sharp transition)
 * - 0.9: Element stays focused until nearly scrolled out
 * - 1.0: Element exits viewport (top) - heavily blurred, faded out
 */
const FocusText = ({ children, className = "", noBlur = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "center 50%", "top -100px"]
  });

  // Entry: blur clears over 20% of scroll progress (visible transition)
  // Exit: blur starts at 90% progress
  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [noBlur ? 0 : 3.5, 0, 0, 40]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [noBlur ? 1 : 0.4, 1, 1, 0]);
  const yValue = useTransform(scrollYProgress, [0, 0.1], [noBlur ? 0 : 8, 0]);

  // Padding + negative margin prevents filter clipping on italic text
  // (italic glyphs extend beyond their bounding box on the left)
  return (
    <motion.div
      ref={ref}
      style={{
        filter: useTransform(blurValue, (v) => `blur(${v}px)`),
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
