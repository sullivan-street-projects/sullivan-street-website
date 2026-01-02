import React, { useState, useEffect, useRef } from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { TIERS, FEATURES } from '../constants';

const Services = () => {
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollLeft > 20) {
        setShowScrollHint(false);
      }
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section id="services" label="Services" padding="py-16 md:py-24 lg:py-32">
      <div className="mb-12 md:mb-16">
        <FocusText>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 text-[#1a1a1a]">
            Your marketing investment,<br /><span className="italic">managed.</span>
          </h2>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#404040] font-light">
            Three ways to work together. One point of contact. The right team for the job.
          </p>
        </FocusText>
      </div>

      {/* Services Table - Single scrollable container */}
      <div className="relative">
        {/* Scroll hint - mobile only */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-20 lg:hidden transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(to right, transparent, #FAFAF8)' }}
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide services-scroll">
        <div className="min-w-[680px]">
          {/* Header Row - scrolls with content, no vertical sticky */}
          <div className="bg-[#FAFAF8] border-b border-[#d4d4d4] pr-8">
            <div className="services-grid py-4">
              <div className="sticky left-0 z-30 pr-6" style={{ background: 'linear-gradient(to right, #FAFAF8 85%, transparent)' }}>
                <FocusText><span className="font-serif text-lg text-[#1a1a1a]">Service</span></FocusText>
              </div>
              <div className="text-center services-snap-target">
                <FocusText><span className="font-serif text-lg text-[#1a1a1a]">Advisory</span></FocusText>
              </div>
              <div className="text-center services-snap-target">
                <FocusText><span className="font-serif text-lg text-[#1a1a1a]">Strategy</span></FocusText>
              </div>
              <div className="text-center services-snap-target">
                <FocusText><span className="font-serif text-lg text-[#1a1a1a]">Management</span></FocusText>
              </div>
            </div>
          </div>

          {/* Row 2: Tier Descriptions */}
          <div className="services-grid py-8 border-b border-[#d4d4d4] pr-8">
            <div className="sticky left-0 z-10 pr-6" style={{ background: 'linear-gradient(to right, #FAFAF8 85%, transparent)' }}></div>
            {TIERS.map((tier) => (
              <div key={tier.id} className="text-center services-snap-target">
                <FocusText>
                  <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-4">{tier.subtitle}</p>
                  <p className="font-sans text-[13px] leading-relaxed text-[#404040] font-light">{tier.description}</p>
                </FocusText>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {FEATURES.map((feature, index) => (
            <div
              key={feature.name}
              className={`services-grid py-6 items-start group hover:bg-[#fafafa] transition-colors duration-300 pr-8 ${
                index < FEATURES.length - 1 ? 'border-b border-[#d4d4d4]' : ''
              }`}
            >
              <div className="sticky left-0 pr-6 z-10" style={{ background: 'linear-gradient(to right, #FAFAF8 85%, transparent)' }}>
                <FocusText>
                  <p className="font-sans text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                  <p className="font-sans text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                </FocusText>
              </div>
              <div className="pt-1 text-center font-sans text-[13px] text-[#737373] services-snap-target">
                <FocusText>{renderCell(feature.advisory)}</FocusText>
              </div>
              <div className="pt-1 text-center font-sans text-[13px] text-[#737373] services-snap-target">
                <FocusText>{renderCell(feature.strategy)}</FocusText>
              </div>
              <div className="pt-1 text-center font-sans text-[13px] text-[#737373] services-snap-target">
                <FocusText>{renderCell(feature.management)}</FocusText>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </Section>
  );
};

const renderCell = (value) => {
  if (value === true) return <span className="text-[#1a1a1a] text-lg">●</span>;
  if (value === false) return <span className="text-[#a3a3a3] text-lg">−</span>;
  return <span className="text-[#1a1a1a] font-medium">{value}</span>;
};

export default Services;
