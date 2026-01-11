import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { CAPABILITIES } from '../constants';

// Progressive dot indicator for sequence
const MinimalDot = ({ count = 1 }) => (
  <div className="flex gap-1.5">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/40"
      />
    ))}
  </div>
);

const Approach = () => {
  return (
    <Section id="approach" label="Approach">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-[#1a1a1a]">
            Tailor made<br /><span className="italic">growth marketing.</span>
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#404040] font-light">
            You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
          </p>
        </FocusText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((capability, idx) => {
          const mdBorder = idx % 2 === 0 ? 'md:border-r' : '';
          const lgBorder = idx < 3 ? 'lg:border-r' : '';
          return (
            <div
              key={capability.title}
              className={`py-8 px-6 first:pl-0 last:pr-0 border-[#e5e5e5]/60 ${mdBorder} ${lgBorder}`}
            >
              <FocusText>
                <div className="mb-5">
                  <MinimalDot count={idx + 1} />
                </div>
                <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] mb-3">{capability.title}</h3>
                <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
                <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">
                  {capability.description}
                </p>
              </FocusText>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Approach;
