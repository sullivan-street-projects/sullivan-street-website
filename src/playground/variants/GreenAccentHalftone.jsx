import { VALUE_PROPS } from '../../constants';

// Using the growth green (#4ADE80) as an accent color in halftone patterns
// Exploring color temperature in an otherwise monochrome system

// Dual-tone: black structure with green accents
const DualToneRings = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* Black outer rings */}
    {[...Array(3)].map((_, ring) => {
      const radius = 35 + ring * 20;
      const dotCount = 8 + ring * 4;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        return (
          <circle
            key={`black-${ring}-${i}`}
            cx={100 + Math.cos(angle) * radius}
            cy={80 + Math.sin(angle) * radius}
            r={2.5 - ring * 0.3}
            fill="#1a1a1a"
            opacity={0.6}
          />
        );
      });
    })}
    {/* Green inner ring - the "growth" accent */}
    {[...Array(6)].map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      return (
        <circle
          key={`green-${i}`}
          cx={100 + Math.cos(angle) * 15}
          cy={80 + Math.sin(angle) * 15}
          r={3}
          fill="#4ADE80"
          opacity={0.8}
        />
      );
    })}
    {/* Green center dot */}
    <circle cx="100" cy="80" r="4" fill="#4ADE80" opacity={0.9} />
  </svg>
);

// Gradient: black to green transition
const GradientStreams = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {[...Array(5)].map((_, row) => {
      return [...Array(10)].map((_, col) => {
        const x = 15 + col * 18;
        const baseY = 30 + row * 26;
        const wave = Math.sin((x / 200) * Math.PI * 2) * 6;

        // Transition from black (left) to green (right)
        const greenAmount = col / 9; // 0 to 1
        const isGreen = greenAmount > 0.6;

        return (
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={baseY + wave}
            r={2.5}
            fill={isGreen ? '#4ADE80' : '#1a1a1a'}
            opacity={isGreen ? 0.7 + greenAmount * 0.2 : 0.6}
          />
        );
      });
    })}
  </svg>
);

// Network with green highlight nodes
const GreenNodes = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* Black outer nodes */}
    <circle cx="30" cy="40" r="4" fill="#1a1a1a" opacity={0.6} />
    <circle cx="170" cy="40" r="4" fill="#1a1a1a" opacity={0.6} />
    <circle cx="30" cy="120" r="4" fill="#1a1a1a" opacity={0.6} />
    <circle cx="170" cy="120" r="4" fill="#1a1a1a" opacity={0.6} />
    <circle cx="100" cy="20" r="3" fill="#1a1a1a" opacity={0.5} />
    <circle cx="100" cy="140" r="3" fill="#1a1a1a" opacity={0.5} />

    {/* Green "activated" inner nodes */}
    <circle cx="60" cy="60" r="5" fill="#4ADE80" opacity={0.8} />
    <circle cx="140" cy="60" r="5" fill="#4ADE80" opacity={0.8} />
    <circle cx="60" cy="100" r="5" fill="#4ADE80" opacity={0.8} />
    <circle cx="140" cy="100" r="5" fill="#4ADE80" opacity={0.8} />

    {/* Green central hub */}
    <circle cx="100" cy="80" r="8" fill="#4ADE80" opacity={0.9} />
  </svg>
);

const greenGraphics = [
  <DualToneRings key="dual" />,
  <GradientStreams key="gradient" />,
  <GreenNodes key="nodes" />,
];

const GreenAccentHalftone = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        X: GREEN ACCENT — Growth color (#4ADE80) in halftone patterns
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

            {/* Green-accented graphic */}
            <div className="flex-1 flex items-center justify-center m-4 mt-0 rounded-xl overflow-hidden">
              {greenGraphics[idx]}
            </div>
          </div>
        ))}
      </div>

      {/* Color legend */}
      <div className="mt-8 flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1a1a1a] opacity-60" />
          <span className="font-sans text-[12px] text-[#737373]">Structure (#1a1a1a)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#4ADE80]" />
          <span className="font-sans text-[12px] text-[#737373]">Growth accent (#4ADE80)</span>
        </div>
      </div>

      {/* Alternative: Minimal green dots */}
      <div className="mt-10">
        <p className="font-sans text-xs font-medium text-[#a3a3a3] mb-4 uppercase tracking-wider">
          Alternate: Minimal Green Accent
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUE_PROPS.map((prop, idx) => (
            <div key={idx} className="py-4">
              {/* Single green dot as accent */}
              <div className="mb-5 flex items-center gap-2">
                {[...Array(idx + 1)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: i === idx ? '#4ADE80' : '#1a1a1a',
                      opacity: i === idx ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>

              <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
                {prop.title}
              </h3>

              <div className="w-8 h-px bg-[#4ADE80]/40 mb-4" />

              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Green (#4ADE80) used as "growth" accent. Top: large graphics. Bottom: minimal dots where
        the last dot in each sequence is green, showing progression toward growth.
      </p>
    </div>
  );
};

export default GreenAccentHalftone;
