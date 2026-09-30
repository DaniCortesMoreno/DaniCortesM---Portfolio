/**
 * CONFIGURACIÓN DEL SISTEMA DE CONTACTO Y GOOGLE reCAPTCHA v3
 * 
 * Puedes configurar tus claves directamente aquí o mediante variables de entorno en un archivo .env:
 * VITE_RECAPTCHA_SITE_KEY=tu_clave_de_sitio_aqui
 */

export const CONTACT_CONFIG = {
  // Tu correo destinatario
  recipientEmail: 'danicortesmoreno@gmail.com',

  // Clave de Sitio Web (Site Key) de Google reCAPTCHA v3
  // Configúrala en tu archivo .env local como VITE_RECAPTCHA_SITE_KEY=tu_clave_publica
  recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || '',

  // Endpoint de envío:
  // En producción se llama al archivo /contact.php ubicado en tu hosting de Hostinger.
  // En desarrollo local apunta a https://danicortesm.com/contact.php para poder probar envíos reales desde localhost.
  apiEndpoint: import.meta.env.VITE_CONTACT_API_URL || (import.meta.env.DEV ? 'https://danicortesm.com/contact.php' : '/contact.php'),
};
