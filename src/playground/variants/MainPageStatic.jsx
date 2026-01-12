import { VALUE_PROPS, CAPABILITIES, BRANDS } from '../../constants';

// --- Primitives ---

const SectionLabel = ({ children }) => (
  <div className="mb-12 md:mb-16">
    <span className="font-sans text-[10px] text-[#737373] uppercase tracking-[0.3em] font-bold">
      {children}
    </span>
  </div>
);

const Section = ({ id, label, children, divider = true }) => (
  <section id={id} className={`py-24 md:py-32 lg:py-48 ${divider ? 'border-t border-[#e5e5e5]' : ''}`}>
    {label && <SectionLabel>{label}</SectionLabel>}
    {children}
  </section>
);

const SectionIntro = ({ title, subtitle, children }) => (
  <div className="mb-20 md:mb-24">
    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-[#1a1a1a] mb-8 md:mb-12">
      {title}<br /><span className="italic">{subtitle}</span>
    </h2>
    <p className="font-sans text-[17px] md:text-[19px] text-[#404040] leading-relaxed font-light tracking-wide max-w-[800px]">
      {children}
    </p>
  </div>
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
  <div className="flex gap-1.5">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/40" />
    ))}
  </div>
);

// Static version of animated graphics (same dimensions as originals)
const StaticGraphic = ({ type }) => {
  const graphics = {
    rings: (
      <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
        {[...Array(4)].map((_, ring) => {
          const baseRadius = 20 + ring * 18;
          const dotCount = 6 + ring * 4;
          return [...Array(dotCount)].map((_, i) => {
            const angle = (i / dotCount) * Math.PI * 2;
            return (
              <circle
                key={`${ring}-${i}`}
                cx={120 + Math.cos(angle) * baseRadius}
                cy={100 + Math.sin(angle) * baseRadius}
                r={3.5 - ring * 0.5}
                fill="#1a1a1a"
                opacity={0.75}
              />
            );
          });
        })}
      </svg>
    ),
    streams: (
      <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
        {[...Array(5)].map((_, row) => {
          const intensity = [2.0, 3.0, 4.0, 3.0, 2.0][row];
          return [...Array(10)].map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={30 + col * 20}
              cy={35 + row * 32}
              r={intensity}
              fill="#1a1a1a"
              opacity={0.75}
            />
          ));
        })}
      </svg>
    ),
    nodes: (
      <svg viewBox="0 0 240 200" className="w-full h-full max-w-[320px]" style={{ overflow: 'visible' }}>
        {/* Corners */}
        <circle cx={60} cy={50} r={6} fill="#1a1a1a" opacity={0.65} />
        <circle cx={180} cy={50} r={6} fill="#1a1a1a" opacity={0.65} />
        <circle cx={180} cy={150} r={6} fill="#1a1a1a" opacity={0.65} />
        <circle cx={60} cy={150} r={6} fill="#1a1a1a" opacity={0.65} />
        {/* Center */}
        <circle cx={120} cy={100} r={10} fill="#1a1a1a" opacity={0.6} />
        {/* Edges */}
        <circle cx={120} cy={35} r={5} fill="#1a1a1a" opacity={0.6} />
        <circle cx={120} cy={165} r={5} fill="#1a1a1a" opacity={0.6} />
      </svg>
    ),
  };
  return graphics[type];
};

const staticGraphics = ['rings', 'streams', 'nodes'];

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
            Our team has managed $2B+ for
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

    {/* Value Props (Intro) */}
    <Section label="Opportunity">
      <SectionIntro title="Make Marketing Work" subtitle="For Your Business.">
        Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
      </SectionIntro>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <div key={idx}>
            <div className="min-h-[280px] flex-1 flex items-center justify-center">
              <StaticGraphic type={staticGraphics[idx]} />
            </div>
            <div className="px-4 pb-8 pt-2">
              <h3 className="font-serif text-[20px] leading-tight text-[#1a1a1a] mb-2">{prop.title}</h3>
              <p className="font-sans text-[14px] text-[#737373] leading-relaxed">{prop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    {/* Approach */}
    <Section id="approach" label="Approach">
      <SectionIntro title="Tailor made" subtitle="growth marketing.">
        You know what's working in your business and what isn't. What you need is a strategy to grow. We build that strategy, tailored to you.
      </SectionIntro>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((cap, idx) => (
          <div
            key={cap.title}
            className={`py-8 md:px-6 md:first:pl-0 md:last:pr-0 border-[#e5e5e5]/60
              ${idx % 2 === 0 ? 'md:border-r' : ''}
              ${idx < 3 ? 'lg:border-r' : ''}`}
          >
            <div className="mb-5"><MinimalDot count={idx + 1} /></div>
            <h3 className="font-serif text-xl leading-tight text-[#1a1a1a] mb-3">{cap.title}</h3>
            <div className="w-8 h-px bg-[#1a1a1a]/20 mb-4" />
            <p className="font-sans text-[15px] text-[#525252] leading-relaxed font-light">{cap.description}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* About */}
    <Section id="about" label="About">
      <div className="max-w-[850px] space-y-20 md:space-y-24">
        <div className="space-y-10 md:space-y-12">
          <h2 className="font-serif text-3xl md:text-5xl italic text-[#1a1a1a]">
            Yesterday's agencies aren't built for tomorrow's brands.
          </h2>
          <div className="font-sans text-[17px] text-[#404040] leading-relaxed space-y-8 font-light tracking-wide">
            <p>They were designed for a world where it took teams of people to do all the work. That world is changing—from media buying to creative to content, from analysis to optimization. AI now touches everything in marketing, so the work that matters has changed too.</p>
            <p>Today's advantage is orchestration: managing systems, aligning teams, and making business decisions that connect to your bottom line—the kind of decisions AI can't make without a human in the loop.</p>
            <p>Sullivan Street Projects is the growth partner for tomorrow's billion-dollar brands. We're who businesses call when they need more than point solutions and disconnected vendors. We partner with you, look across your business, translate goals into a clear plan, and manage marketing like the investment it is.</p>
          </div>
        </div>

        {/* Founder */}
        <div className="pt-16 lg:pt-24 border-t border-[#e5e5e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-full bg-[#e5e5e5]" />
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
            <span className="italic">Tomorrow's Billion-Dollar Brand?</span>
          </h2>
          <CTALink size="lg">Schedule a call</CTALink>
        </div>
      </Section>
    </div>

  </div>
);

export default MainPageStatic;
