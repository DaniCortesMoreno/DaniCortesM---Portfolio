import React from 'react';
import { profile } from '../data/profile.ts';
import { ArrowDown, ArrowUpRight, Gauge, Cpu, FileText, Code2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="intro" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
      {/* Availability Pill */}
      <div className="status-pill" style={{ marginBottom: '1.75rem', display: 'inline-flex' }}>
        <span className="status-dot"></span>
        <span style={{ fontWeight: 500, letterSpacing: '0.06em' }}>{profile.availabilityBadge}</span>
      </div>

      {/* Main Title */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '920px' }}>
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            background: 'linear-gradient(180deg, #ffffff 0%, var(--on-surface) 60%, rgba(199, 196, 215, 0.6) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}
        >
          {profile.name}
        </h1>

        {/* Dynamic Role Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', paddingTop: '0.25rem' }}>
          <span className="role-pill pill-indigo">
            <span style={{ opacity: 0.6 }}>&lt;</span>Diseñador UI/UX<span style={{ opacity: 0.6 }}>/&gt;</span>
          </span>
          <span className="role-pill pill-cyan">
            <span style={{ opacity: 0.6 }}>[</span>Frontend Dev<span style={{ opacity: 0.6 }}>]</span>
          </span>
          <span className="role-pill pill-purple">
            <span style={{ opacity: 0.6 }}>&#123;</span>Backend Dev<span style={{ opacity: 0.6 }}>&#125;</span>
          </span>
          <span className="role-pill pill-dim">
            <span style={{ opacity: 0.6 }}>#</span>Ecosistema WP
          </span>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
            lineHeight: 1.65,
            color: 'var(--muted-body)',
            maxWidth: '680px',
            paddingTop: '0.5rem'
          }}
        >
          {profile.tagline}
        </p>
      </div>

      {/* CTA Button Group */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem' }}>
        <a href="#projects" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}>
          <span>Ver Proyectos</span>
          <ArrowDown size={17} />
        </a>

        {/* Dedicated Highly-Visible CV PDF Button (Opens directly in new tab) */}
        <a
          href={profile.cvPdf}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary btn-cv-prominent"
          style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem', display: 'inline-flex', alignItems: 'center', gap: '0.55rem' }}
          title="Abrir Curriculum Vitae de Daniel Cortés en PDF (Pestaña nueva)"
        >
          <FileText size={17} color="var(--primary)" />
          <span>Curriculum Vitae (PDF)</span>
          <ArrowUpRight size={15} style={{ opacity: 0.7 }} />
        </a>

        <a href="#contact" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9375rem' }}>
          <span>Contactar</span>
          <ArrowUpRight size={17} />
        </a>
      </div>

      {/* Telemetry Bento Matrix */}
      <div className="telemetry-grid">
        <div className="spotlight-card specular-border telemetry-card">
          <div className="telemetry-top">
            <span className="telemetry-label">DESARROLLO // ENFOQUE</span>
            <Code2 size={16} color="var(--primary)" />
          </div>
          <div className="telemetry-value">100% a Medida</div>
          <p className="telemetry-desc">Diseño exclusivo y código propio, sin plantillas lentas</p>
        </div>

        <div className="spotlight-card specular-border telemetry-card">
          <div className="telemetry-top">
            <span className="telemetry-label">VELOCIDAD // AUDIT</span>
            <Gauge size={16} color="var(--tertiary)" />
          </div>
          <div className="telemetry-value" style={{ color: 'var(--tertiary)' }}>100% Rápido</div>
          <p className="telemetry-desc">Carga instantánea en móviles y Google</p>
        </div>

        <div className="spotlight-card specular-border telemetry-card">
          <div className="telemetry-top">
            <span className="telemetry-label">SEGURIDAD // CÓDIGO</span>
            <Cpu size={16} color="var(--secondary)" />
          </div>
          <div className="telemetry-value">Garantizada</div>
          <p className="telemetry-desc">Webs seguras con titulación oficial en Ciberseguridad</p>
        </div>
      </div>

      <style>{`
        .role-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          border: 1px solid var(--hairline-border);
          background-color: rgba(42, 42, 42, 0.45);
        }
        .pill-indigo {
          color: var(--primary);
          border-color: rgba(192, 193, 255, 0.3);
        }
        .pill-cyan {
          color: var(--tertiary);
          border-color: rgba(76, 215, 246, 0.3);
        }
        .pill-purple {
          color: var(--secondary);
          border-color: rgba(208, 188, 255, 0.3);
        }
        .pill-dim {
          color: var(--on-surface-variant);
        }
        .telemetry-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
          padding-top: 3rem;
        }
        @media (min-width: 640px) {
          .telemetry-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        .telemetry-card {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 120px;
        }
        .telemetry-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .telemetry-label {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
          letter-spacing: 0.05em;
        }
        .telemetry-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.025em;
          color: var(--on-surface);
        }
        .telemetry-desc {
          font-size: 0.8125rem;
          color: var(--muted-body);
          margin-top: 0.25rem;
        }
      `}</style>
    </section>
  );
};
