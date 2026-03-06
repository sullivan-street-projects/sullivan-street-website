import Section from '../components/Section';
import { BRANDS } from '../constants';

const Credentials = () => {
  return (
    <Section id="credentials" padding="py-20 md:py-24" className="pb-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-baseline">
        <div className="lg:w-1/4 shrink-0">
          <span className="font-sans text-tag text-label tracking-wider uppercase font-bold">
            Before SSP, our team managed $2B+ for
          </span>
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-10">
            {BRANDS.map((brand) => (
              <span key={brand} className="font-sans text-caption font-medium text-label uppercase tracking-widest cursor-default hover:text-charcoal transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Credentials;
