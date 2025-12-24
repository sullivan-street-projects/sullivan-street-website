import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FocusText = ({ children, className = "", noBlur = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "center 50%", "top 80px"]
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [noBlur ? 0 : 3.5, 0, 0, 40]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [noBlur ? 1 : 0.4, 1, 1, 0]);
  const yValue = useTransform(scrollYProgress, [0, 0.1], [noBlur ? 0 : 8, 0]);

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
