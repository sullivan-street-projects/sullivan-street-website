import React from 'react';
import FocusText from './FocusText';

const ServiceRow = ({ service }) => (
  <div className="py-20 md:py-24 border-t border-[#e5e5e5] first:border-t-0">
    <div className="mb-6 md:mb-8">
      <FocusText>
        <h3 className="font-serif text-xl md:text-2xl text-[#1a1a1a]">{service.title}</h3>
      </FocusText>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">
      <div className="lg:col-span-4">
        <FocusText>
          <p className="font-sans text-[12px] md:text-[13px] text-[#737373] tracking-wider uppercase font-bold">{service.target}</p>
        </FocusText>
      </div>
      <div className="lg:col-span-5">
        <FocusText>
          <p className="font-sans text-[17px] md:text-[18px] text-[#404040] leading-relaxed font-light">
            {service.qualifier}
          </p>
        </FocusText>
      </div>
      <div className="lg:col-span-3">
        <FocusText>
          <ul className="font-sans text-[13px] text-[#666] space-y-5 md:space-y-6">
            <li className="font-bold text-[#1a1a1a] uppercase text-[9px] tracking-widest mb-2">Includes:</li>
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-4 items-start">
                <span className="mt-1.5 w-1 h-1 bg-[#1a1a1a]/40 rounded-full shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </FocusText>
      </div>
    </div>
  </div>
);

export default ServiceRow;
