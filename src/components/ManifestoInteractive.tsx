import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, HeartHandshake, Zap, ChevronDown } from 'lucide-react';

interface ManifestoFeature {
  id: number;
  tag: string;
  arcTitle: string;
  headline: string;
  description: string;
  badge: string;
  corner: 'tl' | 'tr' | 'br' | 'bl';
  targetAngle: number; // degrees relative to north (0 = up, 90 = right, etc.)
  icon: React.ReactNode;
  specs: string[];
}

const features: ManifestoFeature[] = [
  {
    id: 0,
    tag: '01 // INGENIERÍA & DESARROLLO A MEDIDA',
    arcTitle: 'desarrollo a medida',
    headline: 'Webs rápidas, robustas y sin plantillas lentas',
    description:
      'Desarrollo soluciones digitales a medida con las tecnologías más modernas y fiables (React, TypeScript y WordPress profesional). Código limpio, sin errores y con una velocidad de carga inmediata para que tu web nunca falle ni se quede obsoleta.',
    badge: 'Desarrollo a Medida • Máxima Rapidez • Cero Errores',
    corner: 'tl',
    targetAngle: -135, // Northwest (Top-Left)
    icon: <Cpu size={18} />,
    specs: ['React, TypeScript & PHP', 'WordPress Profesional', 'Estructura Sólida', 'Sin Plantillas Lentas']
  },
  {
    id: 1,
    tag: '02 // CIBERSEGURIDAD OFICIAL',
    arcTitle: 'ciberseguridad',
    headline: 'Tu web protegida con certificación oficial',
    description:
      'Cuento con titulación oficial universitaria en Ciberseguridad. Tu página web estará blindada contra ataques, intentos de hackeo y pérdidas de datos, con certificados de seguridad SSL y protección estricta para ti y tus clientes.',
    badge: 'Título Oficial • Web 100% Segura • Cifrado SSL',
    corner: 'tr',
    targetAngle: -45, // Northeast (Top-Right)
    icon: <ShieldCheck size={18} />,
    specs: ['Certificación Oficial', 'Protección contra Ataques', 'Certificado SSL / HTTPS', 'Máxima Privacidad']
  },
  {
    id: 2,
    tag: '03 // CERCANÍA & COMPROMISO HUMANO',
    arcTitle: 'compromiso humano',
    headline: 'Voy a tu negocio en persona: trato humano y directo',
    description:
      'Aunque vivo en Alcoy, me desplazo a tu local, despacho o empresa para conocerte y entender de verdad lo que necesitas. Además, mantendremos contacto continuo con visitas periódicas para ver cómo funciona tu web y ayudarte a mejorar.',
    badge: 'Presencial en tu Negocio • Trato Directo • Alcoy & Donde Sea',
    corner: 'br',
    targetAngle: 45, // Southeast (Bottom-Right)
    icon: <HeartHandshake size={18} />,
    specs: ['Visitas Presenciales', 'Trato de Tú a Tú', 'Soporte Continuo', 'Compromiso Real']
  },
  {
    id: 3,
    tag: '04 // MÓVILES & POSICIONAMIENTO GOOGLE',
    arcTitle: 'móvil & posicionamiento',
    headline: 'Diseño para móviles que atrae clientes y vende',
    description:
      'Más del 80% de tus clientes visitarán tu web desde el teléfono móvil. Creo páginas visualmente impactantes, intuitivas y optimizadas para que carguen al segundo y aparezcan en los mejores puestos de Google.',
    badge: 'Adaptado a Móviles • Posicionamiento Google • Venta Directa',
    corner: 'bl',
    targetAngle: 135, // Southwest (Bottom-Left)
    icon: <Zap size={18} />,
    specs: ['100% Perfecto en Móvil', 'Posicionamiento Google (SEO)', 'Diseño Atractivo', 'Más Contactos y Clientes']
  }
];

export const ManifestoInteractive: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to calculate sticky progress from 0 to 1
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const totalScroll = trackRef.current.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScroll;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      setProgress(clampedProgress);

      // Determine active step based on progress segments
      let step = 0;
      if (clampedProgress < 0.25) {
        step = 0;
      } else if (clampedProgress < 0.50) {
        step = 1;
      } else if (clampedProgress < 0.75) {
        step = 2;
      } else {
        step = 3;
      }
      setActiveStep(step);
    };

    const onScrollThrottled = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    window.addEventListener('resize', onScrollThrottled, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', onScrollThrottled);
      window.removeEventListener('resize', onScrollThrottled);
    };
  }, []);

  // Jump directly to a step by clicking one of the 4 right dots
  const scrollToStep = (stepIdx: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const totalScroll = trackRef.current.offsetHeight - window.innerHeight;
    // Map index 0..3 to progress 0, 0.33, 0.66, 1
    const targetProgress = stepIdx / 3;
    const targetScrollY = trackTop + targetProgress * totalScroll;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Continuous arrow angle: smoothly sweeps clockwise from -135deg (NW) to +135deg (SW)
  const continuousAngle = -135 + progress * 270;
  const currentFeature = features[activeStep];

  return (
    <div id="manifesto" ref={trackRef} className="manifesto-scroll-track">
      {/* 100vw & 100vh Sticky Stage Pinned on Screen */}
      <section className="manifesto-sticky-stage" aria-label="Manifiesto interactivo con rotación por scroll">
        {/* Deep Tech Grid & Cosmic Ambient Background */}
        <div className="manifesto-ambient-backdrop">
          <div className="manifesto-radial-glow" />
          <div className="manifesto-grid-matrix" />
        </div>

        {/* Soft atmospheric gradient transitions at top & bottom horizons */}
        <div className="manifesto-top-horizon-fade" aria-hidden="true">
          <div className="manifesto-specular-horizon-line" />
        </div>
        <div className="manifesto-bottom-horizon-fade" aria-hidden="true">
          <div className="manifesto-specular-horizon-line" />
        </div>

        {/* HUD Top Bar */}
        <header className="manifesto-hud-header">
          <div className="hud-badge-group">
            <span className="hud-pill-tag">// 4 PILARES DE MI TRABAJO</span>
            <span className="hud-status-indicator">
              <span className="hud-status-dot" />
              RADAR INTERACTIVO: GIRA AL HACER SCROLL
            </span>
          </div>
          <div className="hud-telemetry">
            <span className="hud-telemetry-item">
              PILAR: <strong style={{ color: 'var(--primary)' }}>0{activeStep + 1} / 04</strong>
            </span>
            <span className="hud-telemetry-separator">|</span>
            <span className="hud-telemetry-item">
              ÁNGULO: <strong>{Math.round(continuousAngle)}°</strong>
            </span>
          </div>
        </header>

        {/* The 4 Corner Characteristics (Hidden until the ball/arrow points to each) */}
        <div className="manifesto-corners-arena">
          {features.map((feature, idx) => {
            const isRevealed = activeStep === idx;
            return (
              <article
                key={feature.id}
                className={`manifesto-card manifesto-card--${feature.corner} ${isRevealed ? 'is-revealed' : 'is-hidden'}`}
                aria-hidden={!isRevealed}
              >
                <div className="card-glass-panel">
                  {/* Card Header */}
                  <div className="card-top-row">
                    <div className="card-icon-halo">{feature.icon}</div>
                    <span className="card-tag">{feature.tag}</span>
                    <span className="card-lock-badge">REVELADO</span>
                  </div>

                  {/* Headline & Body */}
                  <h3 className="card-headline">{feature.headline}</h3>
                  <p className="card-description">{feature.description}</p>

                  {/* Key specs bullet list */}
                  <div className="card-specs-grid">
                    {feature.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="card-spec-item">
                        <span className="spec-dot" />
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="card-footer-meta">
                    <span className="card-badge-pill">{feature.badge}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Center Stage: The Ball Morphing and Extending Arrow on Scroll */}
        <div className="manifesto-center-stage">
          {/* Radar Waves & Circular Concentric Guides */}
          <div className="radar-circle-guides">
            <div className="radar-ring radar-ring-lg" />
            <div className="radar-ring radar-ring-md" />
            <div className="radar-ring radar-ring-sm" />
            <div
              className="radar-sweep-beam"
              style={{ transform: `rotate(${continuousAngle}deg)` }}
            />
          </div>

          {/* Rotating Arrow & Pointer Group */}
          <div
            className="manifesto-arrow-rotator"
            style={{
              transform: `rotate(${continuousAngle}deg)`
            }}
          >
            {/* Extended Arrow Stem & Glowing Neon Head */}
            <svg
              className="manifesto-arrow-svg"
              viewBox="-120 -240 240 240"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="manifesto-beam-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4cd7f6" stopOpacity="1" />
                  <stop offset="60%" stopColor="#c0c1ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8083ff" stopOpacity="0" />
                </linearGradient>

                <filter id="manifesto-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Energy Beam Line Extending Outward */}
              <line
                x1="0"
                y1="-42"
                x2="0"
                y2="-168"
                stroke="url(#manifesto-beam-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#manifesto-neon-glow)"
              />

              {/* High-tech Arrowhead pointing toward the target corner */}
              <polygon
                points="0,-195 -14,-165 0,-172 14,-165"
                fill="#4cd7f6"
                filter="url(#manifesto-neon-glow)"
              />

              {/* Targeting Reticle Dots */}
              <circle cx="0" cy="-140" r="3" fill="#c0c1ff" opacity="0.9" />
              <circle cx="0" cy="-105" r="2.5" fill="#c0c1ff" opacity="0.6" />
              <circle cx="0" cy="-75" r="2" fill="#c0c1ff" opacity="0.4" />
            </svg>
          </div>

          {/* Central Ball / Core Orb */}
          <div className="manifesto-core-ball">
            <div className="ball-inner-glow" />
            <div className="ball-radar-pulse" />
            <div className="ball-center-dot" />
            <div className="ball-hud-data">
              <span className="ball-data-num">0{activeStep + 1}</span>
            </div>
          </div>

          {/* Curved Text Arc Label Following the Orientation */}
          <div
            className="manifesto-arc-label-wrap"
            style={{ transform: `rotate(${continuousAngle}deg)` }}
          >
            <span className="manifesto-floating-arc-text">
              {currentFeature.arcTitle.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Far Right 4-Point Vertical Navigation Dock (Direct Click Jump) */}
        <aside className="manifesto-right-dock" aria-label="Selector directo de características">
          <div className="dock-guide-line" />

          {/* Filter for Organic Goo Effect on Active Marker */}
          <svg className="goo-filter-svg" aria-hidden="true" focusable="false">
            <defs>
              <filter id="right-dots-morph-goo" x="-50%" y="-25%" width="200%" height="150%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>

          {/* The 4 Dots with Tooltip */}
          <div className="dock-dots-container">
            {/* Sliding Goo Active Indicator */}
            <div
              className="dock-active-blob"
              style={{
                top: `${activeStep * 44 + 6}px`
              }}
            />

            {features.map((feature, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className={`dock-dot-btn ${isActive ? 'is-active' : ''}`}
                  aria-label={`Ir al pilar 0${idx + 1}: ${feature.headline}`}
                >
                  <span className="dot-circle" />
                  {/* Tooltip Card to the left of each dot */}
                  <span className="dot-tooltip">
                    <span className="dot-tooltip-num">0{idx + 1}</span>
                    <span className="dot-tooltip-title">{feature.arcTitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* HUD Bottom Bar with Scroll Progress & Transition Messages */}
        <footer className="manifesto-hud-footer">
          <div className="hud-footer-content">
            {progress < 0.05 ? (
              <div className="hud-scroll-cue">
                <span>SCROLL HACIA ABAJO PARA GIRAR EL RADAR Y VER LOS 4 PILARES</span>
                <ChevronDown size={14} className="hud-cue-bounce" />
              </div>
            ) : progress > 0.95 ? (
              <div className="hud-scroll-cue is-finished">
                <span>CONTINÚA EL SCROLL PARA VER MIS HABILIDADES &amp; TECNOLOGÍAS</span>
                <ChevronDown size={14} className="hud-cue-bounce" />
              </div>
            ) : (
              <div className="hud-scroll-cue is-active">
                <span>DESCUBRIENDO PILAR 0{activeStep + 1} DE 04</span>
              </div>
            )}

            {/* Linear Progress Bar */}
            <div className="hud-progress-track">
              <div
                className="hud-progress-fill"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </footer>
      </section>

      <style>{`
        /* Outer 400vh Scroll Track for Natural Pinning */
        .manifesto-scroll-track {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 400vh;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Pinned 100% Width & Height Screen Stage */
        .manifesto-sticky-stage {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          max-width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(7, 7, 10, 0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-sizing: border-box;
          user-select: none;
          z-index: 25;
        }

        /* Ambient Backgrounds */
        .manifesto-ambient-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .manifesto-radial-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 900px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(76, 215, 246, 0.08) 40%, transparent 70%);
          filter: blur(75px);
        }
        .manifesto-grid-matrix {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(192, 193, 255, 0.08) 1px, transparent 1px);
          background-size: 36px 36px;
          background-position: center center;
          mask-image: radial-gradient(circle at 50% 50%, black 45%, transparent 95%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 45%, transparent 95%);
        }

        /* Atmospheric Horizon Transitions */
        .manifesto-top-horizon-fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to bottom, #07070a 0%, rgba(7, 7, 10, 0.6) 60%, transparent 100%);
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: flex-start;
        }

        .manifesto-bottom-horizon-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(to top, #07070a 0%, rgba(7, 7, 10, 0.6) 60%, transparent 100%);
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: flex-end;
        }

        .manifesto-specular-horizon-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(76, 215, 246, 0.25) 30%, rgba(192, 193, 255, 0.35) 50%, rgba(168, 85, 247, 0.25) 70%, transparent 95%);
          box-shadow: 0 0 12px rgba(76, 215, 246, 0.15);
        }

        /* Top HUD Header */
        .manifesto-hud-header {
          position: relative;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.75rem 3.5rem 0.5rem 3.5rem;
          width: 100%;
          box-sizing: border-box;
        }
        .hud-badge-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .hud-pill-tag {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          letter-spacing: 1px;
        }
        .hud-status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          background: rgba(76, 215, 246, 0.08);
          border: 1px solid rgba(76, 215, 246, 0.25);
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--tertiary);
          letter-spacing: 0.5px;
        }
        .hud-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--tertiary);
          box-shadow: 0 0 8px var(--tertiary);
          animation: pulseLed 2s infinite ease-in-out;
        }
        .hud-telemetry {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--dimmed-meta);
        }
        .hud-telemetry-separator {
          opacity: 0.3;
        }

        /* 4 Corners Arena Layout */
        .manifesto-corners-arena {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
        }

        /* Individual Card in Corners */
        .manifesto-card {
          position: absolute;
          width: 380px;
          max-width: 36vw;
          transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* 4 Specific Corner Anchors */
        .manifesto-card--tl {
          top: 5.5rem;
          left: 4.5rem;
        }
        .manifesto-card--tr {
          top: 5.5rem;
          right: 7.5rem;
        }
        .manifesto-card--br {
          bottom: 5.5rem;
          right: 7.5rem;
        }
        .manifesto-card--bl {
          bottom: 5.5rem;
          left: 4.5rem;
        }

        /* Hidden vs Revealed Animation */
        .manifesto-card.is-hidden {
          opacity: 0;
          filter: blur(12px);
          pointer-events: none;
          visibility: hidden;
        }
        .manifesto-card--tl.is-hidden { transform: translate(-20px, -20px) scale(0.92); }
        .manifesto-card--tr.is-hidden { transform: translate(20px, -20px) scale(0.92); }
        .manifesto-card--br.is-hidden { transform: translate(20px, 20px) scale(0.92); }
        .manifesto-card--bl.is-hidden { transform: translate(-20px, 20px) scale(0.92); }

        .manifesto-card.is-revealed {
          opacity: 1;
          filter: blur(0px);
          transform: translate(0, 0) scale(1);
          pointer-events: auto;
          visibility: visible;
        }

        /* Card Inner Glass Panel */
        .card-glass-panel {
          padding: 1.5rem 1.65rem;
          background: rgba(22, 21, 28, 0.82);
          border: 1px solid rgba(192, 193, 255, 0.35);
          border-radius: var(--radius-lg, 16px);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.8),
                      0 0 30px rgba(192, 193, 255, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.12);
        }
        .card-top-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.85rem;
        }
        .card-icon-halo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(192, 193, 255, 0.15);
          color: var(--primary);
          box-shadow: 0 0 12px rgba(192, 193, 255, 0.2);
        }
        .card-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--primary);
          letter-spacing: 0.5px;
        }
        .card-lock-badge {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          background: rgba(76, 215, 246, 0.12);
          color: var(--tertiary);
          border: 1px solid rgba(76, 215, 246, 0.3);
        }
        .card-headline {
          font-size: 1.15rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 0.65rem;
        }
        .card-description {
          font-size: 0.84rem;
          line-height: 1.6;
          color: var(--muted-body);
          margin-bottom: 1rem;
        }
        .card-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.4rem;
          margin-bottom: 1.15rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .card-spec-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--on-surface-variant);
        }
        .spec-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--tertiary);
          box-shadow: 0 0 6px var(--tertiary);
        }
        .card-footer-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .card-badge-pill {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          background: rgba(76, 215, 246, 0.08);
          color: var(--tertiary);
          border: 1px solid rgba(76, 215, 246, 0.25);
        }

        /* Center Stage Elements */
        .manifesto-center-stage {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 440px;
          height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 15;
          pointer-events: none;
        }

        /* Radar Background Guides */
        .radar-circle-guides {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(192, 193, 255, 0.12);
        }
        .radar-ring-lg {
          width: 400px;
          height: 400px;
          animation: spinCounterClockwise 80s linear infinite;
        }
        .radar-ring-md {
          width: 280px;
          height: 280px;
          border-style: solid;
          border-color: rgba(76, 215, 246, 0.08);
        }
        .radar-ring-sm {
          width: 170px;
          height: 170px;
          border-color: rgba(192, 193, 255, 0.18);
        }
        .radar-sweep-beam {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, rgba(76, 215, 246, 0.15) 0deg, transparent 45deg);
          pointer-events: none;
          transition: transform 0.15s ease-out;
        }

        /* Rotating Arrow Container */
        .manifesto-arrow-rotator {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.12s ease-out;
          will-change: transform;
        }
        .manifesto-arrow-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* Center Ball Core */
        .manifesto-core-ball {
          position: absolute;
          width: 82px;
          height: 82px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #2a2936 0%, #0d0c12 90%);
          border: 2px solid rgba(192, 193, 255, 0.6);
          box-shadow: 0 0 25px rgba(76, 215, 246, 0.35),
                      inset 0 0 15px rgba(192, 193, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .ball-inner-glow {
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 1px dashed rgba(76, 215, 246, 0.4);
          animation: spinCounterClockwise 20s linear infinite;
        }
        .ball-radar-pulse {
          position: absolute;
          inset: -12px;
          border-radius: 50%;
          border: 1px solid rgba(76, 215, 246, 0.3);
          animation: pingPulse 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .ball-center-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff;
        }
        .ball-hud-data {
          position: absolute;
          bottom: 8px;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--tertiary);
          letter-spacing: 0.5px;
        }

        /* Curved Text Arc Label around center */
        .manifesto-arc-label-wrap {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          transition: transform 0.12s ease-out;
        }
        .manifesto-floating-arc-text {
          position: absolute;
          top: 38px;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(76, 215, 246, 0.8);
          padding: 0.2rem 0.5rem;
          background: rgba(14, 13, 19, 0.7);
          border-radius: 4px;
          border: 1px solid rgba(76, 215, 246, 0.3);
        }

        /* Far-Right 4-Dot Navigation Dock */
        .manifesto-right-dock {
          position: absolute;
          right: 2.5rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .dock-guide-line {
          position: absolute;
          top: 10px;
          bottom: 10px;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(192, 193, 255, 0.2) 20%, rgba(192, 193, 255, 0.2) 80%, transparent);
          z-index: 1;
        }
        .goo-filter-svg {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
        }
        .dock-dots-container {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          z-index: 5;
        }
        .dock-active-blob {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--tertiary);
          box-shadow: 0 0 16px var(--tertiary);
          transition: top 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 2;
          pointer-events: none;
        }
        .dock-dot-btn {
          position: relative;
          width: 32px;
          height: 28px;
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: none;
          z-index: 5;
        }
        .dot-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(192, 193, 255, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .dock-dot-btn:hover .dot-circle {
          transform: scale(1.4);
          background: #ffffff;
        }
        .dock-dot-btn.is-active .dot-circle {
          background: #ffffff;
          transform: scale(0.6);
        }

        /* Tooltip Card to the Left of Each Dot */
        .dot-tooltip {
          position: absolute;
          right: 38px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.75rem;
          background: rgba(18, 17, 24, 0.92);
          border: 1px solid rgba(192, 193, 255, 0.25);
          border-radius: 8px;
          backdrop-filter: blur(12px);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }
        .dock-dot-btn:hover .dot-tooltip,
        .dock-dot-btn.is-active:hover .dot-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        .dot-tooltip-num {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: var(--tertiary);
        }
        .dot-tooltip-title {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--on-surface);
        }

        /* HUD Bottom Footer */
        .manifesto-hud-footer {
          position: relative;
          z-index: 30;
          width: 100%;
          padding: 0.75rem 3.5rem 1.75rem 3.5rem;
          box-sizing: border-box;
        }
        .hud-footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
        }
        .hud-scroll-cue {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--muted-body);
          letter-spacing: 1px;
        }
        .hud-scroll-cue.is-active {
          color: var(--primary);
        }
        .hud-scroll-cue.is-finished {
          color: var(--tertiary);
          font-weight: 600;
        }
        .hud-cue-bounce {
          animation: cueBounce 1.5s infinite ease-in-out;
        }
        .hud-progress-track {
          width: 240px;
          height: 3px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .hud-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--tertiary));
          border-radius: 100px;
          transition: width 0.1s linear;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .manifesto-card {
            width: 320px;
            max-width: 42vw;
          }
          .manifesto-card--tl { top: 4.5rem; left: 1.5rem; }
          .manifesto-card--tr { top: 4.5rem; right: 5rem; }
          .manifesto-card--br { bottom: 4.5rem; right: 5rem; }
          .manifesto-card--bl { bottom: 4.5rem; left: 1.5rem; }
          .manifesto-right-dock { right: 1.25rem; }
          .manifesto-hud-header, .manifesto-hud-footer { padding-left: 1.5rem; padding-right: 1.5rem; }
        }

        /* Mobile View (<720px) */
        @media (max-width: 720px) {
          .manifesto-center-stage {
            transform: translate(-50%, -65%) scale(0.75);
          }
          .manifesto-corners-arena {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 1.25rem;
            box-sizing: border-box;
          }
          .manifesto-card {
            position: absolute !important;
            top: auto !important;
            bottom: 4.5rem !important;
            left: 1rem !important;
            right: 4.5rem !important;
            width: auto !important;
            max-width: none !important;
          }
          .manifesto-card.is-hidden {
            transform: translateY(20px) scale(0.95);
          }
          .manifesto-card.is-revealed {
            transform: translateY(0) scale(1);
          }
          .manifesto-right-dock {
            right: 0.75rem;
          }
          .dot-tooltip {
            display: none;
          }
          .card-specs-grid {
            display: none;
          }
          .hud-telemetry {
            display: none;
          }
        }

        /* Keyframe Animations */
        @keyframes pulseLed {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes cueBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @keyframes spinCounterClockwise {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pingPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
