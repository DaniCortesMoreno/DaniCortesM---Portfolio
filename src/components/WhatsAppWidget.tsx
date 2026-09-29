import React from 'react';
import { MessageSquare, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile.ts';

export const WhatsAppWidget: React.FC = () => {
  return (
    <aside className="whatsapp-floating-wrap">
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
