import React from 'react';

const BackgroundGreenTint = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        BACKGROUND TINT — Subtle green instead of warm cream
      </p>

      <div className="space-y-8">
        {/* Current */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Current: #FAFAF8 (warm cream)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#FAFAF8' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option A: Very subtle green shift */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option A: #FAFBF9 (whisper of green)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#FAFBF9' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option B: Slight green */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option B: #F9FAF8 (slight green)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#F9FAF8' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option C: More noticeable green */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option C: #F8FBF8 (cool mint)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ backgroundColor: '#F8FBF8' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option D: Gradient from cream to green hint */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option D: Gradient (cream → green hint)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #F8FAF6 100%)' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Option E: Radial gradient with green center */}
        <div>
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">Option E: Radial glow (subtle green center)</p>
          <div
            className="h-40 rounded-lg border border-[#e5e5e5] flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at center, #F6FAF6 0%, #FAFAF8 70%)' }}
          >
            <p className="font-serif text-2xl text-[#1a1a1a]">Your marketing investment, <span className="italic">managed.</span></p>
          </div>
        </div>

        {/* Full page preview */}
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">Full-height preview: Option B (#F9FAF8)</p>
          <div
            className="min-h-[60vh] rounded-lg border border-[#e5e5e5] p-12 space-y-8"
            style={{ backgroundColor: '#F9FAF8' }}
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
  );
};

export default BackgroundGreenTint;
