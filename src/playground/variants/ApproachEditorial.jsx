import { CAPABILITIES } from '../../constants';

// NYT-style editorial approach.
// No UI chrome. No circles, cards, arrows, or decorative elements.
// Large serif numbers as typographic anchors, asymmetric 2-column grid,
// thin hairline rules, generous whitespace. The reading flow is the diagram.
const ApproachEditorial = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — NYT editorial treatment
      </p>

      {/* Section header — wide, confident, no subhead needed */}
      <div className="mb-20 md:mb-28 lg:mb-36">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a]">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
      </div>

      {/* The steps — pure editorial flow */}
      {CAPABILITIES.map((cap, idx) => (
        <div key={idx}>
          {/* Hairline rule */}
          <div className="h-px bg-[#1a1a1a]/10" />

          {/* Step content: asymmetric grid */}
          <div className="grid grid-cols-12 py-10 md:py-14 lg:py-16">
            {/* Left column: large number */}
            <div className="col-span-3 md:col-span-2">
              <span className="font-serif text-[#1a1a1a]/10 text-[56px] md:text-[72px] lg:text-[88px] leading-none font-normal select-none">
                {idx + 1}
              </span>
            </div>

            {/* Right column: title + description */}
            <div className="col-span-9 md:col-span-8 lg:col-span-6 pt-2 md:pt-3">
              <h3 className="font-serif text-[22px] md:text-[26px] lg:text-[28px] leading-snug text-[#1a1a1a] mb-4 md:mb-5">
                {cap.title}
              </h3>
              <p className="font-sans text-[15px] md:text-[16px] text-[#525252] leading-[1.7] font-light">
                {cap.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Final hairline to close */}
      <div className="h-px bg-[#1a1a1a]/10" />

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-10 italic">
        NYT editorial. No UI chrome — just serif numbers, asymmetric columns, hairline rules, and whitespace. The vertical reading flow communicates sequence.
      </p>
    </div>
  );
};

export default ApproachEditorial;
