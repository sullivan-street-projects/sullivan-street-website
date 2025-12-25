import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';

const PartnerOutcomes = () => {
  return (
    <div>
      <Section label="Partner Outcomes" divider={true}>
        <div className="max-w-[800px] mx-auto">
          <FocusText>
            <p className="font-serif text-2xl md:text-3xl lg:text-[38px] leading-[1.4] mb-10 italic text-[#404040] font-light antialiased">
              95% year-over-year revenue growth via paid media and lifecycle optimization.
            </p>
          </FocusText>
          <FocusText>
            <div className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#737373]">
              Exclusive Beauty Club
            </div>
          </FocusText>
        </div>
      </Section>
    </div>
  );
};

export default PartnerOutcomes;
