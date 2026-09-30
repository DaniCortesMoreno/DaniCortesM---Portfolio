import React, { useState } from 'react';
import { skills, Skill } from '../data/skills.ts';
import { ShieldCheck } from 'lucide-react';

export const Skills: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'backend' | 'security' | 'devops' | 'design'>('all');

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(s => s.category === filter);

  return (
    <section id="skills" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>
      <div className="skills-header">
        <div>
          <span className="section-eyebrow">// 02. HABILIDADES &amp; HERRAMIENTAS</span>
          <h2 className="section-title">Arsenal Tecnológico: Herramientas y Habilidades</h2>
        </div>

        {/* Category Filters */}
        <div className="filter-pill-group">
          {(['all', 'frontend', 'backend', 'security', 'devops', 'design'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
            >
              {cat === 'all' && 'Todas'}
              {cat === 'frontend' && 'Diseño & Web (Frontend)'}
              {cat === 'backend' && 'Servidores & Datos (Backend)'}
              {cat === 'security' && '🛡️ Ciberseguridad Oficial'}
              {cat === 'devops' && 'Hosting & Dominios'}
              {cat === 'design' && 'Diseño UI/UX & Calidad'}
            </button>
          ))}
        </div>
      </div>

      {/* Official Cybersecurity Guarantee Callout */}
      <div className="security-cert-banner">
        <div className="security-icon-box">
          <ShieldCheck size={20} color="var(--tertiary)" />
        </div>
        <div className="security-text">
          <strong>Certificación Oficial en Ciberseguridad:</strong> Cuento con título oficial de especialización en Ciberseguridad. Tu página web siempre contará con las mayores garantías de protección, copias de seguridad continuas, certificados SSL seguros y código blindado frente a posibles caídas o pérdidas de información.
        </div>
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill: Skill, idx: number) => (
          <div key={idx} className="spotlight-card skill-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <span className="skill-name">{skill.name}</span>
              <span className="skill-badge">{skill.badge}</span>
            </div>
            <div className="skill-footer">
              <span className="skill-level">{skill.level}</span>
              <span className="skill-indicator"></span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .skills-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }
        .filter-pill-group {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .filter-pill {
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          background-color: var(--surface-container-low);
          color: var(--on-surface-variant);
          border: 1px solid var(--hairline-border);
          transition: all var(--transition-fast);
        }
        .filter-pill:hover {
          color: var(--on-surface);
          border-color: var(--hairline-hover);
        }
        .filter-pill.active {
          background-color: var(--surface-container-high);
          color: var(--primary);
          border-color: rgba(192, 193, 255, 0.4);
          box-shadow: 0 0 10px rgba(192, 193, 255, 0.15);
        }

        /* Security Banner */
        .security-cert-banner {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding: 0.85rem 1.15rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, rgba(76, 215, 246, 0.08) 0%, rgba(192, 193, 255, 0.04) 100%);
          border: 1px solid rgba(76, 215, 246, 0.25);
          border-radius: var(--radius-sm);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }
        .security-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(76, 215, 246, 0.12);
          border: 1px solid rgba(76, 215, 246, 0.3);
          flex-shrink: 0;
        }
        .security-text {
          font-size: 0.84rem;
          line-height: 1.5;
          color: var(--on-surface);
        }
        .security-text strong {
          color: var(--tertiary);
          margin-right: 0.35rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }
        @media (min-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .skill-card {
          position: relative;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 76px;
          border-radius: var(--radius-sm);
          cursor: default;
          transform: translateY(0);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, box-shadow;
        }
        .skill-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(192, 193, 255, 0.08) 0%, rgba(76, 215, 246, 0.04) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .skill-card:hover {
          transform: translateY(-4px) scale(1.015);
          border-color: rgba(192, 193, 255, 0.42);
          background-color: rgba(35, 34, 40, 0.85);
          box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.6),
                      0 0 18px rgba(192, 193, 255, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .skill-card:hover::after {
          opacity: 1;
        }
        .skill-name {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--on-surface);
          transition: color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skill-card:hover .skill-name {
          color: var(--primary);
          transform: translateX(2px);
        }
        .skill-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--dimmed-meta);
          transition: color 0.3s ease, opacity 0.3s ease;
        }
        .skill-card:hover .skill-badge {
          color: var(--on-surface-variant);
        }
        .skill-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
        }
        .skill-level {
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
          transition: color 0.3s ease;
        }
        .skill-card:hover .skill-level {
          color: var(--on-surface-variant);
        }
        .skill-indicator {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--tertiary);
          box-shadow: 0 0 6px var(--tertiary);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .skill-card:hover .skill-indicator {
          transform: scale(1.4);
          box-shadow: 0 0 10px 2px var(--tertiary);
        }
      `}</style>
    </section>
  );
};
