import { VALUE_PROPS } from '../../constants';

// Simple line icons for each value prop
const icons = [
  // Fractional Executive - two overlapping shapes
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="16" cy="20" r="10" />
    <circle cx="24" cy="20" r="10" />
  </svg>,
  // General Contractor - connected nodes
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <rect x="8" y="8" width="10" height="10" rx="2" />
    <rect x="22" y="22" width="10" height="10" rx="2" />
    <line x1="18" y1="13" x2="22" y2="27" />
  </svg>,
  // AI Enabled - wave/pulse
  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4 20 Q10 10, 16 20 T28 20 T40 20" />
    <circle cx="20" cy="20" r="3" fill="currentColor" />
  </svg>,
];

const ValuePropsWhiteCards = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        J: ICON + TEXT CARDS — Clean white cards with simple icon
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VALUE_PROPS.map((prop, idx) => (
          <div
            key={idx}
            className="bg-[#FAFAF8] rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-6 min-h-[260px] flex flex-col"
          >
            {/* Icon at TOP */}
            <div className="mb-5 text-[#1a1a1a]">
              {icons[idx]}
            </div>

            {/* Headline */}
            <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">
              {prop.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
              {prop.description}
            </p>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Clean white cards with line icon. No imagery, just icon + text.
      </p>
    </div>
  );
};

export default ValuePropsWhiteCards;
