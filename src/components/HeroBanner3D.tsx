import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, X, ArrowRight, Sparkles } from 'lucide-react';

interface KeyPortfolioCard {
  id: number;
  keyLabel: string;
  badge: string;
  title: string;
  description: string;
  linkText: string;
  linkTarget: string;
}

const PORTFOLIO_KEYS_DATA: Record<number, KeyPortfolioCard> = {
  1: {
    id: 1,
    keyLabel: 'TECLA [01] // PROYECTOS & DISEÑO',
    badge: 'CASOS REALES & WEBS EN PRODUCCIÓN',
    title: 'Páginas Web y Soluciones a Medida',
    description:
      'Diseño y desarrollo páginas web modernas, tiendas online y plataformas rápidas pensadas para impulsar negocios y cautivar clientes desde el primer segundo.',
    linkText: 'Explorar Trabajos Realizados',
    linkTarget: '#projects'
  },
  2: {
    id: 2,
    keyLabel: 'TECLA [02] // TECNOLOGÍA & SEGURIDAD',
    badge: 'CIBERSEGURIDAD OFICIAL & MÁXIMA VELOCIDAD',
    title: 'Desarrollo Web & Blindaje de Seguridad',
    description:
      'Tecnologías líderes (React, WordPress, PHP y TypeScript) con certificación oficial en Ciberseguridad. Tu web cargará al instante y estará protegida contra cualquier amenaza.',
    linkText: 'Ver Habilidades & Seguridad',
    linkTarget: '#skills'
  },
  3: {
    id: 3,
    keyLabel: 'TECLA [03] // CONTACTO & TRATO DIRECTO',
    badge: 'COMPROMISO PRESENCIAL',
    title: '¿Hablamos sobre tu proyecto o negocio?',
    description:
      'Disponible para empresas, negocios locales y agencias. Me desplazo en persona a tu local para conocerte o coordinamos por WhatsApp o llamada telefónica.',
    linkText: 'Contactar Directamente',
    linkTarget: '#contact'
  }
};

export const HeroBanner3D: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyboardWrapRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  const [activeKeyData, setActiveKeyData] = useState<KeyPortfolioCard | null>(null);

  // Target physics values updated by mouse/touch events
  const targetPosRef = useRef({
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    transX: 0,
    transY: 0,
    glareX: 50,
    glareY: 40,
    isHovered: false
  });

  // Synthesized mechanical keyboard "thock" sound via Web Audio API (Zero external assets)
  const playThockSound = (keyIndex: number) => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. Deep bottom-out resonant thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      const baseFreq = keyIndex === 1 ? 142 : keyIndex === 2 ? 124 : 110;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.075);

      oscGain.gain.setValueAtTime(0.38, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);

      // 2. High tactile snap / switch click (bandpassed noise burst)
      const bufferSize = Math.floor(ctx.sampleRate * 0.018);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2500 + keyIndex * 220, now);
      filter.Q.setValueAtTime(3.2, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.24, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {
      // Audio playback fails gracefully if blocked by browser policy before user gesture
    }
  };

  const handleKeyClick = (keyIndex: number) => {
    playThockSound(keyIndex);
    setActiveKeyData(PORTFOLIO_KEYS_DATA[keyIndex] || null);
  };

  // Measure exact visible viewport height (stops precisely at OS taskbar or fills full screen)
  useEffect(() => {
    const updateExactHeight = () => {
      if (bannerRef.current) {
        bannerRef.current.style.setProperty('--exact-vh', `${window.innerHeight}px`);
      }
    };
    updateExactHeight();
    window.addEventListener('resize', updateExactHeight);
    window.addEventListener('orientationchange', updateExactHeight);
    return () => {
      window.removeEventListener('resize', updateExactHeight);
      window.removeEventListener('orientationchange', updateExactHeight);
    };
  }, []);

  // Main 60-120fps Animation Loop (Canvas Particles + Smooth Inertia Spring Physics for Macropad)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup: Lightweight on mobile devices to preserve CPU budget
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 14 : 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.6 ? '#4cd7f6' : Math.random() > 0.3 ? '#c0c1ff' : '#ffffff'
    }));

    // Current interpolated physics coordinates
    const currentPos = {
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      transX: 0,
      transY: 0,
      glareX: 50,
      glareY: 40
    };

    const render = () => {
      // 1. Particle Canvas Updates
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.005;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.opacity));
        if (!isMobile) {
          ctx.shadowBlur = p.size * 2;
          ctx.shadowColor = p.color;
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 2. Physics Spring Lerp for Volumetric Macropad (Smooth damping & momentum)
      const target = targetPosRef.current;
      const lerp = target.isHovered ? 0.075 : 0.04;

      currentPos.rotX += (target.rotX - currentPos.rotX) * lerp;
      currentPos.rotY += (target.rotY - currentPos.rotY) * lerp;
      currentPos.rotZ += (target.rotZ - currentPos.rotZ) * lerp;
      currentPos.transX += (target.transX - currentPos.transX) * lerp;
      currentPos.transY += (target.transY - currentPos.transY) * lerp;
      currentPos.glareX += (target.glareX - currentPos.glareX) * lerp;
      currentPos.glareY += (target.glareY - currentPos.glareY) * lerp;

      // Natural zero-gravity continuous breathing
      const time = performance.now() * 0.0016;
      const breathY = Math.sin(time) * 8;
      const breathRotX = Math.cos(time * 0.8) * 1.6;
      const breathRotY = Math.sin(time * 0.6) * 2.0;
      const breathRotZ = Math.sin(time * 0.4) * 0.8;

      const finalRotX = currentPos.rotX + breathRotX;
      const finalRotY = currentPos.rotY + breathRotY;
      const finalRotZ = currentPos.rotZ + breathRotZ;
      const finalTransX = currentPos.transX;
      const finalTransY = currentPos.transY + breathY;

      // Direct DOM updates for buttery smooth 60-120fps without React re-renders
      if (keyboardWrapRef.current) {
        keyboardWrapRef.current.style.transform = `perspective(1200px) rotateX(${finalRotX.toFixed(2)}deg) rotateY(${finalRotY.toFixed(2)}deg) rotateZ(${finalRotZ.toFixed(2)}deg) translate3d(${finalTransX.toFixed(1)}px, ${finalTransY.toFixed(1)}px, 42px)`;
      }

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${currentPos.glareX.toFixed(1)}% ${currentPos.glareY.toFixed(1)}%, rgba(255, 255, 255, 0.46) 0%, rgba(192, 132, 252, 0.26) 30%, transparent 68%)`;
      }

      if (shadowRef.current) {
        const shadowScale = 1 + Math.abs(finalRotX) * 0.015 - (finalTransY * 0.003);
        const shadowOpacity = Math.max(0.45, 0.85 - Math.abs(finalTransY) * 0.012);
        shadowRef.current.style.transform = `translate(-50%, 65px) rotateX(75deg) translate(${-finalTransX * 0.7}px, ${-finalTransY * 0.3}px) scale(${shadowScale.toFixed(3)})`;
        shadowRef.current.style.opacity = shadowOpacity.toFixed(2);
      }

      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(-50%, -50%) translate3d(${(-finalTransX * 0.35).toFixed(1)}px, ${(-finalTransY * 0.35).toFixed(1)}px, -40px)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Defer start slightly so initial FCP and LCP render without CPU contention
    const startTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(render);
    }, 70);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Mouse Move Event: updates target coordinates with natural isometric bounds
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    // Balanced realistic angles that enhance 3D volume without paper-flattening distortion
    const rotY = normX * 13;   // Subtle horizontal yaw
    const rotX = -normY * 10;  // Subtle vertical pitch
    const rotZ = normX * 3.2;  // Slight roll
    const transX = normX * 26; // High depth parallax
    const transY = normY * 18;

    // Specular light glides across the keycaps
    const glareX = 50 + normX * 35;
    const glareY = 40 + normY * 30;

    targetPosRef.current = {
      rotX,
      rotY,
      rotZ,
      transX,
      transY,
      glareX,
      glareY,
      isHovered: true
    };
  };

  const handleMouseEnter = () => {
    targetPosRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    targetPosRef.current = {
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      transX: 0,
      transY: 0,
      glareX: 50,
      glareY: 40,
      isHovered: false
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!bannerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = bannerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    targetPosRef.current = {
      rotX: -normY * 9,
      rotY: normX * 11,
      rotZ: normX * 2.5,
      transX: normX * 16,
      transY: normY * 12,
      glareX: 50 + normX * 30,
      glareY: 40 + normY * 25,
      isHovered: true
    };
  };

  const handleTouchEnd = () => {
    targetPosRef.current = {
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      transX: 0,
      transY: 0,
      glareX: 50,
      glareY: 40,
      isHovered: false
    };
  };

  return (
    <div
      id="hero"
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="hero-banner-3d"
    >
      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="banner-particles-canvas" />

      {/* Ambient Central Radial Glow */}
      <div className="banner-center-glow" />

      {/* 3D Scene Viewport */}
      <div className="banner-3d-scene">
        {/* Giant Background Typography: DANICORTESM */}
        <div
          ref={bgTextRef}
          className="banner-bg-text font-display"
        >
          DANICORTESM
        </div>

        {/* Dynamic Reactive Ground Shadow */}
        <div
          ref={shadowRef}
          className="banner-object-shadow"
        />

        {/* Central 3D Interactive Keyboard Object */}
        <div
          ref={keyboardWrapRef}
          className="banner-keyboard-wrap"
        >
          {/* Volumetric Extrusion Stack (Pseudo-3D bevel to kill the paper-thin look) */}
          <div className="keyboard-depth-stack" aria-hidden="true">
            <img src="/keyboard.webp" alt="" width="640" height="380" className="keyboard-slice slice-5" draggable={false} />
            <img src="/keyboard.webp" alt="" width="640" height="380" className="keyboard-slice slice-4" draggable={false} />
            <img src="/keyboard.webp" alt="" width="640" height="380" className="keyboard-slice slice-3" draggable={false} />
            <img src="/keyboard.webp" alt="" width="640" height="380" className="keyboard-slice slice-2" draggable={false} />
            <img src="/keyboard.webp" alt="" width="640" height="380" className="keyboard-slice slice-1" draggable={false} />
          </div>

          {/* Ambient Purple Underglow LED Emitter */}
          <div className="keyboard-underglow-emitter" />

          {/* Front Keyboard Body Face */}
          <img
            src="/keyboard.webp"
            alt="Mechanical Macropad Artisanal Keyboard"
            width="640"
            height="380"
            // @ts-expect-error fetchPriority attribute
            fetchpriority="high"
            className="banner-keyboard-img"
            draggable={false}
          />

          {/* Dynamic Specular Light Glare (Masked strictly to keyboard alpha silhouette) */}
          <div ref={glareRef} className="keyboard-specular-glare" />

          {/* 3 Clickable Mechanical Keycaps with Web Audio Synthesis */}
          <div className="keyboard-interactive-grid" aria-label="Interactive mechanical keycaps">
            <button
              type="button"
              className={`key-trigger key-trigger-1 ${activeKeyData?.id === 1 ? 'is-active' : ''}`}
              title="Pulsar tecla 1: Proyectos & Arquitectura"
              aria-label="Pulsar Tecla 1: Proyectos & Arquitectura"
              onClick={() => handleKeyClick(1)}
            >
              <span className="key-pulse-ring" />
            </button>
            <button
              type="button"
              className={`key-trigger key-trigger-2 ${activeKeyData?.id === 2 ? 'is-active' : ''}`}
              title="Pulsar tecla 2: Stack Tecnológico"
              aria-label="Pulsar Tecla 2: Stack Tecnológico"
              onClick={() => handleKeyClick(2)}
            >
              <span className="key-pulse-ring" />
            </button>
            <button
              type="button"
              className={`key-trigger key-trigger-3 ${activeKeyData?.id === 3 ? 'is-active' : ''}`}
              title="Pulsar tecla 3: Contacto & Disponibilidad"
              aria-label="Pulsar Tecla 3: Contacto & Disponibilidad"
              onClick={() => handleKeyClick(3)}
            >
              <span className="key-pulse-ring" />
            </button>
          </div>

          {/* Subtle micro-hint when idle */}
          {!activeKeyData && (
            <div className="keyboard-tap-hint">
              <Sparkles size={11} className="hint-icon" />
              <span>Haz clic en las teclas</span>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Info Modal on Key Press */}
      {activeKeyData && (
        <div
          className="portfolio-key-overlay"
          onClick={() => setActiveKeyData(null)}
          role="presentation"
        >
          <div
            className="portfolio-key-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="key-modal-glow" />

            <div className="key-modal-header">
              <div className="key-modal-tag">
                <span className="key-modal-dot" />
                <span>{activeKeyData.keyLabel}</span>
              </div>
              <button
                type="button"
                className="key-modal-close"
                onClick={() => setActiveKeyData(null)}
                aria-label="Cerrar ventana informativa"
              >
                <X size={16} />
              </button>
            </div>

            <div className="key-modal-body">
              <span className="key-modal-badge">{activeKeyData.badge}</span>
              <h4 className="key-modal-title">{activeKeyData.title}</h4>
              <p className="key-modal-desc">{activeKeyData.description}</p>
            </div>

            <div className="key-modal-footer">
              <a
                href={activeKeyData.linkTarget}
                className="key-modal-action-btn"
                onClick={() => setActiveKeyData(null)}
              >
                <span>{activeKeyData.linkText}</span>
                <ArrowRight size={14} className="action-arrow" />
              </a>

              <div className="key-modal-quick-nav">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`modal-key-pill ${activeKeyData.id === num ? 'is-current' : ''}`}
                    onClick={() => handleKeyClick(num)}
                    title={`Ver info tecla ${num}`}
                  >
                    K{num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Slogan & Identity Typography */}
      <div className="banner-bottom-text">
        <p className="banner-subtext">
          DISEÑO WEB PROFESIONAL &amp; CÓDIGO A MEDIDA
        </p>
        <h3 className="banner-main-slogan font-display">
          MÁXIMO RENDIMIENTO.
        </h3>

        {/* Scroll cue button */}
        <a href="#intro" className="banner-scroll-cue" aria-label="Ir a la sección de introducción">
          <span>EXPLORAR PORTFOLIO</span>
          <ChevronDown size={14} className="scroll-chevron-icon" />
        </a>
      </div>

      {/* Atmospheric Horizon Gradient Fade into Main Page */}
      <div className="hero-banner-bottom-fade" aria-hidden="true">
        <div className="hero-specular-horizon-line" />
      </div>

      {/* Embedded High-End Styles */}
      <style>{`
        .hero-banner-3d {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0;
          height: var(--exact-vh, 100dvh);
          max-height: var(--exact-vh, 100dvh);
          overflow: hidden;
          overflow-x: hidden;
          background: 
            radial-gradient(circle, rgba(192, 193, 255, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 50% 45%, #181722 0%, #0c0b11 50%, #07070a 100%);
          background-size: 36px 36px, 100% 100%;
          background-position: center center, center center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.85rem 2rem max(1rem, env(safe-area-inset-bottom, 1rem));
          user-select: none;
          box-sizing: border-box;
        }

        .banner-particles-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .banner-center-glow {
          position: absolute;
          top: 48%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(720px, 90vw);
          height: min(480px, 60vh);
          background: radial-gradient(circle, rgba(147, 51, 234, 0.16) 0%, rgba(76, 215, 246, 0.08) 40%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 2;
        }

        /* 3D Scene Viewport */
        .banner-3d-scene {
          position: relative;
          z-index: 5;
          flex: 1 1 0;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        /* Giant Background DANICORTESM Text */
        .banner-bg-text {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          text-align: center;
          font-size: clamp(3rem, 11vw, min(8.5rem, 16vh));
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: transparent;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(180, 180, 205, 0.5) 45%, rgba(50, 50, 65, 0.15) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 3;
          white-space: nowrap;
          text-transform: uppercase;
        }

        /* Drop Shadow under the 3D element */
        .banner-object-shadow {
          position: absolute;
          bottom: 10px;
          left: 50%;
          width: 440px;
          height: 85px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.92) 0%, rgba(147, 51, 234, 0.25) 30%, transparent 70%);
          filter: blur(16px);
          pointer-events: none;
          z-index: 4;
        }

        /* Keyboard Wrap with 3D transform */
        .banner-keyboard-wrap {
          position: relative;
          z-index: 8;
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
          max-width: 88vw;
          height: 100%;
          max-height: clamp(170px, 32vh, 320px);
          transform-style: preserve-3d;
          cursor: grab;
        }

        .banner-keyboard-wrap:active {
          cursor: grabbing;
        }

        /* 3D Volumetric Extrusion Stack */
        .keyboard-depth-stack {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .keyboard-slice {
          position: absolute;
          max-height: 100%;
          width: auto;
          max-width: 88vw;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
        }

        /* 5 depth slices in Z space: kills the flat paper appearance */
        .slice-1 {
          transform: translateZ(-2px) translateY(1.5px);
          filter: brightness(0.82) contrast(1.1);
          opacity: 0.95;
        }
        .slice-2 {
          transform: translateZ(-4px) translateY(3px);
          filter: brightness(0.66) contrast(1.15);
          opacity: 0.9;
        }
        .slice-3 {
          transform: translateZ(-6px) translateY(4.5px);
          filter: brightness(0.5) contrast(1.2);
          opacity: 0.85;
        }
        .slice-4 {
          transform: translateZ(-8px) translateY(6px);
          filter: brightness(0.35) contrast(1.25);
          opacity: 0.8;
        }
        .slice-5 {
          transform: translateZ(-10px) translateY(7.5px);
          filter: brightness(0.2) contrast(1.3);
          opacity: 0.75;
        }

        /* Ambient Purple Underglow LED Emitter */
        .keyboard-underglow-emitter {
          position: absolute;
          width: 72%;
          height: 55%;
          top: 35%;
          left: 14%;
          background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.72) 0%, rgba(147, 51, 234, 0.38) 45%, transparent 75%);
          filter: blur(24px);
          transform: translateZ(-14px);
          pointer-events: none;
          animation: underglowPulse 3.5s ease-in-out infinite alternate;
        }

        @keyframes underglowPulse {
          0% { opacity: 0.55; transform: translateZ(-14px) scale(0.95); }
          100% { opacity: 0.92; transform: translateZ(-14px) scale(1.06); }
        }

        /* Front Face Image */
        .banner-keyboard-img {
          position: relative;
          z-index: 5;
          max-height: 100%;
          width: auto;
          max-width: 88vw;
          object-fit: contain;
          filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(139, 92, 246, 0.25));
          pointer-events: none;
          transform: translateZ(0px);
        }

        /* Masked Specular Light Glare */
        .keyboard-specular-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          transform: translateZ(3px);
          mix-blend-mode: color-dodge;
          mask-image: url('/keyboard.webp');
          -webkit-mask-image: url('/keyboard.webp');
          mask-size: contain;
          -webkit-mask-size: contain;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          mask-position: center;
          -webkit-mask-position: center;
        }

        /* Interactive Mechanical Keycap Grid */
        .keyboard-interactive-grid {
          position: absolute;
          inset: 0;
          z-index: 25;
          pointer-events: none;
        }

        .key-trigger {
          position: absolute;
          background: transparent;
          border: none;
          cursor: pointer;
          pointer-events: auto;
          outline: none;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.08s ease;
        }

        .key-trigger:active,
        .key-trigger.is-active {
          transform: scale(0.92) translateZ(-4px) !important;
        }

        /* Exact placement calibrated to keycaps in keyboard.png */
        .key-trigger-1 {
          left: 17%;
          top: 32%;
          width: 20%;
          height: 27%;
          transform: rotate(-14deg) skewX(-10deg);
        }

        .key-trigger-2 {
          left: 38%;
          top: 43%;
          width: 20%;
          height: 27%;
          transform: rotate(-14deg) skewX(-10deg);
        }

        .key-trigger-3 {
          left: 59%;
          top: 54%;
          width: 20%;
          height: 27%;
          transform: rotate(-14deg) skewX(-10deg);
        }

        .key-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 12px;
          border: 1px solid rgba(192, 132, 252, 0.0);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .key-trigger:hover .key-pulse-ring,
        .key-trigger.is-active .key-pulse-ring {
          border-color: rgba(192, 132, 252, 0.85);
          box-shadow: 0 0 16px rgba(168, 85, 247, 0.55), inset 0 0 10px rgba(168, 85, 247, 0.35);
        }

        /* Subtle keyboard tap hint under macropad */
        .keyboard-tap-hint {
          position: absolute;
          bottom: 2%;
          left: 50%;
          transform: translateX(-50%) translateZ(16px);
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          background: rgba(15, 14, 22, 0.85);
          border: 1px solid rgba(168, 85, 247, 0.35);
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          letter-spacing: 0.08em;
          color: var(--on-surface-variant);
          pointer-events: none;
          z-index: 28;
          white-space: nowrap;
          animation: hintPulse 3s ease-in-out infinite alternate;
        }

        .hint-icon {
          color: #c084fc;
        }

        @keyframes hintPulse {
          0% { opacity: 0.7; transform: translateX(-50%) translateZ(16px) scale(0.98); }
          100% { opacity: 1; transform: translateX(-50%) translateZ(16px) scale(1.02); }
        }

        /* Portfolio Key Overlay & Modal */
        .portfolio-key-overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 7, 13, 0.68);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 1.5rem;
          animation: overlayFadeIn 0.2s ease-out;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .portfolio-key-modal {
          position: relative;
          width: 100%;
          max-width: 450px;
          background: rgba(18, 17, 26, 0.95);
          border: 1px solid rgba(168, 85, 247, 0.5);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(147, 51, 234, 0.3);
          overflow: hidden;
          animation: modalScaleIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalScaleIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .key-modal-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 160px;
          height: 160px;
          background: radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%);
          filter: blur(35px);
          pointer-events: none;
        }

        .key-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }

        .key-modal-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--tertiary);
          text-transform: uppercase;
        }

        .key-modal-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c084fc;
          box-shadow: 0 0 8px #c084fc;
          animation: pulse-ring 2s infinite ease-out;
        }

        .key-modal-close {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--hairline-border);
          color: var(--on-surface-variant);
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .key-modal-close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--hairline-hover);
          transform: rotate(90deg);
        }

        .key-modal-body {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          margin-bottom: 1.25rem;
        }

        .key-modal-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.12em;
          color: #93c5fd;
          text-transform: uppercase;
        }

        .key-modal-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.25;
        }

        .key-modal-desc {
          font-family: var(--font-body);
          font-size: 0.875rem;
          color: var(--on-surface-variant);
          line-height: 1.55;
          margin: 0;
        }

        .key-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .key-modal-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.85) 0%, rgba(99, 102, 241, 0.85) 100%);
          border: 1px solid rgba(192, 132, 252, 0.4);
          border-radius: var(--radius-sm);
          color: #ffffff;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(147, 51, 234, 0.35);
          transition: all var(--transition-fast);
        }

        .key-modal-action-btn:hover {
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.95) 0%, rgba(129, 140, 248, 0.95) 100%);
          box-shadow: 0 6px 20px rgba(168, 85, 247, 0.5);
          transform: translateY(-1px);
        }

        .action-arrow {
          transition: transform 0.15s ease;
        }

        .key-modal-action-btn:hover .action-arrow {
          transform: translateX(3px);
        }

        .key-modal-quick-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .modal-key-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--on-surface-variant);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-mono);
          font-size: 0.625rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-key-pill:hover,
        .modal-key-pill.is-current {
          background: rgba(168, 85, 247, 0.25);
          border-color: rgba(168, 85, 247, 0.6);
          color: #ffffff;
        }

        /* Bottom Slogan Typography */
        .banner-bottom-text {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.15rem;
          flex-shrink: 0;
          margin-bottom: 0.25rem;
        }

        .banner-subtext {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          color: var(--on-surface-variant);
          margin: 0;
          text-transform: uppercase;
        }

        @media (min-width: 640px) {
          .banner-subtext {
            font-size: 0.75rem;
          }
        }

        .banner-main-slogan {
          font-size: clamp(1.35rem, 2.8vw, 2.1rem);
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 1.1;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 0 25px rgba(255, 255, 255, 0.35);
        }

        .banner-scroll-cue {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          background: rgba(28, 27, 27, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid var(--hairline-border);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--on-surface-variant);
          transition: all var(--transition-fast);
          cursor: pointer;
        }

        .banner-scroll-cue:hover {
          color: var(--on-surface);
          border-color: var(--hairline-hover);
          background: var(--surface-container-high);
          box-shadow: 0 0 15px rgba(76, 215, 246, 0.2);
          transform: translateY(1px);
        }

        .scroll-chevron-icon {
          color: var(--tertiary);
          animation: chevronBounce 1.8s infinite;
        }

        @keyframes chevronBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(4px); }
          60% { transform: translateY(2px); }
        }

        /* Atmospheric Horizon Transition into Main Canvas */
        .hero-banner-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 180px;
          background: linear-gradient(to bottom, transparent 0%, rgba(7, 7, 10, 0.7) 65%, #07070a 100%);
          pointer-events: none;
          z-index: 6;
          display: flex;
          align-items: flex-end;
        }

        .hero-specular-horizon-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(76, 215, 246, 0.25) 30%, rgba(192, 193, 255, 0.35) 50%, rgba(168, 85, 247, 0.25) 70%, transparent 95%);
          box-shadow: 0 0 12px rgba(76, 215, 246, 0.2);
        }

        /* Mobile Specific (<768px) Perfect Alignment & Safe Area */
        @media (max-width: 767px) {
          .hero-banner-3d {
            padding: 3.75rem 1rem max(1.25rem, env(safe-area-inset-bottom, 1.25rem));
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
          }
          .banner-bg-text {
            font-size: clamp(1.8rem, 8.5vw, 3.4rem) !important;
            letter-spacing: -0.02em;
            max-width: 96vw !important;
          }
          .banner-keyboard-wrap {
            max-height: clamp(135px, 24vh, 210px) !important;
            max-width: 82vw !important;
          }
          .banner-main-slogan {
            font-size: clamp(1.15rem, 5vw, 1.5rem) !important;
          }
          .banner-subtext {
            font-size: 0.58rem !important;
            letter-spacing: 0.08em !important;
          }
          .banner-scroll-cue {
            margin-top: 0.35rem !important;
            padding: 0.3rem 0.75rem !important;
            font-size: 0.625rem !important;
          }
        }

        /* Tablet Specific (768px - 1024px) */
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-banner-3d {
            padding: 3.85rem 1.75rem 1.5rem;
          }
          .banner-bg-text {
            font-size: clamp(3.4rem, 11vw, 6.5rem) !important;
          }
          .banner-keyboard-wrap {
            max-height: clamp(180px, 30vh, 290px) !important;
          }
          .banner-main-slogan {
            font-size: 1.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};
