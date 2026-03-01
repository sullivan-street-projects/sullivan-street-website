import Section from '../components/Section';
import FocusText from '../components/FocusText';
import BreathingRings from '../components/svg/BreathingRings';
import FlowingStreams from '../components/svg/FlowingStreams';
import FlowingNodes from '../components/svg/FlowingNodes';
import { VALUE_PROPS } from '../constants';

const animatedGraphics = [
  <BreathingRings key="breathing" />,
  <FlowingStreams key="flowing" />,
  <FlowingNodes key="nodes" />,
];

const Intro = () => {
  return (
    <Section id="intro" label="Opportunity">
      <div className="mb-20 md:mb-24">
        <FocusText>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight text-charcoal mb-8 md:mb-12">
            Make Marketing Work<br /><span className="italic">For Your Business.</span>
          </h2>
        </FocusText>
        <FocusText>
          <p className="font-sans text-body md:text-body-md text-secondary leading-relaxed font-light tracking-wide max-w-narrow">
            Everything in marketing is changing. What works today won't work tomorrow. The brands that master the shift grow faster, with more focus and higher profit. We're the partner helping them get there.
          </p>
        </FocusText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {VALUE_PROPS.map((prop, idx) => (
          <FocusText key={idx}>
            <div className="min-h-[280px] flex-1 flex items-center justify-center">
              {animatedGraphics[idx]}
            </div>
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
