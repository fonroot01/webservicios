// components/ServiceCard.js
import React, { useState } from 'react';
import styles from '../styles/ServiceCard.module.css';
import ConsultaModal from './ConsultaModal';
import ServicioInfoModal from './ServicioInfoModal';
import TarifasModal from './TarifasModal';

const services = [
  {
    id: 'capacitacion',
    title: 'Acompañamiento Digital para Usuarios No Técnicos',
    icon: '🧑‍🏫',
    description: 'Guía práctica en el uso de tecnología básica y seguridad en línea.',
    items: [
      'Uso básico de correo electrónico (Gmail, Outlook).',
      'Introducción al uso de la nube (Google Drive, OneDrive): guardar, compartir y organizar archivos.',
      'Manejo de plataformas de concursos, subsidios y trámites (Sisbén, Icetex, Jóvenes en Acción).',
      'Seguridad digital: evitar fraudes y proteger contraseñas.'
    ],
    color: '#4299e1',
    colorHover: '#3182ce'
  },
  {
    id: 'reparacion',
    title: 'Soporte Técnico de Equipos a Distancia',
    icon: '🛠️',
    description: 'Solución remota de problemas técnicos comunes.',
    items: [
      'Instalación de software, eliminación de virus y configuración vía AnyDesk.',
      'Diagnóstico remoto de fallas en sistemas y apps.',
      'Asistencia paso a paso sin tecnicismos.'
    ],
    color: '#48bb78',
    colorHover: '#38a169'
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Preventivo Automatizado',
    icon: '⚙️',
    description: 'Limpieza y optimización automatizada del sistema.',
    items: [
      'Ejecución de scripts para limpieza y mejora de rendimiento.',
      'Eliminación de archivos basura y software innecesario.',
      'Recomendaciones para mantener el equipo optimizado.'
    ],
    color: '#ed8936',
    colorHover: '#dd6b20'
  },
  {
    id: 'consultoria',
    title: 'Consultoría en Sistemas y Seguridad Digital',
    icon: '🧠',
    description: 'Asesoría en la implementación de buenas prácticas digitales.',
    items: [
      'Seguridad digital: contraseñas seguras, 2FA, prevención de fraudes.',
      'Organización de archivos y respaldo en la nube (Drive, OneDrive, Dropbox).',
      'Automatización de tareas simples con herramientas o scripts.',
      'Ayuda en la configuración de dispositivos y software.'
    ],
    color: '#9f7aea',
    colorHover: '#805ad5'
  }
];

const ServiceCard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [tarifasModalOpen, setTarifasModalOpen] = useState(false);

  const handleServiceClick = (index) => {
    setSelectedService(index);
    setInfoModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper} style={{ position: 'relative' }}>
        {/* Header simplificado */}
        <div className={styles.headerSection}>
          <div className={styles.locationBadge}>
            <svg className={styles.locationIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Medellín, Antioquia</span>
          </div>
          
          <a
            href="https://alfonsom.vercel.app/"
            className={styles.portfolioButton}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver portafolio"
          >
            <span>Ver Portafolio</span>
            <span className={styles.arrowIcon}>→</span>
          </a>
        </div>
        
        {/* Profile Section */}
        <div className={styles.profileSection}>
          <div className={styles.profilePhoto}>
            <div className={styles.profileInner}>
              <img 
                src="/perfil.png" 
                alt="Foto de perfil de Alfonso Mosquera" 
                className={styles.profileImage}
              />
            </div>
          </div>
          
          <h1 className={styles.profileName}>Alfonso Mosquera</h1>
          <p className={styles.profileSubtitle}>Ingeniero de Sistemas</p>
          
          {/* Badge de servicios remotos movido aquí */}
          <div className={styles.remoteBadge}>
            <svg className={styles.remoteIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>Servicios 100% Remotos</span>
          </div>
          
          <p className={styles.profileDescription}>
            Ofrezco servicios de reparación de equipos, mantenimiento preventivo, consultoría en sistemas y capacitación tecnológica remota, aplicando principios básicos de seguridad para garantizar un entorno digital seguro y eficiente.
          </p>
        </div>

        {/* Services Section */}
        <div className={styles.servicesContainer}>
          <h2 className={styles.servicesTitle}>Servicios</h2>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div 
                key={service.id || index}
                className={`${styles.serviceCard} ${styles[service.id]} ${
                  selectedService === index ? styles.selected : ''
                }`}
                onClick={() => handleServiceClick(index)}
                style={{
                  '--accent-color': service.color,
                  '--accent-color-hover': service.colorHover
                }}
              >
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <div className={styles.serviceTitle}>
                  {service.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons} style={{justifyContent: 'center', display: 'flex'}}>
          <button
            className={styles.tarifasButton}
            onClick={() => setTarifasModalOpen(true)}
            aria-label="Ver tarifas de servicios"
          >
            <span>Ver Tarifas</span>
          </button>
          
          <button 
            className={styles.contactButton}
            onClick={() => setModalOpen(true)}
          >
            <span className={styles.contactButtonText}>Agendar Servicio</span>
          </button>
        </div>
        
        <ServicioInfoModal
          isOpen={infoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          service={selectedService !== null ? services[selectedService] : null}
        />
        <ConsultaModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <TarifasModal isOpen={tarifasModalOpen} onClose={() => setTarifasModalOpen(false)} />
        
        <div className={styles.footer}>
          © 2025 Alfonso Mosquera
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;