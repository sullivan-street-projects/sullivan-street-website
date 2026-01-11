import { VALUE_PROPS } from '../../constants';

// Minimal halftone accents - just a few dots as visual punctuation
const StructuredAccent1 = () => (
  <div className="flex items-center gap-1">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"
        style={{ opacity: 0.75 - i * 0.15 }}
      />
    ))}
  </div>
);

const StructuredAccent2 = () => (
  <div className="flex items-center gap-1">
    {[...Array(2)].map((_, row) => (
      <div key={row} className="flex flex-col gap-1">
        {[...Array(2)].map((_, col) => (
          <div
            key={col}
            className="w-1 h-1 rounded-full bg-[#1a1a1a]"
            style={{ opacity: 0.75 }}
          />
        ))}
      </div>
    ))}
  </div>
);

const StructuredAccent3 = () => (
  <div className="flex items-end gap-0.5">
    {[1, 2, 3].map((h, i) => (
      <div
        key={i}
        className="w-1 rounded-full bg-[#1a1a1a]"
        style={{ height: `${h * 4}px`, opacity: 0.75 }}
      />
    ))}
  </div>
);

const accents = [
  <StructuredAccent1 key="1" />,
  <StructuredAccent2 key="2" />,
  <StructuredAccent3 key="3" />,
];

const ValuePropsStructured = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        M: STRUCTURED EDITORIAL — Clean lines, minimal accents, no glass cards
      </p>

      {/* Grid with subtle dividers instead of cards */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className={`py-8 px-6 ${
              idx < 2 ? 'md:border-r border-[#e5e5e5]/60' : ''
            }`}
          >
            {/* Number + Accent */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-[11px] font-medium tracking-wider text-[#a3a3a3] uppercase">
                0{idx + 1}
              </span>
              {accents[idx]}
            </div>

            {/* Headline */}
            <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
              {prop.title}
            </h3>

            {/* Thin rule */}
            <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />

            {/* Description */}
            <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
              {prop.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom rule to close the section */}
      <div className="border-t border-[#e5e5e5]/60 mt-2" />

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Editorial grid layout with vertical dividers. Dot accents replace icons. No shadows or rounded cards.
      </p>
    </div>
  );
};

export default ValuePropsStructured;
