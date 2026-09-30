export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  subRoles: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    period: '2025 — Presente',
    role: 'Freelance Web Designer & Developer',
    company: 'Proyectos Independientes & Clientes Directos',
    subRoles: 'Gestión Completa · Diseño UI/UX · Desarrollo Web · Trato Directo',
    description: 'Gestión integral y dirección técnica de proyectos web para clientes directos, empresas locales y colaboraciones con agencias. Me encargo de todo el ciclo de vida digital: consultoría y trato presencial cercano con el cliente, diseño de interfaces UI/UX y desarrollo web Full Stack (WordPress, Headless CMS, React y tiendas WooCommerce con sincronización de ERPs como ClassicGes). Soluciones a medida que combinan estética visual limpia, velocidad de carga optimizada y código seguro con certificación oficial.',
    tags: [
      'Proyectos a Medida',
      'Diseño Web & Móvil',
      'WordPress & WooCommerce',
      'React & TypeScript',
      'Ciberseguridad',
      'Trato Presencial'
    ],
    current: true
  },
  {
    period: '2025',
    role: 'Web Developer',
    company: 'Difusión Comunicación',
    subRoles: 'Desarrollo Web Profesional · Diseño Responsivo · Optimización de Carga',
    description: 'Desarrollo técnico de sitios web corporativos y páginas para empresas. Traducción exacta y cuidada de diseños a webs perfectamente adaptadas a teléfonos móviles, tablets y ordenadores, con código limpio y tiempos de carga ultra rápidos.',
    tags: [
      'Webs Corporativas',
      'WordPress & Divi',
      '100% Adaptado a Móvil',
      'Velocidad de Carga',
      'Diseño Limpio'
    ]
  },
  {
    period: '2022',
    role: 'Web Developer & Hosting Administrator',
    company: 'Neocopy',
    subRoles: 'Creación Web · Hosting & Servidores · Mantenimiento · Seguridad',
    description: 'Diseño y puesta en marcha de páginas web completas. Administración de servidores y hosting, configuración de correos corporativos y dominios web, copias de seguridad continuas y aplicación de protocolos de seguridad para que las webs funcionen siempre sin caídas.',
    tags: [
      'Creación de Webs',
      'Hosting & Dominios',
      'Copias de Seguridad',
      'Seguridad Web',
      'Mantenimiento'
    ]
  }
];
