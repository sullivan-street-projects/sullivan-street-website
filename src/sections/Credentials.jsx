import React from 'react';
import FocusText from '../components/FocusText';
import { BRANDS } from '../constants';

const Credentials = () => {
  return (
    <div className="max-w-site w-full mx-auto px-6 lg:px-8 pb-16">
      <div className="border-t border-divider" />
      <section id="credentials" className="py-20 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-baseline">
          <div className="lg:w-1/4 shrink-0">
            <FocusText>
              <span className="font-sans text-tag text-label tracking-wider uppercase font-bold">
                Our team has managed $2B+ for
              </span>
            </FocusText>
          </div>
          <div className="flex-grow">
            <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-10">
              {BRANDS.map((brand) => (
                <FocusText key={brand}>
                  <span className="font-sans text-caption font-medium text-label uppercase tracking-widest cursor-default hover:text-charcoal transition-colors">
                    {brand}
                  </span>
                </FocusText>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Credentials;
