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

// Chart layout
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

const SERIF = "'Libre Baskerville', Georgia, serif";
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
const REVEAL_DELAY = LINE_DURATION + 0.15;
const TYPEWRITER_DELAY = REVEAL_DELAY + 0.6;
const TYPEWRITER_TEXT = '$2B+ in media managed across Apple, Google, JPMorgan Chase, and more.';

// Build grid lines (computed once)
function buildGridLines() {
  const hLines = [];
  for (const tick of Y_TICKS) {
    hLines.push({ y: yPos(tick), major: true });
  }
  // Add subdivisions between major ticks
  const allY = [0, 500, 1000, 1500, 2000, Y_MAX];
  for (let i = 0; i < allY.length - 1; i++) {
    const step = (allY[i + 1] - allY[i]) / 5;
    for (let s = 1; s < 5; s++) {
      hLines.push({ y: yPos(allY[i] + step * s), major: false });
    }
  }

  const vLines = [];
  for (let i = 0; i < X_TICKS.length - 1; i++) {
    vLines.push({ x: xPos(X_TICKS[i]), major: true });
    // Subdivide every year between ticks
    const gap = X_TICKS[i + 1] - X_TICKS[i];
    for (let s = 1; s < gap; s++) {
      vLines.push({ x: xPos(X_TICKS[i] + s), major: false });
    }
  }
  vLines.push({ x: xPos(X_TICKS[X_TICKS.length - 1]), major: true });

  return { hLines, vLines };
}

const { hLines, vLines } = buildGridLines();

export default function ChartBigReveal() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  // Big number reveal state
  const [numberRevealed, setNumberRevealed] = useState(false);

  // Typewriter state
  const [typeIndex, setTypeIndex] = useState(0);
  const [typeActive, setTypeActive] = useState(false);

  // Trigger big number reveal after line draw
  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = setTimeout(() => setNumberRevealed(true), REVEAL_DELAY * 1000);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  // Trigger typewriter after number reveal
  useEffect(() => {
    if (reducedMotion || !inView) return;
    const timer = setTimeout(() => setTypeActive(true), TYPEWRITER_DELAY * 1000);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  // Typewriter tick
  useEffect(() => {
    if (!typeActive || reducedMotion) return;
    if (typeIndex < TYPEWRITER_TEXT.length) {
      const timeout = setTimeout(() => setTypeIndex((prev) => prev + 1), 35);
      return () => clearTimeout(timeout);
    }
  }, [typeIndex, typeActive, reducedMotion]);

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
            <linearGradient id="bigRevealAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.005" />
            </linearGradient>
          </defs>

          {/* Full background grid — edge-to-edge, anchored to axis ticks */}
          {hLines.map((g, i) => (
            <line
              key={`hg-${i}`}
              x1={0}
              x2={SVG_W}
              y1={g.y}
              y2={g.y}
              stroke="#e5e5e5"
              strokeWidth={g.major ? 0.75 : 0.35}
            />
          ))}
          {vLines.map((g, i) => (
            <line
              key={`vg-${i}`}
              x1={g.x}
              x2={g.x}
              y1={0}
              y2={SVG_H}
              stroke="#e5e5e5"
              strokeWidth={g.major ? 0.75 : 0.35}
            />
          ))}

          {/* Y-axis labels */}
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

          {/* X-axis labels */}
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

          {/* Area fill — fades in as line draws */}
          <motion.path
            d={areaPath}
            fill="url(#bigRevealAreaGrad)"
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

          {/* Endpoint dot */}
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

        {/* THE BIG REVEAL — "$2B+" scales up massive over the chart */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {reducedMotion ? (
            <span
              style={{
                fontFamily: SERIF,
                fontSize: '140px',
                fontWeight: 700,
                lineHeight: 1,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
              }}
            >
              $2B+
            </span>
          ) : (
            <motion.span
              style={{
                fontFamily: SERIF,
                fontSize: '140px',
                fontWeight: 700,
                lineHeight: 1,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
                display: 'inline-block',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                numberRevealed
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 16,
                mass: 1,
              }}
            >
              $2B+
            </motion.span>
          )}
        </div>
      </div>

      {/* Typewriter caption — contextualizes the big number */}
      <div className="mt-6 border-t border-divider pt-4 min-h-[2rem]">
        {reducedMotion ? (
          <p
            style={{ fontFamily: SERIF }}
            className="text-body text-charcoal italic"
          >
            {TYPEWRITER_TEXT}
          </p>
        ) : (
          <p
            style={{ fontFamily: SERIF }}
            className="text-body text-charcoal italic relative"
          >
            {/* Invisible spacer to reserve layout height */}
            <span className="opacity-0 pointer-events-none select-none">
              {TYPEWRITER_TEXT}
              <span className="inline-block w-[2px] ml-1" />
            </span>
            {/* Visible typewriter text */}
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
