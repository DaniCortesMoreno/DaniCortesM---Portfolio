import React, { useState, Suspense, lazy } from 'react';
import './styles/global.css';
import './styles/components.css';
import { useSpotlight } from './hooks/useSpotlight.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroBanner3D } from './components/HeroBanner3D.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Footer } from './components/Footer.tsx';

// Code-splitting para componentes pesados y bajo el pliegue (Reducción masiva de TBT y LCP)
const ManifestoInteractive = lazy(() => import('./components/ManifestoInteractive.tsx').then(m => ({ default: m.ManifestoInteractive })));
const Projects = lazy(() => import('./components/Projects.tsx').then(m => ({ default: m.Projects })));
const Contact = lazy(() => import('./components/Contact.tsx').then(m => ({ default: m.Contact })));
const WhatsAppWidget = lazy(() => import('./components/WhatsAppWidget.tsx').then(m => ({ default: m.WhatsAppWidget })));
const CommandPalette = lazy(() => import('./components/CommandPalette.tsx').then(m => ({ default: m.CommandPalette })));
const TerminalModal = lazy(() => import('./components/TerminalModal.tsx').then(m => ({ default: m.TerminalModal })));

export const App: React.FC = () => {
  // Activate dynamic cursor spotlight tracking
  useSpotlight();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isKBarOpen, setIsKBarOpen] = useState(false);

  return (
    <div className="bg-tech-grid" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Ambient Specular Glow Orbs in Background */}
      <div className="ambient-glow-container">
        <div className="ambient-orb ambient-orb-primary" />
        <div className="ambient-orb ambient-orb-secondary" />
        <div className="ambient-orb ambient-orb-tertiary" />
      </div>

      {/* Header Glass Dock */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenKBar={() => setIsKBarOpen(true)}
      />

      {/* 100% Width & 100% Height Opening Hero Banner */}
      <HeroBanner3D />

      {/* Main Content Layout */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <div className="site-container">
          <Hero />
          <About />
        </div>

        {/* 100% Width & 100% Height Scroll Pinned Interactive Section */}
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <ManifestoInteractive />
        </Suspense>

        <div className="site-container">
          <Skills />
          <Experience />
        </div>

        {/* 100% Screen Width Showcase for Projects */}
        <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
          <Projects />
        </Suspense>

        <div className="site-container">
          <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
            <Contact />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Tactical Widgets */}
      <Suspense fallback={null}>
        <WhatsAppWidget />
      </Suspense>

      {/* Modals & Command Overlays */}
      <Suspense fallback={null}>
        {isKBarOpen && (
          <CommandPalette
            isOpen={isKBarOpen}
            onClose={() => setIsKBarOpen(false)}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {isTerminalOpen && (
          <TerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default App;
