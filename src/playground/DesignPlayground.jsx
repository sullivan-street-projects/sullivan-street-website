import React, { useState } from 'react';
import GrainComparison from './GrainComparison';
import HalftoneLibrary from './HalftoneLibrary';

// --- SECTIONS: VALUE PROPS ---
import ValuePropsAnimatedHalftone from './variants/ValuePropsAnimatedHalftone'; // Shipped
import ValuePropsEditorialHalftone from './variants/ValuePropsEditorialHalftone';
import ValuePropsMinimalHalftone from './variants/ValuePropsMinimalHalftone';
import ValuePropsHalftoneIcons from './variants/ValuePropsHalftoneIcons';
import ValuePropsAppleCards from './variants/ValuePropsAppleCards';
import ValuePropsWhiteCards from './variants/ValuePropsWhiteCards';
import ValuePropsSourced from './variants/ValuePropsSourced';
import ValuePropsUserImages from './variants/ValuePropsUserImages';
import ValuePropsInverted from './variants/ValuePropsInverted';
import ValuePropsStructured from './variants/ValuePropsStructured';
import ValuePropsEditorialText from './variants/ValuePropsEditorialText';
import ValuePropsHalftone from './variants/ValuePropsHalftone';

// --- SECTIONS: APPROACH ---
import ValuePropsApproachDots from './variants/ValuePropsApproachDots'; // Shipped
import ValuePropsApproachDice from './variants/ValuePropsApproachDice';
import ValuePropsApproachNumbered from './variants/ValuePropsApproachNumbered';
import ApproachNarrative from './variants/ApproachNarrative';

// --- SECTIONS: SERVICES ---
import ServicesAccordionRows from './variants/ServicesAccordionRows';
import ServicesAccordionTiers from './variants/ServicesAccordionTiers';
import ServicesAccordionSummary from './variants/ServicesAccordionSummary';

// --- MAIN PAGE ---
import MainPageStatic from './variants/MainPageStatic';

// --- EXPLORATIONS ---
import ContactConvergence from './variants/ContactConvergence';
import FullBleedZone from './variants/FullBleedZone';
import GreenAccentHalftone from './variants/GreenAccentHalftone';
import BackgroundGreenTint from './variants/BackgroundGreenTint';
import SectionSeparation from './variants/SectionSeparation';

// Organized variant categories
const categories = [
  {
    title: 'Main Page',
    description: 'Full page layout compositions',
    variants: [
      { id: 'main-page-static', label: 'Static (No Animation)', version: 'v1 · Jan 11', component: MainPageStatic },
    ],
  },
  {
    title: 'Value Props',
    description: 'Core messaging layout variations',
    variants: [
      // LIVE
      { id: 'animated-halftone', label: 'Animated Halftone', component: ValuePropsAnimatedHalftone, shipped: true },
      
      // High Fidelity / Strong Contenders
      { id: 'editorial-halftone', label: 'Editorial Split', component: ValuePropsEditorialHalftone },
      { id: 'bento-cards', label: 'Bento Cards', component: ValuePropsAppleCards },
      { id: 'minimal-halftone', label: 'Minimalist Halftone', component: ValuePropsMinimalHalftone },
      
      // Layout Explorations
      { id: 'icon-grid', label: 'Icon Grid', component: ValuePropsWhiteCards },
      { id: 'halftone-icons', label: 'Halftone Icons', component: ValuePropsHalftoneIcons },
      { id: 'structured-list', label: 'Structured List', component: ValuePropsStructured },
      { id: 'inverted-dark', label: 'Inverted (Dark)', component: ValuePropsInverted },
      
      // Image Explorations
      { id: 'sourced-photo', label: 'Sourced Photography', component: ValuePropsSourced },
      { id: 'user-generated', label: 'User Generated', component: ValuePropsUserImages },
      
      // Deprecated / Early Concepts
      { id: 'editorial-text', label: 'Pure Text', component: ValuePropsEditorialText },
      { id: 'full-halftone', label: 'Maximalist Halftone', component: ValuePropsHalftone },
    ],
  },
  {
    title: 'Approach',
    description: 'Process and methodology visualizations',
    variants: [
      { id: 'approach-dots', label: 'Progressive Dots', component: ValuePropsApproachDots, shipped: true },
      { id: 'approach-dice', label: 'Dice Grid', component: ValuePropsApproachDice },
      { id: 'approach-numbered', label: 'Numbered Steps', component: ValuePropsApproachNumbered },
      { id: 'approach-narrative', label: 'Narrative Block', component: ApproachNarrative },
    ],
  },
  {
    title: 'Services',
    description: 'Pricing and tier presentation',
    variants: [
      { id: 'services-rows', label: 'Accordion List', component: ServicesAccordionRows },
      { id: 'services-tiers', label: 'Tier Cards', component: ServicesAccordionTiers },
      { id: 'services-summary', label: 'Summary Grid', component: ServicesAccordionSummary },
    ],
  },
  {
    title: 'Explorations',
    description: 'Layout patterns and experimental structures',
    variants: [
      { id: 'section-spacing', label: 'Section Spacing / Dividers', component: SectionSeparation },
      { id: 'full-bleed', label: 'Full-Bleed Zones', component: FullBleedZone },
      { id: 'contact-convergence', label: 'Contact Convergence', component: ContactConvergence },
      { id: 'green-accent', label: 'Green Accent Test', component: GreenAccentHalftone },
      { id: 'bg-green-tint', label: 'Background Tints', component: BackgroundGreenTint },
    ],
  },
  {
    title: 'System',
    description: 'Core design atoms',
    variants: [
      { id: 'halftone-library', label: 'Pattern Library', component: HalftoneLibrary },
      { id: 'grain-comparison', label: 'Grain Overlay', component: GrainComparison },
    ],
  },
];

const DesignPlayground = () => {
  const [selectedVariantId, setSelectedVariantId] = useState('animated-halftone');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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

  return (
    <div className="flex h-screen w-full bg-[#FAFAF8] text-[#1a1a1a] font-sans overflow-hidden">
      
      {/* Global Grain Overlay (matches App.jsx) */}
      <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.04]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

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
              {activeVariant?.component && <activeVariant.component />}
           </div>
        </div>
      </main>
    </div>
  );
};

export default DesignPlayground;