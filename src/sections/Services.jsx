import React, { useRef, useState, useEffect } from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { TIERS, FEATURES } from '../constants';

const Services = () => {
  const headerScrollRef = useRef(null);
  const bodyScrollRef = useRef(null);
  const fixedHeaderScrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [headerOffset, setHeaderOffset] = useState(0);

  // Sync horizontal scroll between all header instances and body
  const syncScroll = (sourceRef) => {
    const scrollLeft = sourceRef.current?.scrollLeft || 0;
    if (headerScrollRef.current) headerScrollRef.current.scrollLeft = scrollLeft;
    if (bodyScrollRef.current) bodyScrollRef.current.scrollLeft = scrollLeft;
    if (fixedHeaderScrollRef.current) fixedHeaderScrollRef.current.scrollLeft = scrollLeft;
  };

  const handleHeaderScroll = () => syncScroll(headerScrollRef);
  const handleBodyScroll = () => syncScroll(bodyScrollRef);
  const handleFixedHeaderScroll = () => syncScroll(fixedHeaderScrollRef);

  // Handle fixed header based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const mainHeaderHeight = 80;
      const tableHeaderHeight = 60;
      const exitZone = 120; // Distance before section end to start sliding out

      // Show header when section top is above main header
      const shouldFix = sectionRect.top <= mainHeaderHeight && sectionRect.bottom > mainHeaderHeight + tableHeaderHeight;
      setIsHeaderFixed(shouldFix);

      // Calculate slide-up offset as we approach section end
      if (shouldFix) {
        const distanceToEnd = sectionRect.bottom - mainHeaderHeight - tableHeaderHeight;
        if (distanceToEnd < exitZone) {
          // Slide up proportionally as we exit
          const offset = ((exitZone - distanceToEnd) / exitZone) * tableHeaderHeight;
          setHeaderOffset(-offset);
        } else {
          setHeaderOffset(0);
        }
      } else {
        setHeaderOffset(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeaderContent = ({ scrollRef, onScroll }) => (
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="overflow-x-auto scrollbar-hide"
    >
      <div className="min-w-[580px] md:min-w-[700px] grid grid-cols-[140px_1fr_1fr_1fr] md:grid-cols-[200px_1fr_1fr_1fr] gap-4 py-4">
        <div>
          <span className="font-serif text-lg text-[#1a1a1a]">Service</span>
        </div>
        <div className="text-center">
          <span className="font-serif text-lg text-[#1a1a1a]">Advisory</span>
        </div>
        <div className="text-center">
          <span className="font-serif text-lg text-[#1a1a1a]">Strategy</span>
        </div>
        <div className="text-center">
          <span className="font-serif text-lg text-[#1a1a1a]">Management</span>
        </div>
      </div>
    </div>
  );

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

      {/* Fixed Header - Glass effect, slides under main nav on scroll */}
      <div
        className={`fixed top-20 left-0 right-0 z-[60] bg-[#FAFAF8]/80 backdrop-blur-md border-b border-[#e5e5e5]/50 ${
          !isHeaderFixed ? 'pointer-events-none' : ''
        }`}
        style={{
          transform: `translateY(${headerOffset}px)`,
          opacity: isHeaderFixed ? 1 : 0,
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <HeaderContent scrollRef={fixedHeaderScrollRef} onScroll={handleFixedHeaderScroll} />
        </div>
      </div>

      {/* Unified Services Table */}
      <div ref={sectionRef}>
        {/* Row 1: Header - Static version */}
        <div className="bg-[#FAFAF8] border-b border-[#d4d4d4]">
          <HeaderContent scrollRef={headerScrollRef} onScroll={handleHeaderScroll} />
        </div>

        {/* Table Body */}
        <div
          ref={bodyScrollRef}
          onScroll={handleBodyScroll}
          className="overflow-x-auto"
        >
          <div className="min-w-[580px] md:min-w-[700px]">
            {/* Row 2: Tier Descriptions - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-[200px_1fr_1fr_1fr] gap-4 py-8 border-b border-[#d4d4d4]">
              <div className="sticky left-0 bg-[#FAFAF8] z-10"></div>
              {TIERS.map((tier) => (
                <div key={tier.id} className="text-center">
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
                className={`grid grid-cols-[140px_1fr_1fr_1fr] md:grid-cols-[200px_1fr_1fr_1fr] gap-4 py-6 items-start group hover:bg-[#fafafa] transition-colors duration-300 ${
                  index < FEATURES.length - 1 ? 'border-b border-[#d4d4d4]' : ''
                }`}
              >
                <div className="sticky left-0 bg-[#FAFAF8] pr-4 z-10">
                  <FocusText>
                    <p className="font-sans text-[15px] font-medium text-[#1a1a1a] mb-1.5">{feature.name}</p>
                    <p className="font-sans text-[13px] leading-relaxed text-[#525252] font-light">{feature.description}</p>
                  </FocusText>
                </div>
                <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
                  <FocusText>{renderCell(feature.advisory)}</FocusText>
                </div>
                <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
                  <FocusText>{renderCell(feature.strategy)}</FocusText>
                </div>
                <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
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
