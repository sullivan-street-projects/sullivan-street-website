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

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

const Y_TICKS = [
  { value: 0, label: '$0' },
  { value: 1000, label: '$1B' },
  { value: 2000, label: '$2B' },
];

// Desktop config
const DESKTOP = {
  w: 960, h: 320,
  margin: { top: 24, right: 48, bottom: 36, left: 44 },
  xTicks: [2014, 2016, 2018, 2020, 2022, 2024, 2026],
  milestones: [
    { year: 2018, value: 650, label: '$0.5B' },
    { year: 2020, value: 1100, label: '$1B' },
    { year: 2022, value: 1600, label: '$1.5B' },
    { year: 2026, value: 2150, label: '$2.1B' },
  ],
  fontSize: { axis: 11, milestone: 12 },
  stroke: 2.5,
  dot: { r: 4, ring: 7 },
  gridStroke: 0.5,
};

// Mobile config — fewer labels, larger text, taller aspect
const MOBILE = {
  w: 480, h: 300,
  margin: { top: 32, right: 20, bottom: 44, left: 52 },
  xTicks: [2014, 2020, 2026],
  milestones: [
    { year: 2018, value: 650, label: '$0.5B' },
    { year: 2026, value: 2150, label: '$2.1B' },
  ],
  fontSize: { axis: 18, milestone: 20 },
  stroke: 3.5,
  dot: { r: 6, ring: 10 },
  gridStroke: 0.8,
};

function makeHelpers(cfg) {
  const plotW = cfg.w - cfg.margin.left - cfg.margin.right;
  const plotH = cfg.h - cfg.margin.top - cfg.margin.bottom;
  const xPos = (year) => cfg.margin.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * plotW;
  const yPos = (value) => cfg.margin.top + plotH - (value / Y_MAX) * plotH;
  return { plotW, plotH, xPos, yPos };
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

function buildChart(cfg) {
  const { xPos, yPos } = makeHelpers(cfg);
  const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
  return { path: monotoneCubicPath(points), xPos, yPos };
}

const desktopChart = buildChart(DESKTOP);
const mobileChart = buildChart(MOBILE);

const LINE_DURATION = 2.8;
const TYPEWRITER_TEXT = '$2B+ in media managed across Fortune 500 brands and venture-backed startups.';
const START_DELAY = 600;

function milestoneDelay(year) {
  const progress = (year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
  return progress * LINE_DURATION;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function CredentialsChart() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const shouldAnimate = ready && !reducedMotion;

  const cfg = isMobile ? MOBILE : DESKTOP;
  const chart = isMobile ? mobileChart : desktopChart;

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
          viewBox={`0 0 ${cfg.w} ${cfg.h}`}
          className="w-full"
          role="img"
          aria-label="Line chart showing cumulative media spend growing from $0 to over $2.1 billion between 2014 and 2026"
        >
          {/* Horizontal gridlines */}
          {Y_TICKS.map(({ value }, i) => (
            <line
              key={`grid-${i}`}
              x1={cfg.margin.left}
              x2={cfg.w - cfg.margin.right}
              y1={chart.yPos(value)}
              y2={chart.yPos(value)}
              stroke="#e5e5e5"
              strokeWidth={cfg.gridStroke}
            />
          ))}

          {/* Y-axis labels */}
          {Y_TICKS.map(({ value, label }, i) => (
            <text
              key={`yl-${i}`}
              x={cfg.margin.left - 10}
              y={chart.yPos(value) + (isMobile ? 6 : 4)}
              textAnchor="end"
              className="font-sans"
              fontSize={cfg.fontSize.axis}
              fill="#999999"
            >
              {label}
            </text>
          ))}

          {/* X-axis labels */}
          {cfg.xTicks.map((year) => (
            <text
              key={`xl-${year}`}
              x={chart.xPos(year)}
              y={cfg.h - (isMobile ? 10 : 6)}
              textAnchor="middle"
              className="font-sans"
              fontSize={cfg.fontSize.axis}
              fill="#999999"
            >
              {year}
            </text>
          ))}

          {/* Data line */}
          <motion.path
            d={chart.path}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={cfg.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : reducedMotion ? { pathLength: 1 } : undefined}
            transition={{ duration: LINE_DURATION, ease: [0.32, 0, 0.67, 1] }}
          />

          {/* Milestone dots + labels */}
          {cfg.milestones.map((m) => {
            const cx = chart.xPos(m.year);
            const cy = chart.yPos(m.value);
            const delay = reducedMotion ? 0 : milestoneDelay(m.year);

            return (
              <motion.g
                key={m.year}
                initial={reducedMotion ? false : { opacity: 0 }}
                animate={shouldAnimate ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : undefined}
                transition={{ duration: 0.35, delay }}
              >
                <circle cx={cx} cy={cy} r={cfg.dot.r} fill="#1a1a1a" />
                <circle cx={cx} cy={cy} r={cfg.dot.ring} fill="none" stroke="#1a1a1a" strokeWidth={1} opacity={0.25} />
                <text
                  x={cx}
                  y={cy - (isMobile ? 18 : 14)}
                  textAnchor="middle"
                  className="font-sans"
                  fontWeight={600}
                  fontSize={cfg.fontSize.milestone}
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
