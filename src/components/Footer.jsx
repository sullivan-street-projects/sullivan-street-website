import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-paper pt-24 pb-32 md:pt-32 md:pb-44 border-t border-divider">
      <div className="max-w-site mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <span className="font-serif text-2xl font-bold block mb-8 text-charcoal">Sullivan Street Projects</span>
            <div className="flex flex-col gap-1">
              <p className="font-serif text-body-sm italic text-muted">Growth Marketing Partners</p>
              <p className="font-sans text-caption text-label tracking-wide">
                Stop guessing. Start growing.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <p className="font-sans text-section-label font-bold uppercase tracking-wider mb-6 text-label">Location</p>
            <p className="font-sans text-ui text-secondary leading-relaxed">
              1178 Broadway<br />
              New York, NY 10001
            </p>
          </div>
          <div className="lg:col-span-4">
            <p className="font-sans text-section-label font-bold uppercase tracking-wider mb-6 text-label">Legal</p>
            <div className="flex flex-col gap-4 font-sans text-caption text-secondary">
              <Link to="/privacy-policy" className="text-label hover:text-charcoal transition-colors">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="text-label hover:text-charcoal transition-colors">Terms & Conditions</Link>
              <button
                onClick={() => window.dispatchEvent(new Event('open-cookie-consent'))}
                className="text-label hover:text-charcoal transition-colors text-left cursor-pointer"
              >
                Privacy Preferences
              </button>
              <p className="mt-8 text-faint">© {new Date().getFullYear()} Sullivan Street Projects LLC. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
