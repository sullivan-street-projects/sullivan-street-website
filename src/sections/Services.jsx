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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-[#e5e5e5] mb-32">
        {TIERS.map((tier) => (
          <div key={tier.id} className="flex flex-col h-full px-0 md:px-8 lg:px-12 first:pl-0 last:pr-0">
            <FocusText className="h-full">
              <div className="border-b border-[#1a1a1a] py-8 flex flex-col h-full bg-[#FAFAF8] z-10">
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

          {/* Comparison Sections */}
          {COMPARISON_DATA.map((section) => (
            <div key={section.category} className="mb-20 last:mb-0">
              
              {/* Scrollable Table for this Category */}
              <div className="overflow-x-auto -mx-6 lg:mx-0 lg:px-0 pb-4 pt-4 snap-x snap-mandatory scroll-smooth scroll-pl-[140px]">
                <div className="min-w-[650px] lg:min-w-full lg:w-full">
                  
                  {/* Section Column Header - Static Top, Sticky Left */}
                  <div className="flex border-b border-[#1a1a1a] pb-4 mb-0 pt-4">
                     <div className="w-[140px] pl-6 lg:pl-0 flex-none sticky left-0 z-20 bg-[#FAFAF8] md:w-[40%] lg:w-[40%] lg:static lg:bg-transparent pr-4 border-r border-[#e5e5e5]/40 md:border-none flex items-end">
                       <FocusText>
                         <h4 className="font-serif text-lg md:text-xl text-[#1a1a1a] leading-none">{section.category}</h4>
                       </FocusText>
                     </div>
                     <div className="flex-1 min-w-[120px] snap-start flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Advisory</span></FocusText></div>
                     <div className="flex-1 min-w-[120px] snap-start flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Strategy</span></FocusText></div>
                     <div className="flex-1 min-w-[120px] snap-start flex justify-center items-end pr-6 lg:pr-0"><FocusText><span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#737373]">Management</span></FocusText></div>
                  </div>
                  
                  <div className="space-y-0">
                    {section.features.map((feature) => (
                      <div key={feature.name} className="flex py-6 border-b border-[#e5e5e5]/60 items-start group hover:bg-[#fafafa] transition-colors duration-300">
                        {/* Service Name: Sticky Mobile */}
                        <div className="w-[140px] pl-6 lg:pl-0 flex-none sticky left-0 z-20 bg-[#FAFAF8] md:w-[40%] lg:w-[40%] lg:static lg:bg-transparent pr-4 border-r border-[#e5e5e5]/40 md:border-none group-hover:bg-[#fafafa]">
                          <FocusText>
                            <p className="font-sans text-[13px] md:text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                            <p className="font-sans text-[12px] md:text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                          </FocusText>
                        </div>
                        
                        {/* Tiers Container */}
                        <div className="flex-1 min-w-[120px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
                          <FocusText>{renderCell(feature.advisory)}</FocusText>
                        </div>
                        <div className="flex-1 min-w-[120px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
                          <FocusText>{renderCell(feature.strategy)}</FocusText>
                        </div>
                        <div className="flex-1 min-w-[120px] snap-start flex justify-center pt-1 font-sans text-[13px] text-[#737373] pr-6 lg:pr-0">
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