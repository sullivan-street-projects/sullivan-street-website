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
            Three ways to work together. One point of contact. The right team for the job.
          </p>
        </FocusText>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-[#e5e5e5] mb-20">
        {TIERS.map((tier) => (
          <div key={tier.id} className="flex flex-col h-full px-0 md:px-8 lg:px-12 first:pl-0 last:pr-0">
            <FocusText className="h-full">
              <div className="py-8 flex flex-col h-full bg-[#FAFAF8] z-10">
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
        <div className="py-12">
          
          {/* ==================== MOBILE VIEW (Split Layout) ==================== */}
          <div className="lg:hidden">
            {COMPARISON_DATA.map((section) => (
              <div key={section.category} className="mb-12 last:mb-0">
                {/* Category Header - Sticky Top (Folding Effect) */}
                <div className="sticky top-20 z-30 bg-[#FAFAF8] py-4 border-b border-[#1a1a1a] mb-0">
                  <FocusText>
                    <h4 className="font-serif text-xl text-[#1a1a1a]">{section.category}</h4>
                  </FocusText>
                </div>

                {/* Mobile Scroll Container */}
                <div className="overflow-x-auto -mx-6 px-0 pb-4 pt-4 snap-x snap-mandatory scroll-smooth scroll-pl-[200px]">
                  <div className="min-w-[650px]">
                    
                    {/* Mobile Column Header */}
                    <div className="flex border-b border-[#d4d4d4] pb-4 mb-0 pt-4">
                       <div className="w-[200px] pl-6 flex-none sticky left-0 z-20 bg-[#FAFAF8] pr-4 flex items-end">
                         <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">{section.category}</span>
                       </div>
                       <div className="flex-1 min-w-[130px] snap-start flex justify-center items-end pr-6"><FocusText><span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Advisory</span></FocusText></div>
                       <div className="flex-1 min-w-[130px] snap-start flex justify-center items-end pr-6"><FocusText><span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Strategy</span></FocusText></div>
                       <div className="flex-1 min-w-[130px] snap-start flex justify-center items-end pr-6"><FocusText><span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Management</span></FocusText></div>
                    </div>
                    
                    {/* Mobile Rows */}
                    <div className="space-y-0">
                      {section.features.map((feature) => (
                        <div key={feature.name} className="flex py-6 border-b border-[#d4d4d4] items-start group hover:bg-[#fafafa] transition-colors duration-300">
                          <div className="w-[200px] pl-6 flex-none sticky left-0 z-20 bg-[#FAFAF8] pr-4 group-hover:bg-[#fafafa]">
                            <FocusText>
                              <p className="font-sans text-[13px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                              <p className="font-sans text-[12px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                            </FocusText>
                          </div>
                          
                          <div className="flex-1 min-w-[130px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6">
                            <FocusText>{renderCell(feature.advisory)}</FocusText>
                          </div>
                          <div className="flex-1 min-w-[130px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6">
                            <FocusText>{renderCell(feature.strategy)}</FocusText>
                          </div>
                          <div className="flex-1 min-w-[130px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6">
                            <FocusText>{renderCell(feature.management)}</FocusText>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ==================== DESKTOP VIEW (Unified Grid) ==================== */}
          <div className="hidden lg:block">
            {/* Global Header */}
            <div className="grid grid-cols-[40%_1fr_1fr_1fr] border-b border-[#d4d4d4] pb-6 mb-8 gap-4 sticky top-20 z-30 bg-[#FAFAF8] pt-4">
              <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Service</div>
              <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Advisory</div>
              <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Strategy</div>
              <div className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] text-center">Management</div>
            </div>

            {/* Unified Body */}
            <div className="space-y-0">
              {COMPARISON_DATA.map((section) => (
                <React.Fragment key={section.category}>
                  {/* Category Divider Row */}
                  <div className="grid grid-cols-[40%_1fr_1fr_1fr] gap-4 py-4 border-b border-[#d4d4d4] bg-[#FAFAF8] items-center">
                    <div>
                      <FocusText>
                        <h4 className="font-serif text-lg text-[#1a1a1a]">{section.category}</h4>
                      </FocusText>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  {/* Feature Rows */}
                  {section.features.map((feature) => (
                    <div key={feature.name} className="grid grid-cols-[40%_1fr_1fr_1fr] gap-4 py-6 border-b border-[#d4d4d4] items-start group hover:bg-[#fafafa] transition-colors duration-300">
                      <div>
                        <FocusText>
                          <p className="font-sans text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                          <p className="font-sans text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                        </FocusText>
                      </div>
                      
                      <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                        <FocusText>{renderCell(feature.advisory)}</FocusText>
                      </div>
                      <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                        <FocusText>{renderCell(feature.strategy)}</FocusText>
                      </div>
                      <div className="flex justify-center pt-1 font-sans text-[13px] text-[#737373]">
                        <FocusText>{renderCell(feature.management)}</FocusText>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
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
  if (value === false) return <span className="text-[#a3a3a3] text-lg">−</span>;
  return <span className="text-[#1a1a1a] font-medium">{value}</span>;
};

export default Services;