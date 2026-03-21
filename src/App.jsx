import React, { Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { SmoothScroll } from './components/SmoothScroll';
import Header from './components/Header';
import Navigation from './components/Navigation';
import GrainOverlay from './components/GrainOverlay';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Credentials from './sections/Credentials';
import Statement from './sections/Statement';
import Intro from './sections/Intro';
import Approach from './sections/Approach';
import Services from './sections/Services';
import PartnerOutcomes from './sections/PartnerOutcomes';
import About from './sections/About';
import Contact from './sections/Contact';
import CookieConsent from './components/CookieConsent';

const DesignPlayground = React.lazy(() => import('./playground/DesignPlayground'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = React.lazy(() => import('./pages/TermsConditions'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Force-clear any Lenis residual scroll state on <html>
    document.documentElement.style.removeProperty('transform');
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

function HomePage() {
  const [isPlayground, setIsPlayground] = useState(window.location.hash === '#playground');

  useEffect(() => {
    const handleHashChange = () => {
      setIsPlayground(window.location.hash === '#playground');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isPlayground) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <DesignPlayground />
      </Suspense>
    );
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-paper text-charcoal selection:bg-charcoal selection:text-paper relative font-sans">

        <a href="#approach" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-skip focus:bg-charcoal focus:text-paper focus:px-4 focus:py-2 focus:rounded">
          Skip to content
        </a>

        <GrainOverlay />

        <Header />
        <Navigation />

        <div className="relative z-content">
          <Hero />
          <Credentials />
          <Statement />
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
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </ErrorBoundary>
  );
}
