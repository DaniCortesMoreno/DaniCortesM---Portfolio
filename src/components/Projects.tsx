import React, { useState } from 'react';
import { projects, Project } from '../data/projects.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { ArrowUpRight, UnfoldVertical, CheckCircle2, Lock } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
      {/* Section Header */}
      <div className="projects-header">
        <div>
          <span className="section-eyebrow">// 03. TRABAJOS SELECCIONADOS</span>
          <h2 className="section-title">Casos de estudio &amp; Producción</h2>
        </div>

        <div className="status-pill">
          <CheckCircle2 size={13} color="var(--tertiary)" />
          <span>{projects.length} Proyectos Verificados</span>
        </div>
      </div>

      {/* Projects Bento Grid */}
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
                {/* Chrome Top Bar */}
                <div className="mockup-chrome-bar">
                  <div className="mockup-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>

                  <div className="mockup-url-pill">
                    <Lock size={10} className="url-lock-icon" />
                    <span className="url-text">{project.displayUrl || 'sitio-web.com'}</span>
                  </div>

                  <div className="mockup-category-tag">
                    {project.number} // {project.categoryTag}
                  </div>
                </div>

                {/* Viewport Canvas */}
                <div className="project-viewport">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-img"
                    loading="lazy"
                  />
                  <div className="project-vignette-overlay"></div>
                  <div className="project-fade-base"></div>
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
                      <span className="status-note-dot"></span>
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

      {/* In-Depth Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`
        .projects-header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.25rem;
        }
        @media (min-width: 640px) {
          .projects-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }
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

        /* Mockup Frame Styling */
        .project-mockup-frame {
          width: 100%;
          background-color: #0e1218;
          overflow: hidden;
          position: relative;
        }
        .mockup-chrome-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.55rem 0.85rem;
          background: rgba(14, 18, 24, 0.98);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
        }
        .mockup-dots {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .dot-red { background-color: #ff5f56; opacity: 0.85; }
        .dot-yellow { background-color: #ffbd2e; opacity: 0.85; }
        .dot-green { background-color: #27c93f; opacity: 0.85; }

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

        /* Gradient anchored completely to bottom edge with seamless solid landing */
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
      `}</style>
    </section>
  );
};
