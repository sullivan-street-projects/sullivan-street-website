import Header from './Header';
import Footer from './Footer';

const LegalPage = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-paper text-charcoal font-sans">
      <Header />
      <div className="max-w-prose mx-auto px-6 lg:px-8 pt-32 pb-16 md:pt-36 md:pb-24">
        <h1 className="font-serif text-3xl md:text-5xl text-charcoal mb-12">{title}</h1>
        <div className="legal-content space-y-6 text-body text-secondary leading-relaxed font-light">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;
