import { CAPABILITIES } from '../../constants';

// Variant Q: Approach with simple numbered badges (01, 02, 03, 04)
const ValuePropsApproachNumbered = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        Q: APPROACH (CAPABILITIES) — Editorial grid with numbered badges
      </p>

      {/* 4-column grid with subtle dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, idx) => {
          const mdBorder = idx % 2 === 0 ? 'md:border-r' : '';
          const lgBorder = idx < 3 ? 'lg:border-r' : '';
          const num = String(idx + 1).padStart(2, '0');
          return (
            <div
              key={idx}
              className={`py-8 px-6 border-[#e5e5e5]/60 ${mdBorder} ${lgBorder}`}
            >
              {/* Numbered badge */}
              <div className="mb-5">
                <span className="font-sans text-[13px] font-medium text-[#a3a3a3] tracking-wide">
                  {num}
                </span>
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
        Approach section with numbered badges (01-04). Sequence-based visual hierarchy.
      </p>
    </div>
  );
};

export default ValuePropsApproachNumbered;
