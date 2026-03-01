import { CAPABILITIES } from '../../constants';

const stepNumbers = ['01', '02', '03', '04'];

// Cascading cards — each step overlaps the previous, creating depth.
// Reads like pages stacking on a desk. The visual offset
// communicates sequence without explicit arrows.
const ApproachCascade = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Cascading offset cards with depth
      </p>

      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a] mb-6">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-[#404040] font-light max-w-[50rem]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {/* ── Desktop: Horizontal cascade ── */}
      <div className="hidden lg:block">
        <div className="relative" style={{ height: '320px' }}>
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="absolute bg-[#FAFAF8] border border-[#e5e5e5] rounded-sm p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg group"
              style={{
                width: '280px',
                left: `${idx * 220}px`,
                top: `${idx * 16}px`,
                zIndex: idx + 1,
                boxShadow: `${idx * 2}px ${idx * 2}px ${idx * 4 + 4}px rgba(0,0,0,0.03)`,
              }}
            >
              {/* Large ghost number */}
              <span className="absolute top-4 right-5 font-sans text-[56px] font-bold leading-none text-[#1a1a1a]/[0.04] select-none group-hover:text-[#1a1a1a]/[0.08] transition-colors">
                {stepNumbers[idx]}
              </span>

              {/* Step badge */}
              <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#737373] mb-4">
                Step {stepNumbers[idx]}
              </div>

              <h3 className="font-serif text-[20px] leading-tight text-[#1a1a1a] mb-3 relative z-10">
                {cap.title}
              </h3>

              <div className="w-10 h-px bg-[#1a1a1a]/10 mb-4" />

              <p className="font-sans text-[13px] text-[#737373] leading-relaxed font-light relative z-10">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tablet: 2-column cascade ── */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAF8] border border-[#e5e5e5] rounded-sm p-6 relative"
              style={{
                marginTop: `${(idx % 2) * 20}px`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <span className="absolute top-3 right-4 font-sans text-[44px] font-bold leading-none text-[#1a1a1a]/[0.04] select-none">
                {stepNumbers[idx]}
              </span>

              <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#737373] mb-3">
                Step {stepNumbers[idx]}
              </div>

              <h3 className="font-serif text-[18px] leading-tight text-[#1a1a1a] mb-3">
                {cap.title}
              </h3>

              <p className="font-sans text-[13px] text-[#737373] leading-relaxed font-light">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: Stacked with left accent ── */}
      <div className="block md:hidden">
        {CAPABILITIES.map((cap, idx) => (
          <div
            key={idx}
            className="relative pl-6 pb-8 mb-2"
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
              style={{
                background: `rgba(26, 26, 26, ${0.08 + idx * 0.06})`,
              }}
            />

            <div className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#737373] mb-2">
              Step {stepNumbers[idx]}
            </div>

            <h3 className="font-serif text-[18px] leading-tight text-[#1a1a1a] mb-2">
              {cap.title}
            </h3>

            <p className="font-sans text-[14px] text-[#737373] leading-relaxed font-light">
              {cap.description}
            </p>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-10 italic">
        Cascading cards. Desktop: overlapping panels offset diagonally with hover lift. Ghost numbers add layered depth. Mobile: left accent bars with progressive opacity.
      </p>
    </div>
  );
};

export default ApproachCascade;
