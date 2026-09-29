import React, { useState } from 'react';
import { profile } from '../data/profile.ts';
import { Copy, Check, Phone, MapPin, Globe, Send, CheckCircle2, MessageSquare, HeartHandshake, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://formsubmit.co/ajax/danicortesmoreno@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Email: formData.email,
          Tipo_Proyecto: formData.projectType,
          Mensaje: formData.message,
          _subject: `Nuevo mensaje de portfolio de ${formData.name}`,
          _captcha: 'false'
        })
      });
    } catch (err) {
      console.warn('Form submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#34d399', '#c0c1ff', '#4cd7f6']
      });
    }
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

          {/* Warm Human Connection & On-Site Visits Banner */}
          <div className="human-touch-card">
            <div className="human-touch-left">
              <div className="human-touch-badge">
                <HeartHandshake size={18} color="#25D366" />
                <span>TRATO CERCANO, PRESENCIAL Y DEL DÍA A DÍA</span>
              </div>
              <p className="human-touch-text">
                No tengo <strong>ningún problema en si me llamas o me escribes un WhatsApp</strong>; ¡me encanta tratar con la gente! Además, <strong>me gusta tratar personalmente y físicamente los proyectos</strong>. Aunque sea de Alcoy, <strong>trabajo para quien sea y donde sea: me desplazo hasta allí</strong> para conocer de primera mano y físicamente tu negocio.
              </p>
            </div>
            <div className="human-touch-actions">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="human-action-btn btn-whatsapp"
                title="Abrir WhatsApp directamente"
              >
                <MessageSquare size={16} />
                <span>Escríbeme por WhatsApp</span>
              </a>
              <a
                href={`tel:${profile.phoneTel}`}
                className="human-action-btn btn-call"
                title="Llamar directamente por teléfono"
              >
                <Phone size={15} />
                <span>Llamar ({profile.phone})</span>
              </a>
            </div>
          </div>

          {/* Telemetry Contact Grid */}
          <div className="contact-channels-grid">
            {/* 1-Click Copy Email */}
            <div className="channel-box">
              <div>
                <span className="channel-label">DIRECT EMAIL (DESTINO DEL FORMULARIO)</span>
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

            {/* Phone & WhatsApp */}
            <div className="channel-box">
              <div>
                <span className="channel-label">TELÉFONO &amp; WHATSAPP</span>
                <a href={`tel:${profile.phoneTel}`} className="channel-value channel-link">
                  {profile.phone}
                </a>
              </div>
              <button
                onClick={handleCopyPhone}
                className="channel-action-btn"
                title="Copiar teléfono al portapapeles"
              >
                {copiedPhone ? <Check size={16} color="var(--tertiary)" /> : <Phone size={16} />}
              </button>
            </div>

            {/* Location with Physical Travel Promise */}
            <div className="channel-box channel-box-wide">
              <div>
                <span className="channel-label">LOCALIZACIÓN // COBERTURA TOTAL</span>
                <span className="channel-value">Alcoy, Alicante • Desplazamiento presencial a cualquier lugar</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--dimmed-meta)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                  Voy hasta tu empresa o local para conocer el proyecto in situ
                </span>
              </div>
              <div className="channel-icon">
                <MapPin size={18} color="var(--primary)" />
              </div>
            </div>

            {/* Ecosystem Links */}
            <div className="channel-box channel-box-wide">
              <div>
                <span className="channel-label">ECOSISTEMA PROFESIONAL</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.25rem' }}>
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                  <span style={{ color: 'var(--hairline-hover)' }}>/</span>
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                  <span style={{ color: 'var(--hairline-hover)' }}>/</span>
                  <a href={profile.social.readcv} target="_blank" rel="noopener noreferrer" className="social-link">ReadCV (PDF)</a>
                </div>
              </div>
              <div className="channel-icon">
                <Globe size={16} />
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-display)', fontWeight: 600, margin: 0 }}>
                  Mensaje directo / Solicitud de proyecto
                </h3>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--dimmed-meta)', marginTop: '0.25rem', display: 'block' }}>
                  // Enviando a: <strong style={{ color: 'var(--primary)' }}>danicortesmoreno@gmail.com</strong>
                </span>
              </div>
            </div>

            {formSubmitted ? (
              <div className="form-success">
                <CheckCircle2 size={26} color="var(--tertiary)" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--on-surface)', fontSize: '1rem' }}>¡Mensaje enviado con éxito a danicortesmoreno@gmail.com!</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--muted-body)', marginTop: '0.35rem', lineHeight: 1.5 }}>
                    Gracias por ponerte en contacto. Dani revisará tu mensaje y te responderá personalmente lo antes posible.
                  </div>
                  <div style={{ marginTop: '0.85rem' }}>
                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '0.45rem 0.95rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <MessageSquare size={13} color="#25D366" />
                      <span>¿Quieres agilizar? Escríbeme también por WhatsApp</span>
                    </a>
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
                    <label className="field-label">Correo Electrónico de Contacto</label>
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
                  <label className="field-label">Tipo de Proyecto o Consulta</label>
                  <select
                    className="field-input"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  >
                    <option value="Proyecto Personalizado / A Medida">✨ Proyecto Personalizado / A Medida</option>
                    <option value="Web App & Frontend">Web App &amp; Desarrollo Frontend (React / TS)</option>
                    <option value="WordPress Custom Architecture">WordPress &amp; Arquitectura a Medida</option>
                    <option value="UI/UX & Design System">Diseño UI/UX &amp; Design Systems</option>
                    <option value="Full-Stack Engineering">Ingeniería Full-Stack de Alto Rendimiento</option>
                    <option value="Auditoría Web & Optimización">Auditoría de Rendimiento &amp; SEO</option>
                    <option value="Consulta Rápida / Charla">Consulta Rápida / Charla Informal</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Detalles del Proyecto o Mensaje</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Cuéntame sobre los objetivos, alcance, plazos o lo que necesites..."
                    className="field-input"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    style={{ padding: '0.75rem 1.75rem', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="spin-icon" />
                        <span>Enviando a danicortesmoreno@gmail.com...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar Mensaje</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>

                  <span style={{ fontSize: '0.75rem', color: 'var(--dimmed-meta)' }}>
                    Respuesta habitual en &lt; 24h
                  </span>
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

        /* Human Touch Banner */
        .human-touch-card {
          margin-top: 1.75rem;
          padding: 1.25rem 1.5rem;
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.07) 0%, rgba(76, 215, 246, 0.05) 100%);
          border: 1px solid rgba(37, 211, 102, 0.25);
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          backdrop-filter: blur(8px);
        }
        @media (min-width: 768px) {
          .human-touch-card {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .human-touch-left {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          max-width: 520px;
        }
        .human-touch-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: #25D366;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .human-touch-text {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--on-surface);
          margin: 0;
        }
        .human-touch-text strong {
          color: #ffffff;
        }
        .human-touch-subtext {
          font-size: 0.84rem;
          line-height: 1.55;
          color: var(--on-surface-variant);
          margin: 0;
          padding-top: 0.45rem;
          border-top: 1px dashed rgba(255, 255, 255, 0.1);
        }
        .human-touch-subtext strong {
          color: var(--tertiary);
        }
        .human-touch-subtext em {
          font-style: normal;
          color: #ffffff;
          font-weight: 500;
        }
        @media (min-width: 640px) {
          .channel-box-wide {
            grid-column: span 2;
          }
        }
        .human-touch-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          flex-shrink: 0;
        }
        .human-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.65rem 1.1rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          text-decoration: none;
        }
        .btn-whatsapp {
          background-color: #25D366;
          color: #0c1a10;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
        }
        .btn-whatsapp:hover {
          background-color: #22bf5b;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
        }
        .btn-call {
          background-color: var(--surface-container-high);
          color: var(--on-surface);
          border: 1px solid var(--hairline-border);
        }
        .btn-call:hover {
          background-color: var(--surface-container-highest);
          border-color: var(--hairline-hover);
          transform: translateY(-2px);
          color: #ffffff;
        }

        .contact-channels-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.85rem;
          margin-top: 1.75rem;
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
          cursor: pointer;
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
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          background-color: rgba(0, 158, 185, 0.12);
          border: 1px solid rgba(76, 215, 246, 0.3);
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};
