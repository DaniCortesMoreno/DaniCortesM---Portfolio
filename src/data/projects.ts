export interface Project {
  id: string;
  number: string;
  categoryTag: string;
  title: string;
  description: string;
  image: string;
  displayUrl?: string;
  statusNote?: string;
  statusBadge?: string;
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
    id: 'rayo-pelon',
    number: '01',
    categoryTag: 'REACT 19 & NODE.JS · FULL STACK',
    title: 'Rayo Pelón F.C.',
    description: 'Plataforma web deportiva Full Stack de alto rendimiento para club de Fútbol 7. Desarrollada con React 19, TypeScript y Node.js/Express, cuenta con enrutamiento SPA, panel de administración con autenticación JWT, base de datos JSON transaccional (22 jornadas, crónicas y partes médicos) y motor de Match Center con cuenta regresiva en tiempo real.',
    image: '/projects/rayo-pelon.webp',
    displayUrl: 'rayopelon.hostingersite.com',
    statusNote: 'En construcción aún — Vista previa disponible en servidor de desarrollo',
    statusBadge: 'EN CONSTRUCCIÓN',
    tags: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'JWT & Bcrypt', 'Match Center', 'SPA'],
    metrics: [
      { label: 'Frontend', value: 'React 19 + TS' },
      { label: 'Backend', value: 'Node.js + Express' },
      { label: 'Temporada', value: '22 Jornadas' }
    ],
    caseStudy: {
      overview: 'Plataforma oficial Full Stack del club Rayo Pelón F.C. (Liga Plata Ibi F7, Temporada 2026/27). Arquitectura desacoplada de alto rendimiento compuesta por cliente SPA en React 19 y servidor Node.js/Express con base de datos transaccional y panel de control seguro (actualmente en construcción con entorno de pruebas activo).',
      challenge: 'Diseñar una experiencia deportiva de primer nivel que combine agilidad total de carga, interacción 3D en cromos de plantilla, gestión médica y táctica del equipo, y un sistema automatizado de Match Center que calcule estados de partido y tiempos sin dependencias pesadas.',
      solution: 'Arquitectura Full Stack modular: Frontend con React 19, TypeScript, Vite 8 y Tailwind CSS v3 con tokens exclusivos (Oro Rayo #F59E0B y Carbón #07070F); Backend con Node.js y Express (ES Modules) en TypeScript estricto, persistencia transaccional Flat-File en JSON, seguridad con JWT/Bcrypt y cálculo automatizado de tiempos de juego.',
      architecture: [
        'Frontend (client/): React 19 + TypeScript con arquitectura modular por componentes, Vite 8 con HMR ultrarrápido y React Router DOM v7 para navegación SPA instantánea sin recargas.',
        'Diseño & Tokens (Tailwind CSS v3): Paleta exclusiva Oro Rayo (#F59E0B), Fondo Carbón (#07070F), degradados Champagne y acento Burdeos. Tarjetas con efecto glassmorphism y tilt giroscópico 3D en cromos de jugadores.',
        'Tipografía & Iconografía: Google Fonts (Outfit, Montserrat e Inter), Google Material Symbols & Icons y Lucide React.',
        'Backend (server/): Node.js + Express.js v4 en modo ES Modules con TypeScript estricto y desarrollo en vivo mediante tsx watch.',
        'Base de Datos Flat-File Transaccional: Persistencia JSON en server/data/db.json con calendario íntegro de 22 jornadas (temporada 2026/27), noticias, crónicas, partes médicos clínicos y plantilla completa con atributos y estadísticas.',
        'Seguridad & Autenticación: Sesiones de panel de control con tokens JWT con expiración, cifrado de contraseñas con Bcrypt.js, CORS y validación de tipos en endpoints REST.',
        'Servicios Automatizados: Motor de cálculo automático de Match Center y cuenta regresiva a tiempo real, y gestor de archivos multimedia (fotos de partidos, clips y fichas).'
      ],
      results: [
        'Plataforma Full Stack moderna, ultrarrápida y con identidad gráfica deportiva diferencial',
        'Panel de gestión ágil para crónicas, estado médico de futbolistas y jornadas',
        'Despliegue y pruebas activas en entorno Staging accesible desde cualquier dispositivo'
      ]
    },
    liveUrl: 'https://lightgray-woodpecker-102614.hostingersite.com/',
    featured: true
  },
  {
    id: 'goat-xi',
    number: '02',
    categoryTag: 'REACT & HEADLESS CMS',
    title: 'Goat-XI',
    description: 'Desarrollo de aplicación web interactiva de simulación de fútbol basada en una arquitectura desacoplada (Headless CMS). Combina un draft táctico en tiempo real con un motor algorítmico de simulación de partidos.',
    image: '/projects/goat-xi.webp',
    displayUrl: 'goat-xi.app',
    statusNote: 'En construcción aún — Frontend React + Headless WordPress Backend vía REST API',
    statusBadge: 'EN CONSTRUCCIÓN',
    tags: ['React.js', 'Headless WordPress', 'REST API', 'Draft Interactivo', 'Algoritmos', 'State Management'],
    metrics: [
      { label: 'Frontend', value: 'React.js' },
      { label: 'Backend', value: 'Headless WP' },
      { label: 'Rivales', value: '19 Históricos' }
    ],
    caseStudy: {
      overview: 'Desarrollo de aplicación web interactiva de simulación de fútbol basada en una arquitectura desacoplada (Headless CMS), combinando lógica táctica avanzada, draft de jugadores legendarios y simulación probabilística de partidos (actualmente en construcción).',
      challenge: 'Estructurar una base de datos con jugadores y clubes históricos de LaLiga organizados por temporadas sin sobrecargar el cliente, garantizando una gestión fluida del estado táctico (formaciones, roles) y un algoritmo de cálculo que simulara resultados realistas y eventos en tiempo real.',
      solution: 'Arquitectura desacoplada con frontend reactivo en React.js y backend en WordPress utilizado como Headless CMS vía API REST, complementado con un algoritmo de cálculo estadístico para el cálculo probabilístico de partidos contra 19 equipos históricos.',
      architecture: [
        'Frontend en React: Interfaz dinámica y reactiva desarrollada con React.js, gestión de estado para la fase de estrategia (configuración táctica y formaciones ofensivas/defensivas) y lógica de selección de alineación (Draft interactivo).',
        'Backend en WordPress (Headless CMS): Uso de WordPress como base de datos y gestor de contenidos vía API REST, almacenando y estructurando jugadores y equipos históricos de LaLiga organizados por temporadas (estadísticas, valoraciones anuales e insignias).',
        'Algoritmo de Simulación & Cálculo Estadístico: Lógica de simulación de partidos que calcula probabilidades de victoria, empates y generación de eventos (goles) enfrentando la media ponderada del 11 del usuario contra 19 equipos históricos seleccionados aleatoriamente de la base de datos.',
        'Consumo optimizado de la API REST para respuesta inmediata en la selección de jugadores y carga táctica.'
      ],
      results: [
        'Arquitectura desacoplada eficiente que combina la agilidad de React con la gestión de datos de WordPress',
        'Simulación de partidos equilibrada y coherente basada en medias estadísticas ponderadas',
        'Experiencia de usuario inmersiva con draft táctico y generación dinámica de goles y resultados'
      ]
    }
  },
  {
    id: 'disenowebalcoy',
    number: '03',
    categoryTag: 'MARKETING DIGITAL',
    title: 'DiseñoWebAlcoy',
    description: 'Despliegue de identidad digital corporativa y estrategia SEO. Un proyecto centrado en la limpieza visual y la velocidad de carga, diseñado específicamente para transmitir confianza y transformar visitantes en clientes mediante embudos de contacto optimizados.',
    image: '/projects/disenowebalcoy.webp',
    displayUrl: 'diseñowebalcoy.es',
    statusNote: 'Sin terminar aún',
    statusBadge: 'SIN TERMINAR AÚN',
    tags: ['WordPress', 'Divi', 'UI/UX', 'SEO', 'Marketing Digital'],
    metrics: [
      { label: 'Estrategia', value: 'SEO Local' },
      { label: 'Enfoque', value: 'Conversión' },
      { label: 'Diseño', value: 'Limpio & Rápido' }
    ],
    caseStudy: {
      overview: 'Plataforma web de captación para servicios de diseño web, posicionamiento y marketing digital en Alcoy y comarca (proyecto actualmente en desarrollo activo, sin terminar aún).',
      challenge: 'Diseñar un sitio visualmente limpio y de carga veloz sobre WordPress y Divi, estructurando la información para transmitir confianza inmediata y convertir visitas en solicitudes de presupuesto.',
      solution: 'Desarrollo con WordPress y Divi optimizado, estructuración de servicios (diseño web, tienda online, mantenimiento, automatizaciones, SEO) y embudos de contacto directos.',
      architecture: [
        'WordPress con Divi y personalización CSS para aligerar la carga',
        'Estructura de arquitectura de contenidos orientada a SEO local',
        'Embudos de contacto y formularios optimizados para captación',
        'Diseño responsive adaptado a todo tipo de pantallas'
      ],
      results: [
        'Identidad visual moderna y profesional orientada a captar clientes',
        'Presentación clara y segmentada de servicios digitales',
        'Base técnica lista para posicionamiento en buscadores'
      ]
    },
    liveUrl: 'https://xn--diseowebalcoy-lkb.es/'
  },
  {
    id: 'montfer',
    number: '04',
    categoryTag: 'TIENDA ONLINE',
    title: 'Suministros Montfer',
    description: 'Diseño y desarrollo de tienda online (eCommerce) con un catálogo de más de 14.000 productos especializada en maquinaria de coser doméstica e industrial, accesorios y servicio técnico. Implementación de una arquitectura web optimizada para la conversión, estructuración de un catálogo multi-categoría y digitalización del servicio de reparación para captar clientes tanto particulares como talleres profesionales.',
    image: '/projects/montfer.webp',
    displayUrl: 'suministrosmontfer.com',
    statusNote: 'En construcción aún — Conexión ClassicGes & WooCommerce (+14.000 productos)',
    statusBadge: 'EN CONSTRUCCIÓN',
    tags: ['WordPress', 'WooCommerce', 'ClassicGes ERP', 'Divi', 'UI/UX', 'eCommerce'],
    metrics: [
      { label: 'Integración ERP', value: 'ClassicGes' },
      { label: 'Catálogo', value: '+14.000 Prod.' },
      { label: 'Plataforma', value: 'WooCommerce' }
    ],
    caseStudy: {
      overview: 'Tienda online especializada en maquinaria de coser industrial y doméstica, repuestos y digitalización de servicio técnico para Suministros Montfer, gestionando un catálogo de más de 14.000 referencias (actualmente en fase de construcción).',
      challenge: 'Uno de los mayores retos técnicos ha sido conectar e integrar el software de gestión empresarial ClassicGes con WooCommerce para sincronizar un volumen masivo de más de 14.000 productos, referencias y stock en tiempo real, junto con la complejidad de organizar repuestos y accesorios técnicos.',
      solution: 'Conexión técnica entre el ERP ClassicGes y WooCommerce para sincronización continua de catálogo, desarrollo de una interfaz de tienda optimizada para la conversión con Divi y WordPress, y estructuración de un canal web para la gestión de reparaciones y servicio técnico.',
      architecture: [
        'Integración y sincronización de ClassicGes con WooCommerce para +14.000 productos',
        'Arquitectura eCommerce con WordPress y personalización avanzada en Divi',
        'Catálogo multi-categoría para maquinaria industrial, doméstica y repuestos técnicos',
        'Canal digitalizado de solicitud de servicio técnico y soporte local en Alcoy'
      ],
      results: [
        'Sincronización automatizada entre el software ClassicGes y la tienda online',
        'Catálogo de más de 14.000 productos estructurado para particulares y talleres profesionales',
        'Digitalización del servicio de reparación y venta técnica'
      ]
    },
    liveUrl: 'https://suministrosmontfer.com/'
  },
  {
    id: 'silvia-vicedo',
    number: '05',
    categoryTag: 'ASESORÍA JURÍDICA',
    title: 'Silvia Vicedo Abogado',
    description: 'Diseño y desarrollo de sitio web corporativo para despacho de abogados. Implementación de una identidad visual sobria, sistema de gestión de blog jurídico y arquitectura optimizada para la captación de clientes potenciales.',
    image: '/projects/silvia-vicedo.webp',
    displayUrl: 'abogadosilviavicedo.com',
    statusNote: 'Trabajando en un nuevo diseño más moderno y actualizado',
    statusBadge: 'NUEVO REDISEÑO EN CURSO',
    tags: ['WordPress', 'Divi', 'Blog Engine', 'UI/UX', 'Legal'],
    metrics: [
      { label: 'Especialidad', value: 'Jurídica' },
      { label: 'Identidad', value: 'Sobria & Seria' },
      { label: 'Estado', value: 'En Rediseño' }
    ],
    caseStudy: {
      overview: 'Sitio web corporativo y manifiesto digital para el despacho de Silvia Vicedo Abogado («Derecho sin rodeos»). Actualmente trabajando en un nuevo diseño más moderno y actualizado.',
      challenge: 'Transmitir la filosofía directa y rigurosa del despacho, organizando áreas jurídicas y blog especializado para captar clientes potenciales, sentando las bases para su próxima versión visual renovada.',
      solution: 'Desarrollo con WordPress y Divi, estructuración de contenidos legales con tipografía sobria, integración de blog de actualidad jurídica y canal directo para solicitud de citas y consultas.',
      architecture: [
        'WordPress con maquetación Divi sobria y adaptada a la identidad del despacho',
        'Motor de blog jurídico para divulgación y posicionamiento',
        'Formularios de contacto y llamada a la acción («Reserva tu cita»)',
        'Evolución y desarrollo de la nueva línea gráfica más moderna'
      ],
      results: [
        'Presencia digital sobria que transmite seguridad y cercanía jurídica',
        'Canal activo de captación de clientes y consultas legales',
        'Fase de rediseño en marcha para elevar la experiencia visual'
      ]
    },
    liveUrl: 'https://abogadosilviavicedo.com/'
  },
  {
    id: 'solaico',
    number: '06',
    categoryTag: 'ENERGÍA RENOVABLE',
    title: 'Solaico',
    description: 'En fase de desarrollo: plataforma corporativa enfocada en la instalación fotovoltaica. El proyecto prioriza una arquitectura web moderna, limpia y orientada a la presentación de soluciones solares tanto para particulares como empresas.',
    image: '/projects/solaico.webp',
    displayUrl: 'solaico.com',
    statusNote: 'En fase de desarrollo: plataforma corporativa enfocada en la instalación fotovoltaica',
    statusBadge: 'EN DESARROLLO',
    tags: ['WordPress', 'Divi', 'Blog Engine', 'UI/UX', 'Fotovoltaica'],
    metrics: [
      { label: 'Sector', value: 'Energía Solar' },
      { label: 'Arquitectura', value: 'Moderna' },
      { label: 'Fase', value: 'En Desarrollo' }
    ],
    caseStudy: {
      overview: 'Plataforma corporativa en desarrollo para empresa especializada en placas solares y energía renovable.',
      challenge: 'Construir una presencia digital moderna y confiable que explique de manera sencilla los beneficios de la instalación fotovoltaica y facilite la petición de presupuestos para proyectos de energía limpia.',
      solution: 'Desarrollo con WordPress y Divi priorizando una arquitectura web moderna, limpia y estructurada, con catálogo de soluciones, blog corporativo y formularios de contacto.',
      architecture: [
        'WordPress con Divi configurado para una navegación moderna y fluida',
        'Catálogo de soluciones solares fotovoltaicas',
        'Motor de blog para contenidos sobre energía solar y renovables',
        'Canales de presupuesto y contacto técnico'
      ],
      results: [
        'Arquitectura web moderna enfocada en el sector fotovoltaico',
        'Estructura clara para información técnica y presupuestos solares',
        'Desarrollo continuo de nuevas secciones y contenidos'
      ]
    },
    liveUrl: 'https://solaico.com/'
  },
  {
    id: 'sunvision',
    number: '07',
    categoryTag: 'PRESENCIA DIGITAL',
    title: 'SunVision Óptica',
    description: 'Desarrollo de sitio corporativo centrado en una interfaz limpia y una arquitectura de información clara. Optimización de tiempos de carga y adaptabilidad total a dispositivos móviles. Primera web creada en solitario por mí en su totalidad.',
    image: '/projects/sunvision.webp',
    displayUrl: 'opticasunvision.es',
    statusNote: 'Primera web creada en solitario por mí en su totalidad',
    statusBadge: '1ª WEB EN SOLITARIO',
    tags: ['WordPress', 'Divi', 'Personalización CSS', 'Mobile First', 'UI/UX'],
    metrics: [
      { label: 'Hito', value: '1ª Web Solitario' },
      { label: 'Adaptabilidad', value: 'Mobile Total' },
      { label: 'Diseño', value: 'Limpio & Claro' }
    ],
    caseStudy: {
      overview: 'Hito profesional: Primera web creada en solitario por mí en su totalidad. Sitio corporativo para centro óptico y auditivo SunVisión.',
      challenge: 'Como primer proyecto completo desarrollado en solitario, el desafío principal fue lograr una interfaz limpia, adaptabilidad total a smartphones y tiempos de carga óptimos sin errores de maquetación.',
      solution: 'Desarrollo con WordPress y Divi con personalización CSS a medida, diseño centrado en la usabilidad móvil y estructuración clara de servicios de óptica, centro auditivo, horarios y promociones.',
      architecture: [
        'WordPress con maquetación Divi y personalización CSS exclusiva',
        'Arquitectura de información clara para servicios de salud visual y auditiva',
        'Adaptabilidad completa a dispositivos móviles y tablets',
        'Secciones informativas de horarios, promociones y contacto'
      ],
      results: [
        'Hito completado con éxito: primera web desarrollada al 100% en solitario',
        'Experiencia móvil limpia y adaptada a clientes de todas las edades',
        'Sitio en producción con presencia local consolidada'
      ]
    },
    liveUrl: 'https://opticasunvision.es/'
  }
];
