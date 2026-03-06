import Section from '../components/Section';
import FocusText from '../components/FocusText';
import CTAButton from '../components/CTAButton';
import { HEADING_CTA_CLASSES } from '../constants';

const Contact = () => {
  return (
    <div className="bg-paper-warm">
      <Section id="contact" label="Call" divider={false}>
        <div className="max-w-content py-16 md:py-20">
          <div className="space-y-16 md:space-y-20">
            <FocusText>
              <h2 className={HEADING_CTA_CLASSES}>
                Ready to build <br />
                <span className="italic">tomorrow's billion-dollar brand?</span>
              </h2>
            </FocusText>
            <div>
              <CTAButton href="mailto:hello@sullivanstreetprojects.co" variant="lg">
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
