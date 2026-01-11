// Halftone Pattern Library - Browse options for value props graphics

const patterns = [
  // === CONCENTRIC / RADIAL ===
  {
    name: 'Concentric Rings',
    category: 'Radial',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(4)].map((_, ring) => {
          const radius = 12 + ring * 12;
          const dotCount = 6 + ring * 4;
          return [...Array(dotCount)].map((_, i) => {
            const angle = (i / dotCount) * Math.PI * 2;
            return (
              <circle
                key={`${ring}-${i}`}
                cx={50 + Math.cos(angle) * radius}
                cy={50 + Math.sin(angle) * radius}
                r={2 - ring * 0.3}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          });
        })}
      </svg>
    ),
  },
  {
    name: 'Spiral',
    category: 'Radial',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(30)].map((_, i) => {
          const angle = (i / 30) * Math.PI * 4;
          const radius = 5 + i * 1.4;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(angle) * radius}
              cy={50 + Math.sin(angle) * radius}
              r={1.5}
              fill="#1a1a1a"
              opacity={0.75}
            />
          );
        })}
      </svg>
    ),
  },
  {
    name: 'Radial Burst',
    category: 'Radial',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return [...Array(4)].map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={50 + Math.cos(angle) * (15 + j * 10)}
              cy={50 + Math.sin(angle) * (15 + j * 10)}
              r={2 - j * 0.3}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ));
        })}
      </svg>
    ),
  },
  {
    name: 'Sunburst',
    category: 'Radial',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="8" fill="#1a1a1a" opacity={0.75} />
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(angle) * 25}
              cy={50 + Math.sin(angle) * 25}
              r={1.5}
              fill="#1a1a1a"
              opacity={0.75}
            />
          );
        })}
      </svg>
    ),
  },

  // === GRID PATTERNS ===
  {
    name: 'Uniform Grid',
    category: 'Grid',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(6)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={18 + col * 14}
              cy={18 + row * 14}
              r={2}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Offset Grid',
    category: 'Grid',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(7)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={12 + col * 14 + (row % 2) * 7}
              cy={12 + row * 12}
              r={1.8}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Density Gradient',
    category: 'Grid',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(6)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={18 + col * 14}
              cy={18 + row * 14}
              r={0.8 + col * 0.4}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Diagonal Grid',
    category: 'Grid',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(7)].map((_, i) =>
          [...Array(7 - i)].map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={15 + (i + j) * 10}
              cy={15 + j * 12}
              r={1.8}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },

  // === GEOMETRIC SHAPES ===
  {
    name: 'Triangle Down',
    category: 'Geometric',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, row) =>
          [...Array(row + 1)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={50 - row * 8 + col * 16}
              cy={20 + row * 15}
              r={2}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Triangle Up',
    category: 'Geometric',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, row) =>
          [...Array(5 - row)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={50 - (4 - row) * 8 + col * 16}
              cy={20 + row * 15}
              r={2}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Diamond',
    category: 'Geometric',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, row) => {
          const count = row < 3 ? row + 1 : 5 - row;
          return [...Array(count)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={50 - (count - 1) * 8 + col * 16}
              cy={15 + row * 18}
              r={2}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ));
        })}
      </svg>
    ),
  },
  {
    name: 'Hexagon',
    category: 'Geometric',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const angle = (deg * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(angle) * 25}
              cy={50 + Math.sin(angle) * 25}
              r={3}
              fill="#1a1a1a"
              opacity={0.75}
            />
          );
        })}
        <circle cx="50" cy="50" r="2" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },

  // === WAVE / ORGANIC ===
  {
    name: 'Wave Rows',
    category: 'Organic',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, row) =>
          [...Array(8)].map((_, col) => {
            const x = 10 + col * 11;
            const wave = Math.sin((x / 100) * Math.PI * 2) * 5;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={20 + row * 15 + wave}
                r={1.5 + Math.sin((x / 100) * Math.PI) * 0.8}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    name: 'Ripple',
    category: 'Organic',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(4)].map((_, ring) => {
          const radius = 10 + ring * 12;
          const dotCount = 8 + ring * 4;
          const offset = ring * 0.2;
          return [...Array(dotCount)].map((_, i) => {
            const angle = (i / dotCount) * Math.PI * 2 + offset;
            return (
              <circle
                key={`${ring}-${i}`}
                cx={50 + Math.cos(angle) * radius}
                cy={50 + Math.sin(angle) * radius}
                r={1.2 + Math.sin(angle * 3) * 0.5}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          });
        })}
      </svg>
    ),
  },
  {
    name: 'Flow Lines',
    category: 'Organic',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(4)].map((_, row) =>
          [...Array(10)].map((_, col) => {
            const x = 8 + col * 9;
            const flow = Math.sin((x / 100) * Math.PI * 3 + row) * 8;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={25 + row * 18 + flow}
                r={1.3}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          })
        )}
      </svg>
    ),
  },
  {
    name: 'Scatter',
    category: 'Organic',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[
          [25, 30], [45, 22], [70, 35], [85, 25],
          [15, 50], [35, 55], [60, 48], [78, 58],
          [20, 72], [50, 78], [72, 70], [88, 80],
          [30, 88], [55, 92], [80, 85]
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={1.5 + (i % 3) * 0.5}
            fill="#1a1a1a"
            opacity={0.75}
          />
        ))}
      </svg>
    ),
  },

  // === CONNECTION / NETWORK ===
  {
    name: 'Nodes',
    category: 'Network',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="4" fill="#1a1a1a" opacity={0.75} />
        <circle cx="25" cy="30" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="75" cy="30" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="25" cy="70" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="75" cy="70" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="50" cy="20" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="50" cy="80" r="2" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },
  {
    name: 'Constellation',
    category: 'Network',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[
          [30, 25, 2.5], [65, 20, 2], [80, 40, 1.8],
          [45, 45, 3], [20, 55, 2], [70, 60, 2.2],
          [35, 75, 2], [60, 80, 1.8], [85, 75, 2]
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#1a1a1a" opacity={0.75} />
        ))}
      </svg>
    ),
  },
  {
    name: 'Cluster',
    category: 'Network',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="5" fill="#1a1a1a" opacity={0.75} />
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={50 + Math.cos(angle) * 18}
              cy={50 + Math.sin(angle) * 18}
              r={2.5}
              fill="#1a1a1a"
              opacity={0.75}
            />
          );
        })}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
          return (
            <circle
              key={`o-${i}`}
              cx={50 + Math.cos(angle) * 32}
              cy={50 + Math.sin(angle) * 32}
              r={1.5}
              fill="#1a1a1a"
              opacity={0.75}
            />
          );
        })}
      </svg>
    ),
  },
  {
    name: 'Binary',
    category: 'Network',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="35" cy="50" r="12" fill="none" stroke="#1a1a1a" strokeWidth="3" opacity={0.75} />
        <circle cx="65" cy="50" r="12" fill="none" stroke="#1a1a1a" strokeWidth="3" opacity={0.75} />
        {[...Array(4)].map((_, i) => (
          <circle key={i} cx={45 + i * 3} cy="50" r="1" fill="#1a1a1a" opacity={0.75} />
        ))}
      </svg>
    ),
  },

  // === ORCHESTRATION (managed complexity - General Contractor concept) ===
  {
    name: 'Multi-Track',
    category: 'Orchestration',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Different workstreams with varying intensities */}
        {[...Array(5)].map((_, row) => {
          const dotCount = 4 + (row % 3) * 2; // Vary dots per row
          const dotSize = 1.2 + (row % 2) * 0.6;
          return [...Array(dotCount)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={15 + col * (70 / (dotCount - 1))}
              cy={18 + row * 16}
              r={dotSize}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ));
        })}
      </svg>
    ),
  },
  {
    name: 'Layered Density',
    category: 'Orchestration',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Grid with both X and Y density variation */}
        {[...Array(6)].map((_, row) =>
          [...Array(6)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={18 + col * 14}
              cy={18 + row * 14}
              r={0.8 + col * 0.25 + row * 0.15}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ))
        )}
      </svg>
    ),
  },
  {
    name: 'Coordinated Streams',
    category: 'Orchestration',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Wave rows with varying intensities per row */}
        {[...Array(5)].map((_, row) => {
          const intensity = [1.0, 1.5, 2.0, 1.5, 1.0][row]; // Peak in middle
          return [...Array(8)].map((_, col) => {
            const x = 10 + col * 11;
            const wave = Math.sin((x / 100) * Math.PI * 2) * 4;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={18 + row * 16 + wave}
                r={intensity}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          });
        })}
      </svg>
    ),
  },
  {
    name: 'Unified Variance',
    category: 'Orchestration',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Structured variety - different zones with different densities */}
        {/* Top zone - small dense */}
        {[...Array(2)].map((_, row) =>
          [...Array(8)].map((_, col) => (
            <circle key={`t${row}-${col}`} cx={12 + col * 11} cy={15 + row * 8} r={1} fill="#1a1a1a" opacity={0.75} />
          ))
        )}
        {/* Middle zone - medium */}
        {[...Array(2)].map((_, row) =>
          [...Array(5)].map((_, col) => (
            <circle key={`m${row}-${col}`} cx={18 + col * 16} cy={40 + row * 12} r={1.8} fill="#1a1a1a" opacity={0.75} />
          ))
        )}
        {/* Bottom zone - larger sparse */}
        {[...Array(3)].map((_, col) => (
          <circle key={`b${col}`} cx={25 + col * 25} cy={78} r={2.5} fill="#1a1a1a" opacity={0.75} />
        ))}
      </svg>
    ),
  },
  {
    name: 'Gradient Bands',
    category: 'Orchestration',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Horizontal bands with progressive density */}
        {[...Array(5)].map((_, row) => {
          const dotsInRow = 3 + row * 2; // More dots in each successive row
          return [...Array(dotsInRow)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={50 - ((dotsInRow - 1) * 6) + col * 12}
              cy={15 + row * 18}
              r={2.2 - row * 0.25}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ));
        })}
      </svg>
    ),
  },

  // === PATCHWORK / ASSEMBLY (for General Contractor concept) ===
  {
    name: 'Modular Grid',
    category: 'Patchwork',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Different sized clusters assembled */}
        <circle cx="20" cy="25" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="28" cy="25" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="24" cy="32" r="2" fill="#1a1a1a" opacity={0.75} />

        <circle cx="55" cy="20" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="62" cy="20" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="69" cy="20" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="55" cy="27" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="62" cy="27" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="69" cy="27" r="1.5" fill="#1a1a1a" opacity={0.75} />

        <circle cx="35" cy="55" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="45" cy="55" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="40" cy="65" r="2.5" fill="#1a1a1a" opacity={0.75} />

        <circle cx="70" cy="60" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="78" cy="60" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="74" cy="68" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="82" cy="68" r="1.8" fill="#1a1a1a" opacity={0.75} />

        <circle cx="18" cy="75" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="26" cy="78" r="2" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },
  {
    name: 'Assembled Blocks',
    category: 'Patchwork',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Blocks of different densities assembled */}
        {[...Array(3)].map((_, i) => (
          <circle key={`a${i}`} cx={15 + i * 8} cy={25} r={1.5} fill="#1a1a1a" opacity={0.75} />
        ))}
        {[...Array(2)].map((_, i) => (
          <circle key={`b${i}`} cx={55 + i * 12} cy={22} r={2.5} fill="#1a1a1a" opacity={0.75} />
        ))}
        {[...Array(4)].map((_, row) => (
          [...Array(2)].map((_, col) => (
            <circle key={`c${row}${col}`} cx={20 + col * 8} cy={50 + row * 8} r={1.2} fill="#1a1a1a" opacity={0.75} />
          ))
        ))}
        {[...Array(2)].map((_, row) => (
          [...Array(3)].map((_, col) => (
            <circle key={`d${row}${col}`} cx={55 + col * 10} cy={55 + row * 12} r={2} fill="#1a1a1a" opacity={0.75} />
          ))
        ))}
      </svg>
    ),
  },
  {
    name: 'Puzzle Pieces',
    category: 'Patchwork',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Interlocking areas suggesting puzzle assembly */}
        <circle cx="30" cy="30" r="3" fill="#1a1a1a" opacity={0.75} />
        <circle cx="40" cy="30" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="35" cy="38" r="2" fill="#1a1a1a" opacity={0.75} />

        <circle cx="60" cy="28" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="68" cy="32" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="64" cy="40" r="2.5" fill="#1a1a1a" opacity={0.75} />

        <circle cx="50" cy="50" r="4" fill="#1a1a1a" opacity={0.75} />

        <circle cx="25" cy="65" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="33" cy="62" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="29" cy="72" r="2" fill="#1a1a1a" opacity={0.75} />

        <circle cx="65" cy="65" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="72" cy="68" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="68" cy="75" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="75" cy="72" r="1.8" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },
  {
    name: 'Mosaic',
    category: 'Patchwork',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Varied tile-like arrangement */}
        <circle cx="20" cy="20" r="3" fill="#1a1a1a" opacity={0.75} />
        <circle cx="35" cy="18" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="35" cy="26" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="50" cy="22" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="65" cy="18" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="72" cy="18" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="65" cy="25" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="72" cy="25" r="1.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="80" cy="22" r="2" fill="#1a1a1a" opacity={0.75} />

        <circle cx="22" cy="50" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="22" cy="60" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="40" cy="50" r="3" fill="#1a1a1a" opacity={0.75} />
        <circle cx="55" cy="55" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="62" cy="50" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="62" cy="58" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="78" cy="52" r="2.5" fill="#1a1a1a" opacity={0.75} />

        <circle cx="25" cy="80" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="45" cy="78" r="2.5" fill="#1a1a1a" opacity={0.75} />
        <circle cx="60" cy="80" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="68" cy="78" r="1.8" fill="#1a1a1a" opacity={0.75} />
        <circle cx="80" cy="78" r="3" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },

  // === ABSTRACT ===
  {
    name: 'Crescendo',
    category: 'Abstract',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(7)].map((_, i) => (
          <circle
            key={i}
            cx={15 + i * 12}
            cy={50}
            r={1 + i * 0.8}
            fill="#1a1a1a"
            opacity={0.75}
          />
        ))}
      </svg>
    ),
  },
  {
    name: 'Stack',
    category: 'Abstract',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={50}
            cy={20 + i * 15}
            r={3 - i * 0.3}
            fill="#1a1a1a"
            opacity={0.75}
          />
        ))}
      </svg>
    ),
  },
  {
    name: 'Orbit',
    category: 'Abstract',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="3" fill="#1a1a1a" opacity={0.75} />
        <circle cx="50" cy="50" r="20" fill="none" stroke="#1a1a1a" strokeWidth="0.5" opacity={0.3} />
        <circle cx="70" cy="50" r="2" fill="#1a1a1a" opacity={0.75} />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth="0.5" opacity={0.3} />
        <circle cx="50" cy="15" r="1.5" fill="#1a1a1a" opacity={0.75} />
      </svg>
    ),
  },
  {
    name: 'Phases',
    category: 'Abstract',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, i) => (
          <circle
            key={i}
            cx={20 + i * 15}
            cy={50}
            r={8}
            fill="#1a1a1a"
            opacity={0.15 + i * 0.15}
          />
        ))}
      </svg>
    ),
  },
];

const categories = [...new Set(patterns.map(p => p.category))];

const HalftoneLibrary = () => {
  return (
    <div>
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-2">Halftone Pattern Library</h2>
      <p className="font-sans text-[14px] text-[#737373] mb-8 max-w-[600px]">
        Browse pattern options for value props graphics. All patterns use the same opacity (0.75) and color (#1a1a1a) as the current variants.
      </p>

      {categories.map(category => (
        <div key={category} className="mb-10">
          <h3 className="font-sans text-xs font-medium tracking-wider text-[#a3a3a3] uppercase mb-4">
            {category}
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {patterns
              .filter(p => p.category === category)
              .map((pattern, idx) => (
                <div key={idx} className="group">
                  <div className="aspect-square bg-[#FAFAF8] rounded-lg border border-[#e5e5e5]/50 p-3 hover:border-[#1a1a1a]/20 transition-colors">
                    {pattern.svg}
                  </div>
                  <p className="font-sans text-[11px] text-[#737373] mt-2 text-center group-hover:text-[#1a1a1a] transition-colors">
                    {pattern.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-[#f5f5f5]/50 rounded-lg">
        <p className="font-sans text-[12px] text-[#737373]">
          <strong>Usage:</strong> Any of these patterns can be scaled up for card graphics (like G, H, L) or down for icon accents (like K, N, O). The programmatic SVG approach means they stay crisp at any size.
        </p>
      </div>
    </div>
  );
};

export default HalftoneLibrary;
