import React, { useState, useEffect } from 'react';
import { profile } from '../data/profile.ts';
import { CONTACT_CONFIG } from '../config/contact.ts';
import { 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  HeartHandshake, 
  Loader2, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  User,
  Clock,
  Radio,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Crear una página web nueva para mi negocio',
    message: ''
  });

  // Carga asíncrona de Google reCAPTCHA v3 si se ha configurado la clave pública (Site Key)
  useEffect(() => {
    if (!CONTACT_CONFIG.recaptchaSiteKey) return;
    const scriptId = 'google-recaptcha-v3-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${CONTACT_CONFIG.recaptchaSiteKey}`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#c0c1ff', '#4cd7f6', '#34d399']
    });

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#25D366', '#4cd7f6', '#c0c1ff']
    });

    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let recaptchaToken = '';
      // Si la clave de reCAPTCHA v3 está disponible, obtener el token de verificación de Google
      if (CONTACT_CONFIG.recaptchaSiteKey && window.grecaptcha) {
        try {
          await new Promise<void>((resolve) => {
            if (window.grecaptcha?.ready) {
              window.grecaptcha.ready(() => resolve());
            } else {
              resolve();
            }
          });
          if (window.grecaptcha?.execute) {
            recaptchaToken = await window.grecaptcha.execute(CONTACT_CONFIG.recaptchaSiteKey, {
              action: 'contact_submit'
            });
          }
        } catch (rcErr) {
          console.warn('reCAPTCHA execution fallback:', rcErr);
        }
      }

      const res = await fetch(CONTACT_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          website: honeypot, // Campo trampa honeypot para cazar bots automáticos
          recaptchaToken
        })
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || (data && data.success === false)) {
        throw new Error(data?.error || `Error en el servidor (${res.status}). No se pudo procesar el envío.`);
      }

      setFormSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#34d399', '#c0c1ff', '#4cd7f6', '#8083ff']
      });
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitError(err.message || 'No se pudo conectar con el servidor de correo. Por favor, contáctame directamente por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Ambient Specular Background Glow */}
      <div className="contact-ambient-glow" />

      {/* Section Header */}
      <div className="contact-header-wrap">
        <div className="contact-eyebrow-row">
          <span className="section-eyebrow">// 04. CONTACTO DIRECTO</span>
          <div className="live-telemetry-badge">
            <Radio size={12} className="pulse-radio-icon" />
            <span>RESPUESTA RÁPIDA • EN MENOS DE 24H</span>
          </div>
        </div>

        <h2 className="contact-main-title">
          Iniciemos algo extraordinario.
        </h2>
        <p className="contact-main-subtitle">
          ¿Tienes un proyecto en mente, quieres crear o renovar la web de tu negocio o necesitas asesoramiento? Hablemos de forma directa, sin intermediarios ni rodeos.
        </p>
      </div>

      {/* Main Studio Bento Grid Layout (2-Column Desktop, Fluid Responsive Tablet/Mobile) */}
      <div className="contact-bento-grid">
        
        {/* LEFT COLUMN: Telemetry Console, Human Touch & Quick Channels */}
        <div className="contact-left-column">
          
          {/* Bento Card 1: Warm Human Connection & On-Site Visits */}
          <div className="spotlight-card specular-border human-banner-card">
            <div className="human-card-header">
              <div className="human-icon-badge">
                <HeartHandshake size={20} color="#25D366" />
              </div>
              <div>
                <span className="human-badge-tag">EL FACTOR HUMANO</span>
                <h3 className="human-card-title">Compromiso presencial y trato del día a día</h3>
              </div>
            </div>

            <p className="human-card-desc">
              Me encanta el trato cercano. No tengo <strong>ningún problema en que me llames o me escribas un WhatsApp</strong>. Aunque sea de Alcoy, <strong>trabajo para quien sea y donde sea</strong>: me desplazo en persona hasta tu local o empresa para conocerte, vivir el proyecto in situ y realizar visitas periódicas de seguimiento.
            </p>

            <div className="human-cta-cluster">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-human-whatsapp"
                title="Abrir conversación en WhatsApp"
              >
                <MessageSquare size={17} />
                <span>Escríbeme por WhatsApp</span>
              </a>

              <a
                href={`tel:${profile.phoneTel}`}
                className="btn-human-call"
                title="Llamar directamente por teléfono"
              >
                <Phone size={16} />
                <span>Llamar ({profile.phone})</span>
              </a>
            </div>
          </div>

          {/* Bento Card 2: Interactive Telemetry Channels (1-Click Copy & Direct Links) */}
          <div className="spotlight-card specular-border channels-panel-card">
            <div className="panel-header-mini">
              <span className="panel-header-title">// VÍAS DE CONTACTO DIRECTO</span>
              <span className="panel-header-badge">DISPONIBILIDAD INMEDIATA</span>
            </div>

            <div className="channels-items-list">
              {/* Email Channel */}
              <div className="channel-tile">
                <div className="channel-tile-icon-box">
                  <Mail size={16} color="var(--primary)" />
                </div>
                <div className="channel-tile-info">
                  <span className="channel-tile-label">CORREO ELECTRÓNICO PROFESIONAL</span>
                  <a href={`mailto:${profile.email}`} className="channel-tile-value channel-hover-link">
                    {profile.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="channel-tile-btn"
                  title="Copiar email al portapapeles"
                  aria-label="Copiar email"
                >
                  {copiedEmail ? (
                    <span className="copied-tag">
                      <Check size={14} color="#34d399" />
                      <span>¡Copiado!</span>
                    </span>
                  ) : (
                    <span className="copy-action-inner">
                      <Copy size={14} />
                      <span className="copy-label-text">Copiar</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Phone & WhatsApp Channel */}
              <div className="channel-tile">
                <div className="channel-tile-icon-box">
                  <Phone size={16} color="var(--tertiary)" />
                </div>
                <div className="channel-tile-info">
                  <span className="channel-tile-label">TELÉFONO // WHATSAPP DIRECTO</span>
                  <a href={`tel:${profile.phoneTel}`} className="channel-tile-value channel-hover-link">
                    {profile.phone}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="channel-tile-btn"
                  title="Copiar teléfono al portapapeles"
                  aria-label="Copiar teléfono"
                >
                  {copiedPhone ? (
                    <span className="copied-tag">
                      <Check size={14} color="#34d399" />
                      <span>¡Copiado!</span>
                    </span>
                  ) : (
                    <span className="copy-action-inner">
                      <Copy size={14} />
                      <span className="copy-label-text">Copiar</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Physical Location & Mobility */}
              <div className="channel-tile channel-tile-location">
                <div className="channel-tile-icon-box">
                  <MapPin size={16} color="#fbbf24" />
                </div>
                <div className="channel-tile-info">
                  <span className="channel-tile-label">BASE OPERATIVA &amp; MOVILIDAD</span>
                  <span className="channel-tile-value">
                    Alcoy, Alicante • Desplazamiento presencial garantizado
                  </span>
                  <span className="channel-tile-subtext">
                    Visitas a tu sede para toma de requerimientos y despliegue
                  </span>
                </div>
              </div>
            </div>

            {/* Social Ecosystem Links Bar */}
            <div className="ecosystem-footer-bar">
              <span className="ecosystem-title">ECOSISTEMA:</span>
              <div className="ecosystem-chips">
                <a 
                  href={profile.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ecosystem-chip"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
                <a 
                  href={profile.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ecosystem-chip"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>
                <a 
                  href={profile.cvPdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ecosystem-chip ecosystem-chip-cv"
                >
                  <span>Curriculum (PDF)</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Terminal Dispatch Console (The Form) */}
        <div className="contact-right-column">
          <div className="spotlight-card specular-border terminal-form-card">
            
            {/* Terminal Window Header Bar */}
            <div className="terminal-header-bar">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red" />
                <span className="terminal-dot dot-yellow" />
                <span className="terminal-dot dot-green" />
              </div>
              <div className="terminal-title-tab">
                <span className="terminal-file-name">solicitud_proyecto.ts</span>
                <span className="terminal-status-ssl">
                  <ShieldCheck size={12} color="#34d399" />
                  SSL/TLS 256-BIT
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="terminal-form-body">
              {formSubmitted ? (
                <div className="form-success-box">
                  <div className="success-icon-halo">
                    <CheckCircle2 size={36} color="#34d399" />
                  </div>
                  <h3 className="success-title">¡Mensaje enviado con éxito!</h3>
                  <p className="success-desc">
                    Tu consulta ha sido enviada directamente a <strong>danicortesmoreno@gmail.com</strong>. He recibido la notificación y te responderé en menos de 24 horas laborables.
                  </p>
                  <div className="success-actions">
                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-human-whatsapp"
                      style={{ padding: '0.65rem 1.25rem', fontSize: '0.8125rem' }}
                    >
                      <MessageSquare size={16} />
                      <span>¿Quieres agilizar? Háblame por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="btn-reset-form"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="terminal-form">
                  <div className="form-prompt-row">
                    <span className="prompt-symbol">$</span>
                    <span className="prompt-text">contacto_directo.iniciar() // Cuéntame tu proyecto o negocio</span>
                  </div>

                  {/* Alerta de Error si falla el envío */}
                  {submitError && (
                    <div className="terminal-error-alert" role="alert">
                      <AlertCircle size={18} className="error-alert-icon" />
                      <div className="error-alert-content">
                        <strong>No se pudo enviar el mensaje:</strong>
                        <p>{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Campo Honeypot Oculto (Trampa para bots automáticos) */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0, width: 0, margin: 0, padding: 0 }}
                    aria-hidden="true"
                  />

                  <div className="form-fields-grid">
                    {/* Name Field */}
                    <div className="form-field-group">
                      <label className="terminal-field-label">
                        <User size={13} />
                        <span>TU NOMBRE O EMPRESA *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carlos Ortiz / Bar Plaza"
                        className="terminal-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="form-field-group">
                      <label className="terminal-field-label">
                        <Mail size={13} />
                        <span>CORREO ELECTRÓNICO *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="carlos@empresa.com"
                        className="terminal-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Project Type Select */}
                  <div className="form-field-group">
                    <label className="terminal-field-label">
                      <Sparkles size={13} />
                      <span>¿EN QUÉ PUEDO AYUDARTE? *</span>
                    </label>
                    <div className="terminal-select-wrap">
                      <select
                        className="terminal-input terminal-select"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      >
                        <option value="Crear una página web nueva para mi negocio">
                          🌐 Crear una página web nueva para mi negocio / empresa
                        </option>
                        <option value="Renovar o modernizar mi web actual">
                          🔄 Renovar o modernizar mi web actual (hacerla rápida y actual)
                        </option>
                        <option value="Tienda online / Venta de productos por Internet">
                          🛍️ Tienda online / Venta de productos por Internet
                        </option>
                        <option value="Mantenimiento, soporte o solucionar problemas">
                          🛠️ Mantenimiento, soporte técnico o solucionar problemas
                        </option>
                        <option value="Proyecto o funcionalidad personalizada a medida">
                          ✨ Proyecto o funcionalidad personalizada a medida
                        </option>
                        <option value="Tomar un café / Asesoramiento en persona sin compromiso">
                          ☕ Tomar un café / Asesoramiento en persona sin compromiso
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-field-group">
                    <label className="terminal-field-label">
                      <Clock size={13} />
                      <span>CUÉNTAME SOBRE TU NEGOCIO O IDEA *</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Explícame brevemente qué tipo de negocio tienes, qué necesitas o qué te gustaría conseguir con la web..."
                      className="terminal-input terminal-textarea"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  {/* Form Footer Action */}
                  <div className="terminal-submit-row">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-terminal-submit"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="spin-icon" />
                          <span>Enviando mensaje seguro...</span>
                        </>
                      ) : (
                        <>
                          <span>Enviar Mensaje / Pedir Presupuesto</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>

                    <div className="terminal-security-cluster">
                      <span className="terminal-guarantee-note">
                        🔒 Sin compromiso • Respuesta en menos de 24h
                      </span>
                      <div className="recaptcha-shield-badge">
                        <ShieldCheck size={12} color="#34d399" />
                        <span>Blindaje con Google reCAPTCHA v3 &amp; Filtro antibot</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        /* Main Section Container */
        .contact-section {
          position: relative;
          padding-top: 3.5rem;
          padding-bottom: 4.5rem;
          width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }

        /* Ambient Background Lighting */
        .contact-ambient-glow {
          position: absolute;
          top: 30%;
          right: -10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(128, 131, 255, 0.1) 0%, rgba(76, 215, 246, 0.05) 50%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        /* Section Header */
        .contact-header-wrap {
          margin-bottom: 2.25rem;
          position: relative;
          z-index: 5;
        }
        .contact-eyebrow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .live-telemetry-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.25rem 0.65rem;
          border-radius: 100px;
          background: rgba(76, 215, 246, 0.08);
          border: 1px solid rgba(76, 215, 246, 0.25);
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--tertiary);
          letter-spacing: 0.5px;
        }
        .pulse-radio-icon {
          animation: pulseRadio 2s infinite ease-in-out;
        }
        .contact-main-title {
          font-family: var(--font-display);
          font-size: clamp(2.1rem, 4.5vw, 3.25rem);
          font-weight: 600;
          color: var(--on-surface);
          letter-spacing: -0.03em;
          margin: 0.35rem 0 0.75rem 0;
          line-height: 1.15;
        }
        .contact-main-subtitle {
          font-size: clamp(0.9375rem, 1.8vw, 1.05rem);
          line-height: 1.65;
          color: var(--muted-body);
          max-width: 720px;
          margin: 0;
        }

        /* 2-Column Bento Layout */
        .contact-bento-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          position: relative;
          z-index: 5;
        }
        @media (min-width: 1024px) {
          .contact-bento-grid {
            grid-template-columns: 1.05fr 1.2fr;
            gap: 2rem;
            align-items: stretch;
          }
        }

        /* Left Column Stacking */
        .contact-left-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Human Touch Banner Card */
        .human-banner-card {
          padding: 1.65rem 1.85rem;
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.08) 0%, rgba(28, 27, 34, 0.75) 100%);
          border: 1px solid rgba(37, 211, 102, 0.3);
          border-radius: var(--radius-lg, 16px);
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.65), 0 0 25px rgba(37, 211, 102, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .human-card-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .human-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .human-badge-tag {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          color: #25D366;
          letter-spacing: 1px;
          display: block;
        }
        .human-card-title {
          font-size: 1.05rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0.15rem 0 0 0;
          line-height: 1.3;
        }
        .human-card-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--on-surface-variant);
          margin: 0;
        }
        .human-card-desc strong {
          color: #ffffff;
        }
        .human-cta-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 0.4rem;
        }
        .btn-human-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.35rem;
          border-radius: var(--radius-full, 9999px);
          background-color: #25D366;
          color: #051a0c;
          font-size: 0.84rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          min-height: 44px;
        }
        .btn-human-whatsapp:hover {
          background-color: #20ba59;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.5);
        }
        .btn-human-whatsapp:active {
          transform: translateY(0);
        }
        .btn-human-call {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full, 9999px);
          background-color: rgba(255, 255, 255, 0.06);
          color: var(--on-surface);
          border: 1px solid rgba(255, 255, 255, 0.14);
          font-size: 0.84rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          min-height: 44px;
        }
        .btn-human-call:hover {
          background-color: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Channels Panel Card */
        .channels-panel-card {
          padding: 1.65rem 1.85rem;
          background: rgba(24, 23, 29, 0.75);
          border: 1px solid var(--hairline-border);
          border-radius: var(--radius-lg, 16px);
          backdrop-filter: blur(16px);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .panel-header-mini {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .panel-header-title {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--primary);
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .panel-header-badge {
          font-family: var(--font-mono);
          font-size: 0.5625rem;
          color: var(--dimmed-meta);
          padding: 0.15rem 0.45rem;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 4px;
        }
        .channels-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        /* Individual Channel Tile */
        .channel-tile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.95rem 1.15rem;
          background: rgba(18, 17, 22, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-md, 12px);
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;
        }
        .channel-tile:hover {
          border-color: rgba(192, 193, 255, 0.25);
          background: rgba(26, 25, 32, 0.85);
          transform: translateY(-1px);
        }
        .channel-tile-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .channel-tile-info {
          flex: 1;
          min-width: 0;
        }
        .channel-tile-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--dimmed-meta);
          letter-spacing: 0.5px;
          margin-bottom: 0.2rem;
        }
        .channel-tile-value {
          font-family: var(--font-mono);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--on-surface);
          word-break: break-all;
          text-decoration: none;
        }
        .channel-hover-link {
          transition: color 0.2s ease;
        }
        .channel-hover-link:hover {
          color: var(--primary);
        }
        .channel-tile-subtext {
          display: block;
          font-size: 0.75rem;
          color: var(--muted-body);
          margin-top: 0.2rem;
        }
        .channel-tile-btn {
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--on-surface-variant);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          flex-shrink: 0;
        }
        .channel-tile-btn:hover {
          background: rgba(192, 193, 255, 0.15);
          border-color: rgba(192, 193, 255, 0.35);
          color: #ffffff;
        }
        .copy-action-inner {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .copied-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #34d399;
          font-weight: 600;
        }

        /* Ecosystem Footer Bar */
        .ecosystem-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .ecosystem-title {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
        }
        .ecosystem-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .ecosystem-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--on-surface-variant);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .ecosystem-chip:hover {
          background: rgba(192, 193, 255, 0.12);
          border-color: rgba(192, 193, 255, 0.3);
          color: #ffffff;
          transform: translateY(-1px);
        }
        .ecosystem-chip-cv {
          color: var(--primary);
          border-color: rgba(192, 193, 255, 0.25);
          font-weight: 600;
        }

        /* RIGHT COLUMN: Terminal Dispatch Card */
        .terminal-form-card {
          border-radius: var(--radius-lg, 16px);
          background: rgba(22, 21, 28, 0.85);
          border: 1px solid rgba(192, 193, 255, 0.28);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(192, 193, 255, 0.08);
          backdrop-filter: blur(20px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Terminal Window Header */
        .terminal-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.25rem;
          background: rgba(14, 13, 18, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }
        .terminal-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .terminal-title-tab {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .terminal-file-name {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
        }
        .terminal-status-ssl {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: #34d399;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          background: rgba(52, 211, 153, 0.08);
          border: 1px solid rgba(52, 211, 153, 0.2);
        }

        /* Terminal Form Body */
        .terminal-form-body {
          padding: 1.85rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .form-prompt-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--dimmed-meta);
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
        }
        .prompt-symbol {
          color: var(--tertiary);
          font-weight: 700;
        }
        .prompt-text {
          color: var(--on-surface-variant);
        }

        .terminal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        @media (min-width: 640px) {
          .form-fields-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .terminal-field-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
          letter-spacing: 0.5px;
        }
        .terminal-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(14, 13, 19, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm, 8px);
          padding: 0.85rem 1rem;
          color: var(--on-surface);
          font-family: var(--font-body);
          font-size: 1rem; /* 16px to prevent iOS auto-zoom */
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          min-height: 48px;
        }
        .terminal-input:focus {
          border-color: var(--primary);
          background: rgba(18, 17, 24, 0.95);
          box-shadow: 0 0 0 1px var(--primary), 0 0 16px rgba(192, 193, 255, 0.25);
        }
        .terminal-input::placeholder {
          color: rgba(255, 255, 255, 0.22);
          font-size: 0.875rem;
        }

        /* Select Input Wrap */
        .terminal-select-wrap {
          position: relative;
        }
        .terminal-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c0c1ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 16px;
          cursor: pointer;
          padding-right: 2.5rem;
        }
        .terminal-select option {
          background-color: #121118;
          color: #ffffff;
        }

        .terminal-textarea {
          resize: vertical;
          min-height: 110px;
          line-height: 1.55;
        }

        /* Submit Action Row */
        .terminal-submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .btn-terminal-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.75rem;
          border-radius: var(--radius-full, 9999px);
          background: linear-gradient(135deg, var(--primary) 0%, #8083ff 100%);
          color: #07006c;
          font-weight: 600;
          font-size: 0.875rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(128, 131, 255, 0.4);
          transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
          min-height: 48px;
        }
        .btn-terminal-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(128, 131, 255, 0.6);
          filter: brightness(1.08);
        }
        .btn-terminal-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-terminal-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .terminal-security-cluster {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.35rem;
        }
        @media (max-width: 640px) {
          .terminal-security-cluster {
            align-items: flex-start;
          }
        }

        .terminal-guarantee-note {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--dimmed-meta);
        }

        .recaptcha-shield-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: #9896ab;
          letter-spacing: 0.02em;
        }

        /* Error Alert Box */
        .terminal-error-alert {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          animation: fadeIn 0.3s ease;
        }
        .error-alert-icon {
          color: #ef4444;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .error-alert-content {
          font-size: 0.8125rem;
          line-height: 1.4;
          color: #fca5a5;
        }
        .error-alert-content strong {
          color: #ffffff;
          display: block;
          margin-bottom: 0.2rem;
        }
        .error-alert-content p {
          margin: 0;
        }

        /* Success Card View */
        .form-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2.5rem 1.5rem;
          gap: 1rem;
          animation: fadeIn 0.4s ease;
        }
        .success-icon-halo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(52, 211, 153, 0.12);
          border: 1px solid rgba(52, 211, 153, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 25px rgba(52, 211, 153, 0.2);
        }
        .success-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }
        .success-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--on-surface-variant);
          max-width: 480px;
          margin: 0;
        }
        .success-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
          width: 100%;
        }
        .btn-reset-form {
          background: transparent;
          border: none;
          color: var(--dimmed-meta);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          cursor: pointer;
          text-decoration: underline;
          padding: 0.5rem;
        }
        .btn-reset-form:hover {
          color: var(--on-surface);
        }

        /* Keyframes */
        @keyframes pulseRadio {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Tablet Breakpoint (768px - 1024px) */
        @media (max-width: 1023px) {
          .contact-section {
            padding-top: 3rem;
            padding-bottom: 3.5rem;
          }
          .contact-bento-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .human-banner-card, .channels-panel-card, .terminal-form-card {
            padding: 1.5rem;
          }
        }

        /* Mobile Breakpoint (<768px) */
        @media (max-width: 767px) {
          .contact-section {
            padding-top: 2rem;
            padding-bottom: 3rem;
          }
          .contact-header-wrap {
            margin-bottom: 1.5rem;
          }
          .contact-eyebrow-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
          }
          .human-banner-card {
            padding: 1.25rem;
          }
          .human-card-header {
            align-items: flex-start;
          }
          .human-cta-cluster {
            flex-direction: column;
            width: 100%;
          }
          .btn-human-whatsapp, .btn-human-call {
            width: 100%;
            box-sizing: border-box;
          }
          .channels-panel-card {
            padding: 1.25rem;
          }
          .channel-tile {
            padding: 0.85rem;
            flex-wrap: wrap;
            gap: 0.75rem;
          }
          .channel-tile-info {
            width: 100%;
          }
          .channel-tile-btn {
            margin-left: auto;
          }
          .copy-label-text {
            display: inline;
          }
          .terminal-form-card {
            border-radius: var(--radius-md, 12px);
          }
          .terminal-form-body {
            padding: 1.25rem;
          }
          .terminal-submit-row {
            flex-direction: column;
            align-items: stretch;
            gap: 0.85rem;
          }
          .btn-terminal-submit {
            width: 100%;
          }
          .terminal-guarantee-note {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};
