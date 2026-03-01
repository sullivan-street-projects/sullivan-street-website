import { VALUE_PROPS } from '../../constants';

/**
 * Statement + Value Props — Pure Text Editorial
 *
 * Dark statement (approved) hard-cuts into warm paper value props.
 * No photos, no halftone. Text-only with strong typographic hierarchy.
 * Stacked vertical layout — each prop gets its own horizontal band.
 */

const StatementValuePropsText = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        STATEMENT + VALUE PROPS — Pure text. Stacked editorial bands, no photos.
      </p>

      {/* ─── THE STATEMENT ─────────────────────────────────────── */}
      <div
        className="-mx-6 md:-mx-8 px-6 md:px-8"
        style={{ background: '#1a1a1a' }}
      >
        <div className="max-w-[900px] py-28 md:py-36 lg:py-44">
          <span
            className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            The Opportunity
          </span>

          <h2
            className="font-serif text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.15] tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Everything in marketing
            <br />
            is changing.
          </h2>

          <div
            className="w-16 h-px mt-12 mb-10"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />

          <div className="max-w-[580px] space-y-5">
            <p
              className="font-sans text-[17px] md:text-[19px] leading-[1.7] font-light"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              The old playbook — big agencies, disconnected vendors, months of
              planning — doesn't work anymore. AI is reshaping how brands grow,
              and most businesses are still catching up.
            </p>
            <p
              className="font-sans text-[17px] md:text-[19px] leading-[1.7] font-light"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              We help growth-stage brands move faster, spend smarter, and
              scale with clarity.
            </p>
          </div>
        </div>
      </div>

      {/* ─── VALUE PROPS — stacked horizontal bands ─────────── */}
      <div
        className="-mx-6 md:-mx-8 px-6 md:px-8"
        style={{ background: '#f0f0ee' }}
      >
        <div className="py-20 md:py-28 lg:py-32">
          <span
            className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16 md:mb-20"
            style={{ color: '#737373' }}
          >
            How We Work
          </span>

          <div className="space-y-0">
            {VALUE_PROPS.map((prop, idx) => (
              <div
                key={idx}
                className={`
                  grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-16
                  py-10 md:py-14
                  ${idx < VALUE_PROPS.length - 1 ? 'border-b' : ''}
                `}
                style={{ borderColor: 'rgba(26, 26, 26, 0.1)' }}
              >
                {/* Title — left column on desktop */}
                <div>
                  <h3
                    className="font-serif text-[22px] md:text-[26px] lg:text-[28px] leading-[1.2]"
                    style={{ color: '#1a1a1a' }}
                  >
                    {prop.title}
                  </h3>
                </div>

                {/* Description — right column, wider */}
                <div className="md:max-w-[520px]">
                  <p
                    className="font-sans text-[15px] md:text-[16px] leading-[1.75] font-light"
                    style={{ color: '#525252' }}
                  >
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Pure text editorial. Stacked two-column bands — title left, description right. No visuals.
      </p>
    </div>
  );
};

export default StatementValuePropsText;
