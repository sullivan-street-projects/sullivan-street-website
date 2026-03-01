import { CAPABILITIES } from '../../constants';

const stepNumbers = ['01', '02', '03', '04'];

// Swiss/International Typographic Style timeline.
// Ultra-minimal: the grid IS the design. No decorative elements.
// Heavy number, thin rule, precise alignment. Let the type do the work.
const ApproachSwissTimeline = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Swiss-style minimal timeline
      </p>

      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a] mb-6">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-[#404040] font-light max-w-[50rem]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {/* ── Desktop: Horizontal timeline ── */}
      <div className="hidden md:block">
        {/* Top rule */}
        <div className="h-px bg-[#1a1a1a]/10" />

        <div className="grid grid-cols-4">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className={`pt-8 pb-2 ${idx < 3 ? 'pr-8 lg:pr-12' : ''}`}
            >
              {/* Large step number — the dominant visual element */}
              <div className="font-sans text-[72px] lg:text-[96px] font-bold leading-none text-[#1a1a1a]/[0.06] mb-2 -ml-1 select-none">
                {stepNumbers[idx]}
              </div>

              {/* Title */}
              <h3 className="font-serif text-[17px] lg:text-[19px] leading-tight text-[#1a1a1a] mb-3">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[13px] text-[#737373] leading-relaxed font-light">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="h-px bg-[#1a1a1a]/10 mt-8" />

        {/* Sequence indicator: thin line with 4 ticks */}
        <div className="relative mt-4 mx-auto" style={{ maxWidth: '200px' }}>
          <div className="h-px bg-[#1a1a1a]/10 relative">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#1a1a1a]/20"
                style={{ left: `${(i / 3) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="font-sans text-[9px] tracking-widest uppercase text-[#999]">Start</span>
            <span className="font-sans text-[9px] tracking-widest uppercase text-[#999]">Launch</span>
          </div>
        </div>
      </div>

      {/* ── Mobile: Vertical timeline ── */}
      <div className="block md:hidden">
        {/* Top rule */}
        <div className="h-px bg-[#1a1a1a]/10 mb-2" />

        {CAPABILITIES.map((cap, idx) => (
          <div key={idx} className="py-6">
            {/* Number + title on same baseline */}
            <div className="flex items-baseline gap-4 mb-3">
              <span className="font-sans text-[40px] font-bold leading-none text-[#1a1a1a]/[0.06] select-none shrink-0">
                {stepNumbers[idx]}
              </span>
              <h3 className="font-serif text-[18px] leading-tight text-[#1a1a1a]">
                {cap.title}
              </h3>
            </div>

            <p className="font-sans text-[14px] text-[#737373] leading-relaxed font-light pl-[68px]">
              {cap.description}
            </p>

            {/* Thin separator (not on last item) */}
            {idx < 3 && (
              <div className="h-px bg-[#1a1a1a]/[0.06] mt-6" />
            )}
          </div>
        ))}

        {/* Bottom rule */}
        <div className="h-px bg-[#1a1a1a]/10 mt-2" />
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-10 italic">
        Swiss typographic style. Oversized ghost numbers as the dominant grid element. No icons, no decorations — the type hierarchy IS the diagram. Sequence indicator at bottom.
      </p>
    </div>
  );
};

export default ApproachSwissTimeline;
