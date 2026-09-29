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
    company: 'Estudio Independiente',
    subRoles: 'Roles: Full-Stack Dev, UI/UX Design',
    description: 'Gestión integral, estrategia visual y desarrollo técnico completo para clientes directos y agencias de primer nivel. Implementación de soluciones con rendimiento medido, arquitecturas escalables y diseño specular contemporáneo.',
    tags: ['Client Management', 'Design Systems', 'High Conversion', 'Custom Stack', 'React', 'Next.js', 'WordPress'],
    current: true
  },
  {
    period: '2025',
    role: 'Web Developer',
    company: 'Difusión Comunicación',
    subRoles: 'Roles: Pixel-Perfect Dev, WP, Custom Dev',
    description: 'Traducción fiel de diseños complejos a código limpio y arquitecturas sólidas. Desarrollo de themes personalizados en WordPress, optimización de velocidad de carga, accesibilidad e implementación de micro-interacciones.',
    tags: ['Pixel-Perfect Layouts', 'WordPress Custom Architecture', 'Component Development', 'Performance Tuning']
  },
  {
    period: '2022',
    role: 'Web Developer & Hosting Administrator',
    company: 'Neocopy',
    subRoles: 'Roles: Hosting & DNS, Security, Management',
    description: 'Gestión del ciclo de vida de proyectos web, despliegue en servidores Linux, administración avanzada de zonas DNS, optimización de bases de datos relacionales MySQL y ejecución de auditorías de seguridad.',
    tags: ['Server Architecture', 'DNS Configuration', 'Database Tuning', 'Security Audits', 'Linux SysAdmin']
  }
];
