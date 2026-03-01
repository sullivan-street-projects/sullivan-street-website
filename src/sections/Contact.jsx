import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import TypewriterText from '../components/TypewriterText';
import CTAButton from '../components/CTAButton';

const Contact = () => {
  return (
    <div className="bg-paper-warm">
      <Section id="contact" label="Call" divider={false}>
        <div className="max-w-content py-16 md:py-20">
          <FocusText className="space-y-16 md:space-y-20">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-display-sm leading-[1.1] text-charcoal tracking-tight">
              Ready to build <br />
              <TypewriterText text="Tomorrow's Billion-Dollar Brand?" />
            </h2>
            <CTAButton href="mailto:hello@sullivanstreetprojects.co" variant="lg">
              Schedule a call
            </CTAButton>
          </FocusText>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
