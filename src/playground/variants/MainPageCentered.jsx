import { VALUE_PROPS, CAPABILITIES, BRANDS } from '../../constants';

/**
 * Main Page — Center Aligned
 *
 * Full site layout with center alignment throughout.
 * Includes dark statement section between Credentials and Value Props.
 * Static (no animations), text-only value props.
 */

const SectionLabel = ({ children }) => (
  <div className="mb-12 md:mb-16">
    <span className="font-sans text-[10px] text-[#737373] uppercase tracking-[0.3em] font-bold">
      {children}
    </span>
  </div>
);

const Section = ({ id, label, children, divider = true, className = '' }) => (
  <section id={id} className={`py-24 md:py-32 lg:py-48 ${divider ? 'border-t border-[#e5e5e5]' : ''} ${className}`}>
    {label && <SectionLabel>{label}</SectionLabel>}
    {children}
  </section>
);

const CTALink = ({ children, size = 'sm' }) => {
  const isLarge = size === 'lg';
  return (
    <div className="group relative inline-block">
      {isLarge ? (
        <span className="font-serif text-3xl md:text-4xl lg:text-5xl italic inline-flex items-center gap-6 md:gap-10 text-[#1a1a1a]">
          {children}
          <span className="not-italic">→</span>
        </span>
      ) : (
        <span className="font-sans text-[12px] font-bold uppercase tracking-[0.25em] inline-flex items-center gap-4 text-[#1a1a1a]">
          {children}
          <span className="text-lg">→</span>
        </span>
      )}
      <div className={`absolute ${isLarge ? '-bottom-4' : '-bottom-2'} left-0 w-full h-[1.5px] bg-[#1a1a1a]`} />
    </div>
  );
};

const MinimalDot = ({ count = 1 }) => (
  <div className="flex gap-1.5 justify-center">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/40" />
    ))}
  </div>
);

const MainPageCentered = () => (
  <div className="space-y-0">

    {/* Hero — centered */}
    <header className="pt-40 pb-32 md:pt-48 lg:pt-64 lg:pb-48 text-center">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-[76px] leading-[1.26] tracking-tight mb-8 md:mb-12 text-[#1a1a1a]">
          Marketing for Tomorrow's <br />
          <span className="italic">Billion-Dollar Brands</span>
        </h1>
        <p className="font-sans text-[17px] md:text-[20px] leading-relaxed mb-10 text-[#404040] font-light">
          AI-powered strategy, media, and execution. <br className="hidden md:block" />
          Faster growth. Sharper focus. Higher profit.
        </p>
        <CTALink>Schedule a call</CTALink>
      </div>
    </header>

    {/* Credentials — centered */}
    <section className="pb-16">
      <div className="border-t border-[#e5e5e5]" />
      <div className="py-20 md:py-24 text-center">
        <span className="font-sans text-[11px] text-[#737373] tracking-[0.25em] uppercase font-bold block mb-10">
          Our team has managed $2B+ for
        </span>
        <div className="flex flex-wrap justify-center gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-10 max-w-[900px] mx-auto">
          {BRANDS.map((brand) => (
            <span key={brand} className="font-sans text-[13px] font-medium text-[#737373] uppercase tracking-widest">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* ─── DARK STATEMENT ──────────────────────────────────── */}
    <div
      className="-mx-6 md:-mx-8 px-6 md:px-8"
      style={{ background: '#1a1a1a' }}
    >
      <div className="max-w-[900px] mx-auto py-28 md:py-36 lg:py-44 text-center">
        <span
          className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          The Opportunity
        </span>

        <h2
          className="font-serif text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] leading-[1.15] tracking-tight"
          style={{ color: '#ffffff' }}
        >
          Everything in marketing<br />is changing.
        </h2>

        <div
          className="w-16 h-px mt-12 mb-10 mx-auto"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        />

        <div className="max-w-[580px] mx-auto space-y-5">
          <p
            className="font-sans text-[17px] md:text-[19px] leading-[1.7] font-light"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            The old playbook — big agencies, disconnected vendors, months of
            planning — doesn't work anymore. AI is reshaping how brands grow,
            and most businesses are still catching up.
          </p>
          <p
            className="font-sans text-[17px] md:text-[19px] leading-[1.7] font-light"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            We help growth-stage brands move faster, spend smarter, and
            scale with clarity.
          </p>
        </div>
      </div>
    </div>

    {/* ─── VALUE PROPS — warm paper, centered text-only ───── */}
    <div
      className="-mx-6 md:-mx-8 px-6 md:px-8"
      style={{ background: '#f0f0ee' }}
    >
      <div className="py-20 md:py-28 lg:py-32 text-center">
        <span
          className="block font-sans text-[10px] uppercase tracking-[0.35em] font-semibold mb-16 md:mb-20"
          style={{ color: '#737373' }}
        >
          How We Work
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {VALUE_PROPS.map((prop, idx) => (
            <div
              key={idx}
              className={`py-8 md:py-0 md:px-8 md:first:pl-0 md:last:pr-0 ${
                idx < 2 ? 'border-b md:border-b-0 md:border-r border-[#d4d4d4]/60' : ''
              }`}
            >
              <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] mb-3">
                {prop.title}
              </h3>
              <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4 mx-auto" />
              <p className="font-sans text-[15px] text-[#737373] leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Approach — centered */}
    <Section id="approach" label="Approach">
      <div className="mb-20 md:mb-24 text-center">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl mb-8 md:mb-12 text-[#1a1a1a]">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] leading-relaxed max-w-[800px] mx-auto text-[#404040] font-light">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-center">
        {CAPABILITIES.map((cap, idx) => (
          <div
            key={cap.title}
            className={`py-8 md:px-6 md:first:pl-0 md:last:pr-0 border-[#e5e5e5]/60
              ${idx % 2 === 0 ? 'md:border-r' : ''}
              ${idx < 3 ? 'lg:border-r' : ''}`}
          >
            <div className="mb-5"><MinimalDot count={idx + 1} /></div>
            <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] mb-3">{cap.title}</h3>
            <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4 mx-auto" />
            <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">{cap.description}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* About — centered */}
    <Section id="about" label="About">
      <div className="max-w-[850px] mx-auto space-y-20 md:space-y-24 text-center">
        <div className="space-y-10 md:space-y-12">
          <h2 className="font-serif text-3xl md:text-5xl italic text-[#1a1a1a]">
            Yesterday's agencies aren't built for tomorrow's brands.
          </h2>
          <div className="font-sans text-[17px] text-[#404040] leading-relaxed space-y-8 font-light">
            <p>They were designed for a world where it took teams of people to do all the work. That world is changing—from media buying to creative to content, from analysis to optimization. AI now touches everything in marketing, so the work that matters has changed too.</p>
            <p>Today's advantage is orchestration: managing systems, aligning teams, and making business decisions that connect to your bottom line—the kind of decisions AI can't make without a human in the loop.</p>
            <p>Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We're who businesses call when they need more than point solutions and disconnected vendors. We partner with you, look across your business, translate goals into a clear plan, and manage marketing like the investment it is.</p>
          </div>
        </div>

        {/* Founder */}
        <div className="pt-16 lg:pt-24 border-t border-[#e5e5e5]">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#e5e5e5]" />
            <div>
              <h4 className="font-serif text-xl leading-none mb-2 text-[#1a1a1a]">Brett Wohl</h4>
              <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Founder, Managing Partner</p>
            </div>
          </div>
          <p className="font-sans text-[13px] text-[#525252] leading-relaxed font-light italic mt-8 max-w-[600px] mx-auto">
            Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
          </p>
        </div>
      </div>
    </Section>

    {/* Contact — centered */}
    <div className="bg-[#f0f0ee] -mx-6 md:-mx-8 px-6 md:px-8">
      <Section id="contact" label="Call" divider={false}>
        <div className="max-w-[1000px] mx-auto py-16 md:py-20 space-y-16 md:space-y-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[70px] leading-[1.1] text-[#1a1a1a] tracking-tight">
            Ready to build <br />
            <span className="italic">Tomorrow's Billion-Dollar Brand?</span>
          </h2>
          <CTALink size="lg">Schedule a call</CTALink>
        </div>
      </Section>
    </div>

  </div>
);

export default MainPageCentered;
