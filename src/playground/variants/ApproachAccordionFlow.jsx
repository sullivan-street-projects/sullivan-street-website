import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

const stepNumbers = ['01', '02', '03', '04'];

// Interactive vertical accordion — one step expanded at a time,
// left rail shows the connected flow with active/inactive states
const ApproachAccordionFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Interactive accordion with flow rail
      </p>

      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-[32px] md:text-[48px] lg:text-[56px] leading-tight text-[#1a1a1a] mb-6">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-[#404040] font-light max-w-[50rem]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {/* ── Desktop: Side-by-side list + expanded detail ── */}
      <div className="hidden md:grid md:grid-cols-12 gap-0">
        {/* Left: Step list with rail */}
        <div className="col-span-4 lg:col-span-3 border-r border-[#e5e5e5]">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left py-5 px-5 flex items-center gap-4 transition-colors duration-200 ${
                  isActive ? 'bg-[#1a1a1a]/[0.03]' : 'hover:bg-[#1a1a1a]/[0.02]'
                }`}
              >
                {/* Node */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1a1a1a] text-[#FAFAF8]'
                    : 'border border-[#1a1a1a]/15 text-[#1a1a1a]/40'
                }`}>
                  <span className="font-sans text-[10px] font-semibold tracking-wide">
                    {stepNumbers[idx]}
                  </span>
                </div>

                {/* Title */}
                <span className={`font-serif text-[16px] transition-colors duration-200 ${
                  isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/50'
                }`}>
                  {cap.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Expanded detail */}
        <div className="col-span-8 lg:col-span-9 px-10 lg:px-16 py-6 flex items-center min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-sans text-[48px] lg:text-[64px] font-semibold text-[#1a1a1a]/[0.07] leading-none">
                  {stepNumbers[activeStep]}
                </span>
                <h3 className="font-serif text-[24px] lg:text-[28px] text-[#1a1a1a] leading-tight">
                  {CAPABILITIES[activeStep].title}
                </h3>
              </div>
              <p className="font-sans text-[15px] lg:text-[16px] text-[#525252] leading-relaxed font-light max-w-[36rem]">
                {CAPABILITIES[activeStep].description}
              </p>

              {/* Progress indicator */}
              <div className="flex gap-1.5 mt-8">
                {CAPABILITIES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      idx <= activeStep ? 'w-8 bg-[#1a1a1a]/30' : 'w-3 bg-[#1a1a1a]/10'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: Stacked accordion ── */}
      <div className="block md:hidden">
        {CAPABILITIES.map((cap, idx) => {
          const isActive = activeStep === idx;
          return (
            <div key={idx} className="border-b border-[#e5e5e5]/60">
              <button
                onClick={() => setActiveStep(idx)}
                className="w-full py-5 flex items-center gap-4 text-left"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1a1a1a] text-[#FAFAF8]'
                    : 'border border-[#1a1a1a]/15 text-[#1a1a1a]/40'
                }`}>
                  <span className="font-sans text-[10px] font-semibold tracking-wide">
                    {stepNumbers[idx]}
                  </span>
                </div>
                <span className={`font-serif text-[18px] transition-colors ${
                  isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/50'
                }`}>
                  {cap.title}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans text-[14px] text-[#737373] leading-relaxed font-light pb-6 pl-12">
                      {cap.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-10 italic">
        Interactive accordion. Desktop: list/detail split with animated transitions. Active node fills solid. Progress bar tracks position.
      </p>
    </div>
  );
};

export default ApproachAccordionFlow;
