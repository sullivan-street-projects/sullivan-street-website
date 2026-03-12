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

const SVG_W = 960;
const SVG_H = 360;

const CHART = {
  left: 64,
  right: 40,
  top: 28,
  bottom: 44,
};

const plotW = SVG_W - CHART.left - CHART.right;
const plotH = SVG_H - CHART.top - CHART.bottom;

const Y_MAX = 2400;
const Y_TICKS = [0, 500, 1000, 1500, 2000];
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

const SANS = "'Instrument Sans', system-ui, sans-serif";
const SERIF = "'Libre Baskerville', Georgia, serif";

const PAPER = '#FAFAF8';
const GRID_MINOR = 'rgba(255,255,255,0.08)';
const GRID_MAJOR = 'rgba(255,255,255,0.15)';
const LABEL_COLOR = 'rgba(255,255,255,0.4)';

const LINE_DRAW_DURATION = 2.8;
const TYPEWRITER_DELAY_MS = 35;
const TYPEWRITER_TEXT =
  '$2B+ in media managed across Apple, Google, JPMorgan Chase, and more.';

function xPos(year) {
  return CHART.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * plotW;
}

function yPos(value) {
  return CHART.top + plotH - (value / Y_MAX) * plotH;
}

function yLabel(v) {
  if (v === 0) return '$0';
  if (v >= 1000) return `$${v / 1000}B`;
  return `$${v}M`;
}

// Monotone cubic interpolation (Fritsch-Carlson)
function monotoneCubicPath(points) {
  const n = points.length;
  if (n < 2) return '';

  const slopes = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push(
      (points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x)
    );
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

// Pre-compute paths
const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
const linePath = monotoneCubicPath(points);

const baselineY = yPos(0);
const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(1)},${baselineY.toFixed(1)} L${points[0].x.toFixed(1)},${baselineY.toFixed(1)} Z`;

const lastPoint = DATA[DATA.length - 1];
const endX = xPos(lastPoint.year);
const endY = yPos(lastPoint.value);

// Determine which Y-ticks are major vs minor
const MAJOR_Y = new Set([0, 1000, 2000]);

function TypewriterCaption({ trigger, reducedMotion }) {
  const [displayedText, setDisplayedText] = useState(
    reducedMotion ? TYPEWRITER_TEXT : ''
  );
  const [cursorVisible, setCursorVisible] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion || !trigger) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setDisplayedText(TYPEWRITER_TEXT.slice(0, charIndex));
      if (charIndex >= TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        // Keep cursor blinking for a bit, then hide
        setTimeout(() => setCursorVisible(false), 2000);
      }
    }, TYPEWRITER_DELAY_MS);

    return () => clearInterval(interval);
  }, [trigger, reducedMotion]);

  if (reducedMotion) {
    return (
      <p
        style={{
          fontFamily: SERIF,
          fontStyle: 'italic',
          color: PAPER,
          fontSize: '1rem',
          lineHeight: 1.6,
          marginTop: '1.25rem',
          maxWidth: '640px',
        }}
      >
        {TYPEWRITER_TEXT}
      </p>
    );
  }

  return (
    <p
      style={{
        fontFamily: SERIF,
        fontStyle: 'italic',
        color: PAPER,
        fontSize: '1rem',
        lineHeight: 1.6,
        marginTop: '1.25rem',
        maxWidth: '640px',
        minHeight: '1.6em',
      }}
      aria-label={TYPEWRITER_TEXT}
    >
      {displayedText}
      {cursorVisible && (
        <motion.span
          style={{ display: 'inline-block', width: '2px', height: '1em', backgroundColor: PAPER, verticalAlign: 'text-bottom', marginLeft: '1px' }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </p>
  );
}

export default function ChartDarkInversion() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  // Track when line animation completes to trigger typewriter
  const [lineComplete, setLineComplete] = useState(reducedMotion);

  useEffect(() => {
    if (!shouldAnimate) return;

    // Line draws over LINE_DRAW_DURATION seconds once in view
    const timeout = setTimeout(() => {
      setLineComplete(true);
    }, LINE_DRAW_DURATION * 1000 + 200); // small buffer

    return () => clearTimeout(timeout);
  }, [shouldAnimate]);

  return (
    <section
      ref={containerRef}
      style={{ backgroundColor: '#1a1a1a' }}
      className="w-full py-20 md:py-28"
    >
      <div className="mx-auto max-w-[960px] px-6">
        {/* Chart */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          role="img"
          aria-label="Line chart showing $2B+ cumulative media managed from 2014 to 2026"
        >
          <defs>
            <linearGradient id="darkInvAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {Y_TICKS.map((tick) => (
            <line
              key={`hgrid-${tick}`}
              x1={CHART.left}
              x2={SVG_W - CHART.right}
              y1={yPos(tick)}
              y2={yPos(tick)}
              stroke={MAJOR_Y.has(tick) ? GRID_MAJOR : GRID_MINOR}
              strokeWidth={0.5}
            />
          ))}

          {/* Vertical grid lines */}
          {X_TICKS.map((year) => (
            <line
              key={`vgrid-${year}`}
              x1={xPos(year)}
              x2={xPos(year)}
              y1={CHART.top}
              y2={yPos(0)}
              stroke={year % 4 === 2 ? GRID_MAJOR : GRID_MINOR}
              strokeWidth={0.5}
            />
          ))}

          {/* Y-axis labels */}
          {Y_TICKS.map((tick) => (
            <text
              key={`ylabel-${tick}`}
              x={CHART.left - 12}
              y={yPos(tick) + 4}
              textAnchor="end"
              fontFamily={SANS}
              fontSize={12}
              fill={LABEL_COLOR}
            >
              {yLabel(tick)}
            </text>
          ))}

          {/* X-axis labels */}
          {X_TICKS.map((year) => (
            <text
              key={`xlabel-${year}`}
              x={xPos(year)}
              y={SVG_H - 8}
              textAnchor="middle"
              fontFamily={SANS}
              fontSize={12}
              fill={LABEL_COLOR}
            >
              {year}
            </text>
          ))}

          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#darkInvAreaGradient)"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={
              shouldAnimate
                ? { opacity: 1 }
                : reducedMotion
                  ? { opacity: 1 }
                  : undefined
            }
            transition={{
              duration: 0.8,
              delay: reducedMotion ? 0 : LINE_DRAW_DURATION * 0.5,
              ease: 'easeOut',
            }}
          />

          {/* Data line — paper white on dark */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={PAPER}
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
            transition={{
              duration: LINE_DRAW_DURATION,
              ease: [0.32, 0, 0.67, 1],
            }}
          />

          {/* Endpoint dot */}
          <motion.circle
            cx={endX}
            cy={endY}
            r={4}
            fill={PAPER}
            initial={reducedMotion ? false : { opacity: 0, scale: 0 }}
            animate={
              shouldAnimate
                ? { opacity: 1, scale: 1 }
                : reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : undefined
            }
            transition={{
              duration: 0.4,
              delay: reducedMotion ? 0 : LINE_DRAW_DURATION,
            }}
          />
        </svg>

        {/* Typewriter caption — appears after line animation */}
        <TypewriterCaption
          trigger={lineComplete}
          reducedMotion={reducedMotion}
        />
      </div>
    </section>
  );
}
