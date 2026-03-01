import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { CAPABILITIES } from '../../constants';

/** Walk up the DOM to find the nearest overflow-scroll/auto ancestor */
const findScrollParent = (el) => {
  let node = el?.parentElement;
  while (node) {
    if (/(auto|scroll)/.test(getComputedStyle(node).overflowY)) return node;
    node = node.parentElement;
  }
  return null;
};

const ProcessStep = ({ cap, index, total, progress }) => {
  // Each step peaks at an evenly spaced point across 0→1 scroll progress
  // Step 0 at 0, step 3 at 1 — so first step is fully active on arrival
  const center = index / (total - 1);
  const hw = 0.2;

  const activity = useTransform(progress, [center - hw, center, center + hw], [0, 1, 0]);
  const scale = useTransform(activity, [0, 1], [0.88, 1]);
  const opacity = useTransform(activity, [0, 0.3, 1], [0.12, 0.2, 1]);
  const blur = useTransform(activity, [0, 0.4, 1], [2.5, 0, 0]);
  const filterStr = useTransform(blur, (v) => `blur(${v}px)`);
  const descHeight = useTransform(activity, [0, 0.4, 1], [0, 0, 160]);
  const descOpacity = useTransform(activity, [0, 0.5, 1], [0, 0, 1]);

  return (
    <motion.div className="origin-left" style={{ opacity, filter: filterStr }}>
      <motion.div className="origin-left py-2 md:py-3" style={{ scale }}>
        <h3
          className="font-serif text-[#1a1a1a] leading-[1.1]"
          style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}
        >
          {cap.title}
        </h3>
      </motion.div>

      <motion.div className="overflow-hidden" style={{ height: descHeight, opacity: descOpacity }}>
        <p className="font-sans text-[15px] md:text-[16px] text-[#525252] leading-[1.7] font-light max-w-[36rem] pt-1 pb-4">
          {cap.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const ApproachFocus = () => {
  const wrapperRef = useRef(null);
  const progress = useMotionValue(0);
  const [activeStep, setActiveStep] = useState(1);

  // Manual scroll tracking — works in any scroll context (window or overflow container)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const scrollParent = findScrollParent(el);
    if (!scrollParent) return;

    const onScroll = () => {
      const elRect = el.getBoundingClientRect();
      const parentRect = scrollParent.getBoundingClientRect();
      const scrolled = parentRect.top - elRect.top;
      const range = el.offsetHeight - scrollParent.clientHeight;
      if (range <= 0) return;

      const p = Math.max(0, Math.min(1, scrolled / range));
      progress.set(p);

      const step = p < 0.2 ? 1 : p < 0.45 ? 2 : p < 0.75 ? 3 : 4;
      setActiveStep(step);
    };

    scrollParent.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => scrollParent.removeEventListener('scroll', onScroll);
  }, [progress]);

  const counterOpacity = useTransform(progress, [0, 0.03], [0, 1]);

  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        APPROACH — Scroll-driven focus
      </p>

      <div ref={wrapperRef} className="relative" style={{ height: '300vh' }}>
        <div className="sticky" style={{ top: '15vh' }}>
          {/* Section label + step counter */}
          <div className="flex items-baseline justify-between mb-8 md:mb-12">
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] uppercase text-[#737373]">
              Approach
            </span>
            <motion.span
              className="font-sans text-[11px] tracking-[0.2em] text-[#999] tabular-nums"
              style={{ opacity: counterOpacity }}
            >
              {activeStep} / {CAPABILITIES.length}
            </motion.span>
          </div>

          {/* Process steps */}
          {CAPABILITIES.map((cap, idx) => (
            <ProcessStep
              key={idx}
              cap={cap}
              index={idx}
              total={CAPABILITIES.length}
              progress={progress}
            />
          ))}
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] italic">
        Scroll spotlight. Each step scales up and reveals its description as you scroll. Inactive steps fade and blur.
      </p>
    </div>
  );
};

export default ApproachFocus;
