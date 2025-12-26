import React from 'react';
import Section from '../components/Section';
import FocusText from '../components/FocusText';

const About = () => {
  return (
    <Section id="about" label="About">
      <div className="max-w-[850px] space-y-20 md:space-y-24">
        <div className="space-y-10 md:space-y-12">
          <FocusText>
            <h2 className="font-serif text-3xl md:text-5xl italic text-[#1a1a1a]">Building Tomorrow’s Billion-Dollar Brands</h2>
          </FocusText>
          <div className="font-sans text-[17px] text-[#404040] leading-relaxed space-y-8 font-light tracking-wide">
            <FocusText>
              <p>
                Yesterday’s agencies aren’t built for tomorrow’s brands.
              </p>
            </FocusText>
            <FocusText>
              <p>
                They were designed for a world where humans did the heavy lifting. That world is fading. From media buying to content generation, AI is now embedded across the marketing value chain. The work that drives meaningful growth has shifted to orchestration—managing systems, aligning teams, and making decisions that tie back to your P&L.
              </p>
            </FocusText>
            <FocusText>
              <p>
                Sullivan Street Projects is the growth partner businesses call when they need more than point solutions and disconnected vendors. We look across your entire business, translate goals into a clear growth plan, and turn marketing from an expense into a managed investment tied to what you’re actually trying to achieve.
              </p>
            </FocusText>
            <FocusText>
              <p>
                Whether you need advisory, strategy, or management—we meet you where you are. The marketing consultancy purpose built for tomorrow.
              </p>
            </FocusText>
          </div>
        </div>

        {/* Founder Bio */}
        <div className="pt-16 lg:pt-24 border-t border-[#e5e5e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4">
              <FocusText className="flex flex-row items-center gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 overflow-hidden rounded-full">
                  <img 
                    src="image.webp" 
                    alt="Brett Wohl" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-serif text-xl leading-none mb-2 text-[#1a1a1a]">Brett Wohl</h4>
                  <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#737373]">Founder, Managing Partner</p>
                </div>
              </FocusText>
            </div>
            <div className="lg:col-span-8">
              <FocusText>
                <p className="font-sans text-[13px] text-[#525252] leading-relaxed font-light italic">
                  Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe.
                </p>
              </FocusText>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
