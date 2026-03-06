import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedArrow from './AnimatedArrow';

const CTAButton = ({ href, onClick, children, variant = 'sm' }) => {
  const isLarge = variant === 'lg';
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const className = isLarge
    ? 'font-serif text-3xl md:text-4xl lg:text-5xl italic inline-flex items-center gap-6 md:gap-10 transition-colors text-charcoal'
    : 'font-sans text-micro font-bold uppercase tracking-wider inline-flex items-center gap-4 transition-colors text-charcoal';

  const underlineClass = isLarge
    ? 'absolute -bottom-4 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 delay-100'
    : 'absolute -bottom-2 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 delay-100';

  const Tag = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative inline-block cursor-pointer"
    >
      <Tag
        {...props}
        className={className}
        whileHover={{ scale: 1.03, y: -1 }}
        transition={{ ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 }}
      >
        <span className="relative z-10">{children}</span>
        <AnimatedArrow size={variant} className={isLarge ? 'not-italic relative z-10' : 'relative z-10'} />
      </Tag>
      <div className={underlineClass} />
    </motion.div>
  );
};

export default CTAButton;
