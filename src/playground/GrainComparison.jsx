const GrainComparison = () => {
  const currentGrain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  const refinedGrain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div className="mb-20">
      <h2 className="font-serif text-2xl mb-8 text-[#1a1a1a]">Grain Texture Comparison</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Grain */}
        <div>
          <p className="font-sans text-sm font-medium text-[#737373] mb-3">
            CURRENT — opacity: 0.04, frequency: 0.6
          </p>
          <div className="relative h-64 rounded-lg overflow-hidden border border-[#e5e5e5]">
            <div className="absolute inset-0 bg-[#FAFAF8]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: currentGrain }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-xl text-[#1a1a1a]">Sample Text</p>
            </div>
          </div>
        </div>

        {/* Refined Grain */}
        <div>
          <p className="font-sans text-sm font-medium text-[#737373] mb-3">
            REFINED — opacity: 0.07, frequency: 0.9
          </p>
          <div className="relative h-64 rounded-lg overflow-hidden border border-[#e5e5e5]">
            <div className="absolute inset-0 bg-[#FAFAF8]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: refinedGrain }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-serif text-xl text-[#1a1a1a]">Sample Text</p>
            </div>
          </div>
        </div>
      </div>

      <p className="font-sans text-[13px] text-[#737373] mt-4 italic">
        The refined grain is finer (higher frequency) and more visible (higher opacity),
        creating a more pronounced paper-like texture.
      </p>
    </div>
  );
};

export default GrainComparison;
