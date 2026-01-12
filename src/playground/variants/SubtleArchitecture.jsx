import React from 'react';

// Mock content
const SECTIONS = [
  {
    id: '01',
    label: 'Credentials',
    headline: 'Our team has managed $2B+ for',
    content: 'APPLE · GOOGLE · JPMORGAN CHASE · SAMSUNG · AMEX'
  },
  {
    id: '02',
    label: 'Approach',
    headline: 'Tailor made growth marketing.',
    content: "You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you."
  },
  {
    id: '03',
    label: 'Services',
    headline: 'Your marketing investment, managed.',
    content: "Three ways to work together. One point of contact. The right team for the job."
  }
];

const SubtleArchitecture = () => {
  return (
    <div className="w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans pb-24">
      <p className="font-sans text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-12 px-4 pt-4">
        A: SUBTLE ARCHITECTURE — Using typography as infrastructure
      </p>

      {/* Hero Mockup */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-24 md:py-32">
        <h1 className="font-serif text-4xl md:text-6xl text-[#1a1a1a] leading-tight mb-6">
          Marketing for Tomorrow's<br/>Billion-Dollar Brands
        </h1>
        <p className="font-sans text-lg text-[#404040] font-light max-w-[600px]">
          AI-powered strategy, media, and execution. Faster growth. Sharper focus.
        </p>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.id} className="max-w-[1200px] mx-auto px-6 lg:px-8">
          
          {/* THE SEPARATOR: Flex layout with label + line */}
          <div className="flex items-center gap-4 py-2">
            {/* The Label */}
            <span className="font-mono text-[10px] text-[#a3a3a3] uppercase tracking-widest shrink-0">
              ({section.id}) {section.label}
            </span>
            
            {/* The Line */}
            <div className="h-[1px] flex-1 bg-[#e5e5e5]" />
          </div>

          {/* Section Content */}
          <div className="py-20 md:py-24">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-6">
              {section.headline}
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[600px]">
              {section.content}
            </p>
          </div>
          
        </div>
      ))}
      
      {/* Variant B: Label ON TOP of the line (More subtle) */}
       <div className="max-w-[1000px] mx-auto mt-24 px-6 border-t pt-12">
        <p className="font-sans text-[11px] font-bold text-[#737373] uppercase tracking-widest mb-12">
          B: Label Anchored Top
        </p>
        
        <div className="relative border-t border-[#e5e5e5] pt-20">
            <span className="absolute top-0 left-0 -translate-y-1/2 bg-[#FAFAF8] pr-4 font-mono text-[10px] text-[#a3a3a3] uppercase tracking-widest">
                (04) About
            </span>
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Yesterday's agencies.</h2>
        </div>
       </div>

    </div>
  );
};

export default SubtleArchitecture;
