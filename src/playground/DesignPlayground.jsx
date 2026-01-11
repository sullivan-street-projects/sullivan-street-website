import GrainComparison from './GrainComparison';
import HalftoneLibrary from './HalftoneLibrary';

// Value Props variants
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
import ValuePropsAnimatedHalftone from './variants/ValuePropsAnimatedHalftone';

// Approach section variants
import ValuePropsApproachNumbered from './variants/ValuePropsApproachNumbered';
import ValuePropsApproachDots from './variants/ValuePropsApproachDots';
import ApproachNarrative from './variants/ApproachNarrative';

// Services section variants
import ServicesAccordionRows from './variants/ServicesAccordionRows';
import ServicesAccordionTiers from './variants/ServicesAccordionTiers';
import ServicesAccordionSummary from './variants/ServicesAccordionSummary';

// Layout & color experiments
import ContactConvergence from './variants/ContactConvergence';
import FullBleedZone from './variants/FullBleedZone';
import GreenAccentHalftone from './variants/GreenAccentHalftone';
import BackgroundGreenTint from './variants/BackgroundGreenTint';

// Organized variant categories
const categories = [
  {
    title: 'Value Props',
    description: 'Card layouts for the three value propositions',
    variants: [
      { id: 'animated-halftone', label: 'Animated Halftone', component: ValuePropsAnimatedHalftone, shipped: true },
      { id: 'minimal-halftone', label: 'Minimal Halftone', component: ValuePropsMinimalHalftone },
      { id: 'halftone-icons', label: 'Halftone Icons', component: ValuePropsHalftoneIcons },
      { id: 'editorial-halftone', label: 'Editorial + Halftone', component: ValuePropsEditorialHalftone },
      { id: 'halftone', label: 'Full Halftone', component: ValuePropsHalftone },
      { id: 'text-top', label: 'Text-Top Layout', component: ValuePropsAppleCards },
      { id: 'icon-cards', label: 'Icon + Text', component: ValuePropsWhiteCards },
      { id: 'sourced', label: 'Sourced Images', component: ValuePropsSourced },
      { id: 'user-images', label: 'User Images', component: ValuePropsUserImages },
      { id: 'inverted', label: 'Inverted', component: ValuePropsInverted },
      { id: 'structured', label: 'Structured', component: ValuePropsStructured },
      { id: 'editorial-text', label: 'Editorial Text', component: ValuePropsEditorialText },
    ],
  },
  {
    title: 'Approach',
    description: 'Layouts for the capabilities/approach section',
    variants: [
      { id: 'approach-dots', label: 'Progressive Dots', component: ValuePropsApproachDots, shipped: true },
      { id: 'approach-numbered', label: 'Numbered Steps', component: ValuePropsApproachNumbered },
      { id: 'approach-narrative', label: 'Narrative Density', component: ApproachNarrative },
    ],
  },
  {
    title: 'Services',
    description: 'Service tier presentation options',
    variants: [
      { id: 'services-rows', label: 'Accordion Rows', component: ServicesAccordionRows },
      { id: 'services-tiers', label: 'Tier Cards', component: ServicesAccordionTiers },
      { id: 'services-summary', label: 'Summary Grid', component: ServicesAccordionSummary },
    ],
  },
  {
    title: 'Experiments',
    description: 'Layout patterns and color explorations',
    variants: [
      { id: 'full-bleed', label: 'Full-Bleed Zones', component: FullBleedZone },
      { id: 'contact-convergence', label: 'Contact Convergence', component: ContactConvergence },
      { id: 'green-accent', label: 'Green Accent Patterns', component: GreenAccentHalftone },
      { id: 'bg-green-tint', label: 'Background Tints', component: BackgroundGreenTint },
    ],
  },
];

const DesignPlayground = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-serif text-xl text-[#1a1a1a]">Design Playground</h1>
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

          {/* Category navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xs font-sans font-medium text-[#737373] hover:text-[#1a1a1a] transition-colors"
            >
              Grain
            </button>
            {categories.map((cat) => (
              <button
                key={cat.title}
                onClick={() => scrollToSection(`cat-${cat.title.toLowerCase()}`)}
                className="text-xs font-sans font-medium text-[#737373] hover:text-[#1a1a1a] transition-colors"
              >
                {cat.title}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('halftone-library')}
              className="text-xs font-sans font-medium text-[#737373] hover:text-[#1a1a1a] transition-colors"
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
          <h2 className="font-serif text-2xl text-[#1a1a1a] mb-4">Design System Lab</h2>
          <p className="font-sans text-[15px] text-[#525252] leading-relaxed max-w-[700px]">
            A working lab for exploring layouts, patterns, and color. Variants marked with{' '}
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1a1a1a] text-white">
              SHIPPED
            </span>{' '}
            are live on the main site.
          </p>
        </div>

        {/* Grain Comparison */}
        <section className="mb-16 pb-12 border-b border-[#e5e5e5]">
          <GrainComparison />
        </section>

        {/* Variant Categories */}
        {categories.map((category) => (
          <section
            key={category.title}
            id={`cat-${category.title.toLowerCase()}`}
            className="mb-16 pb-12 border-b border-[#e5e5e5]"
          >
            {/* Category header */}
            <div className="mb-8">
              <h3 className="font-serif text-lg text-[#1a1a1a] mb-1">{category.title}</h3>
              <p className="font-sans text-[13px] text-[#737373]">{category.description}</p>

              {/* Quick jump nav */}
              <div className="flex flex-wrap gap-2 mt-4">
                {category.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => scrollToSection(v.id)}
                    className={`px-2.5 py-1 text-[11px] font-sans font-medium rounded transition-colors ${
                      v.shipped
                        ? 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                        : 'bg-[#1a1a1a]/5 text-[#525252] hover:bg-[#1a1a1a]/10'
                    }`}
                  >
                    {v.label}
                    {v.shipped && ' ✓'}
                  </button>
                ))}
              </div>
            </div>

            {/* Variants in this category */}
            {category.variants.map((variant, idx) => (
              <div
                key={variant.id}
                id={variant.id}
                className={`py-12 ${idx < category.variants.length - 1 ? 'border-b border-[#e5e5e5]/50' : ''}`}
              >
                <variant.component />
              </div>
            ))}
          </section>
        ))}

        {/* Halftone Pattern Library */}
        <section id="halftone-library" className="py-12">
          <HalftoneLibrary />
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="font-sans text-[13px] text-[#737373] italic">
            This playground is a working lab. Tell me what's working and what isn't.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DesignPlayground;
