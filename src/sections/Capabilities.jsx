import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { CAPABILITIES } from '../constants';

const Capabilities = () => {
  return (
    <Section id="capabilities" label="Capabilities">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-8 md:mb-12 text-[#1a1a1a]">
            A tailor-made approach to growth marketing.
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#404040] font-light">
            We’re a fractional consultancy delivering enterprise-grade advisory, strategy, and marketing leadership. We start with your business objectives, build the strategy to hit them, activate the right channels, and execute the campaigns that convert.           
          </p>
        </FocusText>
      </div>
      
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0 relative">
        {CAPABILITIES.map((capability, idx) => (
          <div key={capability.title} className="lg:w-[22%] shrink-0">
            <FocusText className="space-y-6">
              <div className="w-10 h-px bg-[#1a1a1a]/20" />
              <h3 className="font-serif text-xl leading-tight text-[#1a1a1a]">{capability.title}</h3>
              <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">
                {capability.description}
              </p>
            </FocusText>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Capabilities;
