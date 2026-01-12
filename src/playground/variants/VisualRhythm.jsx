import React from 'react';

// Custom "Paper Crease" Divider
// visually creates a depression in the paper instead of a painted line
const PaperCrease = () => (
  <div className="relative h-px w-full my-0">
    <div className="absolute inset-0 bg-[#1a1a1a]/10" />
    <div className="absolute top-[1px] inset-x-0 h-px bg-white/80" />
  </div>
);

// Micro-Texture Background Pattern
// Adds a very subtle "security paper" feel to specific sections
const SecurityPattern = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `radial-gradient(#1a1a1a 0.5px, transparent 0.5px)`,
      backgroundSize: '16px 16px'
    }}
  />
);

const VisualRhythm = () => {
  return (
    <div className="w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans pb-32">
      <p className="font-sans text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-12 px-6 pt-6">
        VR: VISUAL RHYTHM — Separation via Width, Texture, and Depth
      </p>

      {/* 1. HERO SECTION (Wide, Clean Paper) */}
      {/* "Clean" paper signifies the start. Wide layout for impact. */}
      <section className="relative px-6 lg:px-12 py-24 md:py-32 max-w-[1200px] mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-[#1a1a1a] mb-8">
          Marketing for Tomorrow's<br/>
          <span className="italic">Billion-Dollar Brands</span>
        </h1>
        <p className="font-sans text-xl text-[#404040] font-light max-w-[600px] leading-relaxed">
          AI-powered strategy, media, and execution. Faster growth. Sharper focus. Higher profit.
        </p>
      </section>

      <PaperCrease />

      {/* 2. INTRO SECTION (Narrow, Focused) */}
      {/* Narrower width creates a "reading column" feel, distinct from the expansive hero. */}
      <section className="relative px-6 py-24 md:py-32 bg-[#FAFAF8]">
        <div className="max-w-[680px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-8 leading-tight">
            Make Marketing Work.<br/>For Your Business.
          </h2>
          <p className="font-sans text-[18px] text-[#404040] leading-relaxed font-light">
            Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
          </p>
        </div>
      </section>

      <PaperCrease />

      {/* 3. SERVICES SECTION (Wide, Textured) */}
      {/* Texture separates this "functional" section from the "narrative" sections. */}
      <section className="relative w-full">
        <SecurityPattern /> {/* The subtle texture difference */}
        
        <div className="relative px-6 lg:px-12 py-24 md:py-32 max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="font-serif text-4xl text-[#1a1a1a] mb-4">
              Your marketing investment,<br/>managed.
            </h2>
            <p className="font-sans text-[#737373]">Three ways to work together. One point of contact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h3 className="font-serif text-xl mb-3">Management</h3>
              <p className="font-sans text-sm text-[#525252] leading-relaxed">
                For leaders who need ownership. We become your growth department.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Strategy</h3>
              <p className="font-sans text-sm text-[#525252] leading-relaxed">
                For teams ready to build the playbook. We audit, model, and roadmap.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Advisory</h3>
              <p className="font-sans text-sm text-[#525252] leading-relaxed">
                For founders who need an executive thought partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PaperCrease />

      {/* 4. ABOUT SECTION (Narrow, Clean) */}
      {/* Return to narrow/clean signals a return to narrative. */}
      <section className="relative px-6 py-24 md:py-32 bg-[#FAFAF8]">
        <div className="max-w-[720px] mx-auto">
           <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-12 italic">
            Yesterday's agencies aren't built for tomorrow.
          </h2>
          <div className="flex gap-8 items-start">
             <div className="w-16 h-16 bg-[#e5e5e5] rounded-sm shrink-0" />
             <div className="space-y-4 text-[16px] font-light text-[#404040]">
               <p>They were designed for a world where it took teams of people to do all the work. That world is changing.</p>
               <p>Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands.</p>
             </div>
          </div>
        </div>
      </section>

      <PaperCrease />

    </div>
  );
};

export default VisualRhythm;
