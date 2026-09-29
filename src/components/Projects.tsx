import React, { useState } from 'react';
import { projects, Project } from '../data/projects.ts';
import { ProjectModal } from './ProjectModal.tsx';
import { ArrowUpRight, UnfoldVertical, CheckCircle2 } from 'lucide-react';

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
          const isWide = project.id === 'solaico';

          return (
            <div
              key={project.id}
              className={`spotlight-card specular-border project-card ${isWide ? 'project-card-wide' : ''}`}
            >
              {/* Media Container */}
              <div className="project-media-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                />
                <div className="project-overlay-gradient"></div>
                <div className="project-category-badge">
                  {project.number} // {project.categoryTag}
                </div>
              </div>

              {/* Card Body */}
              <div className="project-body">
                <div>
                  <h3 className="project-title">{project.title}</h3>
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
          transition: transform var(--transition-fast), border-color var(--transition-fast);
        }
        .project-card:hover {
          transform: translateY(-2px);
        }
        .project-media-wrap {
          position: relative;
          height: 200px;
          width: 100%;
          overflow: hidden;
          background-color: var(--surface-container-highest);
        }
        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
          transition: transform 300ms ease, opacity 300ms ease;
        }
        .project-card:hover .project-img {
          transform: scale(1.04);
          opacity: 1;
        }
        .project-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(19, 19, 19, 0.95) 100%);
          pointer-events: none;
        }
        .project-category-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-xs);
          background: rgba(14, 14, 14, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid var(--hairline-border);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--on-surface);
        }
        .project-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.25rem;
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
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .project-tag {
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-xs);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          background-color: var(--surface-container-high);
          border: 1px solid var(--hairline-border);
          color: var(--on-surface-variant);
        }
        .project-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .action-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--dimmed-meta);
          transition: color var(--transition-fast);
        }
        .action-link-btn:hover {
          color: var(--on-surface);
        }
        .action-link-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--primary);
          transition: color var(--transition-fast);
        }
        .action-link-primary:hover {
          color: #ffffff;
        }
      `}</style>
    </section>
  );
};
