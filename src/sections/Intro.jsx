import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { VALUE_PROPS, HEADING_CLASSES, BODY_CLASSES } from '../constants';

const Intro = () => {
  return (
    <Section id="intro" label="Opportunity">
      <div className="mb-16 md:mb-20">
        <FocusText>
          <h2 className={`${HEADING_CLASSES} leading-tight mb-8 md:mb-12`}>
            Make Marketing Work<br /><span className="italic">For Your Bottom Line.</span>
          </h2>
          <p className={`${BODY_CLASSES} max-w-narrow`}>
            The people, the systems, the technology — three ways we embed with your team to drive growth.
          </p>
        </FocusText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {VALUE_PROPS.map((prop, idx) => (
          <FocusText key={idx}>
            <div className={`py-8 ${idx === 0 ? 'md:pr-6' : idx === 2 ? 'md:pl-6' : 'md:px-6'
              } ${idx < 2 ? 'md:border-r border-divider/60' : ''}`}>
              <h3 className="font-serif text-body-lg leading-snug text-charcoal mb-3">
                {prop.title}
              </h3>
              <div className="w-8 h-px bg-charcoal/20 mb-4" />
              <p className="font-sans text-body-sm text-muted leading-relaxed font-light">
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
