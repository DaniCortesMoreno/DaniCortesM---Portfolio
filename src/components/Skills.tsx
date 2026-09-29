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
          <span className="section-eyebrow">// HARDWARE &amp; RUNTIMES</span>
          <h2 className="section-title">Arsenal Tecnológico Verificado</h2>
        </div>

        {/* Category Filters */}
        <div className="filter-pill-group">
          {(['all', 'frontend', 'backend', 'security', 'devops', 'design'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`filter-pill ${filter === cat ? 'active' : ''}`}
            >
              {cat === 'all' && 'Todos'}
              {cat === 'frontend' && 'Frontend'}
              {cat === 'backend' && 'Backend'}
              {cat === 'security' && '🛡️ Ciberseguridad'}
              {cat === 'devops' && 'DevOps / SysAdmin'}
              {cat === 'design' && 'Diseño & Auditoría'}
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
          <strong>Certificación Oficial en Ciberseguridad:</strong> Cuento con título oficial de especialización en Ciberseguridad. Tu página web siempre contará con las mayores garantías de protección, cifrado SSL/TLS, cabeceras seguras, mitigación OWASP y código blindado frente a vulnerabilidades.
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
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 76px;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }
        .skill-card:hover .skill-name {
          color: var(--primary);
        }
        .skill-name {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--on-surface);
          transition: color var(--transition-fast);
        }
        .skill-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--dimmed-meta);
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
        }
        .skill-indicator {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: var(--tertiary);
          box-shadow: 0 0 6px var(--tertiary);
        }
      `}</style>
    </section>
  );
};
