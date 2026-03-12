import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { BODY_CLASSES } from '../constants';

const Statement = () => {
  return (
    <Section id="statement" padding="py-24 md:py-32 lg:py-40">
      <div className="max-w-prose mx-auto text-center space-y-10 md:space-y-12">
        <FocusText>
          <h2 className="font-serif text-2xl md:text-4xl leading-snug text-charcoal text-balance">
            Yesterday's agencies aren't built to drive revenue. <em className="italic">We are.</em>
          </h2>
        </FocusText>

        <FocusText>
          <p className={BODY_CLASSES}>
            Most growth-stage companies have agencies, freelancers, and tools. What they don't have is someone owning the outcome. We're the AI-native growth partner that aligns brand, performance, systems, and talent under one team — and stays accountable to revenue, not a percentage of your ad spend.
          </p>
        </FocusText>
      </div>
    </Section>
  );
};

export default Statement;
