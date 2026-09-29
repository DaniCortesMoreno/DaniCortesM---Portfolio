import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUpRight, Zap, X } from 'lucide-react';
import { profile } from '../data/profile.ts';

export const WhatsAppWidget: React.FC = () => {
  const [showCallout, setShowCallout] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show callout for exactly 5 seconds upon loading, then gracefully fade out
    const timer = setTimeout(() => {
      setShowCallout(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside className="whatsapp-floating-wrap">
      {/* 5-second Auto-dissolving Callout Bubble */}
      {!isDismissed && (
        <div
          className={`whatsapp-callout-bubble ${showCallout ? 'callout-visible' : 'callout-hiding'}`}
          onAnimationEnd={() => {
            if (!showCallout) setIsDismissed(true);
          }}
        >
          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="callout-link"
            title="Abrir chat en WhatsApp inmediatamente"
          >
            <span className="callout-badge-pulse">
              <Zap size={13} color="#25D366" />
            </span>
            <span className="callout-text">
              ¡HABLA POR WHATSAPP CONMIGO RÁPIDAMENTE!
            </span>
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsDismissed(true);
            }}
            className="callout-close-btn"
            title="Cerrar aviso"
            aria-label="Cerrar aviso de WhatsApp"
          >
            <X size={12} />
          </button>
          <div className="callout-arrow"></div>
        </div>
      )}

      {/* Floating WhatsApp Action Pill */}
      <a
        href={profile.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pill"
        id="whatsapp-toggle"
        title="Abrir chat en WhatsApp"
      >
        {/* Glowing Indicator & Icon */}
        <div className="whatsapp-icon-box">
          <span className="whatsapp-pulse"></span>
          <MessageSquare size={18} color="var(--tertiary)" />
        </div>

        {/* Revealed Spring Label */}
        <div className="whatsapp-label">
          <span>Habla conmigo en WhatsApp</span>
          <ArrowUpRight size={13} color="var(--tertiary)" />
        </div>
      </a>

      <style>{`
        .whatsapp-floating-wrap {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          z-index: 50;
        }
        @media (max-width: 480px) {
          .whatsapp-floating-wrap {
            bottom: 1rem;
            right: 1rem;
            max-width: calc(100vw - 2rem);
          }
        }

        /* Callout Bubble above floating button */
        .whatsapp-callout-bubble {
          position: absolute;
          bottom: calc(100% + 14px);
          right: 0;
          background: rgba(10, 16, 22, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(37, 211, 102, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(37, 211, 102, 0.25);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          white-space: nowrap;
          z-index: 51;
          pointer-events: auto;
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }
        .whatsapp-callout-bubble:hover {
          border-color: #25D366;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85), 0 0 28px rgba(37, 211, 102, 0.35);
        }

        .callout-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ffffff;
          text-decoration: none;
        }

        .callout-badge-pulse {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          flex-shrink: 0;
          animation: pulse-ring 2s infinite ease-out;
        }

        .callout-text {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          color: #ffffff;
          text-shadow: 0 0 8px rgba(37, 211, 102, 0.4);
        }

        .callout-close-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: color var(--transition-fast), background var(--transition-fast);
          margin-left: 0.25rem;
        }
        .callout-close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .callout-arrow {
          position: absolute;
          bottom: -6px;
          right: 20px;
          width: 10px;
          height: 10px;
          background: rgba(10, 16, 22, 0.95);
          border-right: 1px solid rgba(37, 211, 102, 0.5);
          border-bottom: 1px solid rgba(37, 211, 102, 0.5);
          transform: rotate(45deg);
        }

        /* Callout Animations */
        .callout-visible {
          animation: calloutIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .callout-hiding {
          animation: calloutOut 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes calloutIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes calloutOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
            pointer-events: none;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-callout-bubble {
            right: 0;
            max-width: calc(100vw - 2.5rem);
            white-space: normal;
            padding: 0.5rem 0.75rem;
          }
          .callout-text {
            font-size: 0.6875rem;
            line-height: 1.3;
          }
          .callout-arrow {
            right: 18px;
          }
        }

        /* Pill styling */
        .whatsapp-pill {
          display: flex;
          align-items: center;
          height: 3rem;
          background-color: rgba(14, 14, 14, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(76, 215, 246, 0.35);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(76, 215, 246, 0.18);
          border-radius: 9999px;
          padding: 0 0.85rem;
          transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .whatsapp-pill:hover {
          border-color: var(--tertiary);
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9), 0 0 25px rgba(76, 215, 246, 0.28);
        }
        .whatsapp-icon-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.75rem;
          height: 1.75rem;
          flex-shrink: 0;
        }
        .whatsapp-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background-color: var(--tertiary);
          opacity: 0.3;
          animation: pulse-ring 2.5s infinite cubic-bezier(0.24, 0, 0.38, 1);
        }
        .whatsapp-label {
          max-width: 0;
          opacity: 0;
          white-space: nowrap;
          overflow: hidden;
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--on-surface);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: max-width 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease, margin-left 300ms ease;
        }
        .whatsapp-pill:hover .whatsapp-label {
          max-width: 250px;
          opacity: 1;
          margin-left: 0.65rem;
        }
      `}</style>
    </aside>
  );
};
