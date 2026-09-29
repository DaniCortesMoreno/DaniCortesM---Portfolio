export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'design';
  badge: string;
  level: string;
}

export const skills: Skill[] = [
  { name: 'React', category: 'frontend', badge: 'v18.3', level: 'Avanzado' },
  { name: 'TypeScript', category: 'frontend', badge: 'Strict', level: 'Avanzado' },
  { name: 'Next.js / Vite', category: 'frontend', badge: 'Edge', level: 'Avanzado' },
  { name: 'Vue', category: 'frontend', badge: 'v3.x', level: 'Intermedio' },
  { name: 'Tailwind CSS', category: 'frontend', badge: 'JIT', level: 'Experto' },
  { name: 'Node.js', category: 'backend', badge: 'LTS', level: 'Avanzado' },
  { name: 'Laravel', category: 'backend', badge: 'PHP 8+', level: 'Avanzado' },
  { name: 'WordPress', category: 'backend', badge: 'Custom', level: 'Experto' },
  { name: 'SQL / Relational', category: 'backend', badge: 'MySQL', level: 'Avanzado' },
  { name: 'Git & GitHub', category: 'devops', badge: 'CI/CD', level: 'Avanzado' },
  { name: 'DNS & SysAdmin', category: 'devops', badge: 'Nginx/Linux', level: 'Avanzado' },
  { name: 'Figma UI/UX', category: 'design', badge: 'AutoLayout', level: 'Avanzado' },
  { name: 'Core Web Vitals', category: 'design', badge: '100% Core', level: 'Experto' },
  { name: 'WCAG Accessibility', category: 'design', badge: 'AAA/AA', level: 'Avanzado' }
];
