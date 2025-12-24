import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setIndex(0);
        setActive(false);
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        timerRef.current = setTimeout(() => setActive(true), 500);
      }
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    if (index < text.length) {
      const timeout = setTimeout(() => setIndex(prev => prev + 1), 70);
      return () => clearTimeout(timeout);
    }
  }, [index, active, text]);

  return (
    <span ref={containerRef} className="italic inline-block relative">
      {/* Phantom text to reserve full space immediately */}
      <span className="opacity-0 pointer-events-none select-none">
        {text}
        <span className="inline-block w-[2px] ml-1.5" />
      </span>
      
      {/* Absolute overlay for the typing effect */}
      <span className="absolute top-0 left-0 w-full h-full whitespace-pre-wrap">
        <span className="opacity-100">{text.slice(0, index)}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-[0.8em] bg-[#1a1a1a] ml-1.5 translate-y-[0.1em]"
          style={{ visibility: active ? 'visible' : 'hidden' }}
        />
      </span>
    </span>
  );
};

export default TypewriterText;