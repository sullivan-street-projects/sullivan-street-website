import { VALUE_PROPS } from '../../constants';

// Same halftone patterns from G, reused here
const HalftoneCircles = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(3)].map((_, ring) => {
      const radius = 25 + ring * 28;
      const dotCount = 8 + ring * 4;
      const dotSize = 2.5 - ring * 0.3;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        const x = 100 + Math.cos(angle) * radius;
        const y = 80 + Math.sin(angle) * radius;
        return (
          <circle
            key={`${ring}-${i}`}
            cx={x}
            cy={y}
            r={Math.max(dotSize, 1.5)}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

const HalftoneWaves = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(6)].map((_, row) => {
      const y = 25 + row * 22;
      return [...Array(12)].map((_, col) => {
        const x = 15 + col * 15;
        const wave = Math.sin((x / 200) * Math.PI * 2 + row * 0.3) * 0.5 + 0.5;
        const size = 1.2 + wave * 1.5;
        return (
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={y + Math.sin((x / 200) * Math.PI * 1.5) * 6}
            r={size}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

const HalftoneGeometric = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(6)].map((_, row) => {
      return [...Array(row + 1)].map((_, col) => {
        const x = 100 - row * 12 + col * 24;
        const y = 35 + row * 18;
        return (
          <circle
            key={`tri-${row}-${col}`}
            cx={x}
            cy={y}
            r={2}
            fill="#1a1a1a"
            opacity={0.75}
          />
        );
      });
    })}
  </svg>
);

const halftoneGraphics = [
  <HalftoneCircles key="circles" />,
  <HalftoneWaves key="waves" />,
  <HalftoneGeometric key="geometric" />,
];

const ValuePropsInverted = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        L: INVERTED LAYOUT — Halftone on top, text at bottom
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className="bg-[#FAFAF8] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden min-h-[380px] flex flex-col"
          >
            {/* Halftone graphic at TOP */}
            <div className="flex-1 flex items-center justify-center m-4 mb-0 rounded-xl overflow-hidden">
              {halftoneGraphics[idx]}
            </div>

            {/* Text at BOTTOM */}
            <div className="p-6 pt-4">
              <h3 className="font-serif text-[22px] leading-tight text-[#1a1a1a] mb-2">
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
        Inverted from G: visual leads, text anchors at bottom.
      </p>
    </div>
  );
};

export default ValuePropsInverted;
