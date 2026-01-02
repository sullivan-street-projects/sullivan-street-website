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
          
          {/* Unified Master Table Container */}
          <div className="overflow-x-auto -mx-6 lg:mx-0 lg:px-0 pb-4 pt-4 snap-x snap-mandatory scroll-smooth scroll-pl-[200px] lg:scroll-pl-0 lg:snap-none lg:overflow-visible">
            <div className="min-w-[650px] lg:min-w-full lg:w-full">
              
              {/* Global Header Row - Sticky Top & Left */}
              <div className="flex lg:grid lg:grid-cols-[40%_1fr_1fr_1fr] lg:gap-4 border-b border-[#d4d4d4] pb-6 mb-8 gap-4 sticky top-20 z-30 bg-[#FAFAF8] pt-4 transition-shadow duration-300">
                 {/* Service Label Column */}
                 <div className="w-[200px] pl-6 lg:pl-0 lg:w-auto flex-none sticky lg:static left-0 z-40 bg-[#FAFAF8] lg:bg-transparent pr-4 lg:pr-0 lg:border-none flex items-end">
                   <FocusText>
                     <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373]">Service</span>
                   </FocusText>
                 </div>
                 
                 {/* Column Headers */}
                 <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Advisory</span></FocusText></div>
                 <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Strategy</span></FocusText></div>
                 <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Management</span></FocusText></div>
              </div>
              
              {/* Body Content */}
              <div className="space-y-0">
                {COMPARISON_DATA.map((section) => (
                  <React.Fragment key={section.category}>
                    {/* Category Divider Row with Mobile Context */}
                    <div className="flex lg:grid lg:grid-cols-[40%_1fr_1fr_1fr] lg:gap-4 py-4 border-b border-[#d4d4d4] bg-[#FAFAF8] items-center">
                      <div className="w-[200px] pl-6 lg:pl-0 lg:w-auto flex-none sticky lg:static left-0 z-20 bg-[#FAFAF8] lg:bg-transparent pr-4 lg:pr-0 lg:border-none">
                        <FocusText>
                          <h4 className="font-serif text-lg text-[#1a1a1a]">{section.category}</h4>
                        </FocusText>
                      </div>
                      
                      {/* Mobile-Only Context Labels */}
                      <div className="flex-1 min-w-[130px] lg:min-w-0 lg:hidden flex justify-center opacity-50"><span className="font-sans text-[9px] uppercase tracking-widest font-bold text-[#737373]">Adv</span></div>
                      <div className="flex-1 min-w-[130px] lg:min-w-0 lg:hidden flex justify-center opacity-50"><span className="font-sans text-[9px] uppercase tracking-widest font-bold text-[#737373]">Strat</span></div>
                      <div className="flex-1 min-w-[130px] lg:min-w-0 lg:hidden flex justify-center opacity-50"><span className="font-sans text-[9px] uppercase tracking-widest font-bold text-[#737373]">Mgmt</span></div>
                      
                      {/* Desktop Spacers */}
                      <div className="hidden lg:block"></div>
                      <div className="hidden lg:block"></div>
                      <div className="hidden lg:block"></div>
                    </div>

                    {/* Features */}
                    {section.features.map((feature) => (
                      <div key={feature.name} className="flex lg:grid lg:grid-cols-[40%_1fr_1fr_1fr] lg:gap-4 py-6 border-b border-[#d4d4d4] items-start group hover:bg-[#fafafa] transition-colors duration-300">
                        {/* Service Name: Sticky Mobile, Static Grid Desktop */}
                        <div className="w-[200px] lg:w-auto pl-6 lg:pl-0 flex-none sticky lg:static left-0 z-20 bg-[#FAFAF8] lg:bg-transparent pr-4 lg:pr-0 lg:border-none group-hover:bg-[#fafafa]">
                          <FocusText>
                            <p className="font-sans text-[13px] md:text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                            <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                          </FocusText>
                        </div>
                        
                        {/* Tiers Container */}
                        <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
                          <FocusText>{renderCell(feature.advisory)}</FocusText>
                        </div>
                        <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
                          <FocusText>{renderCell(feature.strategy)}</FocusText>
                        </div>
                        <div className="flex-1 min-w-[130px] lg:min-w-0 lg:w-auto snap-start lg:snap-none flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
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