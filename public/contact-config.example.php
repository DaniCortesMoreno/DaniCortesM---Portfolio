<?php
/**
 * PLANTILLA DE CONFIGURACIÓN SEGURA PARA BACKEND DE CONTACTO (Hostinger / Apache)
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. En tu servidor Hostinger (mediante el Administrador de Archivos de hPanel o FTP),
 *    duplica este archivo y nómbralo exactamente: contact-config.php
 * 2. Introduce tu nueva Clave Secreta (Secret Key) de Google reCAPTCHA v3.
 * 3. IMPORTANTE: El archivo "contact-config.php" está protegido por .gitignore y .htaccess,
 *    por lo que NUNCA será visible para nadie en Internet ni se subirá a GitHub.
 */

return [
    // Clave Secreta privada de Google reCAPTCHA v3 (obtenida en https://www.google.com/recaptcha/admin)
    'recaptcha_secret_key' => 'PEGA_AQUI_TU_NUEVA_SECRET_KEY',

    // Correo de recepción (opcional, por defecto danicortesmoreno@gmail.com)
    'recipient_email' => 'danicortesmoreno@gmail.com',
];
