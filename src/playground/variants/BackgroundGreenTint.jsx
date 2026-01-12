import React from 'react';

const BackgroundGreenTint = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        BACKGROUND TINT — Green tints at visible intensities
      </p>

      <div className="space-y-8">
        {/* Current baseline */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Current: #FAFAF8 (warm cream baseline)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option A: Subtle but visible */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option A: #F5FAF5 (subtle sage)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#F5FAF5' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option B: Light mint */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option B: #EFF7EF (light mint)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#EFF7EF' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option C: Soft sage */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option C: #E8F4E8 (soft sage)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#E8F4E8' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option D: Visible green */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option D: #E0F0E0 (visible green)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#E0F0E0' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option E: Bold mint */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option E: #D4EBD4 (bold mint)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#D4EBD4' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option F: Gradient cream to green */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option F: Gradient (cream → visible green)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #E8F4E8 100%)' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option G: Radial glow */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option G: Radial glow (green center)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at center, #E0F0E0 0%, #FAFAF8 70%)' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Forest green tints — derived from #29392C */}
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">Forest Green Tints — derived from #29392C</p>

          <div className="space-y-8">
            {/* Option H: Subtle forest */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option H: #F4F6F4 (subtle forest)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ backgroundColor: '#F4F6F4' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Option I: Light forest */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option I: #EBF0EB (light forest)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ backgroundColor: '#EBF0EB' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Option J: Soft forest */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option J: #E2EAE3 (soft forest)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ backgroundColor: '#E2EAE3' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Option K: Visible forest */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option K: #D9E4DA (visible forest)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ backgroundColor: '#D9E4DA' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Option L: Bold forest */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option L: #D0DED1 (bold forest)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ backgroundColor: '#D0DED1' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Option M: Radial glow (forest center) */}
            <div>
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option M: Radial glow (forest center)</p>
              <div
                className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
                style={{ background: 'radial-gradient(ellipse at center, #D9E4DA 0%, #FAFAF8 70%)' }}
              >
                <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
              </div>
            </div>

            {/* Full page preview */}
            <div className="mt-8">
              <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">Full-height preview: Option I (#EBF0EB)</p>
              <div
                className="min-h-[60vh] rounded-lg border border-[#e5e5e5] p-12 space-y-8"
                style={{ backgroundColor: '#EBF0EB' }}
              >
                <h2 className="font-serif text-4xl text-[#1a1a1a]">
                  Your marketing investment,<br /><span className="italic">managed.</span>
                </h2>
                <p className="font-sans text-[17px] text-[#404040] leading-relaxed max-w-[600px] font-light">
                  Three ways to work together. One point of contact. The right team for the job.
                </p>
                <div className="flex gap-8 pt-8">
                  <div className="text-center">
                    <p className="font-serif text-lg text-[#1a1a1a] mb-2">Management</p>
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Full Service</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-lg text-[#1a1a1a] mb-2">Strategy</p>
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Guided Growth</p>
                  </div>
                  <div className="text-center">
                    <p className="font-serif text-lg text-[#1a1a1a] mb-2">Advisory</p>
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Executive Counsel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full page preview with Option B */}
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">Full-height preview: Option B (#EFF7EF)</p>
          <div
            className="min-h-[60vh] rounded-lg border border-[#e5e5e5] p-12 space-y-8"
            style={{ backgroundColor: '#EFF7EF' }}
          >
            <h2 className="font-serif text-4xl text-[#1a1a1a]">
              Your marketing investment,<br /><span className="italic">managed.</span>
            </h2>
            <p className="font-sans text-[17px] text-[#404040] leading-relaxed max-w-[600px] font-light">
              Three ways to work together. One point of contact. The right team for the job.
            </p>
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <p className="font-serif text-lg text-[#1a1a1a] mb-2">Management</p>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Full Service</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-lg text-[#1a1a1a] mb-2">Strategy</p>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Guided Growth</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-lg text-[#1a1a1a] mb-2">Advisory</p>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Executive Counsel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Color reference */}
        <div className="mt-8 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">Color reference</p>
          <div className="flex gap-2">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#FAFAF8' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">Cream</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#F5FAF5' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">A</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#EFF7EF' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">B</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#E8F4E8' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">C</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#E0F0E0' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">D</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#D4EBD4' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">E</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#4ADE80' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">Brand</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded" style={{ backgroundColor: '#29392C' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">Forest</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#F3F5F3' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">I</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded border border-[#e5e5e5]" style={{ backgroundColor: '#E5EBE6' }} />
              <p className="font-mono text-[10px] text-[#737373] mt-1">J</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGreenTint;
