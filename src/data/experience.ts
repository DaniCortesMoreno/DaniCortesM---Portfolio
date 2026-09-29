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
    subRoles: 'Self-managed · Full-stack Dev · UI/UX Design · Client Relations',
    description: 'Gestión integral y dirección técnica de proyectos web para clientes directos, empresas locales y colaboraciones con agencias. Me encargo de todo el ciclo de vida digital: consultoría y trato presencial cercano con el cliente, diseño de interfaces UI/UX y desarrollo web Full Stack (WordPress, Headless CMS, React y tiendas WooCommerce con sincronización de ERPs como ClassicGes). Soluciones a medida que combinan estética visual limpia, velocidad de carga optimizada y código seguro con certificación oficial.',
    tags: [
      'Self-managed',
      'Full-Stack Dev',
      'UI/UX Design',
      'Client Relations',
      'WordPress & Headless',
      'React.js',
      'WooCommerce & ERP',
      'Ciberseguridad'
    ],
    current: true
  },
  {
    period: '2025',
    role: 'Web Developer',
    company: 'Difusión Comunicación',
    subRoles: 'Pixel-Perfect Dev · WordPress · Responsive Design · Custom Development',
    description: 'Especializado en la maquetación y desarrollo técnico de sitios web corporativos de alto estándar. Mi rol se centró en la traducción fiel y pixel-perfect de diseños complejos a código limpio y eficiente, asegurando una arquitectura sólida, adaptabilidad total en multidispositivo y la integración de funcionalidades y estilos CSS personalizados en WordPress y Divi para optimizar tiempos de carga y Core Web Vitals.',
    tags: [
      'Pixel-Perfect Dev',
      'WordPress',
      'Divi & Custom CSS',
      'Responsive Design',
      'Custom Development',
      'Core Web Vitals'
    ]
  },
  {
    period: '2022',
    role: 'Web Developer & Hosting Administrator',
    company: 'Neocopy',
    subRoles: 'Web Management · Hosting & DNS · Maintenance · Security',
    description: 'Responsable del ciclo de vida completo de proyectos web, desde el diseño y desarrollo inicial hasta el despliegue técnico en servidores. Gestión integral de entornos de hosting, configuración y afinado de zonas DNS, migración de bases de datos relacionales, mantenimiento preventivo continuo y aplicación de protocolos de seguridad y hardening para garantizar máxima estabilidad y disponibilidad ininterrumpida.',
    tags: [
      'Web Management',
      'Hosting & DNS',
      'Maintenance',
      'Security & Hardening',
      'Database Migration',
      'Linux SysAdmin'
    ]
  }
];
