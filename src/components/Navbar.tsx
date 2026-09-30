import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile.ts';
import { Terminal, Command, Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenKBar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenKBar }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-glass ${isScrolled ? 'is-scrolled' : 'is-banner-transparent'}`}>
      <div className="site-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '3.75rem', width: '100%', maxWidth: '100%' }}>
        {/* Brand & Availability */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <a href="#hero" className="brand-link" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>
            <img src="/logo.png" alt="Dani Cortés" className="brand-logo-img" />
            <span style={{ fontFamily: 'var(--font-mono)' }} className="brand-name-text">dani.cortes()</span>
          </a>

          <div className="status-pill" style={{ display: 'none' }} id="desktop-status-pill">
            <span className="status-dot"></span>
            <span style={{ color: 'var(--tertiary)' }}>{profile.availability}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <a href="#hero" className="nav-link active">Inicio</a>
          <a href="#about" className="nav-link">Sobre Mí</a>
          <a href="#manifesto" className="nav-link">Manifiesto</a>
          <a href="#skills" className="nav-link">Habilidades</a>
          <a href="#experience" className="nav-link">Trayectoria</a>
          <a href="#projects" className="nav-link">Proyectos</a>
          <a href="#contact" className="nav-link">Contacto</a>
          <a
            href={profile.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--primary)', fontWeight: 500 }}
            title="Abrir Curriculum Vitae en PDF"
          >
            <span>CV (PDF)</span>
            <ArrowUpRight size={13} style={{ opacity: 0.8 }} />
          </a>
        </nav>

        {/* Action Cluster */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }} className="action-cluster">
          {/* Terminal Launcher */}
          <button
            onClick={onOpenTerminal}
            className="action-icon-btn terminal-nav-btn"
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

          {/* Contact CTA */}
          <a href="#contact" className="btn-primary nav-contact-btn" style={{ padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}>
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
          <a href="#manifesto" onClick={() => setMobileMenuOpen(false)}>Manifiesto</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Habilidades</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Trayectoria</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Proyectos</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
          <a
            href={profile.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, padding: '0.5rem 0' }}
          >
            <FileText size={16} />
            <span>Curriculum Vitae (PDF)</span>
            <ArrowUpRight size={14} />
          </a>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <button onClick={() => { onOpenTerminal(); setMobileMenuOpen(false); }} className="btn-secondary" style={{ width: '100%' }}>
              <Terminal size={16} /> CLI Terminal
            </button>
          </div>
        </div>
      )}

      <style>{`
        .brand-logo-img {
          height: 26px;
          width: auto;
          object-fit: contain;
          transition: transform var(--transition-fast), filter var(--transition-fast);
          filter: drop-shadow(0 0 8px rgba(76, 215, 246, 0.35));
        }
        .brand-link:hover .brand-logo-img {
          transform: scale(1.08);
          filter: drop-shadow(0 0 14px rgba(76, 215, 246, 0.65));
        }
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
          padding: 0.45rem;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--hairline-border);
          transition: all var(--transition-fast);
        }
        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--hairline-hover);
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
            display: inline-flex !important;
            flex-shrink: 0;
          }
          .kbar-trigger {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .brand-name-text {
            display: none !important;
          }
          .nav-contact-btn {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .terminal-nav-btn {
            display: none !important;
          }
          .site-container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        .mobile-drawer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background-color: rgba(14, 13, 20, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--hairline-border);
          animation: fadeIn 150ms ease-out;
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
