import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIERS, FEATURES } from '../../constants';

const VISIBLE_ROWS = 4;

const renderCell = (value) => {
  if (value === true) return <span className="text-[#1a1a1a] text-lg">●</span>;
  if (value === false) return <span className="text-[#a3a3a3] text-lg">−</span>;
  return <span className="text-[#1a1a1a] font-medium">{value}</span>;
};

const ServicesAccordionRows = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleFeatures = FEATURES.slice(0, VISIBLE_ROWS);
  const hiddenFeatures = FEATURES.slice(VISIBLE_ROWS);
  const hasMore = hiddenFeatures.length > 0;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        S: SERVICES ACCORDION — Show first {VISIBLE_ROWS} rows, expand for more
      </p>

      <div className="border border-[#e5e5e5] rounded-lg overflow-hidden">
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

        {/* Always Visible Feature Rows */}
        {visibleFeatures.map((feature, index) => (
          <div
            key={feature.name}
            className={`grid grid-cols-4 gap-4 py-5 px-6 items-start hover:bg-[#fafafa] transition-colors ${
              index < visibleFeatures.length - 1 || hasMore ? 'border-b border-[#e5e5e5]' : ''
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

        {/* Expandable Hidden Rows */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {hiddenFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-4 gap-4 py-5 px-6 items-start hover:bg-[#fafafa] transition-colors ${
                    index < hiddenFeatures.length - 1 ? 'border-b border-[#e5e5e5]' : ''
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand/Collapse Button */}
        {hasMore && (
          <button
            onClick={toggleExpand}
            className="w-full py-4 px-6 flex items-center justify-center gap-2 bg-[#FAFAF8] border-t border-[#e5e5e5] hover:bg-[#f5f5f5] transition-colors group"
          >
            <span className="font-sans text-[13px] font-medium text-[#525252] group-hover:text-[#1a1a1a] transition-colors">
              {isExpanded ? 'Show less' : `Show all ${FEATURES.length} services`}
            </span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-[#737373] group-hover:text-[#1a1a1a] transition-colors"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>
        )}
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-6 italic">
        Shows {VISIBLE_ROWS} rows initially, "{hiddenFeatures.length} more" button expands the rest.
      </p>
    </div>
  );
};

export default ServicesAccordionRows;
