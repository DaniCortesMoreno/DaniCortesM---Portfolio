import React from 'react';
import { profile } from '../data/profile.ts';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrap">
      <div className="site-container footer-content">
        {/* Brand & Note */}
        <div className="footer-brand-row">
          <span className="footer-brand font-mono">&gt; dani.cortes()</span>
          <span className="footer-divider">•</span>
          <p className="footer-copy">
            © {new Date().getFullYear()} {profile.name} — Diseñado y desarrollado con rigor técnico y sistema Obsidian Precision.
          </p>
        </div>

        {/* Links & Scroll Top */}
        <div className="footer-links-row">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">Twitter/X</a>
          <a href={profile.social.readcv} target="_blank" rel="noopener noreferrer" className="footer-link">ReadCV</a>

          <button onClick={scrollToTop} className="footer-scroll-top" title="Volver al inicio">
            <span>Arriba</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .footer-wrap {
          border-top: 1px solid var(--hairline-border);
          background-color: var(--surface-container-lowest);
          padding: 2.25rem 0;
          position: relative;
          z-index: 10;
        }
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          text-align: center;
        }
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row;
            text-align: left;
          }
        }
        .footer-brand-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        @media (min-width: 640px) {
          .footer-brand-row {
            flex-direction: row;
            gap: 0.75rem;
          }
        }
        .footer-brand {
          font-weight: 600;
          color: var(--on-surface);
          font-size: 0.875rem;
        }
        .footer-divider {
          color: var(--dimmed-meta);
          display: none;
        }
        @media (min-width: 640px) {
          .footer-divider {
            display: inline;
          }
        }
        .footer-copy {
          font-size: 0.8125rem;
          color: var(--muted-body);
          margin: 0;
        }
        .footer-links-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .footer-link {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--on-surface-variant);
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--primary);
        }
        .footer-scroll-top {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--dimmed-meta);
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--hairline-border);
          background-color: var(--surface-container-low);
          transition: all var(--transition-fast);
        }
        .footer-scroll-top:hover {
          color: var(--on-surface);
          border-color: var(--hairline-hover);
        }
      `}</style>
    </footer>
  );
};
