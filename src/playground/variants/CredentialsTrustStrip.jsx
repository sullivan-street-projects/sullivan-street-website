import useReducedMotion from '../../hooks/useReducedMotion';

// Ordered so heavy hitters appear mid-screen as marquee scrolls —
// viewer's eye catches Apple/Google/JPMorgan in the natural reading zone
const BRANDS = [
  'Peloton', 'Wayfair', 'Expedia', 'Hertz', 'Navan',
  'Apple', 'Google', 'JPMorgan Chase', 'Samsung',
  'American Express', 'Citigroup', 'Comcast', 'Rocket Mortgage', 'Publicis',
];

const CredentialsTrustStrip = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-20 md:py-24 pb-16">
      <div className="mx-auto max-w-site px-6 mb-8">
        <span className="font-sans text-tag text-label tracking-wider uppercase font-bold">
          Before SSP, our team managed $2B+ for
        </span>
      </div>

      {/* Full-width marquee */}
      <div className="overflow-hidden relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />

        <div
          className={`flex whitespace-nowrap ${prefersReducedMotion ? '' : 'animate-marquee-horizontal'}`}
        >
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {BRANDS.map((brand) => (
                <span
                  key={`${copy}-${brand}`}
                  className="font-sans text-caption font-medium text-label uppercase tracking-widest cursor-default shrink-0 mx-6 md:mx-8"
                >
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CredentialsTrustStrip;
