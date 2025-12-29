import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Credentials from './sections/Credentials';
import Intro from './sections/Intro';
import Approach from './sections/Approach';
import Services from './sections/Services';
import PartnerOutcomes from './sections/PartnerOutcomes';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#FAFAF8] relative overflow-x-hidden font-sans">
      
      {/* Subtle Grain Overlay - Dialed back for "felt not seen" effect */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.04]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <Header />
      <Navigation />

      <div className="relative z-[2]">
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
  );
}
