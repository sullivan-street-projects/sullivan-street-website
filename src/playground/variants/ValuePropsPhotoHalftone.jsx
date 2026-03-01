import { VALUE_PROPS } from '../../constants';

/**
 * Pure CSS halftone effect — 3 declarations technique from Frontend Masters.
 * Uses radial-gradient dot pattern + real photo as mask + high contrast filter.
 * Works with any photograph, no canvas needed.
 */
const CSSHalftone = ({ src, alt, dotSize = '6px', contrast = 30 }) => (
  <div className="relative w-full h-full overflow-hidden" style={{ background: '#FAFAF8' }}>
    {/* The halftone layer */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at center, #1a1a1a 30%, transparent 31%) 0 0 / ${dotSize} ${dotSize} space,
          url("${src}") center / cover no-repeat
        `,
        backgroundBlendMode: 'multiply',
        filter: `contrast(${contrast}) grayscale(1)`,
      }}
    />
    {/* Softening overlay to take the edge off */}
    <div
      className="absolute inset-0"
      style={{ background: 'rgba(250, 250, 248, 0.08)' }}
    />
  </div>
);

/**
 * Alternative: mask-based approach — photo becomes the mask for the dot pattern.
 * This produces cleaner dots because the image controls dot SIZE, not dot COLOR.
 */
const MaskedHalftone = ({ src, alt, dotSize = '8px', contrast = 50 }) => (
  <div className="relative w-full h-full overflow-hidden" style={{ background: '#FAFAF8' }}>
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at center, #1a1a1a 40%, transparent 41%) 0 0 / ${dotSize} ${dotSize} space`,
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        filter: `contrast(${contrast})`,
      }}
    />
  </div>
);

// Stock photos — high quality, free, editorial feel
const PHOTOS = {
  // Professional portrait — executive/leadership
  executive: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&q=80',
  // Architecture/cityscape — building, orchestration
  blueprint: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop&q=80',
  // Data dashboard — outcomes, tech, AI
  signal: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&q=80',
};

// Fallback: solid gradient "photos" that always work (no network needed)
const GRADIENT_SCENES = {
  executive: 'linear-gradient(135deg, #2a2520 20%, #8a8580 50%, #f5f0eb 80%)',
  blueprint: 'linear-gradient(180deg, #f5f0eb 30%, #5a5550 50%, #2a2520 55%, #5a5550 60%, #d0ccc5 100%)',
  signal: 'linear-gradient(0deg, #2a2520 10%, #5a5550 30%, #8a8580 60%, #d0ccc5 80%, #f5f0eb 100%)',
};

const GradientHalftone = ({ gradient, dotSize = '6px', contrast = 25 }) => (
  <div className="relative w-full h-full overflow-hidden" style={{ background: '#FAFAF8' }}>
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at center, #1a1a1a 30%, transparent 31%) 0 0 / ${dotSize} ${dotSize} space,
          ${gradient}
        `,
        backgroundBlendMode: 'multiply',
        filter: `contrast(${contrast}) grayscale(1)`,
      }}
    />
  </div>
);

const propPhotos = [
  { photo: PHOTOS.executive, gradient: GRADIENT_SCENES.executive, label: 'Executive portrait' },
  { photo: PHOTOS.blueprint, gradient: GRADIENT_SCENES.blueprint, label: 'Cityscape' },
  { photo: PHOTOS.signal, gradient: GRADIENT_SCENES.signal, label: 'Data dashboard' },
];

const ValuePropsPhotoHalftone = () => {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#737373] mb-6">
        PHOTO HALFTONE — Pure CSS technique. Real photos → halftone dots via blend modes + contrast.
      </p>

      {/* Method 1: Blend mode approach with real photos */}
      <div className="mb-12">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">
          Method A — Blend Mode (photo × dot pattern)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {VALUE_PROPS.map((prop, idx) => (
            <div
              key={idx}
              className={`${idx < 2 ? 'border-b md:border-b-0 md:border-r border-[#e5e5e5]/60' : ''}`}
            >
              <div className="h-[220px]">
                <CSSHalftone
                  src={propPhotos[idx].photo}
                  alt={propPhotos[idx].label}
                  dotSize="5px"
                  contrast={30}
                />
              </div>
              <div className="px-4 pb-8 pt-4">
                <h3 className="font-serif text-lg leading-tight text-[#1a1a1a] mb-3">
                  {prop.title}
                </h3>
                <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
                <p className="font-sans text-[14px] text-[#737373] leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Method 2: Mask-based approach */}
      <div className="mb-12 pt-8 border-t border-[#e5e5e5]">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">
          Method B — CSS Mask (photo controls dot size)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propPhotos.map((p, idx) => (
            <div key={idx}>
              <div className="h-[200px] rounded-lg overflow-hidden border border-[#e5e5e5]">
                <MaskedHalftone src={p.photo} alt={p.label} dotSize="7px" contrast={40} />
              </div>
              <p className="font-sans text-xs text-[#737373] mt-2 text-center">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Method 3: Gradient fallback (no network needed) */}
      <div className="mb-12 pt-8 border-t border-[#e5e5e5]">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">
          Method C — Gradient Halftone (no external images, always works)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {propPhotos.map((p, idx) => (
            <div key={idx}>
              <div className="h-[200px] rounded-lg overflow-hidden border border-[#e5e5e5]">
                <GradientHalftone gradient={p.gradient} dotSize="5px" contrast={25} />
              </div>
              <p className="font-sans text-xs text-[#737373] mt-2 text-center">{p.label} (gradient)</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dot size comparison */}
      <div className="pt-8 border-t border-[#e5e5e5]">
        <p className="font-sans text-xs uppercase tracking-widest font-bold text-[#737373] mb-6">
          Dot Size Comparison — Same photo, different densities
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['3px', '5px', '7px', '10px'].map((size) => (
            <div key={size}>
              <div className="h-[160px] rounded-lg overflow-hidden border border-[#e5e5e5]">
                <CSSHalftone
                  src={PHOTOS.executive}
                  alt="Dot size comparison"
                  dotSize={size}
                  contrast={size === '3px' ? 40 : size === '5px' ? 30 : size === '7px' ? 25 : 20}
                />
              </div>
              <p className="font-sans text-xs text-[#737373] mt-2 text-center">
                {size} — {size === '3px' ? 'Dense' : size === '5px' ? 'Medium' : size === '7px' ? 'Loose' : 'Poster'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="font-sans text-[12px] text-[#a3a3a3] mt-8 italic">
        Pure CSS: radial-gradient dot pattern × photo via background-blend-mode: multiply, then filter: contrast().
        Swap any photo URL. Technique from Frontend Masters / CSS In Real Life.
      </p>
    </div>
  );
};

export default ValuePropsPhotoHalftone;
