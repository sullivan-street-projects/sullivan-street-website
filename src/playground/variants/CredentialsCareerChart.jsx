import { useRef } from 'react';
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

// Career milestones — annotated along the line
const MILESTONES = [
  { year: 2014, label: 'Publicis Groupe' },
  { year: 2019, label: 'Google' },
  { year: 2022, label: 'Navan' },
  { year: 2024, label: 'SSP' },
];

const CHART = {
  left: 56,
  right: 90,
  top: 32,
  bottom: 40,
  width: 600,
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

// Monotone cubic interpolation (Fritsch-Carlson) for smooth editorial curves
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

// Plot points
const points = DATA.map((d) => ({ x: xPos(d.year), y: yPos(d.value) }));
const linePath = monotoneCubicPath(points);

// Area path — close the curve down to baseline
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

// Interpolate value at a given year from DATA
function valueAtYear(year) {
  for (let i = 0; i < DATA.length - 1; i++) {
    if (DATA[i].year <= year && DATA[i + 1].year >= year) {
      const t = (year - DATA[i].year) / (DATA[i + 1].year - DATA[i].year);
      return DATA[i].value + t * (DATA[i + 1].value - DATA[i].value);
    }
  }
  return DATA[DATA.length - 1].value;
}

export default function CredentialsCareerChart() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="mx-auto max-w-[640px] px-4 py-12">
      {/* Section label */}
      <p className="mb-2 font-sans text-section-label uppercase tracking-widest text-label">
        Career Media Managed
      </p>
      <p className="mb-8 font-serif text-body-sm text-charcoal">
        Cumulative media under management, 2014–2026
      </p>

      {/* Chart */}
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="w-full"
        role="img"
        aria-label="Line chart showing $2B+ cumulative career media spend from 2014 to 2026"
      >
        <defs>
          {/* Gradient area fill — editorial signature */}
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.09" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines — no vertical, no box border */}
        {Y_TICKS.map((tick) => (
          <line
            key={`grid-${tick}`}
            x1={CHART.left}
            x2={CHART.width - CHART.right}
            y1={yPos(tick)}
            y2={yPos(tick)}
            stroke={tick === 0 ? '#d4d4d4' : '#e5e5e5'}
            strokeWidth={tick === 0 ? 0.75 : 0.5}
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
            fill="#737373"
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
            fill="#737373"
          >
            {year}
          </text>
        ))}

        {/* Area fill — fades in after line draws */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: 1 }
              : reducedMotion
                ? { opacity: 1 }
                : undefined
          }
          transition={{ duration: 0.8, delay: reducedMotion ? 0 : 1.5, ease: 'easeOut' }}
        />

        {/* Smooth data line */}
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
          transition={{ duration: 2.5, ease: [0.32, 0, 0.67, 1] }}
        />

        {/* Milestone annotations — fade in as line passes */}
        {MILESTONES.map((m, i) => {
          const mx = xPos(m.year);
          const mv = valueAtYear(m.year);
          const my = yPos(mv);
          // Stagger delay based on position in timeline
          const progress = (m.year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN);
          const delay = reducedMotion ? 0 : progress * 2.5 + 0.2;

          return (
            <motion.g
              key={m.label}
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={
                shouldAnimate
                  ? { opacity: 1 }
                  : reducedMotion
                    ? { opacity: 1 }
                    : undefined
              }
              transition={{ duration: 0.3, delay }}
            >
              {/* Small tick below baseline */}
              <line
                x1={mx}
                x2={mx}
                y1={baselineY}
                y2={baselineY + 4}
                stroke="#999999"
                strokeWidth={0.5}
              />
              {/* Label below tick */}
              <text
                x={mx}
                y={baselineY + 15}
                textAnchor="middle"
                fontFamily={SANS}
                fontSize={9}
                fill="#999999"
              >
                {m.label}
              </text>
            </motion.g>
          );
        })}

        {/* Endpoint — open circle with halo */}
        <motion.circle
          cx={endX}
          cy={endY}
          r={5}
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={1.5}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={
            shouldAnimate
              ? { opacity: 1, scale: 1 }
              : reducedMotion
                ? { opacity: 1, scale: 1 }
                : undefined
          }
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 2.5 }}
        />
        <motion.circle
          cx={endX}
          cy={endY}
          r={2}
          fill="#1a1a1a"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: 1 }
              : reducedMotion
                ? { opacity: 1 }
                : undefined
          }
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 2.5 }}
        />

        {/* Right-side annotation with leader line */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: 1 }
              : reducedMotion
                ? { opacity: 1 }
                : undefined
          }
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 2.6 }}
        >
          <line
            x1={endX + 8}
            y1={endY}
            x2={endX + 24}
            y2={endY}
            stroke="#999999"
            strokeWidth={0.5}
          />
          <text
            x={endX + 28}
            y={endY + 1}
            fontFamily={SERIF}
            fontWeight={700}
            fontSize={16}
            fill="#1a1a1a"
            textAnchor="start"
            dominantBaseline="middle"
          >
            $2B+
          </text>
          <text
            x={endX + 28}
            y={endY + 15}
            fontFamily={SANS}
            fontStyle="italic"
            fontSize={9}
            fill="#737373"
            textAnchor="start"
          >
            in managed media
          </text>
        </motion.g>
      </svg>

      {/* Left-aligned caption with rule */}
      <div className="border-t border-divider mt-4 pt-3">
        <p className="font-sans text-caption italic text-faint">
          Cumulative media spend across Publicis Groupe, Google, Navan, and SSP clients
        </p>
      </div>
    </div>
  );
}
