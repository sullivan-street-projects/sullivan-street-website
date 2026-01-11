import { CAPABILITIES } from '../../constants';

// Very minimal dot accent for each capability
const MinimalDot = ({ count = 1 }) => (
  <div className="flex gap-1.5">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/40"
      />
    ))}
  </div>
);

// Variant R: Approach with minimal dots
const ValuePropsApproachDots = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        R: APPROACH (CAPABILITIES) — Editorial grid with minimal dots
      </p>

      {/* 4-column grid with subtle dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, idx) => {
          const mdBorder = idx % 2 === 0 ? 'md:border-r' : '';
          const lgBorder = idx < 3 ? 'lg:border-r' : '';
          return (
            <div
              key={idx}
              className={`py-8 px-6 border-[#e5e5e5]/60 ${mdBorder} ${lgBorder}`}
            >
              {/* Minimal dot accent - increases with sequence */}
              <div className="mb-5">
                <MinimalDot count={idx + 1} />
              </div>

              {/* Headline */}
              <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
                {cap.title}
              </h3>

              {/* Thin rule */}
              <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />

              {/* Description */}
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                {cap.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom rule to close the section */}
      <div className="border-t border-[#e5e5e5]/60 mt-2" />

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Approach section with minimal dots (1-4). Subtle progression indicator.
      </p>
    </div>
  );
};

export default ValuePropsApproachDots;
