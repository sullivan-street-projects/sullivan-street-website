import { VALUE_PROPS, CAPABILITIES, BRANDS, TIERS, FEATURES, MOBILE_TIERS, PARTNER_OUTCOMES } from '../../constants';

// --- Primitives ---

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

// --- Page ---

const MainPageStatic = () => (
  <div className="space-y-0">

    {/* Hero */}
    <header className="pt-40 pb-32 md:pt-48 lg:pt-64 lg:pb-48">
      <div className="max-w-[1000px]">
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

    {/* Credentials */}
    <section className="pb-16">
      <div className="border-t border-[#e5e5e5]" />
      <div className="py-20 md:py-24 flex flex-col lg:flex-row gap-8 lg:gap-24 items-baseline">
        <div className="lg:w-1/4 shrink-0">
          <span className="font-sans text-[11px] text-[#737373] tracking-[0.25em] uppercase font-bold">
            Before SSP, our team managed $2B+ for
          </span>
        </div>
        <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-10">
          {BRANDS.map((brand) => (
            <span key={brand} className="font-sans text-[13px] font-medium text-[#737373] uppercase tracking-widest">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* Statement */}
    <Section divider={true}>
      <div className="max-w-[700px] mx-auto lg:mx-0 space-y-10 md:space-y-12">
        <p className="font-serif text-2xl md:text-4xl leading-snug text-[#1a1a1a]">
          Most growth-stage companies have agencies, freelancers, and tools. <em className="italic">What they don't have is someone owning the outcome.</em>
        </p>
        <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide">
          We're the AI-native growth partner that aligns brand, performance, systems, and talent under one team — and stays accountable to revenue, not a percentage of your ad spend.
        </p>
      </div>
    </Section>

    {/* Intro (Value Props) */}
    <Section label="Opportunity">
      <div className="mb-16 md:mb-20">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#1a1a1a] mb-8 md:mb-12">
          Make Marketing Work<br /><span className="italic">For Your Business.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[800px]">
          Three ways we embed with your team to drive growth — from strategic guidance to full operational ownership.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {VALUE_PROPS.map((prop, idx) => (
          <div key={idx} className={`py-8 ${idx === 0 ? 'md:pr-6' : idx === 2 ? 'md:pl-6' : 'md:px-6'} ${idx < 2 ? 'md:border-r border-[#e5e5e5]/60' : ''}`}>
            <h3 className="font-serif text-[20px] leading-snug text-[#1a1a1a] mb-3">{prop.title}</h3>
            <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
            <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">{prop.description}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* Approach */}
    <Section id="approach" label="Approach">
      <div className="mb-20 md:mb-28 lg:mb-36">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#1a1a1a] mb-8 md:mb-12">
          Tailor made<br /><span className="italic">growth marketing.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[800px]">
          You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
        </p>
      </div>

      {CAPABILITIES.map((cap, idx) => (
        <div key={cap.title}>
          <div className="h-px bg-[#1a1a1a]/10" />
          <div className="grid grid-cols-12 py-10 md:py-14 lg:py-16">
            <div className="col-span-3 md:col-span-2">
              <span className="font-serif text-[#1a1a1a]/10 text-[56px] md:text-[72px] lg:text-[88px] leading-none select-none">
                {idx + 1}
              </span>
            </div>
            <div className="col-span-9 md:col-span-8 lg:col-span-6 pt-2 md:pt-3">
              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl leading-snug text-[#1a1a1a] mb-4 md:mb-5">
                {cap.title}
              </h3>
              <p className="font-sans text-[15px] md:text-[17px] text-[#525252] leading-relaxed font-light">
                {cap.description}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="h-px bg-[#1a1a1a]/10" />
    </Section>

    {/* Services */}
    <Section id="services" label="Services" className="py-16 md:py-24 lg:py-32">
      <div className="mb-12 md:mb-16">
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#1a1a1a] mb-8">
          Your marketing investment,<br /><span className="italic">managed.</span>
        </h2>
        <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[800px]">
          One point of contact. The right team for the job.
        </p>
      </div>

      {/* Service Tiers */}
      {MOBILE_TIERS.map((tier) => (
        <div key={tier.id} className="border-b border-[#e5e5e5]">
          <div className="py-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] mb-1">{tier.title}</h3>
            <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">{tier.subtitle}</p>
          </div>
          <div className="pb-8">
            <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light mb-6">
              {tier.description}
            </p>
            <p className="font-sans text-[13px] italic text-[#737373] mb-5">{tier.includesText}</p>
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="font-sans text-[15px] text-[#525252] font-light flex items-start">
                  <span className="text-[#1a1a1a] mr-3">●</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <p className="font-sans text-[13px] italic text-[#737373]">
          Diagnostic assessments available by request.
        </p>
      </div>
      <div className="mt-10">
        <p className="font-sans text-[15px] text-[#525252] mb-4">
          Not sure which level of support you need?
        </p>
        <CTALink>Schedule a call</CTALink>
      </div>
    </Section>

    {/* Partner Outcomes */}
    <Section label="Partner Outcomes">
      <div className="max-w-[800px]">
        {PARTNER_OUTCOMES.map((outcome, idx) => (
          <div key={outcome.id} className={`${idx > 0 ? 'mt-16 pt-16 border-t border-[#e5e5e5]' : ''}`}>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] text-[#404040] font-light mb-6">
              {outcome.metric}
            </p>
            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#737373]">
              {outcome.client}
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* About */}
    <Section id="about" label="About">
      <div className="max-w-[700px] space-y-20 md:space-y-24">
        <div className="space-y-10 md:space-y-12">
          <h2 className="font-serif text-3xl md:text-5xl italic text-[#1a1a1a]">
            Yesterday's agencies aren't built for tomorrow's brands.
          </h2>
          <div className="font-sans text-[17px] text-[#404040] leading-relaxed space-y-8 font-light tracking-wide">
            <p>They were built for a world where scale meant headcount. Today, the advantage belongs to teams that orchestrate — managing systems, aligning talent, and making the business decisions AI can't make without a human in the loop.</p>
            <p>Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We're who businesses call when they need more than point solutions and disconnected vendors. We partner with you, look across your business, translate goals into a clear plan, and manage marketing like the investment it is.</p>
          </div>
        </div>

        {/* Founder */}
        <div className="pt-16 lg:pt-24 border-t border-[#e5e5e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#e5e5e5] overflow-hidden">
                <img src="image.webp" alt="Brett Wohl" className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <div>
                <h4 className="font-serif text-xl leading-none mb-2 text-[#1a1a1a]">Brett Wohl</h4>
                <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Founder, Managing Partner</p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="font-sans text-[13px] text-[#525252] leading-relaxed font-light italic">
                Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>

    {/* Contact */}
    <div className="bg-[#f0f0ee] -mx-6 md:-mx-8 px-6 md:px-8">
      <Section id="contact" label="Call" divider={false}>
        <div className="max-w-[1000px] py-16 md:py-20 space-y-16 md:space-y-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-[70px] leading-[1.1] text-[#1a1a1a] tracking-tight">
            Ready to build <br />
            <span className="italic">tomorrow's billion-dollar brand?</span>
          </h2>
          <CTALink size="lg">Schedule a call</CTALink>
        </div>
      </Section>
    </div>

    {/* Footer */}
    <footer className="pt-24 pb-32 md:pt-32 md:pb-44 border-t border-[#e5e5e5]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        <div className="lg:col-span-5">
          <span className="font-serif text-2xl font-bold block mb-8 text-[#1a1a1a]">Sullivan Street Projects</span>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-[15px] italic text-[#525252]">Growth Marketing Partners</p>
            <p className="font-sans text-[13px] text-[#737373] tracking-wide">Stop guessing. Start growing.</p>
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="font-sans text-[10px] font-bold uppercase tracking-wider mb-6 text-[#737373]">Location</p>
          <p className="font-sans text-[14px] text-[#404040] leading-relaxed">
            1178 Broadway<br />New York, NY 10001
          </p>
        </div>
        <div className="lg:col-span-4">
          <p className="font-sans text-[10px] font-bold uppercase tracking-wider mb-6 text-[#737373]">Legal</p>
          <div className="flex flex-col gap-4 font-sans text-[13px] text-[#404040]">
            <span className="text-[#737373]">Privacy Policy</span>
            <span className="text-[#737373]">Terms & Conditions</span>
            <p className="mt-8 text-[#a3a3a3]">© {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  </div>
);

export default MainPageStatic;
