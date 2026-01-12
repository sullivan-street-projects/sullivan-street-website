import React, { useState } from 'react';

const SECTIONS = [
  { id: 'A', title: 'Thin Rules', desc: 'Minimal border-t separation' },
  { id: 'B', title: 'Thick Rules', desc: 'Definitive 2px dividers' },
  { id: 'C', title: 'Editorial Labels', desc: 'Numbered section markers' },
  { id: 'S', title: 'Subtle Shift', desc: 'Restrained #FAFAF8 → #F3F2F0 shift' },
  { id: 'M', title: 'Pronounced Shift', desc: 'Warmer #FAFAF8 → #F0EDE8 shift' },
  { id: 'N', title: 'High Contrast', desc: 'Maximum beige contrast' },
  { id: 'F', title: 'Inverted Band', desc: 'Solid #1a1a1a section' },
];

const SectionSeparation = () => {
  const [activeTab, setActiveTab] = useState('S');

  const scrollToSection = (id) => {
    setActiveTab(id);
    document.getElementById(`option-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans pb-32">
      {/* Sticky Menu */}
      <div className="sticky top-0 z-30 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#e5e5e5] mb-12 py-4">
        <p className="font-sans text-[10px] font-bold text-[#737373] uppercase tracking-widest mb-3">
          Section Separation Modes
        </p>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                activeTab === s.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#1a1a1a]/5 text-[#525252] hover:bg-[#1a1a1a]/10'
              }`}
            >
              {s.id}: {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Option A: Simple horizontal rules */}
      <section id="option-A" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          A: Thin horizontal rules between sections
        </p>
        <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">Intro Section</p>
            <p className="font-sans text-sm text-[#737373] mt-2">The thin rule creates subtle separation...</p>
          </div>
          <div className="border-t border-[#e5e5e5]" />
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">Approach Section</p>
          </div>
        </div>
      </section>

      {/* Option B: Thicker rules */}
      <section id="option-B" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          B: Thicker 2px rules (more definitive)
        </p>
        <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">Intro Section</p>
          </div>
          <div className="h-[2px] bg-[#d4d4d4]" />
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">Approach Section</p>
          </div>
        </div>
      </section>

      {/* Option C: Section labels/numbers */}
      <section id="option-C" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          C: Section labels with numbers (editorial style)
        </p>
        <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-4">01 — Intro</p>
            <p className="font-serif text-xl text-[#1a1a1a]">Make Marketing Work.</p>
          </div>
          <div className="border-t border-[#e5e5e5]" />
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-4">02 — Approach</p>
            <p className="font-serif text-xl text-[#1a1a1a]">Tailor-made growth marketing.</p>
          </div>
        </div>
      </section>

      {/* Option S: Goldilocks Shift */}
      <section id="option-S" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          S: Subtle Shift (#FAFAF8 → #F3F2F0) — Recommended
        </p>
        <div className="min-h-[60vh] rounded-lg border border-[#e5e5e5] overflow-hidden">
          <div className="px-8 py-20 bg-[#FAFAF8]">
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Make Marketing Work.</h2>
            <p className="font-sans text-[16px] text-[#404040] mt-4 max-w-[500px] font-light">Cream background (#FAFAF8)</p>
          </div>
          <div className="px-8 py-20" style={{ backgroundColor: '#F3F2F0' }}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-8">Approach</p>
            <h2 className="font-serif text-3xl text-[#1a1a1a] italic">Tailor-made growth marketing.</h2>
            <p className="font-sans text-[16px] text-[#404040] mt-4 max-w-[500px] font-light">Subtle neutral shift (#F3F2F0)</p>
          </div>
          <div className="px-8 py-20 bg-[#FAFAF8]">
             <h2 className="font-serif text-3xl text-[#1a1a1a]">Your marketing investment.</h2>
          </div>
        </div>
      </section>

      {/* Option M: Pronounced Shift */}
      <section id="option-M" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          M: Pronounced Shift (#FAFAF8 → #F0EDE8)
        </p>
        <div className="min-h-[60vh] rounded-lg border border-[#e5e5e5] overflow-hidden">
          <div className="px-8 py-20 bg-[#FAFAF8]">
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Section One</h2>
          </div>
          <div className="px-8 py-20" style={{ backgroundColor: '#F0EDE8' }}>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#a3a3a3] mb-8">Section Two</p>
            <h2 className="font-serif text-3xl text-[#1a1a1a] italic">Warmer contrast.</h2>
          </div>
          <div className="px-8 py-20 bg-[#FAFAF8]">
             <h2 className="font-serif text-3xl text-[#1a1a1a]">Section Three</h2>
          </div>
        </div>
      </section>

      {/* Option N: High Contrast */}
      <section id="option-N" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          N: High Contrast (#FAFAF8 → #EBE8E3)
        </p>
        <div className="min-h-[60vh] rounded-lg border border-[#e5e5e5] overflow-hidden">
          <div className="px-8 py-20 bg-[#FAFAF8]">
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Section One</h2>
          </div>
          <div className="px-8 py-20" style={{ backgroundColor: '#EBE8E3' }}>
            <h2 className="font-serif text-3xl text-[#1a1a1a] italic">Maximum Beige.</h2>
          </div>
          <div className="px-8 py-20 bg-[#FAFAF8]">
             <h2 className="font-serif text-3xl text-[#1a1a1a]">Section Three</h2>
          </div>
        </div>
      </section>

      {/* Option F: Inverted Band */}
      <section id="option-F" className="mb-24 pt-4">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">
          F: One inverted section (dark band)
        </p>
        <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">Intro Section</p>
          </div>
          <div className="p-16 bg-[#1a1a1a]">
            <p className="font-serif text-2xl text-white italic">A bold break in the flow.</p>
          </div>
          <div className="p-8 bg-[#FAFAF8]">
            <p className="font-serif text-xl text-[#1a1a1a]">About Section</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionSeparation;