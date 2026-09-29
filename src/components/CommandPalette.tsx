import React, { useState, useEffect, useRef } from 'react';
import { Search, Hash, Terminal, Mail, MessageSquare, ExternalLink, CornerDownLeft } from 'lucide-react';
import { projects } from '../data/projects.ts';
import { profile } from '../data/profile.ts';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  shortcut?: string;
  run: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    // Navigation
    {
      id: 'nav-hero',
      title: 'Ir a Inicio (Hero)',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'hero'; onClose(); }
    },
    {
      id: 'nav-about',
      title: 'Ir a Sobre Mí & Manifiesto',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'about'; onClose(); }
    },
    {
      id: 'nav-skills',
      title: 'Ir a Arsenal Tecnológico',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'skills'; onClose(); }
    },
    {
      id: 'nav-exp',
      title: 'Ir a Trayectoria Profesional',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'experience'; onClose(); }
    },
    {
      id: 'nav-projects',
      title: 'Ir a Proyectos & Casos de Estudio',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'projects'; onClose(); }
    },
    {
      id: 'nav-contact',
      title: 'Ir a Conexión & Contacto',
      category: 'Navegación',
      icon: <Hash size={15} color="var(--primary)" />,
      run: () => { window.location.hash = 'contact'; onClose(); }
    },

    // Interactive Actions
    {
      id: 'act-terminal',
      title: 'Abrir Dev CLI Terminal Simulator',
      category: 'Herramientas',
      icon: <Terminal size={15} color="var(--tertiary)" />,
      shortcut: 'CLI',
      run: () => { onClose(); onOpenTerminal(); }
    },
    {
      id: 'act-email',
      title: `Copiar Email (${profile.email})`,
      category: 'Herramientas',
      icon: <Mail size={15} color="var(--secondary)" />,
      shortcut: 'COPY',
      run: () => {
        navigator.clipboard.writeText(profile.email);
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
        onClose();
      }
    },
    {
      id: 'act-whatsapp',
      title: 'Abrir Chat directo en WhatsApp',
      category: 'Contacto',
      icon: <MessageSquare size={15} color="var(--tertiary)" />,
      run: () => { window.open(profile.whatsappUrl, '_blank'); onClose(); }
    },

    // Projects directly
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      title: `Proyecto: ${p.title} (${p.categoryTag})`,
      category: 'Proyectos',
      icon: <ExternalLink size={15} color="var(--primary)" />,
      run: () => {
        window.location.hash = 'projects';
        onClose();
      }
    }))
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open in parent
          const btn = document.querySelector<HTMLButtonElement>('.kbar-trigger');
          btn?.click();
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].run();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ alignItems: 'flex-start', paddingTop: '15vh' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px', borderRadius: 'var(--radius-lg)' }}>
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 1rem', borderBottom: '1px solid var(--hairline-border)', background: 'var(--surface-container-lowest)' }}>
          <Search size={18} color="var(--dimmed-meta)" style={{ marginRight: '0.75rem' }} />
          <input
            ref={inputRef}
            type="text"
            className="kbar-input"
            style={{ padding: '1rem 0' }}
            placeholder="Escribe una acción, sección o proyecto..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="kbd-badge">ESC</span>
        </div>

        {/* Action List */}
        <div className="kbar-list">
          {filteredActions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--dimmed-meta)', fontSize: '0.875rem' }}>
              No se encontraron comandos para "{query}"
            </div>
          ) : (
            filteredActions.map((act, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={act.id}
                  className={`kbar-item ${isSelected ? 'active' : ''}`}
                  onClick={() => act.run()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {act.icon}
                    <div>
                      <span style={{ fontWeight: isSelected ? 500 : 400 }}>{act.title}</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--dimmed-meta)', marginLeft: '0.5rem', fontFamily: 'var(--font-mono)' }}>
                        {act.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {act.shortcut && <span className="kbd-badge">{act.shortcut}</span>}
                    {isSelected && <CornerDownLeft size={13} color="var(--primary)" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 1rem', borderTop: '1px solid var(--hairline-border)', background: 'var(--surface-container-lowest)', fontSize: '0.6875rem', color: 'var(--dimmed-meta)', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span><kbd style={{ color: 'var(--on-surface)' }}>↑↓</kbd> Navegar</span>
            <span><kbd style={{ color: 'var(--on-surface)' }}>↵</kbd> Ejecutar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <img src="/logo.png" alt="Dani Cortés" style={{ height: '14px', width: 'auto', opacity: 0.8 }} />
            <span>Obsidian Palette v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};
