// components/ServiceCard.js
import React, { useState } from 'react';
import styles from '../styles/ServiceCard.module.css';
import ConsultaModal from './ConsultaModal';

const services = [
  {
    id: 'capacitacion',
    title: 'Capacitación',
    icon: '📚',
    description: 'Capacitación y buenas prácticas en sistemas y seguridad informática',
    color: '#4299e1',
    colorHover: '#3182ce'
  },
  {
    id: 'reparacion',
    title: 'Reparación de Equipos',
    icon: '🔧',
    description: 'Mantenimiento y reparación de hardware',
    color: '#48bb78',
    colorHover: '#38a169'
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Preventivo',
    icon: '⚙️',
    description: 'Cuidado y mantenimiento proactivo de sistemas informáticos',
    color: '#ed8936',
    colorHover: '#dd6b20'
  },
  {
    id: 'consultoria',
    title: 'Consultoría de Sistemas',
    icon: '💻',
    description: 'Asesoría y búsqueda de soluciones informáticas',
    color: '#9f7aea',
    colorHover: '#805ad5'
  }
];

const ServiceCard = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleService = (index) => {
    setSelectedService(selectedService === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        {/* Barra superior mejorada */}
        <div className={styles.topBar}>
          <div className={styles.leftSection}>
            <div className={styles.locationChip}>
              <svg 
                className={styles.locationIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>Medellín, Antioquia</span>
            </div>
            
            <div className={styles.remoteChip}>
              <svg 
                className={styles.remoteIcon} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Servicios Remotos</span>
            </div>
          </div>
          
          <div className={styles.rightSection}>
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
                onClick={() => toggleService(index)}
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
          
          {/* Description Panel */}
          <div className={`${styles.descriptionPanel} ${
            selectedService !== null ? styles.active : ''
          }`}>
            {selectedService !== null && services[selectedService] && (
              <div className={styles.descriptionContent}>
                <div className={styles.descriptionHeader}>
                  <span className={styles.descriptionIcon}>
                    {services[selectedService]?.icon}
                  </span>
                  <h3 className={styles.descriptionTitle}>
                    {services[selectedService]?.title}
                  </h3>
                </div>
                <p className={styles.descriptionText}>
                  {services[selectedService]?.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Button */}
        <button 
          className={styles.contactButton}
          onClick={() => setModalOpen(true)}
        >
          <span className={styles.contactButtonText}>Agendar Servicio</span>
        </button>
        
        <ConsultaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        
        <div style={{
          textAlign: 'center',
          marginTop: 24,
          color: '#888',
          fontSize: 12
        }}>
          © 2025 Alfonso Mosquera
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;