import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { CAPABILITIES, HEADING_CLASSES, BODY_CLASSES } from '../constants';

const Approach = () => {
  return (
    <Section id="approach" label="Approach">
      <div className="mb-20 md:mb-28 lg:mb-36">
        <FocusText>
          <h2 className={`${HEADING_CLASSES} mb-8 md:mb-12`}>
            Growth Marketing<br /><span className="italic">Made to Measure.</span>
          </h2>
          <p className={`${BODY_CLASSES} max-w-narrow`}>
            We use best-in-class AI to build a strategy tailored to you — then measure what matters: your data, your returns, your growth.
          </p>
        </FocusText>
      </div>

      {/* Editorial steps — large serif numbers + asymmetric grid */}
      {CAPABILITIES.map((cap, idx) => (
        <div key={cap.title}>
          <div className="h-px bg-charcoal/10" />
          <FocusText>
            <div className="grid grid-cols-12 py-10 md:py-14 lg:py-16">
              <div className="col-span-3 md:col-span-2">
                <span className="font-serif text-charcoal/10 text-[56px] md:text-[72px] lg:text-[88px] leading-none select-none">
                  {idx + 1}
                </span>
              </div>
              <div className="col-span-9 md:col-span-8 lg:col-span-6 pt-2 md:pt-3">
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl leading-snug text-charcoal mb-4 md:mb-5">
                  {cap.title}
                </h3>
                <p className="font-sans text-body-sm md:text-body text-muted leading-relaxed font-light">
                  {cap.description}
                </p>
              </div>
            </div>
          </FocusText>
        </div>
      ))}
      <div className="h-px bg-charcoal/10" />
    </Section>
  );
};

export default Approach;
