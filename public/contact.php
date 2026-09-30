<?php
/**
 * BACKEND DE CONTACTO & VERIFICACIÓN GOOGLE reCAPTCHA v3
 * Portfolio Daniel Cortés Moreno (danicortesm.com)
 * Hospedado en Hostinger
 */

// -----------------------------------------------------------------------------
// 1. CONFIGURACIÓN PRINCIPAL
// -----------------------------------------------------------------------------

// Tu correo donde recibirás todas las consultas (por defecto):
$RECIPIENT_EMAIL = 'danicortesmoreno@gmail.com';

// -----------------------------------------------------------------------------
// CARGA SEGURA DE CONFIGURACIÓN Y CLAVES SECRETAS
// Carga desde un archivo contact-config.php protegido (no versionado en Git)
// o desde variables de entorno del servidor (Hostinger / Apache / LiteSpeed).
// -----------------------------------------------------------------------------
$localConfig = [];
if (file_exists(__DIR__ . '/contact-config.php')) {
    $loaded = include __DIR__ . '/contact-config.php';
    if (is_array($loaded)) {
        $localConfig = $loaded;
    }
} elseif (file_exists(dirname(__DIR__) . '/contact-config.php')) {
    $loaded = include dirname(__DIR__) . '/contact-config.php';
    if (is_array($loaded)) {
        $localConfig = $loaded;
    }
}

// Clave Secreta (Secret Key) de Google reCAPTCHA v3:
$RECAPTCHA_SECRET_KEY = $localConfig['recaptcha_secret_key']
    ?? getenv('RECAPTCHA_SECRET_KEY')
    ?? $_ENV['RECAPTCHA_SECRET_KEY']
    ?? $_SERVER['RECAPTCHA_SECRET_KEY']
    ?? '';

if (!empty($localConfig['recipient_email'])) {
    $RECIPIENT_EMAIL = $localConfig['recipient_email'];
}

// Umbral mínimo de puntuación humana (0.0 = bot seguro, 1.0 = humano seguro). Recomendado: 0.5
$RECAPTCHA_MIN_SCORE = 0.5;

// Correo remitente para los encabezados técnicos (debe ser de tu dominio para evitar spam)
$SENDER_EMAIL = 'no-reply@danicortesm.com';

// -----------------------------------------------------------------------------
// 2. POLÍTICA CORS (Permite peticiones desde danicortesm.com y localhost en desarrollo)
// -----------------------------------------------------------------------------
$allowed_origins = [
    'https://danicortesm.com',
    'https://www.danicortesm.com',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowed_origins) || empty($origin)) {
    header("Access-Control-Allow-Origin: " . ($origin ? $origin : '*'));
} else {
    header("Access-Control-Allow-Origin: https://danicortesm.com");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Si es una petición OPTIONS (preflight CORS del navegador), terminar con 200 OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['status' => 'ok']);
    exit;
}

// Solo admitir método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Método no permitido. Solo se acepta POST.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 3. OBTENER Y DECODIFICAR DATOS DEL FORMULARIO
// -----------------------------------------------------------------------------
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Cuerpo de la petición inválido o no es JSON.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 4. TRAMPA HONEYPOT ANTIBOT SILENCIOSA
// -----------------------------------------------------------------------------
// Si el campo invisible 'website' o '_honey' contiene texto, es un bot automatizado
if (!empty($data['website']) || !empty($data['_honey'])) {
    // Respondemos con éxito ficticio para engañar al bot, pero no enviamos correo
    echo json_encode([
        'success' => true,
        'message' => 'Solicitud procesada correctamente.'
    ]);
    exit;
}

// -----------------------------------------------------------------------------
// 5. VALIDACIÓN Y SANITIZACIÓN DE CAMPOS
// -----------------------------------------------------------------------------
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$projectType = isset($data['projectType']) ? trim(strip_tags($data['projectType'])) : 'Consulta General';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';
$recaptchaToken = isset($data['recaptchaToken']) ? trim($data['recaptchaToken']) : '';

if (empty($name) || strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor, introduce tu nombre o el de tu negocio.']);
    exit;
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor, introduce un correo electrónico válido.']);
    exit;
}

if (empty($message) || strlen($message) < 5) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'El mensaje es demasiado corto. Cuéntame un poco más sobre tu proyecto.']);
    exit;
}

// -----------------------------------------------------------------------------
// 6. VALIDACIÓN CON GOOGLE reCAPTCHA v3 (SI ESTÁ CONFIGURADO)
// -----------------------------------------------------------------------------
$recaptcha_verified = false;
$recaptcha_score = 'N/A (Sin verificar)';

if (!empty($RECAPTCHA_SECRET_KEY)) {
    if (empty($recaptchaToken)) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'error' => 'Falta el token de seguridad reCAPTCHA. Por favor, recarga la página.'
        ]);
        exit;
    }

    $verify_url = 'https://www.google.com/recaptcha/api/siteverify';
    $post_data = http_build_query([
        'secret' => $RECAPTCHA_SECRET_KEY,
        'response' => $recaptchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? ''
    ]);

    $opts = [
        'http' => [
            'method' => 'POST',
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'content' => $post_data,
            'timeout' => 8
        ]
    ];

    $context = stream_context_create($opts);
    $response = @file_get_contents($verify_url, false, $context);

    if ($response !== false) {
        $result = json_decode($response, true);
        if (isset($result['success']) && $result['success'] === true) {
            $score = isset($result['score']) ? floatval($result['score']) : 1.0;
            $recaptcha_score = number_format($score, 2);

            if ($score < $RECAPTCHA_MIN_SCORE) {
                http_response_code(403);
                echo json_encode([
                    'success' => false,
                    'error' => 'El sistema de seguridad ha detectado actividad sospechosa (Puntuación reCAPTCHA: ' . $recaptcha_score . '). Si eres humano, contáctame por WhatsApp.'
                ]);
                exit;
            }
            $recaptcha_verified = true;
        } else {
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'error' => 'Error al validar el token de Google reCAPTCHA. Inténtalo de nuevo.'
            ]);
            exit;
        }
    }
}

// -----------------------------------------------------------------------------
// 7. PREPARAR Y ENVIAR EL CORREO ELECTRÓNICO (HTML ESTILIZADO)
// -----------------------------------------------------------------------------
$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'Desconocido';
$current_time = date('d/m/Y - H:i:s') . ' (Hora Servidor)';

$subject = "⚡ [Nuevo Proyecto] {$name} - {$projectType}";

// Plantilla de correo HTML elegante y moderna con la estética Obsidian de Dani Cortés
$email_html = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>Nuevo Mensaje de Contacto</title>
</head>
<body style='margin:0; padding:0; background-color:#07070a; font-family:-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; color:#e2e2ec; line-height:1.6;'>
  <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#07070a; padding: 30px 15px;'>
    <tr>
      <td align='center'>
        <table width='600' cellpadding='0' cellspacing='0' style='background-color:#111018; border:1px solid #262436; border-radius:14px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.6);'>
          
          <!-- Encabezado con branding -->
          <tr>
            <td style='background:linear-gradient(135deg, #1b1928 0%, #111018 100%); padding:28px 32px; border-bottom:1px solid #262436;'>
              <div style='color:#4cd7f6; font-family:monospace; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:6px;'>
                // TELEMETRÍA PORTFOLIO • DANICORTESM.COM
              </div>
              <h1 style='margin:0; font-size:22px; color:#ffffff; font-weight:700;'>
                🚀 Nuevo Mensaje de Contacto
              </h1>
            </td>
          </tr>

          <!-- Cuerpo principal con detalles del cliente -->
          <tr>
            <td style='padding:32px;'>
              
              <!-- Tarjeta de Datos Rápidos -->
              <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#161522; border:1px solid rgba(192, 193, 255, 0.12); border-radius:10px; margin-bottom:24px; padding:18px;'>
                <tr>
                  <td style='padding:6px 0; color:#9896ab; font-size:13px; width:130px;'><strong>Cliente / Negocio:</strong></td>
                  <td style='padding:6px 0; color:#ffffff; font-size:15px; font-weight:600;'>" . htmlspecialchars($name) . "</td>
                </tr>
                <tr>
                  <td style='padding:6px 0; color:#9896ab; font-size:13px;'><strong>Email Directo:</strong></td>
                  <td style='padding:6px 0;'><a href='mailto:" . htmlspecialchars($email) . "' style='color:#c0c1ff; text-decoration:none; font-weight:600; font-size:14px;'>" . htmlspecialchars($email) . "</a></td>
                </tr>
                <tr>
                  <td style='padding:6px 0; color:#9896ab; font-size:13px;'><strong>Tipo de Proyecto:</strong></td>
                  <td style='padding:6px 0;'><span style='background:rgba(76, 215, 246, 0.15); color:#4cd7f6; padding:3px 10px; border-radius:100px; font-size:12px; font-weight:600;'>" . htmlspecialchars($projectType) . "</span></td>
                </tr>
                <tr>
                  <td style='padding:6px 0; color:#9896ab; font-size:13px;'><strong>Seguridad reCAPTCHA:</strong></td>
                  <td style='padding:6px 0; color:#34d399; font-size:12px; font-family:monospace;'>" . ($recaptcha_verified ? "✅ Validado (Score: {$recaptcha_score})" : "🛡️ Honeypot Activo") . "</td>
                </tr>
              </table>

              <!-- Mensaje del Cliente -->
              <div style='margin-bottom:28px;'>
                <div style='color:#9896ab; font-size:12px; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:8px; font-weight:700;'>
                  Mensaje del Cliente:
                </div>
                <div style='background-color:#0d0c14; border-left:3px solid #8083ff; padding:18px 20px; border-radius:6px; color:#e2e2ec; font-size:14px; line-height:1.7; white-space:pre-wrap;'>" . htmlspecialchars($message) . "</div>
              </div>

              <!-- Botón Responder Inmediato -->
              <div style='text-align:center; padding:10px 0;'>
                <a href='mailto:" . htmlspecialchars($email) . "?subject=" . rawurlencode("Re: Tu consulta sobre {$projectType} - Dani Cortés") . "' style='display:inline-block; background:linear-gradient(135deg, #6366f1 0%, #8083ff 100%); color:#ffffff; font-weight:700; font-size:14px; text-decoration:none; padding:12px 28px; border-radius:8px; box-shadow:0 4px 15px rgba(99, 102, 241, 0.35);'>
                  ✉️ Responder a " . htmlspecialchars($name) . "
                </a>
              </div>

            </td>
          </tr>

          <!-- Pie de página técnico -->
          <tr>
            <td style='background-color:#0b0a12; padding:18px 32px; border-top:1px solid #201e30; color:#6b697d; font-size:11px; font-family:monospace;'>
              Enviado el {$current_time} | IP: {$client_ip} | danicortesm.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

// Cabeceras de correo compatibles con Hostinger y servidores SMTP
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: Dani Cortés Portfolio <{$SENDER_EMAIL}>";
$headers[] = "Reply-To: " . addslashes($name) . " <{$email}>";
$headers[] = "X-Mailer: PHP/" . phpversion();

$mail_sent = @mail($RECIPIENT_EMAIL, $subject, $email_html, implode("\r\n", $headers));

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => '¡Tu mensaje ha sido enviado correctamente! Me pondré en contacto contigo muy pronto.'
    ]);
} else {
    // Si falla mail() nativo, informar claramente
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo enviar el correo a través del servidor. Por favor, contáctame directamente por WhatsApp o escribe a ' . $RECIPIENT_EMAIL
    ]);
}
