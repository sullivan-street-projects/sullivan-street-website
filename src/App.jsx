import React, { Suspense, useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { SmoothScroll } from './components/SmoothScroll';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GrainOverlay from './components/GrainOverlay';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Credentials from './sections/Credentials';
import Intro from './sections/Intro';
import Approach from './sections/Approach';
import Services from './sections/Services';
import PartnerOutcomes from './sections/PartnerOutcomes';
import About from './sections/About';
import Contact from './sections/Contact';

const DesignPlayground = React.lazy(() => import('./playground/DesignPlayground'));

export default function App() {
  const [isPlayground, setIsPlayground] = useState(window.location.hash === '#playground');

  useEffect(() => {
    const handleHashChange = () => {
      setIsPlayground(window.location.hash === '#playground');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render playground if hash is #playground
  if (isPlayground) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-paper" />}>
          <DesignPlayground />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
    <SmoothScroll>
      <div className="min-h-screen bg-paper text-charcoal selection:bg-charcoal selection:text-paper relative font-sans">
        
        <GrainOverlay />

        <Header />
        <Navigation />

        <div className="relative z-content">
          <Hero />
          <Credentials />
          <Intro />
          <Approach />
          <Services />
          <PartnerOutcomes />
          <About />
          <Contact />
          <Footer />
        </div>
      </div>
    </SmoothScroll>
    </ErrorBoundary>
  );
}
