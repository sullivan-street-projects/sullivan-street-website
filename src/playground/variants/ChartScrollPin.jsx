import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const TYPEWRITER_TEXT =
  '$2B+ in media managed across Apple, Google, JPMorgan Chase, and more.';

// --- Chart dimensions ---
const W = 960;
const H = 360;
const PAD = { top: 24, right: 24, bottom: 48, left: 72 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const Y_TICKS = [0, 500, 1000, 1500, 2000];
const Y_MAX = 2200; // slight headroom above 2150
const X_TICKS = [2014, 2016, 2018, 2020, 2022, 2024, 2026];

// --- Scale helpers ---
const scaleX = (year) => PAD.left + ((year - 2014) / (2026 - 2014)) * PLOT_W;
const scaleY = (val) => PAD.top + PLOT_H - (val / Y_MAX) * PLOT_H;

// --- Fritsch-Carlson monotone cubic interpolation ---
function monotonePath(points) {
  const n = points.length;
  if (n < 2) return '';

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);

  // 1. Compute slopes of secant lines
  const deltas = [];
  const ms = [];
  for (let i = 0; i < n - 1; i++) {
    deltas.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  }

  // 2. Initialize tangents
  ms.push(deltas[0]);
  for (let i = 1; i < n - 1; i++) {
    if (deltas[i - 1] * deltas[i] <= 0) {
      ms.push(0);
    } else {
      ms.push((deltas[i - 1] + deltas[i]) / 2);
    }
  }
  ms.push(deltas[n - 2]);

  // 3. Fritsch-Carlson adjustment
  for (let i = 0; i < n - 1; i++) {
    if (Math.abs(deltas[i]) < 1e-12) {
      ms[i] = 0;
      ms[i + 1] = 0;
    } else {
      const alpha = ms[i] / deltas[i];
      const beta = ms[i + 1] / deltas[i];
      const tau = alpha * alpha + beta * beta;
      if (tau > 9) {
        const t = 3 / Math.sqrt(tau);
        ms[i] = t * alpha * deltas[i];
        ms[i + 1] = t * beta * deltas[i];
      }
    }
  }

  // 4. Build SVG cubic bezier path
  let d = `M${xs[0]},${ys[0]}`;
  for (let i = 0; i < n - 1; i++) {
    const dx = (xs[i + 1] - xs[i]) / 3;
    const cp1x = xs[i] + dx;
    const cp1y = ys[i] + ms[i] * dx;
    const cp2x = xs[i + 1] - dx;
    const cp2y = ys[i + 1] - ms[i + 1] * dx;
    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${xs[i + 1]},${ys[i + 1]}`;
  }
  return d;
}

// Build the path once
const chartPoints = DATA.map((d) => ({ x: scaleX(d.year), y: scaleY(d.value) }));
const linePath = monotonePath(chartPoints);

// Build closed area path for gradient fill
const areaPath =
  linePath +
  ` L${scaleX(2026)},${scaleY(0)} L${scaleX(2014)},${scaleY(0)} Z`;

// Endpoint coordinates
const endX = scaleX(DATA[DATA.length - 1].year);
const endY = scaleY(DATA[DATA.length - 1].value);

// Y-axis label formatter
function formatValue(v) {
  if (v === 0) return '$0';
  if (v >= 1000) return `$${v / 1000}B`;
  return `$${v}M`;
}

// --- Typewriter hook ---
function useTypewriter(text, active, charDelay = 35) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      return;
    }
    let i = 0;
    setDisplayed('');
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, charDelay);
    return () => clearInterval(id);
  }, [active, text, charDelay]);

  return displayed;
}

export default function ChartScrollPin() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll [0, 0.7] => pathLength [0, 1]
  const pathLength = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const areaOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 0.18]);

  // Track whether the dot should show (pathLength ~1)
  const [dotVisible, setDotVisible] = useState(false);
  const [typewriterActive, setTypewriterActive] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setDotVisible(true);
      setTypewriterActive(true);
      return;
    }

    const unsubDot = scrollYProgress.on('change', (v) => {
      setDotVisible(v >= 0.68);
    });

    const unsubTw = scrollYProgress.on('change', (v) => {
      setTypewriterActive(v >= 0.75);
    });

    return () => {
      unsubDot();
      unsubTw();
    };
  }, [scrollYProgress, reducedMotion]);

  const typewriterOutput = useTypewriter(
    TYPEWRITER_TEXT,
    typewriterActive && !reducedMotion,
    35
  );

  // --- Render ---

  const gridLines = (
    <g>
      {/* Horizontal grid lines */}
      {Y_TICKS.map((tick) => (
        <line
          key={`h-${tick}`}
          x1={PAD.left}
          x2={W - PAD.right}
          y1={scaleY(tick)}
          y2={scaleY(tick)}
          stroke="#e5e5e5"
          strokeWidth={1}
        />
      ))}
      {/* Vertical grid lines */}
      {X_TICKS.map((year) => (
        <line
          key={`v-${year}`}
          x1={scaleX(year)}
          x2={scaleX(year)}
          y1={PAD.top}
          y2={H - PAD.bottom}
          stroke="#e5e5e5"
          strokeWidth={1}
        />
      ))}
    </g>
  );

  const axisLabels = (
    <g>
      {/* Y-axis labels */}
      {Y_TICKS.map((tick) => (
        <text
          key={`yl-${tick}`}
          x={PAD.left - 12}
          y={scaleY(tick)}
          textAnchor="end"
          dominantBaseline="middle"
          fill="#999999"
          fontSize={12}
          fontFamily="'Instrument Sans', system-ui, sans-serif"
        >
          {formatValue(tick)}
        </text>
      ))}
      {/* X-axis labels */}
      {X_TICKS.map((year) => (
        <text
          key={`xl-${year}`}
          x={scaleX(year)}
          y={H - PAD.bottom + 24}
          textAnchor="middle"
          fill="#999999"
          fontSize={12}
          fontFamily="'Instrument Sans', system-ui, sans-serif"
        >
          {year}
        </text>
      ))}
    </g>
  );

  return (
    <div
      ref={containerRef}
      style={{ height: '300vh', position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="max-w-[960px]"
          style={{ width: '100%' }}
          role="img"
          aria-label="Cumulative media managed chart from 2014 to 2026, showing growth to over $2 billion"
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity={0} />
            </linearGradient>
          </defs>

          {gridLines}
          {axisLabels}

          {/* Gradient fill area */}
          {reducedMotion ? (
            <path
              d={areaPath}
              fill="url(#areaGrad)"
              opacity={0.18}
            />
          ) : (
            <motion.path
              d={areaPath}
              fill="url(#areaGrad)"
              style={{ opacity: areaOpacity }}
            />
          )}

          {/* Main line */}
          {reducedMotion ? (
            <path
              d={linePath}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <motion.path
              d={linePath}
              fill="none"
              stroke="#1a1a1a"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          )}

          {/* Endpoint dot */}
          {dotVisible && (
            <circle
              cx={endX}
              cy={endY}
              r={5}
              fill="#1a1a1a"
            />
          )}
        </svg>

        {/* Typewriter text below chart */}
        <div
          style={{
            maxWidth: 960,
            width: '100%',
            minHeight: '2em',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          {(typewriterActive || reducedMotion) && (
            <p
              style={{
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                color: '#1a1a1a',
                margin: 0,
              }}
            >
              {reducedMotion ? TYPEWRITER_TEXT : typewriterOutput}
              {!reducedMotion && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.1em',
                    backgroundColor: '#1a1a1a',
                    marginLeft: '2px',
                    verticalAlign: 'text-bottom',
                    animation: 'cursorBlink 1s step-end infinite',
                  }}
                  aria-hidden="true"
                />
              )}
            </p>
          )}
          <style>{`
            @keyframes cursorBlink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
