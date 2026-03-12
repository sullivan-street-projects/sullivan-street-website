import Section from '../components/Section';
import FocusText from '../components/FocusText';
import { BODY_CLASSES } from '../constants';

const About = () => {
  return (
    <Section id="about" label="About">
      <div className="max-w-prose space-y-20 md:space-y-24">
        <FocusText className="space-y-10 md:space-y-12">
          <h2 className="font-serif text-3xl md:text-5xl italic text-charcoal">Tomorrow's billion-dollar brands.</h2>
          <div className={`${BODY_CLASSES} space-y-8`}>
            <p>
              Yesterday's agencies were built for a world where scale meant headcount. Today, the advantage belongs to teams that orchestrate — managing systems, aligning talent, and making the business decisions AI can't make without a human in the loop.
            </p>
            <p>
              Sullivan Street Projects is the growth partner for businesses that need more than point solutions and disconnected vendors. We look across your business, translate goals into a clear plan, and manage marketing like the investment it is.
            </p>
          </div>
        </FocusText>

        {/* Founder Bio */}
        <div className="pt-16 lg:pt-24 border-t border-divider">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <div className="flex flex-row items-center gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-full">
                  <img
                    src="image.webp"
                    alt="Brett Wohl"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-xl leading-none mb-2 text-charcoal">Brett Wohl</h4>
                  <p className="font-sans text-section-label uppercase tracking-widest font-bold text-label">Founder, Managing Partner</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="font-sans text-caption text-muted leading-relaxed font-light italic">
                Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
