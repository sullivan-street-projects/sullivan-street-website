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

// VERSION A: Original nodes pattern with radial pulse (matches library exactly)
const FlowingNodesA = () => {
  const centerX = 120;
  const centerY = 100;

  // Exact positions from the halftone library pattern
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
    <svg viewBox="0 0 240 200" className="w-full h-full" style={{ overflow: 'visible' }}>
      {/* Corners pulse outward radially */}
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
            fill="#1a1a1a"
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

      {/* Center hub - anchored, only breathes */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 14, 10], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
      />

      {/* Edge nodes pulse outward */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);
        const pulseAmount = 10;

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
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

// VERSION B: Sequential Radial Pulse - corners breathe outward in sequence (like data traveling)
const FlowingNodesB = () => {
  const centerX = 120;
  const centerY = 100;

  const corners = [
    { x: 60, y: 50, r: 6 },   // top-left
    { x: 180, y: 50, r: 6 },  // top-right
    { x: 180, y: 150, r: 6 }, // bottom-right
    { x: 60, y: 150, r: 6 },  // bottom-left
  ];

  const edges = [
    { x: 120, y: 35, r: 5 },
    { x: 120, y: 165, r: 5 },
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {/* Corners pulse outward sequentially - data travels around the circuit */}
      {corners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;
        const pulseAmount = 12;

        return (
          <motion.circle
            key={`corner-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x + unitX * pulseAmount, pos.x],
              cy: [pos.y, pos.y + unitY * pulseAmount, pos.y],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5, // sequential timing around the circuit
            }}
          />
        );
      })}

      {/* Center hub breathes steadily */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 13, 10], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Edges pulse outward in sync */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y + unitY * 10, pos.y],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
          />
        );
      })}
    </svg>
  );
};

// VERSION C: Contraction Flow - all nodes contract toward center then expand back (gathering/distributing)
const FlowingNodesC = () => {
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
      {/* Corners contract toward center then expand back */}
      {corners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;
        const contractAmount = 15;

        return (
          <motion.circle
            key={`corner-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x - unitX * contractAmount, pos.x],
              cy: [pos.y, pos.y - unitY * contractAmount, pos.y],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          />
        );
      })}

      {/* Center hub grows as data gathers, shrinks as it distributes */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 16, 10], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Edges contract inward */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y - unitY * 12, pos.y],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        );
      })}
    </svg>
  );
};

// VERSION D: Synchronized Breathing - all nodes expand/contract together (unified system)
const FlowingNodesD = () => {
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
      {/* All corners pulse outward in sync */}
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
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x + unitX * pulseAmount, pos.x],
              cy: [pos.y, pos.y + unitY * pulseAmount, pos.y],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}

      {/* Center hub breathes in sync */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 14, 10], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Edges pulse outward in sync */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y + unitY * 10, pos.y],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
    </svg>
  );
};

// VERSION E: Horizontal Wave - same vertical wave as FlowingStreams, applied to sparse nodes
const FlowingNodesE = () => {
  // All nodes with their x-positions for wave delay calculation
  const allNodes = [
    { x: 60, y: 50, r: 6 },    // top-left corner
    { x: 180, y: 50, r: 6 },   // top-right corner
    { x: 180, y: 150, r: 6 },  // bottom-right corner
    { x: 60, y: 150, r: 6 },   // bottom-left corner
    { x: 120, y: 35, r: 5 },   // top edge
    { x: 120, y: 165, r: 5 },  // bottom edge
    { x: 120, y: 100, r: 10 }, // center
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {allNodes.map((pos, i) => {
        // Wave amplitude and delay based on x-position (left to right)
        const waveAmount = 12;
        const xProgress = pos.x / 240; // 0 to 1 across width

        return (
          <motion.circle
            key={`node-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [
                pos.y + Math.sin(xProgress * Math.PI * 2) * waveAmount,
                pos.y + Math.sin(xProgress * Math.PI * 2 + Math.PI) * waveAmount,
                pos.y + Math.sin(xProgress * Math.PI * 2) * waveAmount,
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: xProgress * 0.5, // left nodes move first
            }}
          />
        );
      })}
    </svg>
  );
};

// VERSION F: Directional Pulse - data flows left → center → right
const FlowingNodesF = () => {
  const centerX = 120;
  const centerY = 100;

  const leftCorners = [
    { x: 60, y: 50, r: 6 },
    { x: 60, y: 150, r: 6 },
  ];

  const rightCorners = [
    { x: 180, y: 50, r: 6 },
    { x: 180, y: 150, r: 6 },
  ];

  const edges = [
    { x: 120, y: 35, r: 5 },
    { x: 120, y: 165, r: 5 },
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {/* Left corners pulse INWARD toward center (data entering) */}
      {leftCorners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;

        return (
          <motion.circle
            key={`left-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x - unitX * 12, pos.x],
              cy: [pos.y, pos.y - unitY * 12, pos.y],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
          />
        );
      })}

      {/* Center hub pulses (processing) */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 14, 10], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Right corners pulse OUTWARD (data exiting) */}
      {rightCorners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;

        return (
          <motion.circle
            key={`right-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x + unitX * 12, pos.x],
              cy: [pos.y, pos.y + unitY * 12, pos.y],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          />
        );
      })}

      {/* Edges pulse with center */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y + unitY * 8, pos.y],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
        );
      })}
    </svg>
  );
};

// VERSION G: Subtle Orbit - each node moves in tiny circular path
const FlowingNodesG = () => {
  const centerX = 120;
  const centerY = 100;
  const orbitRadius = 4; // small circular motion

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

  // Generate circular keyframes
  const getOrbitKeyframes = (baseX, baseY, radius, steps = 4) => {
    const cx = [];
    const cy = [];
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * Math.PI * 2;
      cx.push(baseX + Math.cos(angle) * radius);
      cy.push(baseY + Math.sin(angle) * radius);
    }
    return { cx, cy };
  };

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {/* Corners orbit */}
      {corners.map((pos, i) => {
        const orbit = getOrbitKeyframes(pos.x, pos.y, orbitRadius);
        return (
          <motion.circle
            key={`corner-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: orbit.cx,
              cy: orbit.cy,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.25, // staggered starts create circulation feel
            }}
          />
        );
      })}

      {/* Center hub - larger orbit, opposite direction */}
      {(() => {
        const orbit = getOrbitKeyframes(centerX, centerY, orbitRadius * 1.5);
        return (
          <motion.circle
            r="10"
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: orbit.cx.reverse(),
              cy: orbit.cy.reverse(),
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        );
      })()}

      {/* Edges orbit */}
      {edges.map((pos, i) => {
        const orbit = getOrbitKeyframes(pos.x, pos.y, orbitRadius * 0.75);
        return (
          <motion.circle
            key={`edge-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: orbit.cx,
              cy: orbit.cy,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
              delay: 0.5 + i * 0.25,
            }}
          />
        );
      })}
    </svg>
  );
};

// VERSION H: Tidal Drift - all nodes shift together in same direction
const FlowingNodesH = () => {
  const driftAmount = 8; // horizontal drift distance

  const allNodes = [
    { x: 60, y: 50, r: 6 },
    { x: 180, y: 50, r: 6 },
    { x: 180, y: 150, r: 6 },
    { x: 60, y: 150, r: 6 },
    { x: 120, y: 35, r: 5 },
    { x: 120, y: 165, r: 5 },
    { x: 120, y: 100, r: 10 },
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {allNodes.map((pos, i) => (
        <motion.circle
          key={`node-${i}`}
          cy={pos.y}
          r={pos.r}
          fill="#1a1a1a"
          opacity={0.75}
          animate={{
            cx: [pos.x, pos.x + driftAmount, pos.x, pos.x - driftAmount, pos.x],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </svg>
  );
};

// VERSION I: Relay Cascade - movement triggers next node around circuit
const FlowingNodesI = () => {
  const centerX = 120;
  const centerY = 100;

  // Circuit order: top-left → top-right → bottom-right → bottom-left → back
  const corners = [
    { x: 60, y: 50, r: 6, delay: 0 },      // 1st
    { x: 180, y: 50, r: 6, delay: 0.6 },   // 2nd
    { x: 180, y: 150, r: 6, delay: 1.2 },  // 3rd
    { x: 60, y: 150, r: 6, delay: 1.8 },   // 4th
  ];

  const edges = [
    { x: 120, y: 35, r: 5 },
    { x: 120, y: 165, r: 5 },
  ];

  return (
    <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
      {/* Corners relay around the circuit */}
      {corners.map((pos, i) => {
        const dx = pos.x - centerX;
        const dy = pos.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const unitX = dx / dist;
        const unitY = dy / dist;
        const pulseAmount = 14;

        return (
          <motion.circle
            key={`corner-${i}`}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cx: [pos.x, pos.x + unitX * pulseAmount, pos.x],
              cy: [pos.y, pos.y + unitY * pulseAmount, pos.y],
              opacity: [0.4, 0.95, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeOut',
              delay: pos.delay,
              repeatDelay: 1.6, // wait for others to complete
            }}
          />
        );
      })}

      {/* Center hub responds in middle of circuit */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="#1a1a1a"
        opacity={0.75}
        animate={{ r: [10, 15, 10], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 1.2,
          repeatDelay: 1.6,
        }}
      />

      {/* Edges pulse with center */}
      {edges.map((pos, i) => {
        const dy = pos.y - centerY;
        const unitY = dy / Math.abs(dy);

        return (
          <motion.circle
            key={`edge-${i}`}
            cx={pos.x}
            r={pos.r}
            fill="#1a1a1a"
            opacity={0.75}
            animate={{
              cy: [pos.y, pos.y + unitY * 10, pos.y],
              opacity: [0.4, 0.85, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1.2,
              repeatDelay: 1.6,
            }}
          />
        );
      })}
    </svg>
  );
};

// Default export uses Version A
const FlowingNodes = FlowingNodesA;

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

      {/* FlowingNodes Version Comparison */}
      <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">
          "Outcome Obsessed" Variations — Pick the best motion for data flow
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Version A */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border-2 border-[#1a1a1a]">
              <FlowingNodesA />
            </div>
            <p className="font-sans text-xs text-[#1a1a1a] mt-2 text-center font-medium">
              <strong>A:</strong> Radial Pulse
            </p>
            <p className="font-sans text-[10px] text-[#737373] text-center">
              Original — staggered outward
            </p>
          </div>

          {/* Version B */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesB />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>B:</strong> Sequential Circuit
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Corners pulse one after another
            </p>
          </div>

          {/* Version C */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesC />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>C:</strong> Contraction Flow
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Gather to center, then release
            </p>
          </div>

          {/* Version D */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesD />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>D:</strong> Unified Breath
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              All nodes expand together
            </p>
          </div>

          {/* Version E */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesE />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>E:</strong> Horizontal Wave
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Like FlowingStreams — wave passes through
            </p>
          </div>

          {/* Version F */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesF />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>F:</strong> Directional Flow
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Left in → center → right out
            </p>
          </div>

          {/* Version G */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesG />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>G:</strong> Subtle Orbit
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Tiny circular paths — circulation
            </p>
          </div>

          {/* Version H */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesH />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>H:</strong> Tidal Drift
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              All shift together — current passing
            </p>
          </div>

          {/* Version I */}
          <div className="flex flex-col">
            <div className="h-[200px] flex items-center justify-center bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]">
              <FlowingNodesI />
            </div>
            <p className="font-sans text-xs text-[#737373] mt-2 text-center">
              <strong>I:</strong> Relay Cascade
            </p>
            <p className="font-sans text-[10px] text-[#a3a3a3] text-center">
              Quick pulse travels around circuit
            </p>
          </div>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Sharp corners, no glass. Patterns breathe above, text anchors below on clean paper.
      </p>
    </div>
  );
};

export default ValuePropsAnimatedHalftone;
