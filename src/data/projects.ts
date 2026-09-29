export interface Project {
  id: string;
  number: string;
  categoryTag: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    architecture: string[];
    results: string[];
  };
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'disenowebalcoy',
    number: '01',
    categoryTag: 'PRODUCTION',
    title: 'DiseñoWebAlcoy',
    description: 'Despliegue de identidad digital corporativa y estrategia SEO local de alto impacto enfocada en velocidad sub-segundo y embudos de captación de clientes.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['WordPress Core', 'UI/UX Design', 'Local SEO', 'Core Web Vitals'],
    metrics: [
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Tiempo de Carga', value: '0.6s' },
      { label: 'Conversión', value: '+42%' }
    ],
    caseStudy: {
      overview: 'Plataforma web de captación para servicios de desarrollo web y diseño en el área de Alcoy y provincia.',
      challenge: 'Superar la lentitud inherente de builders comerciales, eliminando dependencias pesadas y garantizando una puntuación perfecta en Core Web Vitals.',
      solution: 'Desarrollo de un tema WordPress ligero a medida, compresión WebP automatizada, precarga de fuentes críticas y estructuración de datos Schema.org exhaustiva.',
      architecture: [
        'Custom PHP Theme con cero dependencias jQuery',
        'Vanilla CSS con tokens de diseño modular',
        'Caché a nivel de servidor Nginx y Redis Object Cache',
        'Formularios asíncronos con validación en cliente y sanitización en backend'
      ],
      results: [
        'Posicionamiento Top 3 para keywords clave de diseño web en la comarca',
        'Puntuación Core Web Vitals 100% verde en móvil y escritorio',
        'Aumento del 42% en solicitudes de presupuesto cualificadas'
      ]
    },
    liveUrl: 'https://disenowebalcoy.com'
  },
  {
    id: 'montfer',
    number: '02',
    categoryTag: 'E-COMMERCE',
    title: 'Suministros Montfer',
    description: 'eCommerce B2B hiper-optimizado de maquinaria industrial y digitalización de servicio técnico con sincronización de catálogo en tiempo real.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    tags: ['WooCommerce', 'B2B Portal', 'MySQL Optimization', 'Custom REST API'],
    metrics: [
      { label: 'Catálogo de Productos', value: '4.500+' },
      { label: 'Respuesta TTFB', value: '85ms' },
      { label: 'Pedidos Automatizados', value: '100%' }
    ],
    caseStudy: {
      overview: 'Digitalización completa del catálogo de distribución y servicio post-venta para suministros industriales.',
      challenge: 'Gestionar miles de referencias con atributos complejos y fichas técnicas pesadas sin ralentizar el checkout ni el filtrado por facetas.',
      solution: 'Indexación avanzada en base de datos MySQL, caché de consultas complejas y un frontend de filtrado instantáneo sin recargas de página.',
      architecture: [
        'WooCommerce desacoplado en endpoints críticos',
        'Sistema de cotización personalizada para cuentas empresariales con NIF validado',
        'Filtro facetado asíncrono con historial pushState para SEO limpio',
        'Panel de soporte con subida de manuales en PDF y despieces técnicos'
      ],
      results: [
        'Reducción del tiempo de tramitación de pedidos de 48h a minutos',
        'Carga instantánea de filtros con más de 4.000 referencias',
        'Canal digital convertido en el segundo mayor generador de ingresos'
      ]
    },
    liveUrl: 'https://suministrosmontfer.com'
  },
  {
    id: 'silvia-vicedo',
    number: '03',
    categoryTag: 'LEGAL TECH',
    title: 'Silvia Vicedo Asesoría',
    description: 'Plataforma corporativa sobria para asesoría jurídica con blog especializado y jerarquía visual impecable basada en tipografía de alta legibilidad.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Corporate Architecture', 'Editorial Design', 'GDPR Strict', 'Semantic HTML'],
    metrics: [
      { label: 'Accesibilidad WCAG', value: 'AAA' },
      { label: 'Bounce Rate', value: '28%' },
      { label: 'Carga Móvil', value: '0.5s' }
    ],
    caseStudy: {
      overview: 'Presencia web para despacho de asesoría jurídica y consultoría legal corporativa.',
      challenge: 'Transmitir autoridad, rigor y accesibilidad legal sin caer en plantillas anticuadas ni estructuras confusas para el cliente particular.',
      solution: 'Diseño editorial sobrio, paleta monocromática con acentos precisos, arquitectura de contenidos por ramas jurídicas y un sistema de cita previa integrado.',
      architecture: [
        'Estructura HTML5 100% semántica para máxima accesibilidad y SEO',
        'Cumplimiento RGPD riguroso con gestión granular de cookies',
        'Sistema de artículos técnicos con lectura estimada y tabla de contenidos dinámica'
      ],
      results: [
        '100% cumplimiento en auditoría de accesibilidad y privacidad',
        'Incremento significativo en consultas recibidas vía formulario blindado'
      ]
    },
    liveUrl: 'https://silviavicedo.com'
  },
  {
    id: 'solaico',
    number: '04',
    categoryTag: 'CLEANTECH',
    title: 'Solaico Renewables',
    description: 'Plataforma corporativa de energía solar y renovables con interactividad dinámica, cálculo de ahorro y visualizaciones fluidas sin penalizaciones de payload.',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    tags: ['Clean Energy', 'Interactive Calculator', 'TypeScript', 'NextGen UI'],
    metrics: [
      { label: 'Simulador Solar', value: '<50ms' },
      { label: 'Ahorro Calculado', value: '+300k kWh' },
      { label: 'Leads Cualificados', value: 'x3' }
    ],
    caseStudy: {
      overview: 'Web corporativa internacional y herramienta interactiva de estimación de ahorro energético mediante paneles solares fotovoltaicos.',
      challenge: 'Ofrecer una experiencia interactiva para que empresas y particulares estimen su ahorro solar sin hacer el sitio pesado ni dependiente de librerías externas voluminosas.',
      solution: 'Calculador paramétrico en TypeScript puro con animaciones fluidas por requestAnimationFrame y gráficos vectoriales SVG ultraligeros.',
      architecture: [
        'Algoritmo de estimación de irradiación solar modular en TypeScript',
        'Micro-interacciones reactivas con feedback visual instantáneo',
        'Internacionalización multi-idioma estructurada'
      ],
      results: [
        'Triplicación de la tasa de conversión en clientes industriales',
        'Tiempo medio en página aumentado a más de 3.5 minutos'
      ]
    },
    liveUrl: 'https://solaico.com',
    featured: true
  },
  {
    id: 'sunvision',
    number: '05',
    categoryTag: 'MOBILE FIRST',
    title: 'SunVision Optics',
    description: 'Catálogo de óptica con enfoque estrictamente mobile-first, micro-animaciones a 60fps y renderizado sub-pixel con puntuación de 99+ en Lighthouse.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mobile-First', 'Micro-interactions', 'Sub-pixel Rendering', 'PWA Ready'],
    metrics: [
      { label: 'Velocidad en 4G', value: '0.4s' },
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'FPS Animación', value: '60 fps' }
    ],
    caseStudy: {
      overview: 'Experiencia inmersiva para línea de monturas y lentes ópticas de diseño contemporáneo.',
      challenge: 'Lograr una sensación táctil nativa similar a una app de iOS/Android dentro de la web móvil para catálogos visuales.',
      solution: 'Gestos táctiles naturales, prefetching inteligente de vistas de producto y shaders CSS optimizados sin bloqueo del hilo principal.',
      architecture: [
        'Gestor de swipe táctil optimizado con CSS Scroll Snap y transformaciones por GPU',
        'Imágenes servidas en AVIF y WebP con srcset adaptativo al DPI de la pantalla',
        'Estado de navegación desacoplado con transiciones de página suaves'
      ],
      results: [
        '99.8% de sesiones fluidas a 60fps sin tirones (zero layout shifts)',
        'Premio de mención de diseño por experiencia móvil de usuario'
      ]
    },
    liveUrl: 'https://sunvisionoptics.com'
  }
];
