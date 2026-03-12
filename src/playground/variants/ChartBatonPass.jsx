import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const DATA = [
  { year: 2014, value: 0 },
  { year: 2015, value: 80 },
  { year: 2016, value: 200 },
  { year: 2017, value: 400 },
  { year: 2018, value: 650 },
  { year: 2019, value: 900 },
  { year: 2020, value: 1100 },
  { year: 2021, value: 1350 },
  { year: 2022, value: 1600 },
  { year: 2023, value: 1800 },
  { year: 2024, value: 1950 },
  { year: 2025, value: 2050 },
  { year: 2026, value: 2150 },
];

// Chart layout — margins for axis labels, grid extends to edges
const MARGIN = { top: 16, right: 16, bottom: 36, left: 52 };
const SVG_W = 960;
const SVG_H = 360;
const PLOT_W = SVG_W - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_H - MARGIN.top - MARGIN.bottom;

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

const Y_TICKS = [0, 500, 1000, 1500, 2000];
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

// Additional ambient grid subdivisions between ticks
const Y_SUBDIVS = 5; // lines between each Y tick
const X_SUBDIVS = 2; // lines between each X tick (every year)

const SANS = "'Instrument Sans', system-ui, sans-serif";

function xPos(year) {
  return MARGIN.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * PLOT_W;
}

function yPos(value) {
  return MARGIN.top + PLOT_H - (value / Y_MAX) * PLOT_H;
}

const yLabel = (v) => {
  if (v === 0) return '$0';
  if (v >= 1000) return `$${v / 1000}B`;
  return `$${v}M`;
};

// Monotone cubic interpolation (Fritsch-Carlson)
function monotoneCubicPath(points) {
  const n = points.length;
  if (n < 2) return '';

  const slopes = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
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

  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (points[i + 1].x - points[i].x) / 3;
    const cp1x = points[i].x + dx;
    const cp1y = points[i].y + dx * tangents[i];
    const cp2x = points[i + 1].x - dx;
    const cp2y = points[i + 1].y - dx * tangents[i + 1];
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${points[i + 1].x.toFixed(1)},${points[i + 1].y.toFixed(1)}`;
  }
  return d;
}

const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
const linePath = monotoneCubicPath(points);

const baselineY = yPos(0);
const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baselineY.toFixed(1)} L${points[0].x.toFixed(1)},${baselineY.toFixed(1)} Z`;

const LINE_DURATION = 2.8;
const TYPEWRITER_TEXT = '$2B+ in media managed across Apple, Google, JPMorgan Chase, and more.';

export default function ChartBatonPass() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  // Typewriter state — starts after line animation completes
  const [typeIndex, setTypeIndex] = useState(0);
  const [typeActive, setTypeActive] = useState(false);

  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = setTimeout(() => setTypeActive(true), LINE_DURATION * 1000 + 200);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  useEffect(() => {
    if (!typeActive || reducedMotion) return;
    if (typeIndex < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => setTypeIndex((prev) => prev + 1), 35);
      return () => clearTimeout(timeout);
    }
  }, [typeIndex, typeActive, reducedMotion]);

  // Build grid lines anchored to tick positions, extending edge-to-edge
  // Horizontal: lines at each Y_TICK value + subdivisions between them
  const hGridLines = [];
  const allYValues = [0, ...Y_TICKS, Y_MAX];
  const uniqueY = [...new Set(allYValues)].sort((a, b) => a - b);
  for (let i = 0; i < uniqueY.length - 1; i++) {
    hGridLines.push({ y: yPos(uniqueY[i]), major: Y_TICKS.includes(uniqueY[i]) });
    for (let s = 1; s < Y_SUBDIVS; s++) {
      const val = uniqueY[i] + ((uniqueY[i + 1] - uniqueY[i]) * s) / Y_SUBDIVS;
      hGridLines.push({ y: yPos(val), major: false });
    }
  }
  hGridLines.push({ y: yPos(uniqueY[uniqueY.length - 1]), major: Y_TICKS.includes(uniqueY[uniqueY.length - 1]) });

  // Vertical: lines at each X_TICK year + subdivisions between them
  const vGridLines = [];
  for (let i = 0; i < X_TICKS.length - 1; i++) {
    vGridLines.push({ x: xPos(X_TICKS[i]), major: true });
    for (let s = 1; s < X_SUBDIVS; s++) {
      const year = X_TICKS[i] + ((X_TICKS[i + 1] - X_TICKS[i]) * s) / X_SUBDIVS;
      vGridLines.push({ x: xPos(year), major: false });
    }
  }
  vGridLines.push({ x: xPos(X_TICKS[X_TICKS.length - 1]), major: true });

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4 py-12">
      <div className="relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="Line chart showing $2B+ cumulative career media spend from 2014 to 2026"
        >
          <defs>
            <linearGradient id="batonAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.005" />
            </linearGradient>
          </defs>

          {/* Full background grid — anchored to axis ticks, extends edge-to-edge */}
          {hGridLines.map((g, i) => (
            <line key={`hg-${i}`} x1={0} x2={SVG_W} y1={g.y} y2={g.y} stroke="#e5e5e5" strokeWidth={g.major ? 0.75 : 0.35} />
          ))}
          {vGridLines.map((g, i) => (
            <line key={`vg-${i}`} x1={g.x} x2={g.x} y1={0} y2={SVG_H} stroke="#e5e5e5" strokeWidth={g.major ? 0.75 : 0.35} />
          ))}

          {/* Y-axis labels — Revenue */}
          {Y_TICKS.map((tick) => (
            <text
              key={`yl-${tick}`}
              x={MARGIN.left - 10}
              y={yPos(tick) + 4}
              textAnchor="end"
              fontFamily={SANS}
              fontSize={11}
              fill="#999999"
            >
              {yLabel(tick)}
            </text>
          ))}

          {/* X-axis labels — Years */}
          {X_TICKS.map((year) => (
            <text
              key={`xl-${year}`}
              x={xPos(year)}
              y={MARGIN.top + PLOT_H + 24}
              textAnchor="middle"
              fontFamily={SANS}
              fontSize={11}
              fill="#999999"
            >
              {year}
            </text>
          ))}

          {/* Area fill — fades in after line draws */}
          <motion.path
            d={areaPath}
            fill="url(#batonAreaGrad)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={
              shouldAnimate
                ? { opacity: 1 }
                : reducedMotion
                  ? { opacity: 1 }
                  : undefined
            }
            transition={{ duration: 0.8, delay: reducedMotion ? 0 : LINE_DURATION * 0.6, ease: 'easeOut' }}
          />

          {/* Data line — draws on scroll */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={
              shouldAnimate
                ? { pathLength: 1 }
                : reducedMotion
                  ? { pathLength: 1 }
                  : undefined
            }
            transition={{ duration: LINE_DURATION, ease: [0.32, 0, 0.67, 1] }}
          />

          {/* Endpoint dot — appears as line finishes */}
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={4}
            fill="#1a1a1a"
            initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
            animate={
              shouldAnimate
                ? { opacity: 1, scale: 1 }
                : reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : undefined
            }
            transition={{ duration: 0.3, delay: reducedMotion ? 0 : LINE_DURATION }}
          />
        </svg>
      </div>

      {/* Typewriter caption — the "baton pass" */}
      <div className="mt-6 border-t border-divider pt-4 min-h-[2rem]">
        {reducedMotion ? (
          <p className="font-serif text-body text-charcoal italic">
            {TYPEWRITER_TEXT}
          </p>
        ) : (
          <p className="font-serif text-body text-charcoal italic relative">
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
