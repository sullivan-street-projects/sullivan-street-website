import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATION } from '../constants';

const AnimatedArrow = ({ size = 'sm', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl lg:text-6xl'
  };

  const xDistance = size === 'lg' ? 8 : 4;

  return (
    <motion.span
      animate={{ x: [0, xDistance, 0] }}
      transition={{
        duration: ANIMATION.ARROW_DURATION,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={`${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      →
    </motion.span>
  );
};

export default AnimatedArrow;
