import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

const DATA = [
  { year: 2014, value: 0 },   { year: 2015, value: 80 },
  { year: 2016, value: 200 }, { year: 2017, value: 400 },
  { year: 2018, value: 650 }, { year: 2019, value: 900 },
  { year: 2020, value: 1100 },{ year: 2021, value: 1350 },
  { year: 2022, value: 1600 },{ year: 2023, value: 1800 },
  { year: 2024, value: 1950 },{ year: 2025, value: 2050 },
  { year: 2026, value: 2150 },
];

const MILESTONES = [
  { year: 2018, value: 650, label: '$0.5B' },
  { year: 2020, value: 1100, label: '$1B' },
  { year: 2022, value: 1600, label: '$1.5B' },
  { year: 2026, value: 2150, label: '$2.1B' },
];

const MARGIN = { top: 24, right: 48, bottom: 36, left: 44 };
const SVG_W = 960;
const SVG_H = 320;
const PLOT_W = SVG_W - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_H - MARGIN.top - MARGIN.bottom;

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

const Y_TICKS = [
  { value: 0, label: '$0' },
  { value: 1000, label: '$1' },
  { value: 2000, label: '$2' },
];
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

function xPos(year) {
  return MARGIN.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * PLOT_W;
}

function yPos(value) {
  return MARGIN.top + PLOT_H - (value / Y_MAX) * PLOT_H;
}

// Fritsch-Carlson monotone cubic interpolation
function monotoneCubicPath(pts) {
  const n = pts.length;
  if (n < 2) return '';

  const slopes = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((pts[i + 1].y - pts[i].y) / (pts[i + 1].x - pts[i].x));
  }

  const tangents = [slopes[0]];
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) {
      tangents.push(0);
    } else {
      tangents.push(2 / (1 / slopes[i - 1] + 1 / slopes[i]));
    }
  }
  tangents.push(slopes[n - 2]);

  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (pts[i + 1].x - pts[i].x) / 3;
    const cp1x = pts[i].x + dx;
    const cp1y = pts[i].y + dx * tangents[i];
    const cp2x = pts[i + 1].x - dx;
    const cp2y = pts[i + 1].y - dx * tangents[i + 1];
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${pts[i + 1].x.toFixed(1)},${pts[i + 1].y.toFixed(1)}`;
  }
  return d;
}

const chartPoints = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
const linePath = monotoneCubicPath(chartPoints);

const LINE_DURATION = 2.8;
const TYPEWRITER_TEXT = '$2B+ in media managed across Fortune 500 brands and venture-backed startups.';

function milestoneDelay(year) {
  const progress = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
  return progress * LINE_DURATION;
}

const START_DELAY = 600; // ms to let user register the chart before animation

export default function CredentialsChart() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const shouldAnimate = ready && !reducedMotion;

  // Delay animation start so chart is visible before it begins drawing
  useEffect(() => {
    if (reducedMotion) { setReady(true); return; }
    if (!inView) return;
    const timer = setTimeout(() => setReady(true), START_DELAY);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  const [typeIndex, setTypeIndex] = useState(0);
  const [typeActive, setTypeActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) { setTypeActive(true); setTypeIndex(TYPEWRITER_TEXT.length); return; }
    if (!ready) return;
    const timer = setTimeout(() => setTypeActive(true), LINE_DURATION * 1000 + 300);
    return () => clearTimeout(timer);
  }, [ready, reducedMotion]);

  useEffect(() => {
    if (!typeActive || reducedMotion) return;
    if (typeIndex < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => setTypeIndex((p) => p + 1), 35);
      return () => clearTimeout(timeout);
    }
  }, [typeIndex, typeActive, reducedMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-site mx-auto px-6 lg:px-8 mt-8 md:mt-10 border-t border-divider pt-8 md:pt-10">
      <div className="relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="Line chart showing cumulative media spend growing from $0 to over $2.1 billion between 2014 and 2026"
        >
          {/* Horizontal gridlines only */}
          {Y_TICKS.map(({ value }, i) => (
            <line
              key={`grid-${i}`}
              x1={MARGIN.left}
              x2={SVG_W - MARGIN.right}
              y1={yPos(value)}
              y2={yPos(value)}
              stroke="#e5e5e5"
              strokeWidth={0.5}
            />
          ))}

          {/* Y-axis labels */}
          {Y_TICKS.map(({ value, label }, i) => (
            <text
              key={`yl-${i}`}
              x={MARGIN.left - 10}
              y={yPos(value) + 4}
              textAnchor="end"
              className="font-sans"
              fontSize={11}
              fill="#999999"
            >
              {label}
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((year) => (
            <text
              key={`xl-${year}`}
              x={xPos(year)}
              y={SVG_H - 6}
              textAnchor="middle"
              className="font-sans"
              fontSize={11}
              fill="#999999"
            >
              {year}
            </text>
          ))}

          {/* Data line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : reducedMotion ? { pathLength: 1 } : undefined}
            transition={{ duration: LINE_DURATION, ease: [0.32, 0, 0.67, 1] }}
          />

          {/* Milestone dots + direct labels */}
          {MILESTONES.map((m) => {
            const cx = xPos(m.year);
            const cy = yPos(m.value);
            const delay = reducedMotion ? 0 : milestoneDelay(m.year);

            return (
              <motion.g
                key={m.year}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={shouldAnimate ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : undefined}
                transition={{ duration: 0.35, delay }}
              >
                <circle cx={cx} cy={cy} r={4} fill="#1a1a1a" />
                <circle cx={cx} cy={cy} r={7} fill="none" stroke="#1a1a1a" strokeWidth={1} opacity={0.25} />
                <text
                  x={cx}
                  y={cy - 14}
                  textAnchor="middle"
                  className="font-sans"
                  fontWeight={600}
                  fontSize={12}
                  fill="#1a1a1a"
                >
                  {m.label}
                </text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Typewriter caption */}
      <div className="mt-6 border-t border-divider pt-4 min-h-[2rem]">
        {reducedMotion ? (
          <p className="font-sans text-body-sm text-muted italic">
            {TYPEWRITER_TEXT}
          </p>
        ) : (
          <p className="font-sans text-body-sm text-muted italic relative">
            <span className="opacity-0 pointer-events-none select-none">
              {TYPEWRITER_TEXT}
              <span className="inline-block w-[2px] ml-1" />
            </span>
            <span className="absolute top-0 left-0 w-full">
              <span>{TYPEWRITER_TEXT.slice(0, typeIndex)}</span>
              {typeActive && typeIndex < TYPEWRITER_TEXT.length && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-[2px] h-[0.85em] bg-charcoal ml-0.5 translate-y-[0.12em]"
                />
              )}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
