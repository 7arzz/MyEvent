import React from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

const InfoCard = ({ icon: Icon, title, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    style={{
      flex: 1,
      minWidth: '250px',
      padding: '2rem',
      backgroundColor: 'var(--card-bg)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      textAlign: 'center',
      border: '1px solid var(--border)'
    }}
  >
    <div style={{
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(108, 92, 231, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1.5rem',
      color: 'var(--primary)'
    }}>
      <Icon size={30} />
    </div>
    <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', whiteSpace: 'pre-line' }}>{content}</p>
  </motion.div>
);

const EventInfo = ({ eventData }) => {
  const { day, date, time, locationName } = eventData || {
    day: 'Sabtu',
    date: '17 Agustus 2026',
    time: '09:00 - Selesai',
    locationName: 'Gedung Serbaguna XYZ\nJl. Merdeka No. 45'
  };

  return (
    <section className="container">
      <div 
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <InfoCard 
          icon={Calendar} 
          title="Hari & Tanggal" 
          content={`${day}, ${date}`} 
          delay={0.1} 
        />
        <InfoCard 
          icon={Clock} 
          title="Waktu" 
          content={time} 
          delay={0.2} 
        />
        <InfoCard 
          icon={MapPin} 
          title="Tempat" 
          content={locationName} 
          delay={0.3} 
        />
      </div>
    </section>
  );
};

export default EventInfo;
