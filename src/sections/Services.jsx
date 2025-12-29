import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import ServiceRow from '../components/ServiceRow';
import { SERVICES } from '../constants';

const Services = () => {
  return (
    <Section id="services" label="Services">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-4xl lg:text-5xl mb-8 text-[#1a1a1a]">Your marketing investment,<br /><span className="italic">managed.</span></h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#404040] font-light">
            Three ways to work together. One point of contact. The right team for the job.
          </p>
        </FocusText>
      </div>
      <div className="space-y-0">
        {SERVICES.map((service) => (
          <ServiceRow key={service.title} service={service} />
        ))}
      </div>
    </Section>
  );
};

export default Services;
