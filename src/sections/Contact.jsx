import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';
import TypewriterText from '../components/TypewriterText';
import AnimatedArrow from '../components/AnimatedArrow';

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
            <div className="group relative inline-block">
              <a
                href="mailto:hello@sullivanstreetprojects.co"
                className="font-serif text-3xl md:text-4xl lg:text-5xl italic inline-flex items-center gap-6 md:gap-10 hover:opacity-70 transition-all text-charcoal"
              >
                Schedule a call
                <AnimatedArrow size="lg" className="not-italic" />
              </a>
              <div className="absolute -bottom-4 left-0 w-full h-[1.5px] bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
          </FocusText>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
