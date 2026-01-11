import { VALUE_PROPS } from '../../constants';

// Finalized halftone patterns for each value prop

// Fractional Growth Executive → Concentric Rings (converging to center)
const ConcentricRings = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(4)].map((_, ring) => {
      const radius = 24 + ring * 24;
      const dotCount = 6 + ring * 4;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        return (
          <circle
            key={`${ring}-${i}`}
            cx={100 + Math.cos(angle) * radius}
            cy={80 + Math.sin(angle) * radius}
            r={4 - ring * 0.6}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

// Marketing General Contractor → Coordinated Streams (managed complexity)
const CoordinatedStreams = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(5)].map((_, row) => {
      const intensity = [2.0, 3.0, 4.0, 3.0, 2.0][row]; // Peak in middle
      return [...Array(10)].map((_, col) => {
        const x = 15 + col * 18;
        const wave = Math.sin((x / 200) * Math.PI * 2) * 8;
        return (
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={30 + row * 26 + wave}
            r={intensity}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

// Outcome-Obsessed AI-Enabled → Nodes (neural network / transformer architecture)
const Nodes = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* Central node */}
    <circle cx="100" cy="80" r="8" fill="#1a1a1a" opacity={0.75} />
    {/* Inner ring */}
    <circle cx="50" cy="48" r="5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="150" cy="48" r="5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="50" cy="112" r="5" fill="#1a1a1a" opacity={0.75} />
    <circle cx="150" cy="112" r="5" fill="#1a1a1a" opacity={0.75} />
    {/* Outer nodes */}
    <circle cx="100" cy="25" r="4" fill="#1a1a1a" opacity={0.75} />
    <circle cx="100" cy="135" r="4" fill="#1a1a1a" opacity={0.75} />
    <circle cx="25" cy="80" r="4" fill="#1a1a1a" opacity={0.75} />
    <circle cx="175" cy="80" r="4" fill="#1a1a1a" opacity={0.75} />
  </svg>
);

const halftoneGraphics = [
  <ConcentricRings key="rings" />,
  <CoordinatedStreams key="streams" />,
  <Nodes key="nodes" />,
];

const ValuePropsHalftone = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        G: TEXT-TOP + HALFTONE — Programmatic stipple patterns
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className="bg-[#FAFAF8] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden min-h-[380px] flex flex-col"
          >
            {/* Text at TOP */}
            <div className="p-6 pb-4">
              <h3 className="font-serif text-[22px] leading-tight text-[#1a1a1a] mb-2">
                {prop.title}
              </h3>
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>

            {/* Halftone graphic fills remaining space */}
            <div className="flex-1 flex items-center justify-center m-4 mt-0 rounded-xl overflow-hidden">
              {halftoneGraphics[idx]}
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Programmatic halftone patterns. Testing if textured graphics can work.
      </p>
    </div>
  );
};

export default ValuePropsHalftone;
