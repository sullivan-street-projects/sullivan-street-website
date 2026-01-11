import { motion } from 'framer-motion';
import { useState } from 'react';

// Dots that converge toward the CTA
const ConvergingDots = ({ isHovered }) => {
  // Generate scattered dots that will converge
  const dots = [
    // Outer ring - furthest dots
    { x: 10, y: 20, size: 2, delay: 0 },
    { x: 90, y: 15, size: 1.5, delay: 0.1 },
    { x: 15, y: 80, size: 2.5, delay: 0.2 },
    { x: 85, y: 85, size: 2, delay: 0.15 },
    { x: 5, y: 50, size: 1.8, delay: 0.25 },
    { x: 95, y: 50, size: 2.2, delay: 0.05 },
    // Middle ring
    { x: 25, y: 30, size: 2.5, delay: 0.3 },
    { x: 75, y: 25, size: 2, delay: 0.35 },
    { x: 20, y: 70, size: 2.2, delay: 0.4 },
    { x: 80, y: 75, size: 1.8, delay: 0.45 },
    { x: 30, y: 50, size: 3, delay: 0.2 },
    { x: 70, y: 50, size: 2.8, delay: 0.25 },
    // Inner ring - closest dots
    { x: 38, y: 40, size: 2.5, delay: 0.5 },
    { x: 62, y: 38, size: 2.2, delay: 0.55 },
    { x: 35, y: 60, size: 2.8, delay: 0.6 },
    { x: 65, y: 62, size: 2.5, delay: 0.5 },
  ];

  const centerX = 50;
  const centerY = 50;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    >
      {dots.map((dot, i) => {
        // Calculate converged position (pulled toward center)
        const pullStrength = 0.7; // How much dots move toward center
        const convergedX = dot.x + (centerX - dot.x) * pullStrength;
        const convergedY = dot.y + (centerY - dot.y) * pullStrength;

        return (
          <motion.circle
            key={i}
            r={dot.size}
            fill="#1a1a1a"
            initial={{ cx: dot.x, cy: dot.y, opacity: 0.4 }}
            animate={{
              cx: isHovered ? convergedX : dot.x,
              cy: isHovered ? convergedY : dot.y,
              opacity: isHovered ? 0.7 : 0.4,
              r: isHovered ? dot.size * 1.2 : dot.size,
            }}
            transition={{
              duration: 0.6,
              delay: dot.delay,
              ease: [0.23, 1, 0.32, 1], // Custom ease for magnetic feel
            }}
          />
        );
      })}
    </svg>
  );
};

// Pulsing ring effect on hover
const PulseRing = ({ isHovered }) => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center pointer-events-none"
    initial={{ opacity: 0 }}
    animate={{ opacity: isHovered ? 1 : 0 }}
  >
    <motion.div
      className="w-32 h-32 rounded-full border border-[#1a1a1a]/20"
      animate={
        isHovered
          ? {
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }
          : { scale: 1, opacity: 0 }
      }
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  </motion.div>
);

const ContactConvergence = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        V: CONTACT CONVERGENCE — Magnetic dots drawn to CTA
      </p>

      {/* CTA Section */}
      <div className="relative bg-[#f0f0ee] rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center">
        {/* Converging dot field */}
        <ConvergingDots isHovered={isHovered} />

        {/* Pulse ring */}
        <PulseRing isHovered={isHovered} />

        {/* CTA Content */}
        <div className="relative z-10 text-center px-8">
          <h2 className="font-serif text-[28px] md:text-[36px] leading-tight text-[#1a1a1a] mb-6">
            Ready to build
            <br />
            <span className="italic">Tomorrow's Billion-Dollar Brand?</span>
          </h2>

          <motion.a
            href="mailto:hello@sullivanstreetprojects.com"
            className="inline-flex items-center gap-3 font-serif text-[24px] md:text-[32px] text-[#1a1a1a] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative">
              Let's talk
              <motion.span
                className="absolute left-0 -bottom-1 h-[2px] bg-[#1a1a1a] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              />
            </span>
            <motion.span
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* Alternate: Always-animated version */}
      <div className="mt-8">
        <p className="font-sans text-xs font-medium text-[#a3a3a3] mb-4 uppercase tracking-wider">
          Alternate: Continuous Animation
        </p>
        <div className="relative bg-[#f0f0ee] rounded-2xl overflow-hidden h-[200px] flex items-center justify-center">
          <ContinuousConvergence />
          <div className="relative z-10">
            <span className="font-serif text-xl text-[#1a1a1a]">
              Schedule a call →
            </span>
          </div>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Dots are magnetically drawn toward the CTA on hover, creating a sense of gravity and focus.
        The continuous version shows ambient motion without interaction.
      </p>
    </div>
  );
};

// Continuous ambient convergence animation
const ContinuousConvergence = () => {
  const dots = [
    { x: 15, y: 25, size: 2 },
    { x: 85, y: 20, size: 1.8 },
    { x: 10, y: 75, size: 2.2 },
    { x: 90, y: 80, size: 2 },
    { x: 25, y: 50, size: 2.5 },
    { x: 75, y: 50, size: 2.5 },
    { x: 50, y: 15, size: 1.5 },
    { x: 50, y: 85, size: 1.5 },
  ];

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          r={dot.size}
          fill="#1a1a1a"
          opacity={0.5}
          animate={{
            cx: [dot.x, 50 + (dot.x - 50) * 0.4, dot.x],
            cy: [dot.y, 50 + (dot.y - 50) * 0.4, dot.y],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
};

export default ContactConvergence;
