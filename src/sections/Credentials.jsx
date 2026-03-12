import useReducedMotion from '../hooks/useReducedMotion';
import CredentialsChart from '../components/CredentialsChart';
import { LABEL_CLASSES } from '../constants';

// Ordered so heavy hitters appear mid-screen as marquee scrolls —
// viewer's eye catches Apple/Google/JPMorgan in the natural reading zone
const BRANDS = [
  'Peloton', 'Wayfair', 'Expedia', 'Hertz', 'Navan',
  'Apple', 'Google', 'JPMorgan Chase', 'Samsung',
  'American Express', 'Citigroup', 'Comcast', 'Rocket Mortgage', 'Publicis',
];

const Credentials = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div>
      <div className="max-w-site w-full mx-auto px-6 lg:px-8">
        <div className="border-t border-divider" />
      </div>
      <section id="credentials" className="pt-16 md:pt-20 pb-16 md:pb-20">
        <div className="max-w-site w-full mx-auto px-6 lg:px-8 mb-6">
          <span className={LABEL_CLASSES}>
            Before SSP, our team managed campaigns for
          </span>
        </div>

        {/* Full-width marquee */}
        <div className="overflow-hidden relative">
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

        <CredentialsChart />
      </section>

      <style>{`
        @keyframes marquee-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-horizontal {
          animation: marquee-horizontal 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Credentials;
