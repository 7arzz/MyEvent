import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const Map = ({ location }) => {
  const { address, mapUrl, embedUrl } = location || {
    address: 'Jl. Merdeka No. 45, Jakarta Pusat, DKI Jakarta 10110',
    mapUrl: 'https://maps.google.com',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.52441982!2d106.82281481112456!3d-6.1753924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2dbf5c351%3A0x6e7887556a31c5!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1711516000000!5m2!1sid!2sid'
  };

  return (
    <section className="container">
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Lokasi Acara</h2>
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            width: '100%',
            height: '400px',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow)',
            border: '8px solid var(--card-bg)'
          }}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Acara"
          />
        </motion.div>

        <div style={{
          textAlign: 'center',
          maxWidth: '600px',
          padding: '2rem',
          backgroundColor: 'var(--card-bg)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          width: '100%',
          boxShadow: 'var(--shadow)'
        }}>
          <MapPin size={24} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <p style={{
            color: 'var(--text-main)',
            fontSize: '1.1rem',
            marginBottom: '1.5rem',
            fontWeight: 500
          }}>
            {address}
          </p>
          <a 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2.5rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(108, 92, 231, 0.3)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
          >
            <Navigation size={18} />
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Map;
