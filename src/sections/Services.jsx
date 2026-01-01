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
            <h3 className="font-serif text-2xl mb-16 text-[#1a1a1a]">Compare Services</h3>
          </FocusText>

          <div className="overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0">
            <div className="min-w-[800px] lg:min-w-full">
              {/* Table Header */}
              <FocusText>
                <div className="grid grid-cols-12 gap-6 mb-8 border-b border-[#e5e5e5] pb-6">
                  <div className="col-span-6 font-sans text-xs uppercase tracking-widest font-bold text-[#737373] sticky left-0 z-10 bg-[#FAFAF8]">Service</div>
                  <div className="col-span-2 font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Advisory</div>
                  <div className="col-span-2 font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Strategy</div>
                  <div className="col-span-2 font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Management</div>
                </div>
              </FocusText>

              {COMPARISON_DATA.map((section) => (
                <div key={section.category} className="mb-20 last:mb-0">
                  <FocusText>
                    <div className="mb-8 sticky left-0 z-10 bg-[#FAFAF8]">
                      <h4 className="font-serif text-xl text-[#1a1a1a]">{section.category}</h4>
                    </div>
                    
                    <div className="space-y-0">
                      {section.features.map((feature) => (
                        <div key={feature.name} className="grid grid-cols-12 gap-6 py-6 border-b border-[#e5e5e5]/60 items-start group hover:bg-[#fafafa] transition-colors duration-300">
                          <div className="col-span-6 pr-4 md:pr-12 sticky left-0 z-10 bg-[#FAFAF8] shadow-[10px_0_15px_-15px_rgba(0,0,0,0.1)]">
                            <p className="font-sans text-[13px] md:text-[15px] font-medium text-[#1a1a1a] mb-0 md:mb-1.5">{feature.name}</p>
                            <p className="hidden md:block font-sans text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                          </div>
                          
                          {/* Advisory Cell */}
                          <div className="col-span-2 flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                            {renderCell(feature.advisory)}
                          </div>

                          {/* Strategy Cell */}
                          <div className="col-span-2 flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                            {renderCell(feature.strategy)}
                          </div>

                          {/* Management Cell */}
                          <div className="col-span-2 flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                            {renderCell(feature.management)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FocusText>
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
