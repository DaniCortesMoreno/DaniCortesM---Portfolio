import React, { useState, useRef, useEffect, useCallback } from 'react';
import { projects, Project } from '../data/projects.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { 
  ArrowUpRight, 
  UnfoldVertical, 
  CheckCircle2, 
  Lock, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  LayoutGrid,
  MoveHorizontal
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [isDragging, setIsDragging] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // References for Jesper Landberg Physics & Motion
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentXRef = useRef<number>(0);
  const targetXRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const dragStartXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const maxScrollRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  // Update bounds for horizontal drag/scroll
  const updateBounds = useCallback(() => {
    if (!containerRef.current || !trackRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    const trackWidth = trackRef.current.scrollWidth;
    // Calculate maximum negative translation (how far left it can go)
    const max = Math.min(0, containerWidth - trackWidth - 40);
    maxScrollRef.current = max;
    targetXRef.current = Math.max(max, Math.min(0, targetXRef.current));
  }, []);

  // Main 60/120fps Lerp & Skew Physics Loop
  useEffect(() => {
    if (viewMode !== 'carousel') return;

    const updatePosition = () => {
      // Smooth Lerp towards target
      const diff = targetXRef.current - currentXRef.current;
      currentXRef.current += diff * 0.12;

      if (trackRef.current) {
        // Dynamic tilt/skew based on glide velocity
        const velocity = diff * 0.035;
        const clampedTilt = Math.max(-2.5, Math.min(2.5, velocity));
        trackRef.current.style.transform = `translate3d(${currentXRef.current.toFixed(2)}px, 0, 0) skewX(${clampedTilt.toFixed(2)}deg)`;
      }

      // Update progress and active index
      if (maxScrollRef.current < 0) {
        const progress = Math.max(0, Math.min(1, currentXRef.current / maxScrollRef.current));
        setCurrentProgress(progress);

        const projectIdx = Math.round(progress * (projects.length - 1));
        setActiveProjectIndex(Math.max(0, Math.min(projects.length - 1, projectIdx)));
      }

      animFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animFrameRef.current = requestAnimationFrame(updatePosition);
    updateBounds();

    const handleResize = () => {
      updateBounds();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode, updateBounds]);

  // Pointer Drag Handlers (Mouse & Touch with Pointer Capture)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (viewMode !== 'carousel') return;
    isPointerDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragStartXRef.current = targetXRef.current;
    dragDistanceRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || viewMode !== 'carousel') return;
    const delta = e.clientX - startXRef.current;
    dragDistanceRef.current += Math.abs(e.movementX || delta);

    // Elastic rubber-banding when dragged beyond edges
    let next = dragStartXRef.current + delta * 1.15;
    if (next > 0) {
      next = next * 0.35;
    } else if (next < maxScrollRef.current) {
      const overflow = next - maxScrollRef.current;
      next = maxScrollRef.current + overflow * 0.35;
    }

    targetXRef.current = next;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    // Smoothly snap back if dragged beyond limits
    if (targetXRef.current > 0) {
      targetXRef.current = 0;
    } else if (targetXRef.current < maxScrollRef.current) {
      targetXRef.current = maxScrollRef.current;
    }

    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  // Native non-passive Wheel listener to hijack page scroll across the carousel
  // until reaching the start (when scrolling up) or the end (when scrolling down)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || viewMode !== 'carousel') return;

    const onWheelNative = (e: WheelEvent) => {
      // Determine dominant scroll direction
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 0.2) return;

      const maxScroll = maxScrollRef.current;
      const currentTarget = targetXRef.current;

      // Scrolling DOWN / RIGHT (towards the last project)
      if (delta > 0) {
        // If we haven't reached the end yet (buffer of 3px)
        if (currentTarget > maxScroll + 3) {
          e.preventDefault();
          e.stopPropagation();
          const nextTarget = Math.max(maxScroll, currentTarget - delta * 1.15);
          targetXRef.current = nextTarget;
        }
        // If we are already at the very end, DO NOT preventDefault -> page scrolls down to Contact naturally!
      } 
      // Scrolling UP / LEFT (towards the first project)
      else if (delta < 0) {
        // If we haven't reached the start yet (buffer of 3px)
        if (currentTarget < -3) {
          e.preventDefault();
          e.stopPropagation();
          const nextTarget = Math.min(0, currentTarget - delta * 1.15);
          targetXRef.current = nextTarget;
        }
        // If we are already at the very start, DO NOT preventDefault -> page scrolls up to Experience naturally!
      }
    };

    wrapper.addEventListener('wheel', onWheelNative, { passive: false });

    return () => {
      wrapper.removeEventListener('wheel', onWheelNative);
    };
  }, [viewMode]);

  // Navigation Arrow Jump Helpers
  const scrollPrev = () => {
    const step = 480;
    targetXRef.current = Math.min(0, targetXRef.current + step);
  };

  const scrollNext = () => {
    const step = 480;
    targetXRef.current = Math.max(maxScrollRef.current, targetXRef.current - step);
  };

  const scrollToProject = (index: number) => {
    if (projects.length <= 1) return;
    const fraction = index / (projects.length - 1);
    targetXRef.current = maxScrollRef.current * fraction;
  };

  // Card Click: Only trigger if it wasn't a drag gesture
  const handleCardClick = (project: Project) => {
    if (dragDistanceRef.current > 8) return;
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="projects-section-container">
      {/* Section Header with View Mode Switcher (Aligned inside site-container) */}
      <div className="site-container">
        <div className="projects-header">
          <div>
            <span className="section-eyebrow">// 03. TRABAJOS SELECCIONADOS</span>
            <h2 className="section-title">Proyectos Reales &amp; Casos de Éxito</h2>
          </div>

          <div className="header-controls-cluster">
            {/* Mode Switcher: Jesper Carousel vs Bento Grid */}
            <div className="view-mode-switch" role="tablist" aria-label="Modo de visualización de proyectos">
              <button
                type="button"
                className={`view-switch-btn ${viewMode === 'carousel' ? 'is-active' : ''}`}
                onClick={() => setViewMode('carousel')}
                aria-label="Ver carrusel interactivo cinemático"
              >
                <SlidersHorizontal size={13} />
                <span>Carrusel Dinámico</span>
              </button>
              <button
                type="button"
                className={`view-switch-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                onClick={() => setViewMode('grid')}
                aria-label="Ver cuadrícula Bento"
              >
                <LayoutGrid size={13} />
                <span>Cuadrícula Bento</span>
              </button>
            </div>

            <div className="status-pill status-pill-badge">
              <CheckCircle2 size={13} color="var(--tertiary)" />
              <span>{projects.length} Proyectos Verificados</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW 1: JESPER LANDBERG MOTION CAROUSEL */}
      {viewMode === 'carousel' && (
        <div ref={wrapperRef} className="jesper-showcase-wrapper">
          {/* Atmospheric Horizon Edge Fades */}
          <div className="jesper-edge-fade jesper-fade-left" aria-hidden="true" />
          <div className="jesper-edge-fade jesper-fade-right" aria-hidden="true" />

          {/* Interactive Drag & Glide Viewport */}
          <div
            ref={containerRef}
            className={`jesper-carousel-viewport ${isDragging ? 'is-grabbing' : 'is-grabbable'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div ref={trackRef} className="jesper-cards-track">
              {projects.map((project, idx) => {
                const isActive = activeProjectIndex === idx;

                return (
                  <article
                    key={project.id}
                    className={`jesper-card ${isActive ? 'is-focused' : ''}`}
                    onClick={() => handleCardClick(project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Ver caso de estudio de ${project.title}`}
                  >
                    {/* Browser Mockup Chrome Header */}
                    <div className="jesper-card-chrome">
                      <div className="chrome-dots-mini">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>

                      <div className="chrome-url-tag">
                        <Lock size={10} className="url-lock-icon" />
                        <span className="url-text">{project.displayUrl || 'proyecto.es'}</span>
                      </div>

                      <span className="chrome-category">{project.categoryTag}</span>
                    </div>

                    {/* Screenshot Preview with Parallax & Hover Zoom */}
                    <div className="jesper-card-viewport">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="jesper-card-img"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="jesper-vignette" />
                      <div className="jesper-card-glow-overlay" />
                    </div>

                    {/* Floating Bottom Info Console (Jesper Landberg Studio Style) */}
                    <div className="jesper-bottom-console">
                      <div className="console-meta-row">
                        <div className="console-identity">
                          <span className="console-number">{project.number} //</span>
                          <h3 className="console-title">{project.title}</h3>
                        </div>

                        {project.statusBadge && (
                          <span className={`project-status-badge badge-${project.id}`}>
                            {project.statusBadge}
                          </span>
                        )}
                      </div>

                      <p className="console-desc">{project.description}</p>

                      {/* Tags & Action Cluster */}
                      <div className="console-footer-row">
                        <div className="console-tags-list">
                          {project.tags.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="console-tag-pill">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="console-action-cluster">
                          <button
                            type="button"
                            className="console-details-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                          >
                            <UnfoldVertical size={13} />
                            <span>Detalles</span>
                          </button>

                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="console-live-btn"
                              onClick={(e) => e.stopPropagation()}
                              title="Ver web real en vivo"
                            >
                              <span>En Vivo</span>
                              <ArrowUpRight size={13} />
                            </a>
                          )}

                          {/* Jesper Landberg Iconic Circular Arrow Pill Button */}
                          <div className="jesper-circle-arrow-pill" aria-hidden="true">
                            <ArrowUpRight size={15} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Bottom Interactive HUD Bar (Aligned inside site-container) */}
          <div className="site-container">
            <div className="jesper-bottom-hud">
              {/* Left/Right Arrow Navigation Controls */}
              <div className="hud-arrows-group">
                <button
                  type="button"
                  className="hud-nav-arrow-btn"
                  onClick={scrollPrev}
                  aria-label="Proyecto anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="hud-nav-arrow-btn"
                  onClick={scrollNext}
                  aria-label="Siguiente proyecto"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Center Drag & Scroll Hint */}
              <div className="hud-drag-cue">
                <MoveHorizontal size={14} className="hud-drag-icon" />
                <span>ARRASTRA O USA LA RUEDA DEL RATÓN PARA NAVEGAR</span>
              </div>

              {/* Right: Dot Jump Navigators & Dynamic Progress Track */}
              <div className="hud-progress-cluster">
                <div className="hud-project-dots">
                  {projects.map((proj, dIdx) => (
                    <button
                      key={proj.id}
                      type="button"
                      className={`hud-project-dot ${activeProjectIndex === dIdx ? 'is-active' : ''}`}
                      onClick={() => scrollToProject(dIdx)}
                      title={`Ir a ${proj.title}`}
                      aria-label={`Ir al proyecto 0${dIdx + 1}`}
                    >
                      <span className="dot-inner" />
                    </button>
                  ))}
                </div>

                <div className="hud-track-meter" title={`Progreso: ${Math.round(currentProgress * 100)}%`}>
                  <div
                    className="hud-meter-fill"
                    style={{ width: `${Math.round(currentProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: TRADITIONAL BENTO GRID FALLBACK (Aligned inside site-container) */}
      {viewMode === 'grid' && (
        <div className="site-container">
          <div className="projects-grid">
          {projects.map((project) => {
            const isWide = project.id === 'rayo-pelon';

            return (
              <div
                key={project.id}
                className={`spotlight-card specular-border project-card ${isWide ? 'project-card-wide' : ''}`}
              >
                {/* Browser Window Mockup Frame */}
                <div className="project-mockup-frame">
                  <div className="mockup-chrome-bar">
                    <div className="mockup-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>

                    <div className="mockup-url-pill">
                      <Lock size={10} className="url-lock-icon" />
                      <span className="url-text">{project.displayUrl || 'sitio-web.com'}</span>
                    </div>

                    <div className="mockup-category-tag">
                      {project.number} // {project.categoryTag}
                    </div>
                  </div>

                  <div className="project-viewport">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      loading="lazy"
                    />
                    <div className="project-vignette-overlay" />
                    <div className="project-fade-base" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="project-body">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <h3 className="project-title">{project.title}</h3>
                      {project.statusBadge && (
                        <span className={`project-status-badge badge-${project.id}`}>
                          {project.statusBadge}
                        </span>
                      )}
                    </div>

                    {project.statusNote && (
                      <div className="project-status-note">
                        <span className="status-note-dot" />
                        <span>{project.statusNote}</span>
                      </div>
                    )}

                    <p className="project-desc">{project.description}</p>
                  </div>

                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="action-link-btn"
                      >
                        <UnfoldVertical size={14} />
                        <span>Detalles</span>
                      </button>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link-primary"
                        >
                          <span>Ver En Vivo</span>
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* In-Depth Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-section-container {
          padding-top: 2.5rem;
          padding-bottom: 3.5rem;
          position: relative;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .projects-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .header-controls-cluster {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.85rem;
        }

        /* View Mode Switcher Pills */
        .view-mode-switch {
          display: inline-flex;
          align-items: center;
          background: rgba(18, 17, 24, 0.8);
          padding: 0.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--hairline-border);
          backdrop-filter: blur(12px);
        }
        .view-switch-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          color: var(--dimmed-meta);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .view-switch-btn:hover {
          color: var(--on-surface);
        }
        .view-switch-btn.is-active {
          background: var(--surface-container-high);
          color: var(--primary);
          box-shadow: 0 0 15px rgba(192, 193, 255, 0.15);
          font-weight: 600;
        }

        /* JESPER LANDBERG SHOWCASE RUNWAY: EXACTO 100% ANCHO DE PANTALLA SIN OVERFLOW */
        .jesper-showcase-wrapper {
          position: relative;
          width: 100%;
          max-width: 100%;
          margin: 0;
          left: 0;
          right: 0;
          padding: 1rem 0 1.5rem 0;
          overflow: hidden;
          box-sizing: border-box;
        }

        .jesper-edge-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(25px, 5vw, 60px);
          pointer-events: none;
          z-index: 10;
        }
        .jesper-fade-left {
          left: 0;
          background: linear-gradient(to right, #07070a 15%, transparent 100%);
        }
        .jesper-fade-right {
          right: 0;
          background: linear-gradient(to left, #07070a 15%, transparent 100%);
        }

        /* Viewport & Drag Grabber: 100% Edge to Edge */
        .jesper-carousel-viewport {
          width: 100%;
          max-width: 100%;
          overflow: hidden;
          padding: 1.5rem 1.5rem;
          box-sizing: border-box;
          user-select: none;
          touch-action: pan-y;
        }
        .is-grabbable {
          cursor: grab;
        }
        .is-grabbing {
          cursor: grabbing !important;
        }

        .jesper-cards-track {
          display: flex;
          align-items: stretch;
          gap: 1.75rem;
          width: max-content;
          will-change: transform;
          transform-origin: 50% 50%;
        }

        /* Individual Jesper Card: Cinematic scale */
        .jesper-card {
          position: relative;
          width: clamp(340px, 45vw, 680px);
          height: clamp(380px, 50vh, 530px);
          flex-shrink: 0;
          border-radius: 22px;
          overflow: hidden;
          background: #0e1218;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 0, 0, 0.4);
          transition: border-color 300ms ease, box-shadow 300ms ease, transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .jesper-card:hover {
          border-color: rgba(76, 215, 246, 0.45);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(76, 215, 246, 0.18);
          transform: translateY(-4px);
        }
        .jesper-card.is-focused {
          border-color: rgba(192, 193, 255, 0.4);
        }

        /* Chrome Top Mockup Bar */
        .jesper-card-chrome {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          background: rgba(14, 18, 24, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          flex-shrink: 0;
          z-index: 5;
        }
        .chrome-dots-mini {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .chrome-dots-mini .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .dot-red { background-color: #ff5f56; }
        .dot-yellow { background-color: #ffbd2e; }
        .dot-green { background-color: #27c93f; }

        .chrome-url-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--on-surface-variant);
          max-width: 50%;
        }
        .chrome-url-tag .url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chrome-category {
          color: var(--primary);
          font-size: 0.625rem;
          letter-spacing: 0.05em;
        }

        /* Screenshot Canvas */
        .jesper-card-viewport {
          position: relative;
          flex: 1;
          width: 100%;
          overflow: hidden;
          background: #080b0f;
        }
        .jesper-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1), filter 500ms ease;
          filter: contrast(1.02) brightness(0.95);
        }
        .jesper-card:hover .jesper-card-img {
          transform: scale(1.05);
          filter: contrast(1.04) brightness(1.02);
        }
        .jesper-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 35px rgba(0, 0, 0, 0.65);
          pointer-events: none;
        }
        .jesper-card-glow-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(14, 18, 24, 0.85) 85%, #0e1218 100%);
          pointer-events: none;
        }

        /* Bottom Floating Info Console */
        .jesper-bottom-console {
          position: relative;
          z-index: 6;
          padding: 1.15rem 1.35rem;
          background: rgba(14, 18, 24, 0.94);
          backdrop-filter: blur(16px);
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .console-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .console-identity {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          overflow: hidden;
        }
        .console-number {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 600;
        }
        .console-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .console-desc {
          font-size: 0.8125rem;
          line-height: 1.5;
          color: var(--muted-body);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .console-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          gap: 0.5rem;
        }
        .console-tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .console-tag-pill {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--on-surface-variant);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .console-action-cluster {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .console-details-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--on-surface-variant);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
          transition: all var(--transition-fast);
        }
        .console-details-btn:hover {
          color: var(--primary);
          background: rgba(192, 193, 255, 0.08);
        }

        .console-live-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--primary);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-xs);
          background: rgba(192, 193, 255, 0.08);
          border: 1px solid rgba(192, 193, 255, 0.2);
          transition: all var(--transition-fast);
        }
        .console-live-btn:hover {
          background: rgba(192, 193, 255, 0.16);
          border-color: var(--primary);
        }

        /* Jesper Circular Arrow Pill Button */
        .jesper-circle-arrow-pill {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }
        .jesper-card:hover .jesper-circle-arrow-pill {
          background: var(--tertiary);
          color: #000000;
          border-color: var(--tertiary);
          transform: rotate(45deg);
          box-shadow: 0 0 15px rgba(76, 215, 246, 0.4);
        }

        /* BOTTOM HUD: ARROWS, DRAG CUE & PROGRESS TRACK */
        .jesper-bottom-hud {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          max-width: 1200px;
          margin: 1rem auto 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        .hud-arrows-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hud-nav-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(28, 27, 27, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--hairline-border);
          color: var(--on-surface-variant);
          transition: all var(--transition-fast);
          cursor: pointer;
        }
        .hud-nav-arrow-btn:hover {
          color: var(--on-surface);
          border-color: var(--hairline-hover);
          background: var(--surface-container-high);
          box-shadow: 0 0 12px rgba(76, 215, 246, 0.2);
        }

        .hud-drag-cue {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--dimmed-meta);
        }
        .hud-drag-icon {
          color: var(--tertiary);
          animation: dragPulse 2s ease-in-out infinite;
        }
        @keyframes dragPulse {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }

        .hud-progress-cluster {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .hud-project-dots {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .hud-project-dot {
          padding: 0.35rem 0.2rem;
          background: none;
          border: none;
          cursor: pointer;
        }
        .hud-project-dot .dot-inner {
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transition: all var(--transition-fast);
        }
        .hud-project-dot.is-active .dot-inner {
          background: var(--primary);
          transform: scale(1.4);
          box-shadow: 0 0 8px var(--primary);
        }

        .hud-track-meter {
          width: 100px;
          height: 3px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .hud-meter-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--secondary), var(--primary), var(--tertiary));
          border-radius: var(--radius-full);
          transition: width 150ms linear;
        }

        /* FALLBACK: TRADITIONAL BENTO GRID */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .project-card-wide {
            grid-column: span 2;
          }
        }
        .project-card {
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: #0e1218 !important;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .project-card:hover {
          border-color: rgba(76, 215, 246, 0.4);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(76, 215, 246, 0.12);
        }

        .project-mockup-frame {
          width: 100%;
          background-color: #0e1218;
          border-bottom: 1px solid var(--hairline-border);
          position: relative;
        }
        .mockup-chrome-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.85rem;
          background-color: var(--surface-container-lowest);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mockup-dots {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .mockup-dots .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .mockup-url-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--dimmed-meta);
          font-size: 0.6875rem;
          max-width: 55%;
          overflow: hidden;
        }
        .url-lock-icon {
          color: var(--tertiary);
          flex-shrink: 0;
        }
        .url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--on-surface-variant);
        }
        .mockup-category-tag {
          color: var(--primary);
          font-size: 0.625rem;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }

        .project-viewport {
          position: relative;
          height: 215px;
          width: 100%;
          overflow: hidden;
          background-color: #0e1218;
          isolation: isolate;
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          position: relative;
          z-index: 1;
          transform-origin: 50% 100%;
          transform: scale(1);
          will-change: transform;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms ease;
          filter: contrast(1.02) brightness(0.96);
        }
        .project-card:hover .project-img {
          transform: scale(1.04);
          filter: contrast(1.03) brightness(1.01);
        }
        .project-vignette-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          box-shadow: inset 0 0 25px rgba(10, 14, 20, 0.5);
          pointer-events: none;
        }
        .project-fade-base {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 110px;
          z-index: 3;
          background: linear-gradient(
            180deg,
            rgba(14, 18, 24, 0) 0%,
            rgba(14, 18, 24, 0.4) 30%,
            rgba(14, 18, 24, 0.82) 65%,
            #0e1218 90%,
            #0e1218 100%
          );
          pointer-events: none;
        }

        .project-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
          background-color: #0e1218;
          margin-top: -4px;
          position: relative;
          z-index: 4;
        }
        .project-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--on-surface);
          margin: 0;
          transition: color var(--transition-fast);
        }
        .project-card:hover .project-title {
          color: var(--primary);
        }
        .project-status-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--hairline-border);
          background: var(--surface-container-high);
          color: var(--on-surface-variant);
        }
        .badge-goat-xi {
          color: #55f3aa;
          border-color: rgba(85, 243, 170, 0.35);
          background: rgba(85, 243, 170, 0.08);
        }
        .badge-silvia-vicedo {
          color: #c0c1ff;
          border-color: rgba(192, 193, 255, 0.35);
          background: rgba(192, 193, 255, 0.08);
        }
        .badge-montfer, .badge-disenowebalcoy, .badge-rayo-pelon {
          color: #ffbd2e;
          border-color: rgba(255, 189, 46, 0.35);
          background: rgba(255, 189, 46, 0.08);
        }
        .badge-sunvision {
          color: #4cd7f6;
          border-color: rgba(76, 215, 246, 0.35);
          background: rgba(76, 215, 246, 0.08);
        }
        .project-status-note {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-family: var(--font-mono);
          color: var(--primary);
          margin-top: 0.4rem;
          margin-bottom: 0.35rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-xs);
          border: 1px dashed rgba(255, 255, 255, 0.12);
        }
        .status-note-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--tertiary);
          box-shadow: 0 0 6px var(--tertiary);
          flex-shrink: 0;
        }
        .project-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--muted-body);
          margin-top: 0.5rem;
        }
        .project-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--hairline-border);
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .project-tag {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
          background-color: var(--surface-container-high);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-xs);
          border: 1px solid var(--hairline-border);
        }
        .project-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }
        .action-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8125rem;
          font-family: var(--font-mono);
          color: var(--on-surface-variant);
          transition: color var(--transition-fast);
        }
        .action-link-btn:hover {
          color: var(--primary);
        }
        .action-link-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8125rem;
          font-family: var(--font-mono);
          color: var(--primary);
          transition: gap var(--transition-fast);
        }
        .action-link-primary:hover {
          gap: 0.55rem;
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .jesper-carousel-viewport {
            padding: 1rem 0.85rem;
          }
          .jesper-card {
            width: min(84vw, 360px);
            max-width: 85vw;
            height: 380px;
          }
          .jesper-bottom-hud {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            padding: 0 1rem;
          }
          .hud-drag-cue {
            font-size: 0.625rem;
          }
        }
      `}</style>
    </section>
  );
};
