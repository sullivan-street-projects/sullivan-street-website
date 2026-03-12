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

const CAPTION_TEXT =
  'Cumulative spend across Publicis Groupe, Google, Navan, and SSP clients.';

// Chart dimensions — taller ratio for column layout
const CHART = {
  left: 56,
  right: 24,
  top: 24,
  bottom: 40,
  width: 480,
  height: 320,
};

const plotW = CHART.width - CHART.left - CHART.right;
const plotH = CHART.height - CHART.top - CHART.bottom;

const Y_MAX = 2400;
const Y_TICKS = [0, 500, 1000, 1500, 2000];
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

function xPos(year) {
  return CHART.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * plotW;
}

function yPos(value) {
  return CHART.top + plotH - (value / Y_MAX) * plotH;
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

const SANS = "'Instrument Sans', system-ui, sans-serif";
const SERIF = "'Libre Baskerville', Georgia, serif";

const yLabel = (v) => {
  if (v === 0) return '$0';
  if (v >= 1000) return `$${v / 1000}B`;
  return `$${v}M`;
};

// Typewriter component
function Typewriter({ text, delayMs = 35, startDelay = 800, active }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      setShowCursor(false);
      return;
    }

    setDisplayed('');
    setShowCursor(true);

    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          // Keep cursor blinking for a moment, then hide
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, delayMs);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [active, text, delayMs, startDelay]);

  // Cursor blink
  const [cursorVisible, setCursorVisible] = useState(true);
  useEffect(() => {
    if (!showCursor) return;
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, [showCursor]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{ opacity: cursorVisible ? 1 : 0 }}
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
}

export default function ChartSplitComposition() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="mx-auto max-w-[960px] px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column — stat + typewriter */}
        <div>
          {/* $2B+ hero number */}
          <motion.p
            style={{
              fontFamily: SERIF,
              color: '#1a1a1a',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
            className="text-[64px] md:text-[80px] lg:text-[96px] font-normal"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={
              shouldAnimate
                ? { opacity: 1, scale: 1 }
                : reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : undefined
            }
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            $2B+
          </motion.p>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: SANS,
              color: '#525252',
              fontStyle: 'italic',
            }}
            className="mt-3 text-base"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={
              shouldAnimate
                ? { opacity: 1 }
                : reducedMotion
                  ? { opacity: 1 }
                  : undefined
            }
            transition={{ duration: 0.6, delay: reducedMotion ? 0 : 0.4 }}
          >
            in managed media
          </motion.p>

          {/* Divider */}
          <motion.div
            style={{ backgroundColor: '#e5e5e5' }}
            className="mt-6 mb-6 h-px"
            initial={reducedMotion ? false : { scaleX: 0, originX: 0 }}
            animate={
              shouldAnimate
                ? { scaleX: 1 }
                : reducedMotion
                  ? { scaleX: 1 }
                  : undefined
            }
            transition={{
              duration: 0.8,
              delay: reducedMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          {/* Typewriter caption */}
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              color: '#525252',
              lineHeight: 1.7,
            }}
            className="text-sm lg:text-[15px]"
          >
            <Typewriter
              text={CAPTION_TEXT}
              delayMs={35}
              startDelay={reducedMotion ? 0 : 1000}
              active={shouldAnimate}
            />
          </p>
        </div>

        {/* Right column — chart */}
        <div>
          <svg
            viewBox={`0 0 ${CHART.width} ${CHART.height}`}
            className="w-full"
            role="img"
            aria-label="Line chart showing $2B+ cumulative career media spend from 2014 to 2026"
          >
            <defs>
              <linearGradient
                id="chartSplitAreaGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal grid lines */}
            {Y_TICKS.map((tick) => (
              <line
                key={`hgrid-${tick}`}
                x1={CHART.left}
                x2={CHART.width - CHART.right}
                y1={yPos(tick)}
                y2={yPos(tick)}
                stroke="#e5e5e5"
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
                stroke="#e5e5e5"
                strokeWidth={0.5}
              />
            ))}

            {/* Y-axis labels */}
            {Y_TICKS.map((tick) => (
              <text
                key={`ylabel-${tick}`}
                x={CHART.left - 10}
                y={yPos(tick) + 3.5}
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
                key={`xlabel-${year}`}
                x={xPos(year)}
                y={CHART.height - 8}
                textAnchor="middle"
                fontFamily={SANS}
                fontSize={11}
                fill="#999999"
              >
                {year}
              </text>
            ))}

            {/* Area fill */}
            <motion.path
              d={areaPath}
              fill="url(#chartSplitAreaGradient)"
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
                delay: reducedMotion ? 0 : 2.8,
                ease: 'easeOut',
              }}
            />

            {/* Data line — draws via pathLength */}
            <motion.path
              d={linePath}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={2}
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
              transition={{ duration: 2.8, ease: [0.32, 0, 0.67, 1] }}
            />

            {/* Endpoint dot */}
            <motion.circle
              cx={endX}
              cy={endY}
              r={3.5}
              fill="#1a1a1a"
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
                delay: reducedMotion ? 0 : 2.8,
                ease: 'easeOut',
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
