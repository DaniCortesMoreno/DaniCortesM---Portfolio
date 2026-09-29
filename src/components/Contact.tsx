import React, { useState } from 'react';
import { profile } from '../data/profile.ts';
import { Copy, Check, Phone, MapPin, Globe, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web App & Frontend',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);

    // Subtle celebratory confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#c0c1ff', '#4cd7f6', '#d0bcff']
    });

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#34d399', '#c0c1ff', '#4cd7f6']
    });
  };

  return (
    <section id="contact" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      <div className="spotlight-card specular-border contact-card">
        {/* Glow ambient accent */}
        <div className="contact-glow"></div>

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 5 }}>
          <span className="section-eyebrow">// 04. CONEXIÓN &amp; TELEMETRÍA</span>
          <h2 className="font-display contact-title">
            Let's build something.
          </h2>
          <p className="contact-subtitle">
            Disponible para colaboraciones de ingeniería de alto impacto, desarrollo a medida o diseño de interfaces digitales ambiciosas. Respondiendo habitualmente en menos de 24 horas laborables.
          </p>

          {/* Telemetry Contact Grid */}
          <div className="contact-channels-grid">
            {/* 1-Click Copy Email */}
            <div className="channel-box">
              <div>
                <span className="channel-label">DIRECT EMAIL</span>
                <span className="channel-value">{profile.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="channel-action-btn"
                title="Copiar email al portapapeles"
              >
                {copiedEmail ? <Check size={16} color="var(--tertiary)" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Phone */}
            <div className="channel-box">
              <div>
                <span className="channel-label">TELEPHONE &amp; SIGNAL</span>
                <a href={`tel:${profile.phoneTel}`} className="channel-value channel-link">
                  {profile.phone}
                </a>
              </div>
              <div className="channel-icon">
                <Phone size={16} />
              </div>
            </div>

            {/* Location */}
            <div className="channel-box">
              <div>
                <span className="channel-label">CURRENT BASE</span>
                <span className="channel-value">{profile.location}</span>
              </div>
              <div className="channel-icon">
                <MapPin size={16} />
              </div>
            </div>

            {/* Ecosystem Links */}
            <div className="channel-box">
              <div>
                <span className="channel-label">ECOSYSTEM LINKS</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                  <span style={{ color: 'var(--hairline-hover)' }}>/</span>
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                  <span style={{ color: 'var(--hairline-hover)' }}>/</span>
                  <a href={profile.social.readcv} target="_blank" rel="noopener noreferrer" className="social-link">ReadCV</a>
                </div>
              </div>
              <div className="channel-icon">
                <Globe size={16} />
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '1.25rem' }}>
              Mensaje directo / Solicitud de proyecto
            </h3>

            {formSubmitted ? (
              <div className="form-success">
                <CheckCircle2 size={24} color="var(--tertiary)" />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--on-surface)' }}>¡Mensaje registrado con éxito!</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--muted-body)', marginTop: '0.25rem' }}>
                    Gracias por ponerte en contacto. Dani revisará tu solicitud y te responderá en breve.
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Alex García"
                      className="field-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@ejemplo.com"
                      className="field-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="field-label">Tipo de Proyecto</label>
                  <select
                    className="field-input"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value="Web App & Frontend">Web App &amp; Desarrollo Frontend (React / TS)</option>
                    <option value="WordPress Custom Architecture">WordPress &amp; Arquitectura a Medida</option>
                    <option value="UI/UX & Design System">Diseño UI/UX &amp; Design Systems</option>
                    <option value="Full-Stack Engineering">Ingeniería Full-Stack de Alto Rendimiento</option>
                    <option value="Auditoría Web & Optimización">Auditoría de Rendimiento &amp; SEO</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Detalles del Proyecto o Mensaje</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Cuéntame sobre los objetivos, alcance y plazos de tu proyecto..."
                    className="field-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div>
                  <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
                    <span>Enviar Mensaje</span>
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-card {
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .contact-card {
            padding: 3rem;
          }
        }
        .contact-glow {
          position: absolute;
          right: -80px;
          bottom: -80px;
          width: 320px;
          height: 320px;
          background: rgba(192, 193, 255, 0.08);
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .contact-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          font-weight: 600;
          color: var(--on-surface);
          letter-spacing: -0.03em;
          margin-top: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .contact-subtitle {
          font-size: 1rem;
          line-height: 1.65;
          color: var(--muted-body);
          max-width: 680px;
        }
        .contact-channels-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
          margin-top: 2rem;
        }
        @media (min-width: 640px) {
          .contact-channels-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .channel-box {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-sm);
          background-color: var(--surface-container-lowest);
          border: 1px solid var(--hairline-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: border-color var(--transition-fast);
        }
        .channel-box:hover {
          border-color: var(--hairline-hover);
        }
        .channel-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--dimmed-meta);
          letter-spacing: 0.05em;
        }
        .channel-value {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--on-surface);
        }
        .channel-link {
          transition: color var(--transition-fast);
        }
        .channel-link:hover {
          color: var(--primary);
        }
        .channel-action-btn {
          padding: 0.45rem;
          border-radius: var(--radius-xs);
          background-color: var(--surface-container-high);
          color: var(--on-surface-variant);
          border: 1px solid var(--hairline-border);
          transition: all var(--transition-fast);
        }
        .channel-action-btn:hover {
          color: var(--primary);
          background-color: var(--surface-container-highest);
        }
        .channel-icon {
          color: var(--dimmed-meta);
        }
        .social-link {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--on-surface-variant);
          transition: color var(--transition-fast);
        }
        .social-link:hover {
          color: var(--primary);
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--dimmed-meta);
        }
        .field-input {
          background-color: var(--surface-container-lowest);
          border: 1px solid var(--hairline-border);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.85rem;
          color: var(--on-surface);
          font-family: var(--font-body);
          font-size: 0.875rem;
          outline: none;
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .field-input:focus {
          border-color: var(--accent-indigo);
          box-shadow: 0 0 0 1px var(--accent-indigo), 0 0 12px rgba(99, 102, 241, 0.25);
        }
        .form-success {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: var(--radius-sm);
          background-color: rgba(0, 158, 185, 0.12);
          border: 1px solid rgba(76, 215, 246, 0.3);
        }
      `}</style>
    </section>
  );
};
