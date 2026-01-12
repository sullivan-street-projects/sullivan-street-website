import { CAPABILITIES } from '../../constants';

// Dice-pattern dot arrangement
const DiceDots = ({ count = 1 }) => {
  const dotClass = "w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/40";

  // 3x3 grid positions for dice patterns
  // Layout:  0 1 2
  //          3 4 5
  //          6 7 8
  const patterns = {
    1: [4],                    // center
    2: [0, 8],                 // diagonal corners
    3: [0, 4, 8],              // diagonal + center
    4: [0, 2, 6, 8],           // four corners
  };

  const activePositions = patterns[count] || patterns[1];

  return (
    <div className="grid grid-cols-3 gap-1 w-6 h-6">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          {activePositions.includes(i) && <div className={dotClass} />}
        </div>
      ))}
    </div>
  );
};

// Variant: Approach with dice-pattern dots
const ValuePropsApproachDice = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH (DICE) — Editorial grid with dice-pattern dots
      </p>

      {/* 4-column grid with subtle dividers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, idx) => {
          const mdBorder = idx % 2 === 0 ? 'md:border-r' : '';
          const lgBorder = idx < 3 ? 'lg:border-r' : '';
          return (
            <div
              key={idx}
              className={`py-8 px-6 border-[#e5e5e5]/60 ${mdBorder} ${lgBorder}`}
            >
              {/* Dice dot pattern - 1 to 4 */}
              <div className="mb-5">
                <DiceDots count={idx + 1} />
              </div>

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
        Approach section with dice-pattern dots (1-4). Classic die face arrangement.
      </p>
    </div>
  );
};

export default ValuePropsApproachDice;
