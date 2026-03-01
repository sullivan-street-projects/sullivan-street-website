import { VALUE_PROPS } from '../../constants';

/**
 * Statement + Value Props — Editorial Magazine Treatment
 *
 * Dark charcoal statement (problem-first) hard-cuts into warm paper value props.
 * Halftone photos use CSS blend-mode technique on real Unsplash photography.
 * One cohesive editorial spread, not two stacked sections.
 */

// Curated photos — high contrast subjects that render well through halftone
const HALFTONE_PHOTOS = [
  // Executive at work — strong directional light, clean silhouette
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face&q=80',
  // Architectural detail — clean geometry, strong lines
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&q=80',
  // Abstract data/light — technology without being literal
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop&q=80',
];

const HalftoneImage = ({ src, dotSize = '4px', contrast = 35 }) => (
  <div className="relative w-full h-full overflow-hidden">
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at center, #1a1a1a 25%, transparent 26%) 0 0 / ${dotSize} ${dotSize} space,
          url("${src}") center / cover no-repeat
        `,
        backgroundBlendMode: 'multiply',
        filter: `contrast(${contrast}) grayscale(1) brightness(1.1)`,
      }}
    />
    {/* Subtle warm tint to tie into the paper palette */}
    <div
      className="absolute inset-0 mix-blend-multiply"
      style={{ background: 'rgba(245, 240, 235, 0.06)' }}
    />
  </div>
);

const StatementValueProps = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        STATEMENT + VALUE PROPS — Editorial spread. Dark problem statement hard-cuts to warm solution space.
      </p>

      {/* ─── THE STATEMENT ─────────────────────────────────────── */}
      <div
        className="-mx-6 md:-mx-8 px-6 md:px-8"
        style={{ background: '#1a1a1a' }}
      >
        <div className="max-w-[900px] py-28 md:py-36 lg:py-44">
          {/* Section marker — whisper-quiet */}
          <span
            className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            The Opportunity
          </span>

          {/* The headline — large, deliberate, arresting */}
          <h2
            className="font-serif text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.15] tracking-tight"
            style={{ color: '#ffffff' }}
          >
            Everything in marketing
            <br />
            is changing.
          </h2>

          {/* The rule — one quiet line doing heavy structural work */}
          <div
            className="w-16 h-px mt-12 mb-10"
            style={{ background: 'rgba(255,255,255,0.2)' }}
          />

          {/* Body — restrained, precise, no word wasted */}
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

      {/* ─── VALUE PROPS ──────────────────────────────────────── */}
      <div
        className="-mx-6 md:-mx-8 px-6 md:px-8"
        style={{ background: '#f0f0ee' }}
      >
        <div className="py-20 md:py-28 lg:py-32">
          {/* Section marker */}
          <span
            className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16 md:mb-20"
            style={{ color: '#737373' }}
          >
            How We Work
          </span>

          {/* Three columns — tall halftone photos, editorial text below */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {VALUE_PROPS.map((prop, idx) => (
              <div
                key={idx}
                className={`
                  ${idx < 2 ? 'border-b md:border-b-0 md:border-r' : ''}
                  ${idx === 0 ? 'pb-12 md:pb-0 md:pr-10' : ''}
                  ${idx === 1 ? 'py-12 md:py-0 md:px-10' : ''}
                  ${idx === 2 ? 'pt-12 md:pt-0 md:pl-10' : ''}
                `}
                style={{ borderColor: 'rgba(26, 26, 26, 0.08)' }}
              >
                {/* Halftone photograph — tall aspect ratio like a magazine portrait */}
                <div className="h-[280px] md:h-[320px] lg:h-[360px] mb-8 overflow-hidden">
                  <HalftoneImage
                    src={HALFTONE_PHOTOS[idx]}
                    dotSize="4px"
                    contrast={32}
                  />
                </div>

                {/* Title — serif, confident */}
                <h3
                  className="font-serif text-[22px] md:text-[24px] leading-[1.25] mb-4"
                  style={{ color: '#1a1a1a' }}
                >
                  {prop.title}
                </h3>

                {/* The rule */}
                <div
                  className="w-10 h-px mb-5"
                  style={{ background: 'rgba(26, 26, 26, 0.15)' }}
                />

                {/* Description — measured, no fluff */}
                <p
                  className="font-sans text-[15px] leading-[1.7] font-light"
                  style={{ color: '#525252' }}
                >
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        One editorial spread: dark statement (problem) → warm value props (solution).
        Halftone photos via CSS background-blend-mode: multiply + contrast filter on Unsplash images.
      </p>
    </div>
  );
};

export default StatementValueProps;
