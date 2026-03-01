import { CAPABILITIES } from '../../constants';

const stepNumbers = ['01', '02', '03', '04'];

const ApproachDiagram = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Process flow diagram with connected nodes
      </p>

      {/* Section header */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a] mb-6">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-[#404040] font-light max-w-[50rem]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {/* ── Desktop Diagram: Horizontal Flow ── */}
      <div className="hidden lg:block">
        {/* Top rail: step numbers + connecting line */}
        <div className="relative flex items-center mb-10">
          {/* The connecting line — runs behind the numbers */}
          <div className="absolute top-1/2 left-[24px] right-[24px] h-px bg-[#1a1a1a]/15" />

          {CAPABILITIES.map((_, idx) => (
            <div key={idx} className="flex-1 flex justify-center relative">
              {/* Node circle */}
              <div className="w-12 h-12 rounded-full border border-[#1a1a1a]/20 bg-[#FAFAF8] flex items-center justify-center relative z-10">
                <span className="font-sans text-[13px] font-semibold tracking-wide text-[#1a1a1a]">
                  {stepNumbers[idx]}
                </span>
              </div>
            </div>
          ))}

          {/* Terminal arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="text-[#1a1a1a]/25">
              <path d="M14 1L19 6L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Bottom content: titles + descriptions aligned under each node */}
        <div className="grid grid-cols-4 gap-0">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className={`text-center px-6 ${idx < 3 ? 'border-r border-[#e5e5e5]/50' : ''}`}
            >
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

      {/* ── Tablet Diagram: 2×2 with connecting lines ── */}
      <div className="hidden md:block lg:hidden">
        <div className="grid grid-cols-2 gap-0">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className={`relative py-8 px-6 ${
                idx % 2 === 0 ? 'border-r border-[#e5e5e5]/50' : ''
              } ${idx < 2 ? 'border-b border-[#e5e5e5]/50' : ''}`}
            >
              {/* Step number */}
              <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 bg-[#FAFAF8] flex items-center justify-center mb-5">
                <span className="font-sans text-[12px] font-semibold tracking-wide text-[#1a1a1a]">
                  {stepNumbers[idx]}
                </span>
              </div>

              <h3 className="font-serif text-[18px] leading-tight text-[#1a1a1a] mb-3">
                {cap.title}
              </h3>
              <p className="font-sans text-[13px] text-[#737373] leading-relaxed font-light">
                {cap.description}
              </p>

              {/* Arrow to next step */}
              {idx < 3 && (
                <div className="absolute text-[#1a1a1a]/20">
                  {idx % 2 === 0 ? (
                    // Right arrow (for left column items)
                    <div className="right-0 top-1/2 -translate-y-1/2 translate-x-[3px]">
                      <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                        <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  ) : (
                    // Down arrow (for right column items, to wrap to next row)
                    <div className="bottom-0 left-1/2 -translate-x-1/2 translate-y-[3px]">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Diagram: Vertical Rail ── */}
      <div className="block md:hidden">
        {CAPABILITIES.map((cap, idx) => (
          <div key={idx} className="flex gap-5">
            {/* Left rail: node + connecting line */}
            <div className="flex flex-col items-center shrink-0">
              {/* Node circle */}
              <div className="w-10 h-10 rounded-full border border-[#1a1a1a]/20 bg-[#FAFAF8] flex items-center justify-center">
                <span className="font-sans text-[11px] font-semibold tracking-wide text-[#1a1a1a]">
                  {stepNumbers[idx]}
                </span>
              </div>
              {/* Vertical connector */}
              {idx < 3 && (
                <div className="w-px flex-1 bg-[#1a1a1a]/12 my-1" />
              )}
            </div>

            {/* Right content */}
            <div className={`pb-8 ${idx < 3 ? 'border-b border-transparent' : ''}`}>
              <h3 className="font-serif text-[18px] leading-tight text-[#1a1a1a] mb-2 mt-2">
                {cap.title}
              </h3>
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed font-light">
                {cap.description}
              </p>
            </div>
          </div>
        ))}

        {/* Terminal arrow */}
        <div className="flex justify-start pl-[15px] -mt-1">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" className="text-[#1a1a1a]/20">
            <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-10 italic">
        Process flow diagram. Desktop: horizontal track with numbered nodes and terminal arrow. Mobile: vertical rail with connecting line.
      </p>
    </div>
  );
};

export default ApproachDiagram;
