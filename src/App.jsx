import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Constants ---

const BRANDS = [
  'Apple',
  'American Express',
  'JPMorgan Chase',
  'Samsung',
  'Navan',
  'Comcast',
  'Google',
  'Publicis',
];

const NAV_ITEMS = [
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' }
];

const VALUE_PROPS = [
  {
    title: 'Fractional Growth Executive',
    description: 'CMO, VP, or Director-level leadership—embedded with your team from business planning through execution. Enterprise experience, startup speed.'
  },
  {
    title: 'Marketing General Contractor',
    description: 'We bring in hand-picked specialists for media, creative, analytics, and automation—and manage the build so you don’t have to.'
  },
  {
    title: 'AI-Enabled, Outcome-Obsessed',
    description: 'We use AI to compress timelines, reduce overhead, and maximize the return on your marketing investment.'
  }
];

const CAPABILITIES = [
  {
    title: 'Business Planning',
    description: 'Every engagement starts with your commercial objectives, market realities, and unit economics. We keep marketing in lockstep with your P&L.',
  },
  {
    title: 'Marketing Strategy',
    description: 'We distill brand, audience, and lifecycle into a clear roadmap: who to reach, what to say, and why it moves the needle.',
  },
  {
    title: 'Media Activation',
    description: 'We run the channels that drive your growth—Meta, Google, Microsoft, email, and beyond.',
  },
  {
    title: 'Campaign Execution',
    description: 'Scroll-stopping creative and content that converts attention into revenue while reinforcing brand equity.',
  },
];

const SERVICES = [
  {
    title: 'Advisory',
    target: 'For founders who need a thought leader.',
    qualifier: 'You’re making decisions daily—hiring, channels, vendors, positioning. Advisory gives you a senior strategist in your corner: regular calls, async access, and honest guidance on what’s working and what isn’t.',
    ifText: 'You have a team executing but need strategic clarity at the top.',
    features: ['Growth strategy consultation', 'Marketing leadership coaching', 'Vendor evaluation and selection'],
  },
  {
    title: 'Strategy',
    target: 'For teams ready to build the playbook.',
    qualifier: 'You know you need a plan—but the right one, not a generic framework. We audit what you have, model the investment required, and deliver a roadmap your team can execute with confidence.',
    ifText: 'You’re preparing to scale and need a blueprint before you hire or spend more.',
    features: ['Marketing audit and strategy', 'Investment modeling', 'Channel prioritization and roadmaps'],
  },
  {
    title: 'Management',
    target: 'For operators who want execution handled.',
    qualifier: 'We become your growth department. We build and lead your marketing team, manage agencies and vendors, and take full ownership of performance. You get leverage without the overhead.',
    ifText: 'You’re past strategy and need someone to run it—yesterday.',
    features: ['Campaign implementation', 'Ongoing optimization and reporting', 'Specialist recruitment and oversight'],
  },
];

// --- Shared Components ---

const TypewriterText = ({ text }) => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setIndex(0);
        setActive(false);
        if (timerRef.current) clearTimeout(timerRef.current);
      } else {
        timerRef.current = setTimeout(() => setActive(true), 500);
      }
    }, { threshold: 0 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    if (index < text.length) {
      const timeout = setTimeout(() => setIndex(prev => prev + 1), 100);
      return () => clearTimeout(timeout);
    }
  }, [index, active, text]);

  return (
    <span ref={containerRef} className="italic relative inline-block">
      <span className="invisible select-none pointer-events-none">{text}</span>
      <span className="absolute left-0 top-0 inline-flex items-baseline whitespace-nowrap">
        <span>{text.slice(0, index)}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="w-[2px] h-[0.75em] bg-[#1a1a1a] ml-1 self-center"
          style={{ visibility: active ? 'visible' : 'hidden' }}
        />
      </span>
    </span>
  );
};

const FocusText = ({ children, className = "", noBlur = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 98%", "center 50%", "top 80px"]
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [noBlur ? 0 : 3.5, 0, 0, 40]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.1, 0.92, 1], [noBlur ? 1 : 0.4, 1, 1, 0]);
  const yValue = useTransform(scrollYProgress, [0, 0.1], [8, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        filter: useTransform(blurValue, (v) => `blur(${v}px)`),
        opacity: opacityValue,
        y: yValue,
        transform: 'translateZ(0)',
      }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * Refactored Section component:
 * - Label sits above the title on all screens.
 * - Increased vertical padding for better breathing room.
 */
const Section = ({ id, label, children, className = "", divider = true, padding = "py-32 lg:py-64" }) => (
  <div className={`max-w-[1200px] mx-auto px-6 lg:px-8 ${className}`}>
    {divider && <div className="border-t border-[#e5e5e5]" />}
    <section id={id} className={padding}>
      {label && (
        <div className="mb-16">
          <FocusText>
            <span className="font-sans text-[10px] text-[#999] uppercase tracking-[0.3em] font-bold">
              {label}
            </span>
          </FocusText>
        </div>
      )}
      <div>
        {children}
      </div>
    </section>
  </div>
);

const ServiceRow = ({ service }) => (
  <div className="py-24 border-t border-[#e5e5e5] first:border-t-0">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
      <div className="lg:col-span-4">
        <FocusText>
          <h3 className="font-serif text-2xl md:text-3xl mb-4">{service.title}</h3>
          <p className="font-sans text-[11px] text-[#999] tracking-wider uppercase font-semibold">{service.target}</p>
        </FocusText>
      </div>
      <div className="lg:col-span-5">
        <FocusText className="space-y-10">
          <p className="font-sans text-[17px] md:text-[18px] text-[#555] leading-relaxed font-light italic">
            {service.qualifier}
          </p>
          <p className="font-sans text-[13px] text-[#aaa] italic leading-relaxed opacity-80">
            {service.ifText}
          </p>
        </FocusText>
      </div>
      <div className="lg:col-span-3">
        <FocusText>
          <ul className="font-sans text-[13px] text-[#888] space-y-6">
            <li className="font-bold text-[#1a1a1a] uppercase text-[9px] tracking-widest mb-2">Includes:</li>
            {service.features.map((feature) => (
              <li key={feature} className="flex gap-4 items-start">
                <span className="mt-1.5 w-1 h-1 bg-[#1a1a1a]/20 rounded-full shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </FocusText>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FAFAF8] relative overflow-x-hidden font-sans">
      
      {/* Subtle Grain Overlay - Dialed back for "felt not seen" effect */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Libre Baskerville', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-[80] bg-[#FAFAF8]/50 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-xl pointer-events-auto hover:opacity-60 transition-opacity text-[#1a1a1a]">
            Sullivan Street Projects
          </button>
        </div>
      </header>

      {/* Floating Bottom Navigation - Centered and Compact */}
      <nav className="fixed bottom-6 md:bottom-10 left-0 w-full z-[100] pointer-events-none pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-center pointer-events-auto">
          <div className="bg-[#1a1a1a]/5 backdrop-blur-xl border border-[#1a1a1a]/10 rounded-full p-1 flex items-center gap-1 shadow-2xl overflow-hidden">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="px-4 md:px-5 py-2 rounded-full font-sans text-[8.5px] md:text-[10px] uppercase tracking-[0.12em] text-[#1a1a1a]/60 hover:text-[#1a1a1a] hover:bg-white/50 transition-all font-bold whitespace-nowrap active:scale-95 flex items-center gap-2"
              >
                {item.id === 'contact' && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4ADE80]"></span>
                  </span>
                )}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="relative z-[2]">
        
        {/* 1. Hero */}
        <header className="max-w-[1200px] mx-auto px-6 lg:px-8 pt-48 pb-32 lg:pt-72 lg:pb-64">
          <div className="max-w-[1000px]">
            <FocusText noBlur={true}>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-[76px] leading-[1.26] tracking-tight mb-12">
                Marketing for Tomorrow’s <br className="hidden md:block" />
                <TypewriterText text="Billion-Dollar Brands" />
              </h1>
            </FocusText>
            <FocusText noBlur={true}>
              <p className="font-sans text-[17px] md:text-[19px] text-[#555] leading-relaxed max-w-[650px] mb-14 font-light">
                AI-powered strategy, media, and execution—unlock revenue faster, with more focus and greater profit.
              </p>
            </FocusText>
            <FocusText noBlur={true}>
              <div className="group relative inline-block">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="font-sans text-[12px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-4 hover:opacity-70 transition-all"
                >
                  Schedule a call
                  <motion.span 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
                    className="text-lg"
                  >→</motion.span>
                </button>
                <div className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-[#1a1a1a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>
            </FocusText>
          </div>
        </header>

        {/* 2. Credentials */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 pb-16">
          <div className="border-t border-[#e5e5e5]" />
          <section className="py-24">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-baseline">
              <div className="lg:w-1/4 shrink-0">
                <FocusText>
                  <span className="font-sans text-[11px] text-[#aaa] tracking-[0.25em] uppercase font-bold">
                    $2B+ in media managed for
                  </span>
                </FocusText>
              </div>
              <div className="flex-grow">
                <div className="flex flex-wrap gap-x-16 gap-y-10">
                  {BRANDS.map((brand) => (
                    <FocusText key={brand}>
                      <span className="font-sans text-[13px] font-medium text-[#888] uppercase tracking-widest cursor-default hover:text-[#1a1a1a] transition-colors">
                        {brand}
                      </span>
                    </FocusText>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 3. Intro */}
        <Section label="Opportunity">
          <div className="max-w-[800px] space-y-12">
            <FocusText>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight italic">
                It’s Time to Make Marketing Work The Way You Work
              </h2>
            </FocusText>
            <FocusText>
              <p className="font-sans text-[17px] md:text-[19px] text-[#555] leading-relaxed font-light tracking-wide">
                Modern marketing is a mess. Too many platforms, vendors, and agencies. Too much noise, not enough signal. We cut through the chaos and focus on the only metric that matters—profitable growth.
              </p>
            </FocusText>
          </div>
        </Section>

        {/* 4. Value Props - Labeled purely by Content */}
        <div className="bg-[#f4f4f2]/50 py-32 lg:py-56">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
              {VALUE_PROPS.map((prop, idx) => (
                <FocusText key={idx} className="space-y-8">
                  <h3 className="font-serif text-2xl lg:text-3xl leading-tight text-[#1a1a1a]">{prop.title}</h3>
                  <p className="font-sans text-[16px] text-[#666] leading-relaxed font-light">{prop.description}</p>
                </FocusText>
              ))}
            </div>
          </div>
        </div>

        {/* 5. What We Do - Spaced Grid */}
        <Section id="capabilities" label="Capabilities">
          <div className="mb-24">
            <FocusText>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-12 text-[#1a1a1a]">
                A tailor-made approach to growth marketing.
              </h2>
              <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#555] font-light">
                We’re a fractional growth consultancy delivering enterprise-grade advisory, strategy, and marketing operations. We bring in the right specialists to execute and scale—under our direction.
              </p>
            </FocusText>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-0 relative">
            {CAPABILITIES.map((capability, idx) => (
              <React.Fragment key={capability.title}>
                <div className="lg:w-[22%] shrink-0">
                  <FocusText className="space-y-6">
                    <div className="w-10 h-px bg-[#1a1a1a]/20" />
                    <h3 className="font-serif text-xl leading-tight">{capability.title}</h3>
                    <p className="font-sans text-[15px] text-[#666] leading-relaxed font-light">
                      {capability.description}
                    </p>
                  </FocusText>
                </div>
                
                {/* Visual Connector Arrows (Desktop) */}
                {idx < CAPABILITIES.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center flex-grow">
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      whileInView={{ opacity: 1, x: 0 }} 
                      viewport={{ once: true }} 
                      className="text-[#e5e5e5]"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                )}

                {/* Mobile Arrows */}
                {idx < CAPABILITIES.length - 1 && (
                  <div className="flex lg:hidden items-center justify-start py-4">
                    <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[#e5e5e5]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-90">
                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Section>

        {/* 6. How We Work */}
        <Section id="services" label="Services">
          <div className="mb-24">
            <FocusText>
              <h2 className="font-serif text-4xl lg:text-5xl mb-8 italic">From Blueprint to Build</h2>
              <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] text-[#555] font-light">
                SSP manages your marketing investment so every dollar drives growth. One voice. One point of contact. The right team for the job.
              </p>
            </FocusText>
          </div>
          <div className="space-y-0">
            {SERVICES.map((service) => (
              <ServiceRow key={service.title} service={service} />
            ))}
          </div>
        </Section>

        {/* 7. Partner Outcomes */}
        <div>
          <Section label="Partner Outcomes" divider={true}>
            <div className="max-w-[800px] mx-auto">
              <FocusText>
                <p className="font-serif text-2xl md:text-3xl lg:text-[38px] leading-[1.4] mb-10 italic text-[#444] font-light antialiased">
                  “SSP came in right before Q4 and got to work fast. Precise, focused, and strategic. The result? Nearly 60% revenue growth that quarter.”
                </p>
              </FocusText>
              <FocusText>
                <div className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#999]">
                  CEO, $5M+ Beauty E-commerce Retailer
                </div>
              </FocusText>
            </div>
          </Section>
        </div>

        {/* 8. About */}
        <Section id="about" label="About">
          <div className="max-w-[850px] space-y-24">
            <div className="space-y-12">
              <FocusText>
                <h2 className="font-serif text-3xl md:text-5xl italic">Building Tomorrow’s Billion-Dollar Brands</h2>
              </FocusText>
              <div className="font-sans text-[17px] text-[#555] leading-relaxed space-y-10 font-light tracking-wide">
                <FocusText>
                  <p>
                    After managing $2 billion in media for Apple, American Express, Comcast, and other global brands, Brett Wohl saw the same story repeat: growth stalling under slow-moving agencies and one-size-fits-all tech. He founded Sullivan Street Projects to give ambitious companies Fortune 500 expertise on demand—enterprise-grade strategy, practical AI leverage, and a hand-picked network of specialists.
                  </p>
                </FocusText>
                <FocusText>
                  <p>
                    Our mission is simple: help growth-stage companies become the next generation of market leaders. We bridge brand and performance to drive one outcome—profitable, compounding growth.
                  </p>
                </FocusText>
              </div>
            </div>

            {/* Founder Bio */}
            <div className="pt-16 lg:pt-24 border-t border-[#e5e5e5]">
              <FocusText>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  <div className="lg:col-span-4 flex lg:flex-col items-center lg:items-start gap-6">
                    <div className="w-20 h-20 shrink-0 overflow-hidden rounded-full">
                      <img 
                        src="image.png" 
                        alt="Brett Wohl" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <div className="text-center lg:text-left">
                      <h4 className="font-serif text-xl leading-none mb-3 text-[#1a1a1a]">Brett Wohl</h4>
                      <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#aaa]">Founder, Managing Partner</p>
                    </div>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-sans text-[16px] md:text-[17px] text-[#666] leading-relaxed font-light">
                      Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe. He brings deep expertise in omnichannel strategy, programmatic media, and marketing analytics to every engagement. Brett holds a dual B.S. in Advertising and Marketing with a minor in Economics from Syracuse University.
                    </p>
                  </div>
                </div>
              </FocusText>
            </div>
          </div>
        </Section>

        {/* 9. Contact */}
        <div className="bg-[#f0f0ee]">
          <Section id="contact" label="Contact" divider={false}>
            <div className="max-w-[1000px] py-20">
              <FocusText className="space-y-20">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-[70px] leading-[1.1] text-[#1a1a1a] tracking-tight">
                  Ready to build <br />
                  <TypewriterText text="Tomorrow’s Billion-Dollar Brand?" />
                </h2>
                <div className="group relative inline-block">
                  <a
                    href="mailto:hello@sullivanstreetprojects.co"
                    className="font-serif text-3xl md:text-4xl lg:text-5xl italic inline-flex items-center gap-10 hover:opacity-70 transition-all"
                  >
                    Schedule a call
                    <motion.span animate={{ x: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="text-4xl lg:text-6xl not-italic">→</motion.span>
                  </a>
                  <div className="absolute -bottom-4 left-0 w-full h-[1.5px] bg-[#1a1a1a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>
              </FocusText>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="bg-[#FAFAF8] pt-32 pb-44 border-t border-[#e5e5e5]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
              <div className="lg:col-span-5">
                <span className="font-serif text-2xl font-bold block mb-6 text-[#1a1a1a]">Sullivan Street Projects</span>
                <p className="font-sans text-[14px] text-[#888] leading-relaxed max-w-[400px]">
                  Stop guessing. Start growing.
                </p>
              </div>
              <div className="lg:col-span-3">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-6 text-[#aaa]">Location</p>
                <p className="font-sans text-[14px] text-[#555] leading-relaxed">
                  1178 Broadway<br />
                  New York, NY 10001
                </p>
              </div>
              <div className="lg:col-span-4">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-6 text-[#aaa]">Legal</p>
                <div className="flex flex-col gap-4 font-sans text-[13px] text-[#555]">
                  <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms & Conditions</a>
                  <p className="mt-8 text-[#bbb]">© {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.</p>
                  <p className="mt-2 text-[#ccc] text-[11px]">Built in NYC with Google Gemini.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}