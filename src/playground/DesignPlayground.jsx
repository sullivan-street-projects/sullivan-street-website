import React, { useState, useEffect } from 'react';
import GrainOverlay from '../components/GrainOverlay';

// Lazy-loaded variant registry — only the selected variant is imported
const categories = [
  {
    title: 'Main Page',
    description: 'Full page layout compositions',
    variants: [
      { id: 'main-page-static', label: 'Static (No Animation)', version: 'v1 · Jan 11', load: () => import('./variants/MainPageStatic') },
      { id: 'main-page-centered', label: 'Centered + Statement', load: () => import('./variants/MainPageCentered') },
    ],
  },
  {
    title: 'Value Props',
    description: 'Core messaging layout variations',
    variants: [
      { id: 'animated-halftone', label: 'Animated Halftone', shipped: true, load: () => import('./variants/ValuePropsAnimatedHalftone') },
      { id: 'editorial-halftone', label: 'Editorial Split', load: () => import('./variants/ValuePropsEditorialHalftone') },
      { id: 'bento-cards', label: 'Bento Cards', load: () => import('./variants/ValuePropsAppleCards') },
      { id: 'minimal-halftone', label: 'Minimalist Halftone', load: () => import('./variants/ValuePropsMinimalHalftone') },
      { id: 'icon-grid', label: 'Icon Grid', load: () => import('./variants/ValuePropsWhiteCards') },
      { id: 'halftone-icons', label: 'Halftone Icons', load: () => import('./variants/ValuePropsHalftoneIcons') },
      { id: 'structured-list', label: 'Structured List', load: () => import('./variants/ValuePropsStructured') },
      { id: 'inverted-dark', label: 'Inverted (Dark)', load: () => import('./variants/ValuePropsInverted') },
      { id: 'sourced-photo', label: 'Sourced Photography', load: () => import('./variants/ValuePropsSourced') },
      { id: 'user-generated', label: 'User Generated', load: () => import('./variants/ValuePropsUserImages') },
      { id: 'editorial-text', label: 'Pure Text', load: () => import('./variants/ValuePropsEditorialText') },
      { id: 'full-halftone', label: 'Maximalist Halftone', load: () => import('./variants/ValuePropsHalftone') },
      { id: 'conceptual-svgs', label: 'Conceptual SVGs', load: () => import('./variants/ValuePropsConceptual') },
      { id: 'photo-halftone', label: 'Photo Halftone', load: () => import('./variants/ValuePropsPhotoHalftone') },
    ],
  },
  {
    title: 'Approach',
    description: 'Process and methodology visualizations',
    variants: [
      { id: 'approach-dots', label: 'Progressive Dots', shipped: true, load: () => import('./variants/ValuePropsApproachDots') },
      { id: 'approach-dice', label: 'Dice Grid', load: () => import('./variants/ValuePropsApproachDice') },
      { id: 'approach-numbered', label: 'Numbered Steps', load: () => import('./variants/ValuePropsApproachNumbered') },
      { id: 'approach-narrative', label: 'Narrative Block', load: () => import('./variants/ApproachNarrative') },
      { id: 'approach-diagram', label: 'Process Diagram', load: () => import('./variants/ApproachDiagram') },
      { id: 'approach-accordion', label: 'Accordion Flow', load: () => import('./variants/ApproachAccordionFlow') },
      { id: 'approach-cascade', label: 'Cascade Cards', load: () => import('./variants/ApproachCascade') },
      { id: 'approach-swiss', label: 'Swiss Timeline', load: () => import('./variants/ApproachSwissTimeline') },
      { id: 'approach-editorial', label: 'NYT Editorial', load: () => import('./variants/ApproachEditorial') },
      { id: 'approach-stacking', label: 'Stacking Cards', load: () => import('./variants/ApproachStacking') },
      { id: 'approach-focus', label: 'Scroll Focus', load: () => import('./variants/ApproachFocus') },
    ],
  },
  {
    title: 'Services',
    description: 'Pricing and tier presentation',
    variants: [
      { id: 'services-rows', label: 'Accordion List', load: () => import('./variants/ServicesAccordionRows') },
      { id: 'services-tiers', label: 'Tier Cards', load: () => import('./variants/ServicesAccordionTiers') },
      { id: 'services-summary', label: 'Summary Grid', load: () => import('./variants/ServicesAccordionSummary') },
    ],
  },
  {
    title: 'Page Rhythm',
    description: 'Section flow and background treatments',
    variants: [
      { id: 'statement-dark', label: 'Statement (Dark)', load: () => import('./variants/StatementDark') },
      { id: 'statement-valueprop', label: 'Editorial Spread', load: () => import('./variants/StatementValueProps') },
      { id: 'statement-text', label: 'Text Only', load: () => import('./variants/StatementValuePropsText') },
    ],
  },
  {
    title: 'Explorations',
    description: 'Layout patterns and experimental structures',
    variants: [
      { id: 'section-spacing', label: 'Section Spacing / Dividers', load: () => import('./variants/SectionSeparation') },
      { id: 'full-bleed', label: 'Full-Bleed Zones', load: () => import('./variants/FullBleedZone') },
      { id: 'contact-convergence', label: 'Contact Convergence', load: () => import('./variants/ContactConvergence') },
      { id: 'green-accent', label: 'Green Accent Test', load: () => import('./variants/GreenAccentHalftone') },
      { id: 'bg-green-tint', label: 'Background Tints', load: () => import('./variants/BackgroundGreenTint') },
    ],
  },
  {
    title: 'System',
    description: 'Core design atoms',
    variants: [
      { id: 'halftone-library', label: 'Pattern Library', load: () => import('./HalftoneLibrary') },
      { id: 'grain-comparison', label: 'Grain Overlay', load: () => import('./GrainComparison') },
    ],
  },
];

const DesignPlayground = () => {
  const [selectedVariantId, setSelectedVariantId] = useState('animated-halftone');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [LoadedComponent, setLoadedComponent] = useState(null);

  // Find the selected variant and its category
  let activeVariant = null;
  let activeCategory = null;

  for (const cat of categories) {
    const variant = cat.variants.find(v => v.id === selectedVariantId);
    if (variant) {
      activeVariant = variant;
      activeCategory = cat;
      break;
    }
  }

  // Lazy-load the selected variant
  useEffect(() => {
    setLoadedComponent(null);
    if (!activeVariant?.load) return;

    let cancelled = false;
    activeVariant.load().then(m => {
      if (!cancelled) setLoadedComponent(() => m.default);
    });
    return () => { cancelled = true; };
  }, [selectedVariantId]);

  return (
    <div className="flex h-screen w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans overflow-hidden">

      <GrainOverlay />

      {/* Mobile Header / Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#FAFAF8] border-b border-[#e5e5e5] z-40 flex items-center justify-between px-4">
        <h1 className="font-serif text-lg text-[#1a1a1a]">Playground</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-sm font-medium text-[#737373] p-2"
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-[280px] bg-[#FAFAF8] border-r border-[#e5e5e5] flex flex-col transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="px-5 py-4 border-b border-[#e5e5e5] hidden md:block">
          <div className="flex items-center justify-between mb-1">
             <h1 className="font-serif text-lg text-[#1a1a1a]">Playground</h1>
             <a
               href="/"
               className="text-[10px] font-bold text-[#737373] hover:text-[#1a1a1a] uppercase tracking-widest"
               onClick={(e) => {
                 e.preventDefault();
                 window.location.hash = '';
                 window.location.reload();
               }}
             >
               Exit
             </a>
          </div>
          <p className="text-[11px] text-[#737373]">Design system & layout lab</p>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto py-6 md:py-4 mt-14 md:mt-0">
          {categories.map((cat) => (
            <div key={cat.title} className="mb-8 px-5">
              <h3 className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest mb-3 opacity-40">
                {cat.title}
              </h3>
              <div className="space-y-0.5">
                {cat.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantId(v.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-[13px] transition-all flex items-center justify-between group ${
                      selectedVariantId === v.id
                        ? 'bg-[#1a1a1a] text-white shadow-sm'
                        : 'text-[#525252] hover:bg-[#e5e5e5]/60'
                    }`}
                  >
                    <span className="truncate mr-2">{v.label}</span>
                    {v.version && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                        selectedVariantId === v.id ? 'bg-white/10 text-white/70' : 'bg-transparent text-[#a3a3a3]'
                      }`}>
                        {v.version}
                      </span>
                    )}
                    {v.shipped && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                        selectedVariantId === v.id ? 'bg-white/20 text-white' : 'bg-[#e5e5e5] text-[#737373]'
                      }`}>
                        LIVE
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full flex flex-col relative bg-[#FAFAF8] overflow-hidden pt-14 md:pt-0">

        {/* Desktop Toolbar */}
        <div className="hidden md:flex h-14 border-b border-[#e5e5e5] items-center justify-between px-8 shrink-0 bg-[#FAFAF8] z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider">
              {activeCategory?.title}
            </span>
            <span className="text-[#d4d4d4] mx-2">/</span>
            <span className="font-serif text-[#1a1a1a] text-lg">
              {activeVariant?.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
             {activeVariant?.shipped && (
                <div className="flex items-center gap-2 px-2 py-1 bg-[#4ADE80]/10 rounded border border-[#4ADE80]/20">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                   <span className="text-[10px] font-bold text-[#15803d] uppercase tracking-wide">Production</span>
                </div>
             )}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto relative bg-[#FAFAF8]">
           <div className="w-full max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-24">
              {LoadedComponent ? <LoadedComponent /> : (
                <div className="text-center text-[#999] py-24">Loading...</div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default DesignPlayground;
