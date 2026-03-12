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
const MARGIN = { top: 16, right: 60, bottom: 36, left: 52 };
const SVG_W = 960;
const SVG_H = 320;
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
  return `$${(v / 1000).toFixed(1).replace(/\.0$/, '')}B`;
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
const TYPEWRITER_TEXT = 'across Fortune 500 brands and venture-backed startups.';

export default function ChartWSJBigReveal() {
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

  // Reduced motion: show everything immediately
  if (reducedMotion) {
    return (
      <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-4">
          <h3
            style={{ fontFamily: SERIF }}
            className="text-base italic text-charcoal"
          >
            Cumulative Media Under Management
          </h3>
          <p
            style={{ fontFamily: SANS }}
            className="text-xs text-muted mt-0.5 tracking-wide uppercase"
          >
            billions
          </p>
        </div>

        <div className="relative">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full"
            role="img"
            aria-label="Line chart showing $2.1B cumulative media under management from 2014 to 2026"
          >
            <defs>
              <linearGradient id="wsjAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Horizontal gridlines only */}
            {Y_TICKS.map((tick) => (
              <line
                key={`hg-${tick}`}
                x1={MARGIN.left}
                x2={SVG_W - MARGIN.right}
                y1={yPos(tick)}
                y2={yPos(tick)}
                stroke="#e5e5e5"
                strokeWidth={0.75}
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

            {/* Area fill */}
            <path d={areaPath} fill="url(#wsjAreaGrad)" />

            {/* Data line */}
            <path
              d={linePath}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Endpoint dot */}
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={3.5}
              fill="#1a1a1a"
            />

            {/* Direct end-of-line label */}
            <text
              x={points[points.length - 1].x + 10}
              y={points[points.length - 1].y + 4}
              fontFamily={SANS}
              fontSize={12}
              fontWeight={600}
              fill="#1a1a1a"
            >
              $2.1B
            </text>
          </svg>

          {/* Big number overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-paper/80 backdrop-blur-sm px-6 py-2 rounded">
              <span
                style={{
                  fontFamily: SERIF,
                  lineHeight: 1,
                  color: '#1a1a1a',
                  letterSpacing: '-0.03em',
                }}
                className="text-[120px] md:text-[200px] font-bold"
              >
                $2B+
              </span>
            </div>
          </div>
        </div>

        {/* Typewriter text */}
        <div className="mt-6 min-h-[2rem]">
          <p
            style={{ fontFamily: SANS }}
            className="text-body text-muted"
          >
            {TYPEWRITER_TEXT}
          </p>
        </div>

        {/* Source line */}
        <p
          style={{ fontFamily: SANS }}
          className="text-[10px] text-faint mt-3 tracking-wide uppercase"
        >
          Source: Internal campaign data, 2014–2026
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full max-w-[960px] mx-auto px-4 py-12">
      {/* Header — serif italic headline + sans subtitle */}
      <div className="mb-4">
        <h3
          style={{ fontFamily: SERIF }}
          className="text-base italic text-charcoal"
        >
          Cumulative Media Under Management
        </h3>
        <p
          style={{ fontFamily: SANS }}
          className="text-xs text-muted mt-0.5 tracking-wide uppercase"
        >
          billions
        </p>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="Line chart showing $2.1B cumulative media under management from 2014 to 2026"
        >
          <defs>
            <linearGradient id="wsjAreaGradAnim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal gridlines only — WSJ style, no vertical lines, no borders */}
          {Y_TICKS.map((tick) => (
            <line
              key={`hg-${tick}`}
              x1={MARGIN.left}
              x2={SVG_W - MARGIN.right}
              y1={yPos(tick)}
              y2={yPos(tick)}
              stroke="#e5e5e5"
              strokeWidth={0.75}
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
            fill="url(#wsjAreaGradAnim)"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.8, delay: LINE_DURATION * 0.6, ease: 'easeOut' }}
          />

          {/* Data line — draws on scroll, ~2px weight */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={shouldAnimate ? { pathLength: 1 } : undefined}
            transition={{ duration: LINE_DURATION, ease: [0.32, 0, 0.67, 1] }}
          />

          {/* Endpoint dot */}
          <motion.circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r={3.5}
            fill="#1a1a1a"
            initial={{ opacity: 0, scale: 0 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, delay: LINE_DURATION }}
          />

          {/* Direct end-of-line label "$2.1B" */}
          <motion.text
            x={points[points.length - 1].x + 10}
            y={points[points.length - 1].y + 4}
            fontFamily={SANS}
            fontSize={12}
            fontWeight={600}
            fill="#1a1a1a"
            initial={{ opacity: 0 }}
            animate={shouldAnimate ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, delay: LINE_DURATION + 0.1 }}
          >
            $2.1B
          </motion.text>
        </svg>

        {/* THE BIG REVEAL — "$2B+" springs up from scale 0 in the center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="bg-paper/80 backdrop-blur-sm px-6 py-2 rounded"
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
            <span
              style={{
                fontFamily: SERIF,
                lineHeight: 1,
                color: '#1a1a1a',
                letterSpacing: '-0.03em',
              }}
              className="text-[120px] md:text-[200px] font-bold inline-block"
            >
              $2B+
            </span>
          </motion.div>
        </div>
      </div>

      {/* Typewriter text below the chart */}
      <div className="mt-6 min-h-[2rem]">
        <p
          style={{ fontFamily: SANS }}
          className="text-body text-muted relative"
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
      </div>

      {/* Source line */}
      <p
        style={{ fontFamily: SANS }}
        className="text-[10px] text-faint mt-3 tracking-wide uppercase"
      >
        Source: Internal campaign data, 2014–2026
      </p>
    </div>
  );
}
