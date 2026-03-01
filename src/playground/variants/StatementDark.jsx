import { VALUE_PROPS } from '../../constants';

// Statement section prototype — dark charcoal background, problem-first messaging
// Sits between Credentials and Value Props on the main site
const StatementDark = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        STATEMENT — Dark editorial break after brand logos. Problem-first framing.
      </p>

      {/* The Statement Section */}
      <div className="bg-[#1a1a1a] text-white -mx-6 md:-mx-8 px-6 md:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-[850px]">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.2] tracking-tight mb-10 md:mb-14">
            Everything in marketing<br />is changing.
          </h2>
          <div className="space-y-6 max-w-[680px]">
            <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-white/70 font-light">
              The old playbook—big agencies, disconnected vendors, months of planning—doesn't work anymore. AI is reshaping how brands grow, and most businesses are still catching up.
            </p>
            <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-white/70 font-light">
              We help growth-stage brands move faster, spend smarter, and scale with clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Then immediately: value props on warm background */}
      <div className="bg-[#f0f0ee] -mx-6 md:-mx-8 px-6 md:px-8 py-20 md:py-28">
        <div className="mb-10">
          <span className="font-sans text-[10px] text-[#737373] uppercase tracking-[0.3em] font-bold">
            How We Work
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {VALUE_PROPS.map((prop, idx) => (
            <div
              key={idx}
              className={`py-8 md:py-0 md:px-8 md:first:pl-0 md:last:pr-0 ${
                idx < 2 ? 'border-b md:border-b-0 md:border-r border-[#d4d4d4]/60' : ''
              }`}
            >
              <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] mb-3">
                {prop.title}
              </h3>
              <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
              <p className="font-sans text-[15px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Dark statement section breaks the page rhythm. Warm background on value props creates separation from Approach below.
      </p>
    </div>
  );
};

export default StatementDark;
