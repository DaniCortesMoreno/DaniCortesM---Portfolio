import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { profile } from '../data/profile.ts';
import { projects } from '../data/projects.ts';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  response: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      response: (
        <div>
          <div style={{ color: 'var(--tertiary)', fontWeight: 600 }}>Obsidian Dev Terminal v2.4.0 [Alcoy Engine]</div>
          <div style={{ color: 'var(--muted-body)', marginTop: '0.25rem' }}>
            Escribe <span style={{ color: 'var(--primary)' }}>help</span> para listar los comandos disponibles o <span style={{ color: 'var(--primary)' }}>neofetch</span> para ver la telemetría del sistema.
          </div>
        </div>
      )
    }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        response = (
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.35rem', color: 'var(--on-surface-variant)' }}>
            <span style={{ color: 'var(--primary)' }}>neofetch</span> <span>Telemetría y resumen del perfil</span>
            <span style={{ color: 'var(--primary)' }}>projects</span> <span>Listado de proyectos destacados en producción</span>
            <span style={{ color: 'var(--primary)' }}>skills</span> <span>Arsenal tecnológico de desarrollo</span>
            <span style={{ color: 'var(--primary)' }}>contact</span> <span>Canales de contacto y señales</span>
            <span style={{ color: 'var(--primary)' }}>clear</span> <span>Limpiar el búfer del terminal</span>
            <span style={{ color: 'var(--primary)' }}>exit</span> <span>Cerrar sesión del terminal</span>
          </div>
        );
        break;

      case 'neofetch':
      case 'profile':
        response = (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'var(--on-surface)', marginTop: '0.5rem' }}>
            <pre style={{ margin: 0, color: 'var(--primary)', fontSize: '0.75rem', lineHeight: 1.2 }}>
{`   _____  ____  _   _ _____ 
  |  __ \\|  _ \\| \\ | |_   _|
  | |  | | |_) |  \\| | | |  
  | |  | |  _ <| . \` | | |  
  | |__| | |_) | |\\  |_| |_ 
  |_____/|____/|_| \\_|_____|`}
            </pre>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.8125rem' }}>
              <div><span style={{ color: 'var(--tertiary)' }}>USER:</span> dani@portfolio-alcoy</div>
              <div><span style={{ color: 'var(--tertiary)' }}>ROLE:</span> Full-Stack Developer &amp; UI/UX</div>
              <div><span style={{ color: 'var(--tertiary)' }}>LOCATION:</span> Alcoy, Alicante (ES)</div>
              <div><span style={{ color: 'var(--tertiary)' }}>UPTIME:</span> +6 Años en desarrollo web</div>
              <div><span style={{ color: 'var(--tertiary)' }}>CORE:</span> React, TypeScript, Node.js, Laravel, WordPress</div>
              <div><span style={{ color: 'var(--tertiary)' }}>STATUS:</span> {profile.availability}</div>
            </div>
          </div>
        );
        break;

      case 'projects':
        response = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {projects.map((p) => (
              <div key={p.id}>
                <span style={{ color: 'var(--primary)' }}>[{p.number}] {p.title}</span> — <span style={{ color: 'var(--muted-body)' }}>{p.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        response = (
          <div style={{ color: 'var(--on-surface-variant)' }}>
            <div><strong style={{ color: 'var(--primary)' }}>Frontend:</strong> React 18, TypeScript Strict, Next.js, Vite, Vue 3, Tailwind CSS</div>
            <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--tertiary)' }}>Backend:</strong> Node.js LTS, Laravel PHP 8+, WordPress Custom, MySQL / Relacional</div>
            <div style={{ marginTop: '0.25rem' }}><strong style={{ color: 'var(--secondary)' }}>DevOps:</strong> Git CI/CD, Nginx, Linux SysAdmin, DNS Tuning</div>
          </div>
        );
        break;

      case 'contact':
        response = (
          <div style={{ color: 'var(--on-surface-variant)' }}>
            <div>Email: <a href={`mailto:${profile.email}`} style={{ color: 'var(--primary)' }}>{profile.email}</a></div>
            <div>Tel: <a href={`tel:${profile.phoneTel}`} style={{ color: 'var(--tertiary)' }}>{profile.phone}</a></div>
            <div>GitHub: <a href={profile.social.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--secondary)' }}>github.com</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        response = (
          <div style={{ color: 'var(--error)' }}>
            Comando no reconocido: "{cmd}". Escribe <span style={{ color: 'var(--primary)' }}>help</span> para ver comandos.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputVal.trim()) {
        executeCommand(inputVal);
        setCmdHistory((prev) => [...prev, inputVal]);
        setHistoryPointer(-1);
      }
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyPointer === -1 ? cmdHistory.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextIdx = historyPointer + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryPointer(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setHistoryPointer(-1);
          setInputVal('');
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '720px',
          height: '480px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        {/* Terminal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', background: '#121212' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="window-dots">
              <span className="window-dot dot-red"></span>
              <span className="window-dot dot-yellow"></span>
              <span className="window-dot dot-green"></span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--on-surface-variant)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <TerminalIcon size={13} color="var(--tertiary)" /> dani@alcoy:~ (zsh)
            </span>
          </div>

          <button onClick={onClose} style={{ color: 'var(--dimmed-meta)' }} aria-label="Cerrar terminal">
            <X size={18} />
          </button>
        </div>

        {/* Terminal Scrollable Body */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {history.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--tertiary)' }}>
                <span style={{ color: 'var(--dimmed-meta)' }}>dani@alcoy:~$</span>
                <span style={{ color: 'var(--on-surface)' }}>{item.command}</span>
              </div>
              <div>{item.response}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ color: 'var(--tertiary)' }}>dani@alcoy:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--on-surface)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem'
              }}
              placeholder="escribe un comando..."
            />
          </div>
        </div>

        {/* Footer Hint */}
        <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: '#121212', display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--dimmed-meta)' }}>
          <span>Tip: Usa ↑↓ para el historial de comandos</span>
          <span>Escribe 'help' o 'exit'</span>
        </div>
      </div>
    </div>
  );
};
