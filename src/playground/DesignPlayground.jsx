import GrainComparison from './GrainComparison';
import ValuePropsAppleCards from './variants/ValuePropsAppleCards';
import ValuePropsWhiteCards from './variants/ValuePropsWhiteCards';
import ValuePropsHalftone from './variants/ValuePropsHalftone';
import ValuePropsSourced from './variants/ValuePropsSourced';
import ValuePropsUserImages from './variants/ValuePropsUserImages';
import ValuePropsHalftoneIcons from './variants/ValuePropsHalftoneIcons';
import ValuePropsInverted from './variants/ValuePropsInverted';
import ValuePropsStructured from './variants/ValuePropsStructured';
import ValuePropsEditorialHalftone from './variants/ValuePropsEditorialHalftone';
import ValuePropsMinimalHalftone from './variants/ValuePropsMinimalHalftone';
import ValuePropsEditorialText from './variants/ValuePropsEditorialText';
import ValuePropsApproachNumbered from './variants/ValuePropsApproachNumbered';
import ValuePropsApproachDots from './variants/ValuePropsApproachDots';
import HalftoneLibrary from './HalftoneLibrary';

const variants = [
  { id: 'text-top', label: 'F: Text-Top Layout', component: ValuePropsAppleCards },
  { id: 'icon-cards', label: 'J: Icon + Text', component: ValuePropsWhiteCards },
  { id: 'halftone', label: 'G: Halftone', component: ValuePropsHalftone },
  { id: 'sourced', label: 'H: Sourced', component: ValuePropsSourced },
  { id: 'user-images', label: 'I: User Images', component: ValuePropsUserImages },
  { id: 'halftone-icons', label: 'K: Halftone Icons', component: ValuePropsHalftoneIcons },
  { id: 'inverted', label: 'L: Inverted', component: ValuePropsInverted },
  { id: 'structured', label: 'M: Structured', component: ValuePropsStructured },
  { id: 'editorial-halftone', label: 'N: Editorial+Halftone', component: ValuePropsEditorialHalftone },
  { id: 'minimal-halftone', label: 'O: Minimal Halftone', component: ValuePropsMinimalHalftone },
  { id: 'editorial-text', label: 'P: Editorial Text', component: ValuePropsEditorialText },
  { id: 'approach-numbered', label: 'Q: Numbered', component: ValuePropsApproachNumbered },
  { id: 'approach-dots', label: 'R: Minimal Dots', component: ValuePropsApproachDots },
];

const DesignPlayground = () => {
  const scrollToVariant = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-serif text-xl text-[#1a1a1a]">Design Playground v3</h1>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '';
                window.location.reload();
              }}
              className="font-sans text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors"
            >
              ← Back to site
            </a>
          </div>
          <nav className="flex flex-wrap gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-1.5 text-xs font-sans font-medium rounded-full bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 transition-colors"
            >
              Grain
            </button>
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => scrollToVariant(v.id)}
                className="px-3 py-1.5 text-xs font-sans font-medium rounded-full bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 transition-colors"
              >
                {v.label}
              </button>
            ))}
            <button
              onClick={() => scrollToVariant('halftone-library')}
              className="px-3 py-1.5 text-xs font-sans font-medium rounded-full bg-[#1a1a1a]/10 hover:bg-[#1a1a1a]/20 transition-colors"
            >
              Pattern Library
            </button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">Card Layout Exploration</h2>
          <p className="font-sans text-[15px] text-[#525252] leading-relaxed max-w-[700px]">
            Testing card layouts with text-at-top structure. Separating the <strong>layout question</strong> from
            the <strong>art question</strong>. All variants use brand colors and typography.
          </p>
        </div>

        {/* Grain Comparison */}
        <section className="mb-24 pb-16 border-b border-[#e5e5e5]">
          <GrainComparison />
        </section>

        {/* Value Props Variants */}
        {variants.map((variant, idx) => (
          <section
            key={variant.id}
            id={variant.id}
            className={`py-16 ${idx < variants.length - 1 ? 'border-b border-[#e5e5e5]' : ''}`}
          >
            <variant.component />
          </section>
        ))}

        {/* Halftone Pattern Library */}
        <section id="halftone-library" className="py-16 mt-8 border-t border-[#e5e5e5]">
          <HalftoneLibrary />
        </section>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-[13px] text-[#737373] italic">
            This playground is a working lab. Tell me what's working and what isn't, and we'll iterate.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DesignPlayground;
