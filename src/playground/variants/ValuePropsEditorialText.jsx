import { CAPABILITIES } from '../../constants';

// Variant P: Editorial grid with Approach/Capabilities (4 items), no graphics—pure text
const ValuePropsEditorialText = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        P: APPROACH (CAPABILITIES) — Editorial grid, 4 columns, pure typography
      </p>

      {/* 4-column grid with subtle dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, idx) => {
          // md (2-col): items 0,2 get right border
          // lg (4-col): items 0,1,2 get right border
          const mdBorder = idx % 2 === 0 ? 'md:border-r' : '';
          const lgBorder = idx < 3 ? 'lg:border-r' : '';
          return (
          <div
            key={idx}
            className={`py-8 px-6 border-[#e5e5e5]/60 ${mdBorder} ${lgBorder}`}
          >
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
        Approach section with 4 capabilities. No graphics, pure typography with editorial dividers.
      </p>
    </div>
  );
};

export default ValuePropsEditorialText;
