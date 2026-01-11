import { VALUE_PROPS } from '../../constants';

// Placeholder SVGs for sourced images - subtle "felt but not seen" opacity
const SourcedPlaceholder1 = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="stipple1" patternUnits="userSpaceOnUse" width="12" height="12">
        <circle cx="3" cy="3" r="1" fill="#1a1a1a" opacity="0.75" />
        <circle cx="9" cy="9" r="0.8" fill="#1a1a1a" opacity="0.75" />
      </pattern>
    </defs>
    <circle cx="100" cy="80" r="55" fill="url(#stipple1)" />
  </svg>
);

const SourcedPlaceholder2 = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="stipple2" patternUnits="userSpaceOnUse" width="10" height="10">
        <circle cx="5" cy="5" r="0.8" fill="#1a1a1a" opacity="0.75" />
      </pattern>
    </defs>
    <rect x="45" y="35" width="110" height="90" rx="8" fill="url(#stipple2)" />
  </svg>
);

const SourcedPlaceholder3 = () => (
  <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="stipple3" patternUnits="userSpaceOnUse" width="8" height="8">
        <circle cx="4" cy="4" r="0.7" fill="#1a1a1a" opacity="0.75" />
      </pattern>
    </defs>
    <polygon points="100,25 155,135 45,135" fill="url(#stipple3)" />
  </svg>
);

const sourcedGraphics = [
  <SourcedPlaceholder1 key="s1" />,
  <SourcedPlaceholder2 key="s2" />,
  <SourcedPlaceholder3 key="s3" />,
];

const ValuePropsSourced = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        H: TEXT-TOP + SOURCED — Placeholder for external stipple images
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

            {/* Sourced graphic fills remaining space */}
            <div className="flex-1 flex items-center justify-center m-4 mt-0 rounded-xl overflow-hidden">
              {sourcedGraphics[idx]}
            </div>
          </div>
        ))}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Placeholders for sourced stipple images from Vecteezy/Freepik.
      </p>
    </div>
  );
};

export default ValuePropsSourced;
