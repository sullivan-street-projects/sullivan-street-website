import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { VALUE_PROPS } from '../constants';

const Intro = () => {
  return (
    <Section label="Opportunity">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight italic text-[#1a1a1a] mb-8 md:mb-12">
            It's Time To Make Marketing Work The Way You Work
          </h2>
        </FocusText>
        <FocusText>
          <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[800px]">
            Modern marketing is a mess. Too many platforms, vendors, and agencies. Too much noise, not enough signal. We cut through the chaos and focus on the only metric that matters—profitable growth.
          </p>
        </FocusText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
        {VALUE_PROPS.map((prop, idx) => (
          <FocusText key={idx} className="space-y-6 md:space-y-8">
            <h3 className="font-serif text-2xl lg:text-3xl leading-tight text-[#1a1a1a]">{prop.title}</h3>
            <p className="font-sans text-[16px] text-[#525252] leading-relaxed font-light">{prop.description}</p>
          </FocusText>
        ))}
      </div>
    </Section>
  );
};

export default Intro;
