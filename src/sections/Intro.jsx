import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { VALUE_PROPS, HEADING_CLASSES, BODY_CLASSES } from '../constants';

const Intro = () => {
  return (
    <Section id="intro" label="Opportunity">
      <div className="mb-20 md:mb-28 lg:mb-36">
        <FocusText>
          <h2 className={`${HEADING_CLASSES} leading-tight mb-8 md:mb-12`}>
            Make Marketing Work<br /><span className="italic">For Your Business.</span>
          </h2>
        </FocusText>
        <FocusText>
          <p className={`${BODY_CLASSES} max-w-narrow`}>
            Three ways we embed with your team to drive growth — from strategic guidance to full operational ownership.
          </p>
        </FocusText>
      </div>

      {VALUE_PROPS.map((prop, idx) => (
        <div key={idx}>
          <div className="h-px bg-charcoal/10" />
          <FocusText>
            <div className="py-10 md:py-14 lg:py-16 max-w-narrow">
              <h3 className="font-serif text-xl md:text-2xl leading-snug text-charcoal mb-3 md:mb-4">
                {prop.title}
              </h3>
              <p className="font-sans text-body-sm md:text-body text-muted leading-relaxed font-light">
                {prop.description}
              </p>
            </div>
          </FocusText>
        </div>
      ))}
      <div className="h-px bg-charcoal/10" />
    </Section>
  );
};

export default Intro;
