import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import CTAButton from '../components/CTAButton';
import { ANIMATION, TIERS, FEATURES, MOBILE_TIERS, HEADING_CLASSES, BODY_CLASSES } from '../constants';
import { useLenis } from '../components/SmoothScroll';

const renderCell = (value) => {
  if (value === true) return <span className="text-charcoal text-body-lg">●</span>;
  if (value === false) return <span className="text-faint text-body-lg">−</span>;
  return <span className="text-charcoal font-medium">{value}</span>;
};

const Services = () => {
  const scrollRef = useRef(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [expandedTier, setExpandedTier] = useState('management');
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const lenis = useLenis();

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

  const scrollToContact = () => {
    lenis?.scrollTo('#contact', {
      offset: ANIMATION.SCROLL_OFFSET,
      duration: ANIMATION.SCROLL_DURATION
    });
  };

  return (
    <Section id="services" label="Services" padding="py-16 md:py-24 lg:py-32">
      <div className="mb-12 md:mb-16">
        <FocusText>
          <h2 className={`${HEADING_CLASSES} mb-8`}>
            Your marketing investment,<br /><span className="italic">managed.</span>
          </h2>
          <p className={`${BODY_CLASSES} max-w-narrow`}>
            One point of contact. The right team for the job.
          </p>
        </FocusText>
      </div>

      {/* Mobile View - Accordion */}
      <div className="block md:hidden">
        <div className="space-y-0">
          {MOBILE_TIERS.map((tier) => {
            const isExpanded = expandedTier === tier.id;
            return (
              <FocusText key={tier.id}>
                <div className="border-b border-divider">
                  {/* Accordion Header */}
                  <button
                    onClick={() => setExpandedTier(isExpanded ? null : tier.id)}
                    className="w-full py-6 flex items-start justify-between text-left"
                  >
                    <div>
                      <h3 className="font-serif text-xl text-charcoal mb-1">{tier.title}</h3>
                      <p className="font-sans text-micro uppercase tracking-widest font-bold text-label">{tier.subtitle}</p>
                    </div>
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-label)"
                      strokeWidth="2"
                      className="mt-1 flex-shrink-0"
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </motion.svg>
                  </button>

                  {/* Accordion Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8">
                          <p className="font-sans text-body-sm text-muted leading-relaxed font-light mb-6">
                            {tier.description}
                          </p>

                          <p className="font-sans text-caption italic text-label mb-5">
                            {tier.includesText}
                          </p>

                          <ul className="space-y-3">
                            {tier.features.map((feature) => (
                              <li key={feature} className="font-sans text-body-sm text-muted font-light flex items-start">
                                <span className="text-charcoal mr-3 text-ui">●</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FocusText>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <p className="font-sans text-body-sm text-muted mb-4">
            Not sure which level of support you need?
          </p>
          <CTAButton onClick={scrollToContact}>
            Schedule a call
          </CTAButton>
        </div>
      </div>

      {/* Services Footnote - Mobile */}
      <div className="block md:hidden mt-8">
        <p className="font-sans text-caption italic text-label">
          Diagnostic assessments available by request.
        </p>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block relative">
        {/* Scroll hint - mobile only */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-20 lg:hidden transition-opacity duration-500 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(to right, transparent, var(--color-paper))' }}
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-label)" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>

        <div ref={scrollRef} className="overflow-x-auto scrollbar-hide services-scroll">
        <div className="min-w-[680px]">
          {/* Header Row - scrolls with content, no vertical sticky */}
          <div className="bg-paper border-b border-divider pr-8">
            <div className="services-grid py-4">
              <div className="sticky left-0 z-30 pr-6" style={{ background: 'linear-gradient(to right, var(--color-paper) 85%, transparent)' }}>
                <span className="font-serif text-body-lg text-charcoal">Service</span>
              </div>
              <div className="text-center services-snap-target">
                <span className="font-serif text-body-lg text-charcoal">Management</span>
              </div>
              <div className="text-center services-snap-target">
                <span className="font-serif text-body-lg text-charcoal">Strategy</span>
              </div>
              <div className="text-center services-snap-target">
                <span className="font-serif text-body-lg text-charcoal">Advisory</span>
              </div>
            </div>
          </div>

          {/* Row 2: Tier Descriptions */}
          <div className="services-grid py-8 pr-8">
            <div className="sticky left-0 z-10 pr-6" style={{ background: 'linear-gradient(to right, var(--color-paper) 85%, transparent)' }}></div>
            {TIERS.map((tier) => (
              <div key={tier.id} className="text-center services-snap-target">
                <p className="font-sans text-micro uppercase tracking-widest font-bold text-label mb-4">{tier.subtitle}</p>
                <p className="font-sans text-caption leading-relaxed text-secondary font-light">{tier.description}</p>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsDesktopExpanded(!isDesktopExpanded)}
            aria-expanded={isDesktopExpanded}
            className="w-full py-4 flex items-center justify-center gap-2 bg-paper border-t border-b border-divider hover:bg-hover-active transition-colors group"
          >
            <span className="font-sans text-caption font-medium text-muted group-hover:text-charcoal transition-colors">
              {isDesktopExpanded ? 'Hide' : 'All services'}
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-label group-hover:text-charcoal transition-colors"
              animate={{ rotate: isDesktopExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          {/* Feature Rows - Expandable */}
          <AnimatePresence initial={false}>
            {isDesktopExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                {FEATURES.map((feature, index) => (
                  <div
                    key={feature.name}
                    className={`services-grid py-6 items-start group hover:bg-hover transition-colors duration-300 pr-8 ${
                      index < FEATURES.length - 1 ? 'border-b border-divider' : ''
                    }`}
                  >
                    <div className="sticky left-0 pr-6 z-10" style={{ background: 'linear-gradient(to right, var(--color-paper) 85%, transparent)' }}>
                      <p className="font-sans text-body-sm font-medium text-charcoal mb-1.5">{feature.name}</p>
                      <p className="font-sans text-caption leading-relaxed text-muted font-light">{feature.description}</p>
                    </div>
                    <div className="pt-1 text-center font-sans text-caption text-label services-snap-target">
                      {renderCell(feature.management)}
                    </div>
                    <div className="pt-1 text-center font-sans text-caption text-label services-snap-target">
                      {renderCell(feature.strategy)}
                    </div>
                    <div className="pt-1 text-center font-sans text-caption text-label services-snap-target">
                      {renderCell(feature.advisory)}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>

        {/* Services Footnote - Desktop */}
        <div className="mt-8">
          <p className="font-sans text-caption italic text-label">
            Diagnostic assessments available by request.
          </p>
        </div>

        {/* Mid-page CTA - Desktop */}
        <div className="mt-10">
          <p className="font-sans text-body-sm text-muted mb-4">
            Not sure which level of support you need?
          </p>
          <CTAButton onClick={scrollToContact}>
            Schedule a call
          </CTAButton>
        </div>
      </div>
    </Section>
  );
};

export default Services;
