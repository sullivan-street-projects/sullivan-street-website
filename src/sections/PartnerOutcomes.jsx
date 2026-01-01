import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { PARTNER_OUTCOMES } from '../constants';

const PartnerOutcomes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.6, once: false });

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PARTNER_OUTCOMES.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [isInView]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> Next
      setCurrentIndex((prev) => (prev + 1) % PARTNER_OUTCOMES.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swipe Right -> Prev
      setCurrentIndex((prev) => (prev - 1 + PARTNER_OUTCOMES.length) % PARTNER_OUTCOMES.length);
    }
  };

  return (
    <div ref={containerRef}>
      <Section label="Partner Outcomes" divider={true}>
        <div className="max-w-[800px] min-h-[300px] flex flex-col justify-between">
          <div className="relative cursor-grab active:cursor-grabbing">
            <FocusText>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                >
                  <div className="h-[200px] md:h-[180px] flex items-center pr-6 md:pr-0">
                    <p className="font-serif text-2xl md:text-3xl lg:text-[38px] leading-[1.4] text-[#404040] font-light antialiased">
                      {PARTNER_OUTCOMES[currentIndex].metric}
                    </p>
                  </div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#737373] mt-6 select-none">
                    {PARTNER_OUTCOMES[currentIndex].client}
                  </div>
                </motion.div>
              </AnimatePresence>
            </FocusText>
          </div>

          <div className="flex gap-2 mt-12">
            {PARTNER_OUTCOMES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="group relative h-1 w-12 bg-[#e5e5e5] overflow-hidden rounded-full transition-colors hover:bg-[#d4d4d4]"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === currentIndex && isInView && (
                  <motion.div
                    layoutId="active-progress"
                    className="absolute top-0 left-0 h-full w-full bg-[#1a1a1a]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 8, ease: "linear" }}
                  />
                )}
                {idx === currentIndex && !isInView && (
                   <div className="absolute top-0 left-0 h-full w-full bg-[#1a1a1a] w-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PartnerOutcomes;
