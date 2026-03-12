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

const CHART = {
  left: 20,
  right: 80,
  top: 40,
  bottom: 30,
  width: 560,
  height: 240,
};

const plotW = CHART.width - CHART.left - CHART.right;
const plotH = CHART.height - CHART.top - CHART.bottom;

const Y_MAX = 2400;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

function xPos(year) {
  return CHART.left + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * plotW;
}

function yPos(value) {
  return CHART.top + plotH - (value / Y_MAX) * plotH;
}

function monotoneCubicPath(points) {
  const n = points.length;
  if (n < 2) return '';
  const slopes = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((points[i + 1].y - points[i].y) / (points[i + 1].x - points[i].x));
  }
  const tangents = [slopes[0]];
  for (let i = 1; i < n - 1; i++) {
    if (slopes[i - 1] * slopes[i] <= 0) tangents.push(0);
    else tangents.push(2 / (1 / slopes[i - 1] + 1 / slopes[i]));
  }
  tangents.push(slopes[n - 2]);
  let d = `M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (points[i + 1].x - points[i].x) / 3;
    d += ` C${(points[i].x + dx).toFixed(1)},${(points[i].y + dx * tangents[i]).toFixed(1)} ${(points[i + 1].x - dx).toFixed(1)},${(points[i + 1].y - dx * tangents[i + 1]).toFixed(1)} ${points[i + 1].x.toFixed(1)},${points[i + 1].y.toFixed(1)}`;
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

export default function ChartMinimal() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();

  const shouldAnimate = inView && !reducedMotion;

  return (
    <div ref={containerRef} className="mx-auto max-w-[640px] px-4 py-12">
      {/* Chart */}
      <svg
        viewBox={`0 0 ${CHART.width} ${CHART.height}`}
        className="w-full"
        role="img"
        aria-label="Line chart showing $2B+ cumulative career media spend from 2014 to 2026"
      >
        <defs>
          <linearGradient id="areaGradientMinimal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area fill — fades in after line draws */}
        <motion.path
          d={areaPath}
          fill="url(#areaGradientMinimal)"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: 1 }
              : reducedMotion
                ? { opacity: 1 }
                : undefined
          }
          transition={{ duration: 0.8, delay: reducedMotion ? 0 : 2.0, ease: 'easeOut' }}
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

        {/* Endpoint dot */}
        <motion.circle
          cx={endX}
          cy={endY}
          r={3}
          fill="#1a1a1a"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
          animate={
            shouldAnimate
              ? { opacity: 1, scale: 1 }
              : reducedMotion
                ? { opacity: 1, scale: 1 }
                : undefined
          }
          transition={{ duration: 0.4, delay: reducedMotion ? 0 : 2.5 }}
        />

        {/* Leader line + number annotation */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={
            shouldAnimate
              ? { opacity: 1 }
              : reducedMotion
                ? { opacity: 1 }
                : undefined
          }
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : 2.7 }}
        >
          {/* Small leader line from endpoint to label */}
          <line
            x1={endX + 6}
            y1={endY}
            x2={endX + 18}
            y2={endY}
            stroke="#999999"
            strokeWidth={0.5}
          />
          {/* Hero number */}
          <text
            x={endX + 22}
            y={endY + 1}
            fontFamily={SERIF}
            fontWeight={700}
            fontSize={24}
            fill="#1a1a1a"
            textAnchor="start"
            dominantBaseline="middle"
          >
            $2B+
          </text>
          {/* Subtitle */}
          <text
            x={endX + 22}
            y={endY + 18}
            fontFamily={SANS}
            fontStyle="italic"
            fontSize={10}
            fill="#737373"
            textAnchor="start"
          >
            in managed media
          </text>
        </motion.g>
      </svg>

      {/* Context line */}
      <p
        className="mt-3 text-center"
        style={{
          fontFamily: SANS,
          fontSize: '11px',
          color: '#999999',
          letterSpacing: '0.02em',
        }}
      >
        12 years &middot; Publicis Groupe &middot; Google &middot; Navan &middot; SSP
      </p>
    </div>
  );
}
