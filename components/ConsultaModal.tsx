import React, { useState, useRef } from 'react';

interface ConsultaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ConsultaModal({ isOpen, onClose }: ConsultaModalProps) {
  const [successMsg, setSuccessMsg] = useState('');
  const formRef = useRef(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const formData = new FormData(form as HTMLFormElement);
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
        (form as HTMLFormElement).reset();
      } else {
        setSuccessMsg('Hubo un error al enviar el mensaje.');
      }
    } catch (error) {
      setSuccessMsg('Hubo un error al enviar el mensaje.');
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2>Solicitar Consulta</h2>
        {successMsg && (
          <div style={{ color: '#2ecc40', fontWeight: 600, marginBottom: 12 }}>{successMsg}</div>
        )}
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
      </div>
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
