import { VALUE_PROPS } from '../../constants';

const ValuePropsUserImages = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        I: TEXT-TOP + USER IMAGES — Slot for AI-generated art
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

            {/* User image slot fills remaining space */}
            <div className="flex-1 flex items-center justify-center m-4 mt-0 rounded-xl border border-dashed border-[#e5e5e5]">
              <div className="text-center">
                <svg className="w-10 h-10 mx-auto mb-2 text-[#a3a3a3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-sans text-xs text-[#a3a3a3]">
                  Your image here
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]/50">
        <p className="font-sans text-[13px] text-[#525252] mb-3">
          <strong>Suggested prompts for AI image generation:</strong>
        </p>
        <ul className="font-sans text-[12px] text-[#737373] space-y-2">
          <li>
            <strong>1. Fractional Executive:</strong> "Abstract stipple illustration, two overlapping circles dissolving into dots,
            black ink on cream paper, editorial newspaper style, minimalist"
          </li>
          <li>
            <strong>2. General Contractor:</strong> "Abstract stipple illustration, interconnected grid nodes with flowing lines,
            black ink on cream paper, editorial style, high contrast"
          </li>
          <li>
            <strong>3. AI Enabled:</strong> "Abstract stipple illustration, spiral or wave pattern emerging from dots,
            black ink on cream paper, editorial newspaper style"
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ValuePropsUserImages;
