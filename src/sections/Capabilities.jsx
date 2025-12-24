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
            We’re a fractional growth consultancy delivering enterprise-grade advisory, strategy, and marketing operations. We bring in the right specialists to execute and scale—under our direction.
          </p>
        </FocusText>
      </div>
      
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0 relative">
        {CAPABILITIES.map((capability, idx) => (
          <React.Fragment key={capability.title}>
            <div className="lg:w-[22%] shrink-0">
              <FocusText className="space-y-6">
                <div className="w-10 h-px bg-[#1a1a1a]/20" />
                <h3 className="font-serif text-xl leading-tight text-[#1a1a1a]">{capability.title}</h3>
                <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">
                  {capability.description}
                </p>
              </FocusText>
            </div>
            
            {/* Visual Connector Arrows (Desktop) */}
            {idx < CAPABILITIES.length - 1 && (
              <div className="hidden lg:flex items-center justify-center flex-grow">
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  className="text-[#e5e5e5]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
            )}

            {/* Mobile Arrows */}
            {idx < CAPABILITIES.length - 1 && (
              <div className="flex lg:hidden items-center justify-start py-4">
                <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#e5e5e5]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-90">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};

export default Capabilities;
