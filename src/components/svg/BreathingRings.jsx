import { motion } from 'framer-motion';

const BreathingRings = () => (
  <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
    {[...Array(4)].map((_, ring) => {
      const baseRadius = 20 + ring * 18;
      const dotCount = 6 + ring * 4;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        return (
          <motion.circle
            key={`${ring}-${i}`}
            cx={120 + Math.cos(angle) * baseRadius}
            cy={100 + Math.sin(angle) * baseRadius}
            r={3.5 - ring * 0.5}
            fill="currentColor"
            opacity={0.75}
            animate={{
              cx: [
                120 + Math.cos(angle) * baseRadius,
                120 + Math.cos(angle) * (baseRadius + 6),
                120 + Math.cos(angle) * baseRadius,
              ],
              cy: [
                100 + Math.sin(angle) * baseRadius,
                100 + Math.sin(angle) * (baseRadius + 6),
                100 + Math.sin(angle) * baseRadius,
              ],
            }}
            transition={{
              duration: 4 + ring * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ring * 0.3,
            }}
          />
        );
      });
    })}
  </svg>
);

export default BreathingRings;
