import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { TIERS, COMPARISON_DATA } from '../constants';

const Services = () => {
  return (
    <Section id="services" label="Services">
      <div className="mb-20 md:mb-32">
        <FocusText>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 text-[#1a1a1a]">
            Your marketing investment,<br /><span className="italic">managed.</span>
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#404040] font-light">
            Three ways to engage. One point of contact. The right team for the job.
          </p>
        </FocusText>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-32">
        {TIERS.map((tier) => (
          <div key={tier.id} className="flex flex-col h-full">
            <FocusText className="h-full">
              <div className="border-t border-[#1a1a1a] pt-8 flex flex-col h-full">
                <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-3">{tier.title}</h3>
                <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-8">{tier.subtitle}</p>
                
                <p className="font-sans text-[15px] leading-relaxed text-[#404040] font-light">
                  {tier.description}
                </p>
              </div>
            </FocusText>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="border-t border-[#e5e5e5]">
        <div className="py-20">
          <FocusText>
            <h3 className="font-serif text-2xl mb-16 text-[#1a1a1a]">Partner Services</h3>
          </FocusText>

          {/* Mobile/Desktop Unified Scroll Container */}
          <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            <div className="min-w-max">
              
              {/* Table Header - Strict Grid */}
              <div className="grid grid-cols-[150px_110px_110px_110px] md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 mb-8 border-b border-[#e5e5e5] pb-6">
                <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] pr-4">Service</div>
                <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Advisory</div>
                <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Strategy</div>
                <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Management</div>
              </div>

              {COMPARISON_DATA.map((section) => (
                <div key={section.category} className="mb-20 last:mb-0">
                  {/* Category Header - Sticky only relative to section flow if needed, but keeping static for stability */}
                  <div className="mb-8">
                    <h4 className="font-serif text-xl text-[#1a1a1a]">{section.category}</h4>
                  </div>
                  
                  <div className="space-y-0">
                    {section.features.map((feature) => (
                      <div key={feature.name} className="grid grid-cols-[150px_110px_110px_110px] md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-6 border-b border-[#e5e5e5]/60 items-start group hover:bg-[#fafafa] transition-colors duration-300">
                        {/* Service Name Column */}
                        <div className="pr-4">
                          <p className="font-sans text-[13px] md:text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                          <p className="font-sans text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                        </div>
                        
                        {/* Advisory Cell */}
                        <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                          {renderCell(feature.advisory)}
                        </div>

                        {/* Strategy Cell */}
                        <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                          {renderCell(feature.strategy)}
                        </div>

                        {/* Management Cell */}
                        <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                          {renderCell(feature.management)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const renderCell = (value) => {
  if (value === true) return <span className="text-[#1a1a1a] text-lg">●</span>;
  if (value === false) return <span className="text-[#e5e5e5] text-lg">−</span>;
  return <span className="text-[#1a1a1a] font-medium">{value}</span>;
};

export default Services;
