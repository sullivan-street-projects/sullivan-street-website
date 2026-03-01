import { motion } from 'framer-motion';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { VALUE_PROPS } from '../constants';

// Animated Concentric Rings - gentle breathing effect
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

// Animated Coordinated Streams - gentle wave motion (centered in 240x200)
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

// Animated Nodes - radial pulse (corners/edges move outward from center)
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

      {/* Center hub - anchored, only breathes */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r="10"
        fill="currentColor"
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

const animatedGraphics = [
  <BreathingRings key="breathing" />,
  <FlowingStreams key="flowing" />,
  <FlowingNodes key="nodes" />,
];

const Intro = () => {
  return (
    <Section id="intro" label="Opportunity">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-charcoal mb-8 md:mb-12">
            Make Marketing Work<br /><span className="italic">For Your Business.</span>
          </h2>
        </FocusText>
        <FocusText>
          <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light tracking-wide max-w-narrow">
            Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
          </p>
        </FocusText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <FocusText key={idx}>
            {/* Animated graphic - flexible height, centered */}
            <div className="min-h-[280px] flex-1 flex items-center justify-center">
              {animatedGraphics[idx]}
            </div>

            {/* Text */}
            <div className="px-4 pb-8 pt-2">
              <h3 className="font-serif text-body-lg leading-tight text-charcoal mb-2">
                {prop.title}
              </h3>
              <p className="font-sans text-ui text-label leading-relaxed">
                {prop.description}
              </p>
            </div>
          </FocusText>
        ))}
      </div>
    </Section>
  );
};

export default Intro;
