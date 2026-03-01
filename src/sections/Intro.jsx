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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <FocusText key={idx}>
            <div className="px-4 pb-8 pt-2">
              <h3 className="font-serif text-body-lg leading-tight text-charcoal mb-2">
                {prop.title}
              </h3>
              <p className="font-sans text-ui text-label leading-relaxed">
                {prop.description}
              </p>
            </div>
          </FocusText>
        ))}
      </div>
    </Section>
  );
};

export default Intro;
