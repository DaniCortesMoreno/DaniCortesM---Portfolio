import React, { useState } from 'react';
import './styles/global.css';
import './styles/components.css';
import { useSpotlight } from './hooks/useSpotlight.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { Skills } from './components/Skills.tsx';
import { Experience } from './components/Experience.tsx';
import { Projects } from './components/Projects.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppWidget } from './components/WhatsAppWidget.tsx';
import { CommandPalette } from './components/CommandPalette.tsx';
import { TerminalModal } from './components/TerminalModal.tsx';

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

      {/* Main Content Layout */}
      <main className="site-container" style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Tactical Widgets */}
      <WhatsAppWidget />

      {/* Modals & Command Overlays */}
      <CommandPalette
        isOpen={isKBarOpen}
        onClose={() => setIsKBarOpen(false)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export default App;
