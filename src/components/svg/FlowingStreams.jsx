import { motion } from 'framer-motion';

const FlowingStreams = () => (
  <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
    {[...Array(5)].map((_, row) => {
      const intensity = [2.0, 3.0, 4.0, 3.0, 2.0][row];
      return [...Array(10)].map((_, col) => {
        const baseX = 30 + col * 20;
        const baseY = 35 + row * 32;
        return (
          <motion.circle
            key={`${row}-${col}`}
            cx={baseX}
            cy={baseY}
            r={intensity}
            fill="currentColor"
            opacity={0.75}
            animate={{
              cy: [
                baseY + Math.sin((baseX / 240) * Math.PI * 2) * 12,
                baseY + Math.sin((baseX / 240) * Math.PI * 2 + Math.PI) * 12,
                baseY + Math.sin((baseX / 240) * Math.PI * 2) * 12,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: col * 0.1 + row * 0.05,
            }}
          />
        );
      });
    })}
  </svg>
);

export default FlowingStreams;
