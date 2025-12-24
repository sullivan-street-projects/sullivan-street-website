import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#FAFAF8] pt-24 pb-32 md:pt-32 md:pb-44 border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <span className="font-serif text-2xl font-bold block mb-6 text-[#1a1a1a]">Sullivan Street Projects</span>
            <p className="font-sans text-[14px] text-[#737373] leading-relaxed max-w-[400px]">
              Stop guessing. Start growing.
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-6 text-[#737373]">Location</p>
            <p className="font-sans text-[14px] text-[#404040] leading-relaxed">
              1178 Broadway<br />
              New York, NY 10001
            </p>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] mb-6 text-[#737373]">Legal</p>
            <div className="flex flex-col gap-4 font-sans text-[13px] text-[#404040]">
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms & Conditions</a>
              <p className="mt-8 text-[#999]">© {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.</p>
              <p className="mt-2 text-[#a3a3a3] text-[11px]">Built in NYC with Google Gemini.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
