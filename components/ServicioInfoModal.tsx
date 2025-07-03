import React, { useEffect, useRef } from 'react';

interface ServicioInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: {
    id: string;
    title: string;
    icon: string;
    description: string;
    items: string[];
  } | null;
}

function ServicioInfoModal({ isOpen, onClose, service }: ServicioInfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div style={styles.overlay} className="modal-overlay">
      <div ref={modalRef} style={styles.modal} className="modal-content">
        <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">&times;</button>
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>{service.icon}</span>
            {/* Título eliminado, solo emoticono */}
          </div>
          <p style={{ color: '#444', fontSize: 16, marginBottom: 12, textAlign: 'justify' }}>{service.description}</p>
          <div style={{ marginBottom: 16 }} className="modal-service-scroll">
            <ul style={{ paddingLeft: 18, margin: 0, textAlign: 'left' }}>
              {service.items.map((item, idx) => (
                <li key={idx} style={{ fontSize: 15, color: '#555', marginBottom: 7, lineHeight: 1.5, textAlign: 'left' }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        .modal-overlay {
          backdrop-filter: blur(6px);
          animation: fadeInBg 0.3s;
        }
        .modal-content {
          animation: modalIn 0.35s cubic-bezier(.4,1.6,.4,1) both;
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #a084ee #f3f3f3;
        }
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #a084ee;
          border-radius: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #f3f3f3;
        }
        .modal-service-scroll {
          /* Quitar scroll y altura máxima */
          max-height: none !important;
          overflow-y: visible !important;
        }
        .modal-service-scroll::-webkit-scrollbar {
          width: 7px;
        }
        .modal-service-scroll::-webkit-scrollbar-thumb {
          background: #a084ee;
          border-radius: 6px;
        }
        .modal-service-scroll::-webkit-scrollbar-track {
          background: #f3f3f3;
        }
        @keyframes fadeInBg {
          from { background: rgba(0,0,0,0); }
          to { background: rgba(0,0,0,0.4); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 600px) {
          .modal-content {
            max-width: 98vw !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles: { [key: string]: any } = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 16,
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  modal: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    minWidth: 0,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    boxSizing: 'border-box',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 16,
    background: 'none',
    border: 'none',
    fontSize: 28,
    cursor: 'pointer',
    color: '#888',
  },
};

export default ServicioInfoModal;
