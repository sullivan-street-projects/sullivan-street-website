import { VALUE_PROPS } from '../../constants';

// Icon-sized versions of finalized halftone patterns

// Fractional Growth Executive → Concentric Rings (icon)
const IconConcentricRings = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    {[...Array(2)].map((_, ring) => {
      const radius = 8 + ring * 6;
      const dotCount = 6 + ring * 3;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        return (
          <circle
            key={`${ring}-${i}`}
            cx={20 + Math.cos(angle) * radius}
            cy={20 + Math.sin(angle) * radius}
            r={1.2 - ring * 0.2}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

// Marketing General Contractor → Coordinated Streams (icon)
const IconCoordinatedStreams = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    {[...Array(4)].map((_, row) => {
      const intensity = [0.8, 1.2, 1.2, 0.8][row]; // Peak in middle
      return [...Array(5)].map((_, col) => {
        const x = 6 + col * 7;
        const wave = Math.sin((x / 40) * Math.PI * 2) * 2;
        return (
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={10 + row * 7 + wave}
            r={intensity}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

// Outcome-Obsessed AI-Enabled → Nodes (icon)
const IconNodes = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10">
    {/* Central node */}
    <circle cx="20" cy="20" r="2.5" fill="#1a1a1a" opacity={0.75} />
    {/* Corner nodes */}
    <circle cx="8" cy="10" r="1.5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="32" cy="10" r="1.5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="8" cy="30" r="1.5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="32" cy="30" r="1.5" fill="#1a1a1a" opacity={0.75} />
    {/* Edge nodes */}
    <circle cx="20" cy="6" r="1.2" fill="#1a1a1a" opacity={0.75} />
    <circle cx="20" cy="34" r="1.2" fill="#1a1a1a" opacity={0.75} />
  </svg>
);

const halftoneIcons = [
  <IconConcentricRings key="rings" />,
  <IconCoordinatedStreams key="streams" />,
  <IconNodes key="nodes" />,
];

const ValuePropsHalftoneIcons = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        K: HALFTONE ICONS + TEXT — Small halftone graphics as icons
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className="bg-[#FAFAF8] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6 min-h-[260px] flex flex-col"
          >
            {/* Halftone icon at TOP */}
            <div className="mb-5">
              {halftoneIcons[idx]}
            </div>

            {/* Headline */}
            <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
              {prop.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
              {prop.description}
            </p>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Halftone patterns scaled down to icon size. Combines J's compact layout with G's stipple aesthetic.
      </p>
    </div>
  );
};

export default ValuePropsHalftoneIcons;
