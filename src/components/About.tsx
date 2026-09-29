import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { profile } from '../data/profile.ts';

export const About: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const codeSnippet = `export const developerProfile = {
  name: 'Dani Cortés Moreno',
  location: 'Alcoy, Alicante (ES)',
  coreValues: ['Surgical Precision', 'Zero Jitter', 'Sub-100ms Latency'],
  craftsmanship: Infinity,
  readyForProduction: true
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
        <h2 className="section-title">Arquitectura limpia y diseño intencional</h2>
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
              Soy un desarrollador Full-Stack y diseñador web radicado en Alcoy. Mi trabajo se sitúa en la intersección entre el diseño visual sofisticado y una ingeniería de software limpia. Aunque soy experto en llevar WordPress y builders al límite de su capacidad técnica, mi stack real no tiene barreras: construyo aplicaciones a medida e interfaces interactivas con React, Vue, TypeScript y Node.js.
            </p>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--muted-body)' }}>
              En el backend, me muevo con soltura en PHP, Laravel, y el diseño de bases de datos relacionales impecables, controlando cada despliegue con Git y pipelines automatizados.
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
              {'  '}<span style={{ color: 'var(--on-surface)' }}>location:</span> <span style={{ color: 'var(--primary)' }}>'Alcoy, Alicante (ES)'</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>coreValues:</span> [<span style={{ color: 'var(--primary)' }}>'Surgical Precision'</span>, <span style={{ color: 'var(--primary)' }}>'Zero Jitter'</span>, <span style={{ color: 'var(--primary)' }}>'Sub-100ms Latency'</span>],{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>craftsmanship:</span> <span style={{ color: 'var(--secondary)' }}>Infinity</span>,{'\n'}
              {'  '}<span style={{ color: 'var(--on-surface)' }}>readyForProduction:</span> <span style={{ color: 'var(--tertiary)' }}>true</span>{'\n'}
              &#125;;
            </pre>
          </div>
        </div>

        {/* Bento 2: Offline Telemetry & Balance (Span 4) */}
        <div className="spotlight-card specular-border bento-card bento-card-side">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--dimmed-meta)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--tertiary)' }}></span>
              OFFLINE TELEMETRY
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--on-surface)', margin: 0 }}>
              Equilibrio &amp; Resistencia
            </h3>

            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-body)' }}>
              Cuando no estoy puliendo interfaces pixel-perfect o conectando APIs, me encontrarás compitiendo en el campo de fútbol 7 o explorando rutas en la naturaleza; el equilibrio perfecto para mantener el código limpio y la creatividad a tope.
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
