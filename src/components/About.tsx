import React, { useState } from 'react';
import { Copy, Check, FileText, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile.ts';

export const About: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `export const developerProfile = {
  name: 'Dani Cortés Moreno',
  location: 'Alcoy & Desplazamiento Presencial',
  cybersecurity: 'Certificación Oficial',
  coreValues: ['Trato Presencial & Físico', 'Seguimiento en tu Negocio', 'Carga Instantánea'],
  craftsmanship: Infinity,
  humanFirst: true
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="about" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <span className="section-eyebrow">// 01. SOBRE MÍ</span>
        <h2 className="section-title">Diseño intencional, código limpio y compromiso presencial</h2>
      </div>

      <div className="about-bento-grid">
        {/* Bento 1: Core Manifesto + Code Window (Span 8) */}
        <div className="spotlight-card specular-border bento-card bento-card-main">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dimmed-meta)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
              CORE MANIFESTO &amp; PROFILE
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--on-surface)' }}>
              Soy un desarrollador Full-Stack y creador digital radicado en Alcoy. Mi trabajo se sitúa en la intersección entre el diseño visual sofisticado y una ingeniería limpia y medible.
            </p>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--muted-body)' }}>
              En el aspecto técnico, combino React, TypeScript, WordPress a medida, PHP y arquitecturas sólidas. Además, <strong>cuento con el certificado oficial de Ciberseguridad</strong>, por lo que tu página web siempre contará con las mayores y más rigurosas garantías de seguridad, cifrado y protección de datos.
            </p>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--muted-body)' }}>
              Pero mi auténtico diferencial es el <strong>compromiso presencial y humano</strong>: aunque sea de Alcoy, <strong>trabajo para quien sea y donde sea</strong>. Me desplazo físicamente hasta tu local o empresa para conocerte y vivir el proyecto in situ, y cada cierto tiempo me paso a ver cómo os está funcionando la web. Para mí, ese trato cercano y del día a día es lo que marca la diferencia.
            </p>
          </div>

          {/* Interactive Code Window */}
          <div className="code-window" style={{ marginTop: '1.5rem' }}>
            <div className="code-window-header">
              <div className="window-dots">
                <span className="window-dot dot-red"></span>
                <span className="window-dot dot-yellow"></span>
                <span className="window-dot dot-green"></span>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.6875rem', color: 'var(--dimmed-meta)' }}>architecture.config.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: copiedCode ? 'var(--tertiary)' : 'var(--dimmed-meta)', fontSize: '0.6875rem' }}
                title="Copiar configuración"
              >
                {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedCode ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <pre style={{ margin: 0, overflowX: 'auto', fontSize: '0.75rem', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--secondary)' }}>export const</span> <span style={{ color: 'var(--tertiary)' }}>developerProfile</span> = &#123;{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>name:</span> <span style={{ color: 'var(--primary)' }}>'{profile.name}'</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>location:</span> <span style={{ color: 'var(--primary)' }}>'Alcoy &amp; Desplazamiento Presencial'</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>cybersecurity:</span> <span style={{ color: 'var(--tertiary)' }}>'Certificación Oficial'</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>coreValues:</span> [<span style={{ color: 'var(--primary)' }}>'Trato Presencial &amp; Físico'</span>, <span style={{ color: 'var(--primary)' }}>'Seguimiento en tu Negocio'</span>, <span style={{ color: 'var(--primary)' }}>'Carga Instantánea'</span>],{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>craftsmanship:</span> <span style={{ color: 'var(--secondary)' }}>Infinity</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>humanFirst:</span> <span style={{ color: 'var(--tertiary)' }}>true</span>{'\n'}
              &#125;;
            </pre>
          </div>

          {/* Quick PDF CV Access */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--muted-body)' }}>
              ¿Prefieres examinar mi hoja de vida y certificaciones en formato clásico?
            </span>
            <a
              href={profile.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-cv-prominent"
              style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
              title="Abrir Curriculum Vitae en PDF"
            >
              <FileText size={15} color="var(--primary)" />
              <span>Ver CV (PDF)</span>
              <ArrowUpRight size={13} style={{ opacity: 0.7 }} />
            </a>
          </div>
        </div>

        {/* Bento 2: Offline Telemetry & Balance (Span 4) */}
        <div className="spotlight-card specular-border bento-card bento-card-side">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dimmed-meta)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--tertiary)' }}></span>
              VIDA PERSONAL // BALANCE
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface)', margin: 0 }}>
              Equilibrio &amp; Resistencia
            </h3>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-body)' }}>
              Cuando no estoy puliendo interfaces pixel-perfect o blindando arquitecturas, me encontrarás jugando al fútbol, practicando deportes o explorando rutas en la naturaleza; el equilibrio perfecto para mantener la mente despejada y la creatividad al máximo nivel.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '1.5rem' }}>
            {profile.offlineLifestyle.map((item, idx) => (
              <div key={idx} className="lifestyle-tag">
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .section-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--primary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.35rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3.5vw, 2.25rem);
          font-weight: 600;
          color: var(--on-surface);
          letter-spacing: -0.025em;
          margin: 0;
        }
        .about-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 992px) {
          .about-bento-grid {
            grid-template-columns: 8fr 4fr;
          }
        }
        .bento-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .lifestyle-tag {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          background-color: var(--surface-container-high);
          border: 1px solid var(--hairline-border);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--on-surface);
        }
      `}</style>
    </section>
  );
};
