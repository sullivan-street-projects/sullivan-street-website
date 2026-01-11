import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIERS, FEATURES } from '../../constants';

const renderCell = (value) => {
  if (value === true) return <span className="text-[#1a1a1a] text-lg">●</span>;
  if (value === false) return <span className="text-[#a3a3a3] text-lg">−</span>;
  return <span className="text-[#1a1a1a] font-medium">{value}</span>;
};

const ServicesAccordionSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        U: COLLAPSED SUMMARY — Compact card expands to full table
      </p>

      <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
        {/* Collapsed Summary View */}
        <AnimatePresence initial={false} mode="wait">
          {!isExpanded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleExpand}
              className="w-full py-10 px-8 text-left hover:bg-[#fafafa] transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1a1a1a] mb-3">
                    Three Service Tiers
                  </h3>
                  <div className="flex gap-6">
                    {TIERS.map((tier) => (
                      <div key={tier.id} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/40" />
                        <span className="font-sans text-[14px] text-[#525252]">
                          {tier.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#737373] group-hover:text-[#1a1a1a] transition-colors">
                  <span className="font-sans text-[13px] font-medium">
                    Compare services
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Full Table */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {/* Header Row */}
              <div className="bg-[#FAFAF8] border-b border-[#e5e5e5]">
                <div className="grid grid-cols-4 gap-4 py-4 px-6">
                  <div>
                    <span className="font-serif text-lg text-[#1a1a1a]">Service</span>
                  </div>
                  <div className="text-center">
                    <span className="font-serif text-lg text-[#1a1a1a]">Management</span>
                  </div>
                  <div className="text-center">
                    <span className="font-serif text-lg text-[#1a1a1a]">Strategy</span>
                  </div>
                  <div className="text-center">
                    <span className="font-serif text-lg text-[#1a1a1a]">Advisory</span>
                  </div>
                </div>
              </div>

              {/* Tier Descriptions Row */}
              <div className="grid grid-cols-4 gap-4 py-6 px-6 border-b border-[#e5e5e5]">
                <div></div>
                {TIERS.map((tier) => (
                  <div key={tier.id} className="text-center">
                    <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-3">
                      {tier.subtitle}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-[#404040] font-light">
                      {tier.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {FEATURES.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-4 gap-4 py-5 px-6 items-start hover:bg-[#fafafa] transition-colors ${
                    index < FEATURES.length - 1 ? 'border-b border-[#e5e5e5]' : ''
                  }`}
                >
                  <div>
                    <p className="font-sans text-[15px] font-medium text-[#1a1a1a] mb-1">
                      {feature.name}
                    </p>
                    <p className="font-sans text-[13px] leading-relaxed text-[#525252] font-light">
                      {feature.description}
                    </p>
                  </div>
                  <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
                    {renderCell(feature.management)}
                  </div>
                  <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
                    {renderCell(feature.strategy)}
                  </div>
                  <div className="pt-1 text-center font-sans text-[13px] text-[#737373]">
                    {renderCell(feature.advisory)}
                  </div>
                </div>
              ))}

              {/* Collapse Button */}
              <button
                onClick={toggleExpand}
                className="w-full py-4 px-6 flex items-center justify-center gap-2 bg-[#FAFAF8] border-t border-[#e5e5e5] hover:bg-[#f5f5f5] transition-colors group"
              >
                <span className="font-sans text-[13px] font-medium text-[#525252] group-hover:text-[#1a1a1a] transition-colors">
                  Collapse
                </span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#737373] group-hover:text-[#1a1a1a] transition-colors"
                  animate={{ rotate: 180 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Compact summary card. Click to reveal full {FEATURES.length}-row comparison table.
      </p>
    </div>
  );
};

export default ServicesAccordionSummary;
