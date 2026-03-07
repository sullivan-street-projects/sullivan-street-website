import Section from '../components/Section';
import FocusText from '../components/FocusText';
import TypewriterText from '../components/TypewriterText';
import CTAButton from '../components/CTAButton';
import { HEADING_CTA_CLASSES } from '../constants';

const Contact = () => {
  return (
    <div className="bg-paper-warm">
      <Section id="contact" label="Call" divider={false}>
        <div className="max-w-content py-16 md:py-20">
          <div className="space-y-10 md:space-y-12">
            <FocusText>
              <h2 className={HEADING_CTA_CLASSES}>
                Ready to build tomorrow's
                <br />
                <TypewriterText text="billion-dollar brand?" />
              </h2>
            </FocusText>
            <div>
              <CTAButton href="https://tidycal.com/sullivan-street-projects/growth-consultation" variant="lg">
                Schedule a call
              </CTAButton>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
