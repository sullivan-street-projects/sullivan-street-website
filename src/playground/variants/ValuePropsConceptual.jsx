import { VALUE_PROPS } from '../../constants';
import { motion } from 'framer-motion';

// Conceptual SVG: Single node embedding into a network
// Represents: one person, embedded into your team
const EmbeddedNode = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" style={{ overflow: 'visible' }}>
    {/* Network nodes (the team) — arranged in a loose cluster */}
    {[
      { x: 60, y: 50 }, { x: 140, y: 35 }, { x: 200, y: 60 },
      { x: 80, y: 120 }, { x: 170, y: 130 }, { x: 210, y: 110 },
    ].map((pos, i) => (
      <g key={`net-${i}`}>
        <motion.circle
          cx={pos.x} cy={pos.y} r={4}
          fill="#1a1a1a" opacity={0.2}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      </g>
    ))}

    {/* Connecting lines (subtle) */}
    {[
      [60, 50, 140, 35], [140, 35, 200, 60], [60, 50, 80, 120],
      [80, 120, 170, 130], [170, 130, 210, 110], [200, 60, 210, 110],
      [140, 35, 170, 130],
    ].map(([x1, y1, x2, y2], i) => (
      <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#1a1a1a" strokeWidth={0.8} opacity={0.1}
      />
    ))}

    {/* The embedded node — larger, connected, pulsing */}
    {[
      [120, 90, 60, 50], [120, 90, 140, 35], [120, 90, 80, 120],
      [120, 90, 170, 130], [120, 90, 200, 60],
    ].map(([x1, y1, x2, y2], i) => (
      <motion.line key={`embed-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#1a1a1a" strokeWidth={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0.15] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 + i * 0.3 }}
      />
    ))}
    <motion.circle
      cx={120} cy={90} r={7}
      fill="#1a1a1a" opacity={0.7}
      animate={{ r: [6.5, 8, 6.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

// Conceptual SVG: Multiple streams converging into one point
// Represents: many specialists, one point of contact
const ConvergingStreams = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" style={{ overflow: 'visible' }}>
    {/* Source nodes (specialists) — scattered around edges */}
    {[
      { x: 30, y: 30 }, { x: 50, y: 140 }, { x: 100, y: 20 },
      { x: 200, y: 40 }, { x: 220, y: 130 }, { x: 160, y: 155 },
    ].map((pos, i) => (
      <g key={`src-${i}`}>
        <motion.circle
          cx={pos.x} cy={pos.y} r={3.5}
          fill="#1a1a1a" opacity={0.25}
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
        />
        {/* Flowing line toward center */}
        <motion.line
          x1={pos.x} y1={pos.y} x2={125} y2={90}
          stroke="#1a1a1a" strokeWidth={0.8}
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.08] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      </g>
    ))}

    {/* Central convergence point */}
    <motion.circle
      cx={125} cy={90} r={8}
      fill="none" stroke="#1a1a1a" strokeWidth={1.5} opacity={0.5}
      animate={{ r: [7, 9, 7] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <circle cx={125} cy={90} r={3} fill="#1a1a1a" opacity={0.6} />
  </svg>
);

// Conceptual SVG: Signal radiating outward from center
// Represents: output, results, amplification
const RadiatingSignal = () => (
  <svg viewBox="0 0 240 180" className="w-full h-full" style={{ overflow: 'visible' }}>
    {/* Radiating arcs */}
    {[35, 55, 75, 95].map((r, i) => (
      <motion.circle
        key={`arc-${i}`}
        cx={120} cy={90} r={r}
        fill="none" stroke="#1a1a1a" strokeWidth={0.8}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15 - i * 0.02, 0], r: [r - 5, r + 5, r - 5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
      />
    ))}

    {/* Data points along the waves */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const dist = 45 + (i % 3) * 15;
      return (
        <motion.circle
          key={`point-${i}`}
          cx={120 + Math.cos(rad) * dist}
          cy={90 + Math.sin(rad) * dist}
          r={2}
          fill="#1a1a1a"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
        />
      );
    })}

    {/* Core pulse */}
    <motion.circle
      cx={120} cy={90} r={5}
      fill="#1a1a1a" opacity={0.6}
      animate={{ r: [4, 6, 4], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
  </svg>
);

const conceptualGraphics = [
  <EmbeddedNode key="embedded" />,
  <ConvergingStreams key="converging" />,
  <RadiatingSignal key="radiating" />,
];

// Value Props with conceptual SVGs — each visual reinforces the title
const ValuePropsConceptual = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        VALUE PROPS — Conceptual SVGs that illustrate each value prop. Embedded node / converging streams / radiating signal.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className={`${idx < 2 ? 'border-b md:border-b-0 md:border-r border-[#e5e5e5]/60' : ''}`}
          >
            <div className="h-[200px] flex items-center justify-center">
              {conceptualGraphics[idx]}
            </div>
            <div className="px-4 pb-8 pt-2">
              <h3 className="font-serif text-lg leading-tight text-[#1a1a1a] mb-3">
                {prop.title}
              </h3>
              <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-8 italic">
        Each SVG maps to its value prop: embedded node (fractional exec joins your team), converging streams (specialists → one contact), radiating signal (amplified outcomes).
      </p>
    </div>
  );
};

export default ValuePropsConceptual;
