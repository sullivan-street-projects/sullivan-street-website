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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundGreenTint;
