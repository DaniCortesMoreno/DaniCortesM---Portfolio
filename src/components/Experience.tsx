import React from 'react';
import { experiences } from '../data/experience.ts';

export const Experience: React.FC = () => {
  return (
    <section id="experience" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2.25rem' }}>
        <span className="section-eyebrow">// 02. TRAYECTORIA</span>
        <h2 className="section-title">Evolución técnica y experiencia profesional</h2>
      </div>

      <div className="timeline-container">
        {experiences.map((exp, index) => (
          <div key={index} className="timeline-item">
            {/* LED Status Node */}
            <div className={`timeline-led ${exp.current ? 'led-active' : ''}`} />

            {/* Experience Card */}
            <div className="spotlight-card specular-border timeline-card">
              <div className="timeline-card-header">
                <div>
                  <h3 className="timeline-role">{exp.role} · <span style={{ color: 'var(--on-surface-variant)' }}>{exp.company}</span></h3>
                  <div className="timeline-subrole">{exp.subRoles}</div>
                </div>
                <span className={`timeline-badge ${exp.current ? 'badge-current' : ''}`}>
                  {exp.period}
                </span>
              </div>

              <p className="timeline-desc">{exp.description}</p>

              <div className="timeline-tags">
                {exp.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="exp-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .timeline-container {
          position: relative;
          padding-left: 2rem;
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
        }
        @media (min-width: 768px) {
          .timeline-container {
            padding-left: 2.75rem;
          }
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 0.5rem;
          bottom: 0.5rem;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.08);
        }
        .timeline-item {
          position: relative;
        }
        .timeline-led {
          position: absolute;
          left: -2rem;
          top: 1.25rem;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--surface-container-lowest);
          border: 2px solid var(--outline);
          transition: all var(--transition-fast);
          z-index: 5;
        }
        @media (min-width: 768px) {
          .timeline-led {
            left: -2.75rem;
          }
        }
        .led-active {
          border-color: var(--primary);
          box-shadow: 0 0 12px var(--primary);
          background-color: var(--primary);
        }
        .timeline-item:hover .timeline-led {
          border-color: var(--tertiary);
          box-shadow: 0 0 10px var(--tertiary);
        }
        .timeline-card {
          padding: 1.5rem;
        }
        .timeline-card-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        @media (min-width: 640px) {
          .timeline-card-header {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }
        }
        .timeline-role {
          font-family: var(--font-display);
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--on-surface);
          margin: 0;
        }
        .timeline-subrole {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--primary);
          margin-top: 0.25rem;
        }
        .timeline-badge {
          align-self: flex-start;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
          background-color: var(--surface-container-high);
          border: 1px solid var(--hairline-border);
        }
        .badge-current {
          color: var(--tertiary);
          background-color: rgba(0, 158, 185, 0.15);
          border-color: rgba(76, 215, 246, 0.3);
        }
        .timeline-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--muted-body);
          margin-bottom: 1.25rem;
        }
        .timeline-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .exp-tag {
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          background-color: var(--surface-container-highest);
          border: 1px solid var(--hairline-border);
          color: var(--on-surface);
        }
      `}</style>
    </section>
  );
};
