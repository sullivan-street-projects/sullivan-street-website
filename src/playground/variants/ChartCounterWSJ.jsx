import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const DATA = [
  { year: 2014, value: 0 },   { year: 2015, value: 80 },
  { year: 2016, value: 200 }, { year: 2017, value: 400 },
  { year: 2018, value: 650 }, { year: 2019, value: 900 },
  { year: 2020, value: 1100 },{ year: 2021, value: 1350 },
  { year: 2022, value: 1600 },{ year: 2023, value: 1800 },
  { year: 2024, value: 1950 },{ year: 2025, value: 2050 },
  { year: 2026, value: 2150 },
];

// Chart layout — WSJ style: no borders, horizontal grid only
const MARGIN = { top: 8, right: 16, bottom: 32, left: 40 };
const SVG_W = 960;
const SVG_H = 280;
const PLOT_W = SVG_W - MARGIN.left - MARGIN.right;
const PLOT_H = SVG_H - MARGIN.top - MARGIN.bottom;

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

// Simplified Y ticks — WSJ uses clean round numbers, units in title
const Y_TICKS = [0, 0.5, 1, 1.5, 2];
const Y_VALUES = [0, 500, 1000, 1500, 2000];
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

const SANS = "'Instrument Sans', system-ui, sans-serif";

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

const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
const linePath = monotoneCubicPath(points);
const baselineY = yPos(0);
const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baselineY.toFixed(1)} L${points[0].x.toFixed(1)},${baselineY.toFixed(1)} Z`;

const LINE_DURATION = 2.8;
const TYPEWRITER_TEXT = '$2B+ in media managed across Fortune 500 brands and venture-backed startups.';

function AnimatedCounter({ reducedMotion, inView }) {
  const springValue = useSpring(0, { stiffness: 30, damping: 20 });
  const display = useTransform(springValue, (v) => v.toFixed(1));
  const [current, setCurrent] = useState('0.0');

  useEffect(() => {
    if (reducedMotion) {
      springValue.jump(2);
      return;
    }
    if (inView) springValue.set(2);
  }, [inView, reducedMotion, springValue]);

  useEffect(() => {
    const unsub = display.on('change', (v) => setCurrent(v));
    return unsub;
  }, [display]);

  const formatted = current === '2.0' ? '2' : current;
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatted}</span>;
}

export default function ChartCounterWSJ() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();
  const shouldAnimate = inView && !reducedMotion;

  // Typewriter state
  const [typeIndex, setTypeIndex] = useState(0);
  const [typeActive, setTypeActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) { setTypeActive(true); setTypeIndex(TYPEWRITER_TEXT.length); return; }
    if (!inView) return;
    const timer = setTimeout(() => setTypeActive(true), LINE_DURATION * 1000 + 300);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  useEffect(() => {
    if (!typeActive || reducedMotion) return;
    if (typeIndex < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => setTypeIndex((p) => p + 1), 35);
      return () => clearTimeout(timeout);
    }
  }, [typeIndex, typeActive, reducedMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-6 py-16 md:py-24">
      {/* Claim — top-left, editorial hierarchy */}
      <div className="mb-2">
        <h2
          className="text-[72px] md:text-[100px] lg:text-[128px] leading-[0.85] tracking-tight text-charcoal"
          style={{ fontFamily: SANS, fontWeight: 600 }}
        >
          $<AnimatedCounter reducedMotion={reducedMotion} inView={inView} />B+
        </h2>
      </div>
      <p
        className="text-body-sm md:text-body text-muted mb-10 md:mb-14 max-w-md"
        style={{ fontFamily: SANS }}
      >
        Cumulative media under management, 2014–2026 (billions)
      </p>

      {/* Chart — WSJ style: horizontal grid only, no borders, data floats */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="Area chart showing cumulative media spend growing from $0 to over $2 billion between 2014 and 2026"
        >
          <defs>
            <linearGradient id="wsjAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines only — WSJ convention */}
          {Y_VALUES.map((val, i) => (
            <line
              key={`grid-${i}`}
              x1={MARGIN.left}
              x2={SVG_W - MARGIN.right}
              y1={yPos(val)}
              y2={yPos(val)}
              stroke="#d9d9d9"
              strokeWidth={0.5}
            />
          ))}

          {/* Y-axis labels — right-aligned to margin, no tick marks */}
          {Y_TICKS.map((label, i) => (
            <text
              key={`yl-${i}`}
              x={MARGIN.left - 8}
              y={yPos(Y_VALUES[i]) + 4}
              textAnchor="end"
              fontFamily={SANS}
              fontSize={11}
              fill="#999999"
            >
              ${label}
            </text>
          ))}

          {/* X-axis labels — clean, no tick marks */}
          {X_TICKS.map((year) => (
            <text
              key={`xl-${year}`}
              x={xPos(year)}
              y={SVG_H - 4}
              textAnchor="middle"
              fontFamily={SANS}
              fontSize={11}
              fill="#999999"
            >
              {year}
            </text>
          ))}

          {/* Area fill — subtle, ~15% opacity per WSJ */}
          <motion.path
            d={areaPath}
            fill="url(#wsjAreaGrad)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: reducedMotion ? 0 : LINE_DURATION * 0.5, ease: 'easeOut' }}
          />

          {/* Data line — ~2px per WSJ, smooth curve */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : reducedMotion ? { pathLength: 1 } : undefined}
            transition={{ duration: LINE_DURATION, ease: [0.32, 0, 0.67, 1] }}
          />

          {/* Direct end-of-line label — WSJ convention */}
          <motion.g
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : reducedMotion ? { opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: reducedMotion ? 0 : LINE_DURATION }}
          >
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={3.5}
              fill="#1a1a1a"
            />
            <text
              x={points[points.length - 1].x + 12}
              y={points[points.length - 1].y + 4}
              fontFamily={SANS}
              fontWeight={600}
              fontSize={13}
              fill="#1a1a1a"
            >
              $2.1B
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Typewriter caption — the payoff */}
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

      {/* Source line — WSJ convention: small, gray, bottom-left */}
      <p className="mt-3 font-sans text-caption text-faint">
        Source: Sullivan Street Projects
      </p>
    </div>
  );
}
