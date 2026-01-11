import { VALUE_PROPS } from '../../constants';

const ValuePropsAppleCards = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        F: TEXT-TOP LAYOUT — Headline at top, visual area below
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

            {/* Visual area fills remaining space */}
            <div className="flex-1 flex items-center justify-center m-4 mt-0 rounded-xl border border-[#e5e5e5]/50 border-dashed">
              <span className="font-sans text-sm text-[#a3a3a3]">Visual {idx + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Text at top, visual area below. Gray boxes are placeholders for final imagery.
      </p>
    </div>
  );
};

export default ValuePropsAppleCards;
