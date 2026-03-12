import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../../hooks/useReducedMotion';

const DATA = [
  { year: 2014, value: 0 },    { year: 2015, value: 80 },
  { year: 2016, value: 200 },  { year: 2017, value: 400 },
  { year: 2018, value: 650 },  { year: 2019, value: 900 },
  { year: 2020, value: 1100 }, { year: 2021, value: 1350 },
  { year: 2022, value: 1600 }, { year: 2023, value: 1800 },
  { year: 2024, value: 1950 }, { year: 2025, value: 2050 },
  { year: 2026, value: 2150 },
];

const W = 960;
const H = 360;
const MAX_VALUE = 2200;
const YEAR_MIN = 2014;
const YEAR_MAX = 2026;

// Y-axis ticks: $0, $0.5B, $1B, $1.5B, $2B
const Y_TICKS = [0, 500, 1000, 1500, 2000];
// X-axis ticks: every year
const X_TICKS = Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i);

function toX(year) {
  return ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * W;
}

function toY(value) {
  return H - (value / MAX_VALUE) * H;
}

/**
 * Fritsch–Carlson monotone cubic interpolation.
 * Returns an SVG path string using C (cubic Bezier) commands.
 */
function monotoneCubicPath(points) {
  const n = points.length;
  if (n < 2) return '';

  const xs = points.map((p) => toX(p.year));
  const ys = points.map((p) => toY(p.value));

  // Compute slopes of secant lines
  const deltas = [];
  const ms = [];
  for (let i = 0; i < n - 1; i++) {
    const dx = xs[i + 1] - xs[i];
    const dy = ys[i + 1] - ys[i];
    deltas.push(dx);
    ms.push(dy / dx);
  }

  // Compute tangent slopes using Fritsch–Carlson
  const tangents = new Array(n);
  tangents[0] = ms[0];
  tangents[n - 1] = ms[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (ms[i - 1] * ms[i] <= 0) {
      tangents[i] = 0;
    } else {
      tangents[i] = (ms[i - 1] + ms[i]) / 2;
    }
  }

  // Fritsch–Carlson monotonicity correction
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(ms[i]) < 1e-12) {
      tangents[i] = 0;
      tangents[i + 1] = 0;
    } else {
      const alpha = tangents[i] / ms[i];
      const beta = tangents[i + 1] / ms[i];
      const s = alpha * alpha + beta * beta;
      if (s > 9) {
        const tau = 3 / Math.sqrt(s);
        tangents[i] = tau * alpha * ms[i];
        tangents[i + 1] = tau * beta * ms[i];
      }
    }
  }

  // Build SVG path with cubic Bezier segments
  let d = `M${xs[0]},${ys[0]}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = deltas[i] / 3;
    const cp1x = xs[i] + dx;
    const cp1y = ys[i] + tangents[i] * dx;
    const cp2x = xs[i + 1] - dx;
    const cp2y = ys[i + 1] - tangents[i + 1] * dx;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${xs[i + 1]},${ys[i + 1]}`;
  }

  return d;
}

const TYPEWRITER_TEXT =
  'in media managed across Apple, Google, JPMorgan Chase, and more.';

function AnimatedCounter({ reducedMotion, inView }) {
  const springValue = useSpring(0, { stiffness: 30, damping: 20 });
  const display = useTransform(springValue, (v) => v.toFixed(1));
  const [current, setCurrent] = useState('0.0');

  useEffect(() => {
    if (reducedMotion) {
      springValue.jump(2);
      return;
    }
    if (inView) {
      springValue.set(2);
    }
  }, [inView, reducedMotion, springValue]);

  useEffect(() => {
    const unsubscribe = display.on('change', (v) => setCurrent(v));
    return unsubscribe;
  }, [display]);

  // Strip trailing .0 once we hit 2.0
  const formatted = current === '2.0' ? '2' : current;

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{formatted}</span>
  );
}

function TypewriterLine({ text, start, reducedMotion }) {
  const [displayed, setDisplayed] = useState(reducedMotion ? text : '');
  const [showCursor, setShowCursor] = useState(!reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      setShowCursor(false);
      return;
    }
    if (!start) return;

    let i = 0;
    setDisplayed('');
    setShowCursor(true);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        // Hide cursor after typing finishes
        setTimeout(() => setShowCursor(false), 1200);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [start, text, reducedMotion]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: '#1a1a1a',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'blink-cursor 1s step-end infinite',
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

export default function ChartCounterLayered() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const [typewriterStart, setTypewriterStart] = useState(false);

  // Start typewriter when counter is nearly done (~2.5s after inView)
  useEffect(() => {
    if (reducedMotion) {
      setTypewriterStart(true);
      return;
    }
    if (!inView) return;
    const timer = setTimeout(() => setTypewriterStart(true), 2500);
    return () => clearTimeout(timer);
  }, [inView, reducedMotion]);

  const chartPath = monotoneCubicPath(DATA);

  // Grid lines
  const hLines = Y_TICKS.map((v) => toY(v));
  const vLines = X_TICKS.map((y) => toX(y));

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Blink cursor keyframes */}
      <style>{`
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div className="relative mx-auto max-w-[960px] px-6">
        {/* Background chart as texture */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.18 }}
          aria-hidden="true"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
          >
            {/* Horizontal grid lines */}
            {hLines.map((y, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={y}
                x2={W}
                y2={y}
                stroke="#e5e5e5"
                strokeWidth={1}
              />
            ))}
            {/* Vertical grid lines */}
            {vLines.map((x, i) => (
              <line
                key={`v-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={H}
                stroke="#e5e5e5"
                strokeWidth={1}
              />
            ))}
            {/* Data line */}
            <motion.path
              d={chartPath}
              stroke="#1a1a1a"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: reducedMotion ? 1 : 0 }}
              animate={inView ? { pathLength: 1 } : undefined}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 3, ease: 'easeInOut' }
              }
            />
          </svg>
        </div>

        {/* Foreground: massive counter */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[280px] md:min-h-[360px]">
          <h2
            className="text-[80px] md:text-[140px] lg:text-[200px] leading-none tracking-tight text-center"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              color: '#1a1a1a',
            }}
          >
            $<AnimatedCounter reducedMotion={reducedMotion} inView={inView} />
            B+
          </h2>

          {/* Typewriter subtitle */}
          <p
            className="mt-4 md:mt-6 text-lg md:text-xl text-center max-w-md"
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontStyle: 'italic',
              color: '#1a1a1a',
              minHeight: '3em',
            }}
          >
            <TypewriterLine
              text={TYPEWRITER_TEXT}
              start={typewriterStart}
              reducedMotion={reducedMotion}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
