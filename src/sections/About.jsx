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
                After managing $2 billion in media for Apple, American Express, Comcast, and other global brands, Brett Wohl saw the same story repeat: growth stalling under slow-moving agencies and one-size-fits-all tech.
              </p>
            </FocusText>
            <FocusText>
              <p>
                He founded Sullivan Street Projects to give ambitious companies Fortune 500 expertise on demand—enterprise-grade strategy, practical AI leverage, and a hand-picked network of specialists.
              </p>
            </FocusText>
            <FocusText>
              <p>
                Our mission is simple: help growth-stage companies become the next generation of market leaders.
              </p>
            </FocusText>
            <FocusText>
              <p>
                We bridge brand and performance to drive one outcome—profitable, compounding growth.
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
                  Brett is an executive growth strategist with 10+ years of experience across startups and global brands. He previously led demand generation at Navan and managed over $2 billion in media for Apple, JPMorgan Chase, Samsung, and others while at Google and Publicis Groupe. He brings deep expertise in omnichannel strategy, programmatic media, and marketing analytics to every engagement. Brett holds a dual B.S. in Advertising and Marketing with a minor in Economics from Syracuse University.
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
