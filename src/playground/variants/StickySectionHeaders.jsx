import React from 'react';

// Mock content based on actual site content to make it feel real
const SECTIONS = [
  {
    id: '01',
    label: 'Approach',
    headline: 'Strategy built for scale.',
    body: "You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you. Every engagement starts with your commercial objectives, market realities, and unit economics."
  },
  {
    id: '02',
    label: 'Services',
    headline: 'Your marketing investment, managed.',
    body: "Three ways to work together. One point of contact. The right team for the job. From fractional leadership to go-to-market design and strategic advisory."
  },
  {
    id: '03',
    label: 'About',
    headline: "Yesterday's agencies aren't built for tomorrow.",
    body: "They were designed for a world where it took teams of people to do all the work. Today's advantage is orchestration: managing systems, aligning teams, and making business decisions that connect to your bottom line."
  }
];

const StickySectionHeaders = () => {
  return (
    <div className="w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans">
      <p className="font-sans text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-8 px-4">
        E: STICKY GRID — Structural borders & fixed labels
      </p>

      {/* The Container */}
      <div className="border-x border-t border-[#1a1a1a] mx-auto max-w-[1000px]">
        
        {SECTIONS.map((section) => (
          <div key={section.id} className="flex flex-col md:flex-row border-b border-[#1a1a1a]">
            
            {/* Left Column: Label (Sticky on Desktop) */}
            <div className="md:w-[240px] shrink-0 border-b md:border-b-0 md:border-r border-[#1a1a1a] bg-[#FAFAF8] z-10">
              <div className="sticky top-0 md:top-14 p-6 md:p-8 flex md:flex-col justify-between items-baseline md:items-start h-auto md:h-[200px]">
                <span className="font-mono text-[10px] text-[#737373] tracking-widest uppercase">
                  ({section.id})
                </span>
                <h3 className="font-serif text-xl md:text-2xl italic">
                  {section.label}
                </h3>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="flex-1 p-6 md:p-12 lg:p-16">
              <div className="max-w-[540px]">
                <h2 className="font-serif text-3xl md:text-4xl leading-[1.2] mb-8">
                  {section.headline}
                </h2>
                <p className="font-sans text-[16px] md:text-[18px] text-[#404040] leading-relaxed font-light tracking-wide">
                  {section.body}
                </p>
                
                {/* Visual Placeholder for more content */}
                <div className="mt-12 h-[1px] w-12 bg-[#1a1a1a]/20" />
                <div className="mt-8 space-y-4">
                  <div className="h-4 w-full bg-[#1a1a1a]/5 rounded-sm" />
                  <div className="h-4 w-[80%] bg-[#1a1a1a]/5 rounded-sm" />
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      {/* Footer-like closer */}
      <div className="max-w-[1000px] mx-auto border-x border-b border-[#1a1a1a] p-8 text-center">
         <p className="font-serif text-sm italic text-[#737373]">Sourced from the architectural playbook.</p>
      </div>
    </div>
  );
};

export default StickySectionHeaders;
