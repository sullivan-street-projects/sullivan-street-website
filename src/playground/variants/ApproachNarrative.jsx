import { CAPABILITIES } from '../../constants';

// Narrative density patterns - story arc from sparse to dense to resolution
// Represents: Foundation → Building → Peak Activity → Refined Output

const NarrativePattern = ({ step }) => {
  // Step 1: Sparse foundation - few deliberate dots
  if (step === 0) {
    return (
      <svg viewBox="0 0 80 60" className="w-20 h-15">
        <circle cx="20" cy="30" r="3" fill="#1a1a1a" opacity={0.7} />
        <circle cx="40" cy="25" r="2.5" fill="#1a1a1a" opacity={0.6} />
        <circle cx="60" cy="35" r="2" fill="#1a1a1a" opacity={0.5} />
      </svg>
    );
  }

  // Step 2: Building momentum - more dots, starting to organize
  if (step === 1) {
    return (
      <svg viewBox="0 0 80 60" className="w-20 h-15">
        {[...Array(3)].map((_, row) => (
          [...Array(3 + row)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={15 + col * 12 + (row % 2) * 6}
              cy={15 + row * 15}
              r={2 - row * 0.2}
              fill="#1a1a1a"
              opacity={0.65}
            />
          ))
        ))}
      </svg>
    );
  }

  // Step 3: Peak activity - dense, energetic cluster
  if (step === 2) {
    return (
      <svg viewBox="0 0 80 60" className="w-20 h-15">
        {[...Array(5)].map((_, row) => (
          [...Array(6)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={10 + col * 11 + (row % 2) * 5}
              cy={8 + row * 11}
              r={1.8 + Math.sin((row + col) * 0.5) * 0.5}
              fill="#1a1a1a"
              opacity={0.7}
            />
          ))
        ))}
      </svg>
    );
  }

  // Step 4: Refined output - organized, purposeful arrangement
  if (step === 3) {
    return (
      <svg viewBox="0 0 80 60" className="w-20 h-15">
        {/* Central organized cluster */}
        <circle cx="40" cy="30" r="4" fill="#1a1a1a" opacity={0.8} />
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={40 + Math.cos(angle) * 18}
              cy={30 + Math.sin(angle) * 18}
              r={2.5}
              fill="#1a1a1a"
              opacity={0.7}
            />
          );
        })}
      </svg>
    );
  }

  return null;
};

// Visual connector showing flow between steps
const FlowConnector = ({ fromStep }) => {
  const dotCount = 3 + fromStep; // More dots as momentum builds
  return (
    <div className="hidden lg:flex items-center justify-center px-2">
      <div className="flex gap-1">
        {[...Array(dotCount)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-[#1a1a1a]"
            style={{ opacity: 0.2 + (i / dotCount) * 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

const ApproachNarrative = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        U: NARRATIVE DENSITY — Dot patterns tell the 4-step story
      </p>

      {/* Story arc label */}
      <div className="flex justify-between items-center mb-8 px-4">
        <span className="font-sans text-[10px] uppercase tracking-widest text-[#a3a3a3]">
          Foundation
        </span>
        <div className="flex-1 mx-4 h-px bg-gradient-to-r from-[#e5e5e5] via-[#1a1a1a]/20 to-[#e5e5e5]" />
        <span className="font-sans text-[10px] uppercase tracking-widest text-[#a3a3a3]">
          Results
        </span>
      </div>

      {/* 4-step narrative grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {CAPABILITIES.map((cap, idx) => (
          <div key={idx} className="flex items-stretch">
            <div
              className={`flex-1 py-8 px-6 ${
                idx < 3 ? 'lg:border-r border-[#e5e5e5]/60' : ''
              }`}
            >
              {/* Narrative pattern */}
              <div className="mb-6 flex items-center justify-between">
                <NarrativePattern step={idx} />
                <span className="font-sans text-[10px] font-medium tracking-wider text-[#a3a3a3] uppercase">
                  {['Sparse', 'Building', 'Peak', 'Refined'][idx]}
                </span>
              </div>

              {/* Headline */}
              <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
                {cap.title}
              </h3>

              {/* Thin rule */}
              <div
                className="h-px bg-[#1a1a1a]/20 mb-4"
                style={{ width: `${20 + idx * 15}%` }} // Rule grows with progression
              />

              {/* Description */}
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {cap.description}
              </p>
            </div>

            {/* Flow connector (hidden on mobile/tablet) */}
            {idx < 3 && <FlowConnector fromStep={idx} />}
          </div>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="border-t border-[#e5e5e5]/60 mt-2" />

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Dot density tells a story: sparse foundation → building momentum → peak activity → refined output.
        The thin rule under each title also grows with progression.
      </p>
    </div>
  );
};

export default ApproachNarrative;
