import { motion } from 'framer-motion';

const FlowingNodes = () => {
  const centerX = 120;
  const centerY = 100;

  const corners = [
    { x: 60, y: 50, r: 6 },
    { x: 180, y: 50, r: 6 },
    { x: 180, y: 150, r: 6 },
    { x: 60, y: 150, r: 6 },
  ];

  const edges = [
    { x: 120, y: 35, r: 5 },
    { x: 120, y: 165, r: 5 },
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {corners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;
        const pulseAmount = 10;

        return (
          <motion.circle
            key={`corner-${i}`}
            r={pos.r}
            fill="currentColor"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x + unitX * pulseAmount, pos.x],
              cy: [pos.y, pos.y + unitY * pulseAmount, pos.y],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          />
        );
      })}

      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="currentColor"
        opacity={0.75}
        animate={{ r: [10, 14, 10], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
      />

      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);
        const pulseAmount = 10;

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="currentColor"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y + unitY * pulseAmount, pos.y],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 + i * 0.3 }}
          />
        );
      })}
    </svg>
  );
};

export default FlowingNodes;
