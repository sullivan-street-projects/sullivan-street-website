import useReducedMotion from '../hooks/useReducedMotion';
import CredentialsChart from '../components/CredentialsChart';
import { LABEL_CLASSES, BRANDS } from '../constants';

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

        {/* Full-width marquee (moved outside max-w wrapper) */}
        <div className="overflow-hidden relative w-full">
          {/* Expanded edge blurs covering more negative space */}
          <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-paper via-paper/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-paper via-paper/90 to-transparent z-10 pointer-events-none" />

          <div
            className={`flex whitespace-nowrap ${prefersReducedMotion ? '' : 'animate-marquee-horizontal'}`}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {BRANDS.map((brand) => (
                  <span
                    key={`${copy}-${brand}`}
                    className="font-sans text-caption font-medium text-label uppercase tracking-widest cursor-default shrink-0 mx-6 md:mx-10"
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
    </div>
  );
};

export default Credentials;
