import React, { useEffect } from 'react';
import { Project } from '../data/projects.ts';
import { X, ArrowUpRight, CheckCircle2, Layers, Cpu, BarChart3 } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--hairline-border)', backgroundColor: 'var(--surface-container-lowest)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="kbd-badge" style={{ color: 'var(--primary)' }}>{project.number} // {project.categoryTag}</span>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>{project.title}</h3>
            {project.statusBadge && (
              <span className="kbd-badge" style={{ color: 'var(--tertiary)', border: '1px solid rgba(76, 215, 246, 0.4)', background: 'rgba(76, 215, 246, 0.08)', fontSize: '0.6875rem' }}>
                {project.statusBadge}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{ color: 'var(--dimmed-meta)', padding: '0.25rem' }} aria-label="Cerrar modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Hero Image & Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--hairline-border)', backgroundColor: 'var(--surface-container-lowest)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.75rem', background: 'rgba(14, 18, 24, 0.95)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5f56' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#27c93f' }}></span>
                </div>
                <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.6875rem' }}>{project.displayUrl || 'sitio-web.com'}</span>
                <span style={{ color: 'var(--tertiary)', fontSize: '0.625rem' }}>SSL 🔒</span>
              </div>
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img src={project.image} alt={project.title} width="560" height="320" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--dimmed-meta)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <BarChart3 size={14} color="var(--tertiary)" /> TELEMETRÍA Y MÉTRICAS DE PRODUCCIÓN
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {project.metrics.map((m, idx) => (
                  <div key={idx} style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-container-high)', border: '1px solid var(--hairline-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.15rem', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--primary)' }}>{m.value}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--dimmed-meta)', marginTop: '0.25rem' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problem & Solution */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-container-lowest)', border: '1px solid var(--hairline-border)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--error)', marginBottom: '0.5rem', fontWeight: 600 }}>
                // RETO &amp; DESAFÍO
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-body)' }}>{project.caseStudy.challenge}</p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-sm)', background: 'var(--surface-container-lowest)', border: '1px solid var(--hairline-border)' }}>
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--tertiary)', marginBottom: '0.5rem', fontWeight: 600 }}>
                // SOLUCIÓN TÉCNICA
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-body)' }}>{project.caseStudy.solution}</p>
            </div>
          </div>

          {/* Architecture Highlights */}
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={15} /> DECISIONES DE ARQUITECTURA E INGENIERÍA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.caseStudy.architecture.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.8125rem', color: 'var(--on-surface-variant)' }}>
                  <Layers size={14} style={{ flexShrink: 0, marginTop: '3px', color: 'var(--primary)' }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Results */}
          <div>
            <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={15} /> IMPACTO Y RESULTADOS EN PRODUCCIÓN
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.caseStudy.results.map((res, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.8125rem', color: 'var(--on-surface)' }}>
                  <span style={{ color: 'var(--tertiary)' }}>•</span>
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', paddingTop: '0.5rem' }}>
            {project.tags.map((t, idx) => (
              <span key={idx} className="kbd-badge" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', padding: '1rem 1.75rem', borderTop: '1px solid var(--hairline-border)', backgroundColor: 'var(--surface-container-lowest)' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            Cerrar
          </button>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              <span>Visitar Proyecto</span>
              <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
