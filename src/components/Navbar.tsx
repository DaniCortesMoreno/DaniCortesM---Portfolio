import React, { useState } from 'react';
import { profile } from '../data/profile.ts';
import { Terminal, Command, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenKBar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenKBar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-glass">
      <div className="site-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '3.75rem' }}>
        {/* Brand & Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>&gt;</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>dani.cortes()</span>
          </a>

          <div className="status-pill" style={{ display: 'none' }} id="desktop-status-pill">
            <span className="status-dot"></span>
            <span style={{ color: 'var(--tertiary)' }}>{profile.availability}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          <a href="#hero" className="nav-link active">Inicio</a>
          <a href="#about" className="nav-link">Sobre Mí</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Trayectoria</a>
          <a href="#projects" className="nav-link">Proyectos</a>
          <a href="#contact" className="nav-link">Contacto</a>
        </nav>

        {/* Action Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="action-icon-btn"
            title="Abrir Dev CLI Terminal"
            aria-label="Terminal CLI"
          >
            <Terminal size={17} />
          </button>

          {/* Command Palette Launcher */}
          <button
            onClick={onOpenKBar}
            className="action-icon-btn kbar-trigger"
            title="Command Palette (Ctrl+K / ⌘K)"
            aria-label="Command Palette"
          >
            <Command size={17} />
            <span className="kbd-badge" style={{ marginLeft: '0.25rem', fontSize: '0.625rem' }}>⌘K</span>
          </button>

          {/* Contact / CV CTA */}
          <a href="#contact" className="btn-primary" style={{ padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}>
            <span>Contacto</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>Sobre Mí</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Trayectoria</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Proyectos</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={() => { onOpenTerminal(); setMobileMenuOpen(false); }} className="btn-secondary" style={{ width: '100%' }}>
              <Terminal size={16} /> CLI Terminal
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--on-surface-variant);
          transition: color var(--transition-fast);
          position: relative;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--on-surface);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background-color: var(--primary);
        }
        .action-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.45rem 0.55rem;
          border-radius: var(--radius-sm);
          color: var(--on-surface-variant);
          border: 1px solid var(--hairline-border);
          background-color: var(--surface-container-low);
          transition: all var(--transition-fast);
        }
        .action-icon-btn:hover {
          color: var(--primary);
          background-color: var(--surface-container-high);
          border-color: var(--hairline-hover);
        }
        .mobile-menu-btn {
          display: none;
          color: var(--on-surface);
          padding: 0.4rem;
        }
        @media (min-width: 640px) {
          #desktop-status-pill {
            display: inline-flex !important;
          }
        }
        @media (max-width: 840px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex;
          }
          .kbar-trigger {
            display: none;
          }
        }
        .mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background-color: var(--surface-container-lowest);
          border-bottom: 1px solid var(--hairline-border);
        }
        .mobile-drawer a {
          font-size: 1rem;
          font-family: var(--font-mono);
          color: var(--on-surface);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </header>
  );
};
