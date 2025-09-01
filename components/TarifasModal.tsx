import * as React from 'react';

interface TarifasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tarifas = [
  {
    servicio: 'Acompañamiento Digital',
    modalidad: 'Sesión individual (1h)',
    tarifa: '$40.000',
    observaciones: 'Ideal para usuarios que necesitan ayuda puntual',
  },
  {
    servicio: 'Soporte Técnico de Equipos',
    modalidad: 'Por intervención remota',
    tarifa: '$50.000',
    observaciones: 'Incluye diagnóstico y solución básica',
  },
  {
    servicio: 'Mantenimiento Preventivo Automatizado',
    modalidad: 'Mensual (por equipo)',
    tarifa: '$30.000',
    observaciones: 'Scripts, limpieza digital, revisión remota',
  },
  {
    servicio: 'Consultoría en Sistemas y Seguridad Digital',
    modalidad: 'Sesión individual (1h)',
    tarifa: '$60.000',
    observaciones: 'Enfocado en usuarios intermedios o pequeñas empresas',
  },
];

// El modal ahora será absoluto respecto al cardWrapper
const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
  backdropFilter: 'blur(20px)',
  padding: 0,
  boxSizing: 'border-box',
  overflow: 'auto',
};

const contentStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: 24,
  padding: '32px 40px 40px',
  maxWidth: 480,
  width: '100%',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  animation: 'fadeInUp 0.6s ease forwards',
  position: 'relative',
  margin: 0,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 12,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 28,
  cursor: 'pointer',
  color: '#888',
};

// Animación igual a la tarjeta principal
const styleTag = (
  <style>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
);

const TarifasModal: React.FC<TarifasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Cerrar modal">&times;</button>
        <h2 style={{marginBottom: 18, fontSize: 22, color: '#4a5568'}}>Tarifas de Servicios</h2>
        <div style={{overflowX: 'auto', width: '100%'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', fontSize: 15}}>
            <thead>
              <tr style={{background: '#f3f3f3'}}>
                <th style={{padding: 8, border: '1px solid #e2e8f0'}}>Servicio</th>
                <th style={{padding: 8, border: '1px solid #e2e8f0'}}>Modalidad</th>
                <th style={{padding: 8, border: '1px solid #e2e8f0'}}>Tarifa Inicial (COP)</th>
                <th style={{padding: 8, border: '1px solid #e2e8f0'}}>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((row, idx) => (
                <tr key={idx}>
                  <td style={{padding: 8, border: '1px solid #e2e8f0'}}>{row.servicio}</td>
                  <td style={{padding: 8, border: '1px solid #e2e8f0'}}>{row.modalidad}</td>
                  <td style={{padding: 8, border: '1px solid #e2e8f0'}}>{row.tarifa}</td>
                  <td style={{padding: 8, border: '1px solid #e2e8f0'}}>{row.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {styleTag}
      </div>
    </div>
  );
};

export default TarifasModal;
