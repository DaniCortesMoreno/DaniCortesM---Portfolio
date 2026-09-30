export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'security' | 'devops' | 'design';
  badge: string;
  level: string;
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'frontend', badge: 'v19 / v18', level: 'Avanzado' },
  { name: 'TypeScript', category: 'frontend', badge: 'Strict', level: 'Avanzado' },
  { name: 'Tailwind CSS', category: 'frontend', badge: 'JIT / v3', level: 'Experto' },
  { name: 'Next.js / Vite', category: 'frontend', badge: 'Edge / HMR', level: 'Avanzado' },
  { name: 'Divi & Custom CSS', category: 'frontend', badge: 'Layouts', level: 'Experto' },
  { name: 'Vue', category: 'frontend', badge: 'v3.x', level: 'Intermedio' },

  // Backend
  { name: 'Node.js', category: 'backend', badge: 'LTS', level: 'Avanzado' },
  { name: 'Express.js', category: 'backend', badge: 'Node API', level: 'Avanzado' },
  { name: 'Headless WordPress', category: 'backend', badge: 'REST API', level: 'Avanzado' },
  { name: 'WordPress', category: 'backend', badge: 'Custom', level: 'Experto' },
  { name: 'WooCommerce', category: 'backend', badge: 'Tiendas Online', level: 'Experto' },
  { name: 'REST APIs & Endpoints', category: 'backend', badge: 'JSON / SPA', level: 'Avanzado' },
  { name: 'SQL / Relational', category: 'backend', badge: 'MySQL', level: 'Avanzado' },
  { name: 'Laravel', category: 'backend', badge: 'PHP 8+', level: 'Avanzado' },

  // Security
  { name: 'Ciberseguridad Web', category: 'security', badge: 'Cert. Oficial', level: 'Certificado' },
  { name: 'Protección contra Hackeos (OWASP)', category: 'security', badge: 'Blindaje', level: 'Avanzado' },
  { name: 'Sistemas de Usuarios y Contraseñas', category: 'security', badge: 'Cifrado Seguro', level: 'Avanzado' },

  // DevOps & Cloud
  { name: 'Git & GitHub', category: 'devops', badge: 'CI/CD', level: 'Avanzado' },
  { name: 'Gestión de Dominios y Correo', category: 'devops', badge: 'DNS & Linux', level: 'Avanzado' },
  { name: 'Servidores & Hosting Cloud', category: 'devops', badge: 'Alta Disponibilidad', level: 'Avanzado' },

  // Design & Optimization
  { name: 'Figma UI/UX', category: 'design', badge: 'AutoLayout', level: 'Avanzado' },
  { name: 'Velocidad Web (Google Vitals)', category: 'design', badge: 'Carga Inmediata', level: 'Experto' },
  { name: 'Accesibilidad Web (Fácil Lectura)', category: 'design', badge: 'Apta para Todos', level: 'Avanzado' },
  { name: 'Posicionamiento en Google (SEO)', category: 'design', badge: 'Más Visibilidad', level: 'Avanzado' }
];
