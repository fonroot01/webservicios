import React, { useState, useRef, useEffect } from 'react';

interface ConsultaModalProps {
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

function ConsultaModal({ isOpen, onClose, service }: ConsultaModalProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Cerrar haciendo clic fuera del modal
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mdkzpenv', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        setSuccessMsg('¡Gracias por tu mensaje! Te responderé lo antes posible.');
        form.reset();
      } else {
        setSuccessMsg('Hubo un error al enviar el mensaje.');
      }
    } catch (error) {
      setSuccessMsg('Hubo un error al enviar el mensaje.');
    }
  };

  return (
    <div style={styles.overlay} className="modal-overlay">
      <div
        ref={modalRef}
        style={{ ...styles.modal, maxWidth: 480, width: '100%' }}
        className="modal-content"
      >
        <button style={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">&times;</button>
        {!service && (
          <>
            {(!successMsg) && (
              <>
                <h2 style={{marginTop: 0, textAlign: 'center', fontWeight: 700}}>¡Estoy listo para ayudarte!</h2>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={styles.form}
                >
                  <label style={styles.label}>
                    Nombre:
                    <input type="text" name="nombre" required style={styles.input} />
                  </label>
                  <label style={styles.label}>
                    Correo:
                    <input type="email" name="correo" required style={styles.input} />
                  </label>
                  <label style={styles.label}>
                    Mensaje:
                    <textarea name="mensaje" required style={styles.textarea} />
                  </label>
                  <button type="submit" style={styles.submitBtn}>Enviar</button>
                </form>
              </>
            )}
            {successMsg && (
              <div style={{ color: '#2ecc40', fontWeight: 600, marginBottom: 12, textAlign: 'center', fontSize: 18 }}>{successMsg}</div>
            )}
          </>
        )}
        {service && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 32 }}>{service.icon}</span>
              <h2 style={{ margin: 0, fontSize: 22 }}>{service.title}</h2>
            </div>
            <p style={{ color: '#444', fontSize: 16, marginBottom: 12 }}>{service.description}</p>
            <div style={{ maxHeight: 160, overflowY: 'auto', paddingRight: 4, marginBottom: 16 }} className="modal-service-scroll">
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {service.items.map((item, idx) => (
                  <li key={idx} style={{ fontSize: 15, color: '#555', marginBottom: 7, lineHeight: 1.5 }}>{item}</li>
                ))}
              </ul>
            </div>
            <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #eee' }} />
          </div>
        )}
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
          scrollbar-width: thin;
          scrollbar-color: #a084ee #f3f3f3;
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
}

const styles: { [key: string]: any } = {
  overlay: {
    position: 'fixed',
    inset: 0, // Cubre toda la pantalla, mejor que top/left/width/height
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 16, // Añade padding para evitar que el modal toque los bordes en móviles
    boxSizing: 'border-box',
    overflow: 'auto', // Permite scroll si el modal es muy grande
  },
  modal: {
    background: '#fff',
    borderRadius: 16,
    padding: 24, // Reduce padding para móviles
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 500,
    color: '#333',
    gap: 4,
    width: '100%',
    alignItems: 'flex-start',
  },
  input: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #ccc',
    fontSize: 16,
    minHeight: 80,
    resize: 'vertical',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitBtn: {
    background: 'linear-gradient(90deg, #6a82fb 0%, #a084ee 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '12px 0',
    fontWeight: 600,
    fontSize: 18,
    cursor: 'pointer',
    marginTop: 8,
  },
};

export default ConsultaModal;
