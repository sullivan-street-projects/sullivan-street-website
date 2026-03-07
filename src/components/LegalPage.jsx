import { Link } from 'react-router-dom';

const LegalPage = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-paper text-charcoal font-sans">
      <div className="max-w-prose mx-auto px-6 lg:px-8 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-caption text-label hover:text-charcoal transition-colors mb-12"
        >
          <span aria-hidden="true">&larr;</span> Back to home
        </Link>
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12">{title}</h1>
        <div className="legal-content space-y-6 text-body text-secondary leading-relaxed font-light">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
