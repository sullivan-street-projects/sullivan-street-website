import { VALUE_PROPS } from '../../constants';

// Large-scale background patterns that span the full width
// Content floats on top of the pattern

// Flowing wave pattern - spans full width
const WaveField = () => (
  <svg
    viewBox="0 0 1200 300"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid slice"
  >
    {[...Array(12)].map((_, row) =>
      [...Array(40)].map((_, col) => {
        const x = 15 + col * 30;
        const baseY = 25 + row * 22;
        const wave = Math.sin((x / 1200) * Math.PI * 4 + row * 0.5) * 8;
        const intensity = 1.5 + Math.sin((row / 12) * Math.PI) * 1; // Peak in middle rows
        return (
          <circle
            key={`${row}-${col}`}
            cx={x}
            cy={baseY + wave}
            r={intensity}
            fill="#1a1a1a"
            opacity={0.06 + Math.sin((row / 12) * Math.PI) * 0.04}
          />
        );
      })
    )}
  </svg>
);

// Radial burst from center
const RadialField = () => (
  <svg
    viewBox="0 0 1200 400"
    className="absolute inset-0 w-full h-full"
    preserveAspectRatio="xMidYMid slice"
  >
    {[...Array(8)].map((_, ring) => {
      const radius = 80 + ring * 60;
      const dotCount = 12 + ring * 6;
      return [...Array(dotCount)].map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        return (
          <circle
            key={`${ring}-${i}`}
            cx={600 + Math.cos(angle) * radius}
            cy={200 + Math.sin(angle) * radius}
            r={3 - ring * 0.25}
            fill="#1a1a1a"
            opacity={0.08 - ring * 0.008}
          />
        );
      });
    })}
  </svg>
);

// Scattered constellation
const ConstellationField = () => {
  // Deterministic "random" positions
  const points = [
    [5, 15], [12, 45], [8, 78], [18, 25], [25, 60], [22, 88],
    [35, 12], [40, 42], [38, 70], [45, 30], [52, 55], [48, 85],
    [58, 18], [65, 48], [62, 72], [70, 22], [78, 58], [75, 82],
    [85, 15], [92, 45], [88, 75], [95, 30], [98, 65], [93, 90],
  ];

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      {points.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={0.8 + (i % 3) * 0.3}
          fill="#1a1a1a"
          opacity={0.08 + (i % 4) * 0.02}
        />
      ))}
    </svg>
  );
};

const FullBleedZone = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        W: FULL-BLEED ZONES — Large-scale patterns behind content
      </p>

      {/* Zone 1: Wave field with floating value props */}
      <div className="relative bg-[#FAFAF8] rounded-2xl overflow-hidden mb-8">
        <WaveField />

        <div className="relative z-10 py-16 px-8">
          <h2 className="font-serif text-[28px] text-[#1a1a1a] text-center mb-12">
            Make Marketing Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {VALUE_PROPS.map((prop, idx) => (
              <div key={idx} className="text-center">
                <h3 className="font-serif text-[18px] text-[#1a1a1a] mb-2">
                  {prop.title}
                </h3>
                <p className="font-sans text-[13px] text-[#737373] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone 2: Radial burst - hero style */}
      <div className="relative bg-[#FAFAF8] rounded-2xl overflow-hidden mb-8">
        <RadialField />

        <div className="relative z-10 py-24 px-8 text-center">
          <h2 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#1a1a1a] mb-6">
            Marketing for
            <br />
            <span className="italic">Tomorrow's Billion-Dollar Brands</span>
          </h2>
          <p className="font-sans text-[16px] text-[#737373] max-w-xl mx-auto">
            AI-powered strategy, media, and execution.
            Faster growth. Sharper focus. Higher profit.
          </p>
        </div>
      </div>

      {/* Zone 3: Constellation - subtle ambient */}
      <div className="relative bg-[#f0f0ee] rounded-2xl overflow-hidden">
        <ConstellationField />

        <div className="relative z-10 py-16 px-8">
          <div className="max-w-2xl mx-auto">
            <p className="font-sans text-[11px] uppercase tracking-widest text-[#a3a3a3] mb-4">
              About
            </p>
            <p className="font-serif text-[20px] leading-relaxed text-[#1a1a1a] mb-6">
              The marketing landscape has fundamentally shifted. AI has
              transformed what's possible—and raised the bar for what's expected.
            </p>
            <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
              Sullivan Street Projects exists for brands ready to lead, not follow.
              We combine strategic rigor with AI-native execution to deliver
              measurable growth—faster and more efficiently than traditional approaches.
            </p>
          </div>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Patterns extend edge-to-edge behind content. Low opacity (6-10%) keeps them ambient.
        Wave field, radial burst, and constellation show different moods.
      </p>
    </div>
  );
};

export default FullBleedZone;
