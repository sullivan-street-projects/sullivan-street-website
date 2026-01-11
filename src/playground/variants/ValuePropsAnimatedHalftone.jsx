import { VALUE_PROPS } from '../../constants';
import { motion } from 'framer-motion';

// Animated Concentric Rings - gentle breathing effect
const BreathingRings = () => (
  <svg viewBox="0 0 240 200" className="w-full h-full" style={{ overflow: 'visible' }}>
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
            fill="#1a1a1a"
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

// Animated Coordinated Streams - gentle wave motion
const FlowingStreams = () => (
  <svg viewBox="0 0 220 180" className="w-full h-full" style={{ overflow: 'visible' }}>
    {[...Array(5)].map((_, row) => {
      const intensity = [2.0, 3.0, 4.0, 3.0, 2.0][row];
      return [...Array(10)].map((_, col) => {
        const baseX = 25 + col * 18;
        const baseY = 40 + row * 26;
        return (
          <motion.circle
            key={`${row}-${col}`}
            cx={baseX}
            cy={baseY}
            r={intensity}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [
                baseY + Math.sin((baseX / 220) * Math.PI * 2) * 12,
                baseY + Math.sin((baseX / 220) * Math.PI * 2 + Math.PI) * 12,
                baseY + Math.sin((baseX / 220) * Math.PI * 2) * 12,
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

// Animated Nodes - continuous breathing with flow timing (corners → center → edges)
const FlowingNodes = () => (
  <svg viewBox="0 0 240 200" className="w-full h-full" style={{ overflow: 'visible' }}>
    {/* Four corners - breathe first */}
    {[[60, 50], [180, 50], [180, 150], [60, 150]].map(([cx, cy], i) => (
      <motion.circle
        key={`corner-${i}`}
        cx={cx}
        cy={cy}
        r="6"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [6, 8, 6], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
      />
    ))}

    {/* Center hub - breathes after corners */}
    <motion.circle
      cx="120"
      cy="100"
      r="10"
      fill="#1a1a1a"
      opacity={0.75}
      animate={{ r: [10, 14, 10], opacity: [0.6, 0.95, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
    />

    {/* Edge nodes - breathe last */}
    {[[120, 35], [120, 165]].map(([cx, cy], i) => (
      <motion.circle
        key={`edge-${i}`}
        cx={cx}
        cy={cy}
        r="5"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [5, 7, 5], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 + i * 0.3 }}
      />
    ))}
  </svg>
);

const animatedGraphics = [
  <BreathingRings key="breathing" />,
  <FlowingStreams key="flowing" />,
  <FlowingNodes key="nodes" />,
];

const ValuePropsAnimatedHalftone = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        V: ANIMATED HALFTONE — Living, breathing patterns (editorial)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className="relative min-h-[420px] flex flex-col"
          >
            {/* Animated graphic - takes most of the space */}
            <div className="flex-1 flex items-center justify-center bg-[#FAFAF8]">
              {animatedGraphics[idx]}
            </div>

            {/* Text at BOTTOM - clean, no glass */}
            <div className="p-6 bg-[#FAFAF8]">
              <h3 className="font-serif text-[20px] leading-tight text-[#1a1a1a] mb-2">
                {prop.title}
              </h3>
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Sharp corners, no glass. Patterns breathe above, text anchors below on clean paper.
      </p>
    </div>
  );
};

export default ValuePropsAnimatedHalftone;
