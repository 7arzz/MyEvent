import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ time, title, description, isLast }) => (
  <div style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '40px'
    }}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="timeline-dot"
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          zIndex: 1,
          border: '4px solid var(--bg)',
          boxShadow: '0 0 0 4px rgba(108, 92, 231, 0.2)'
        }}
      />
      {!isLast && (
        <div style={{
          width: '2px',
          flex: 1,
          backgroundColor: 'var(--border)',
          margin: '0.5rem 0'
        }} />
      )}
    </div>
    
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
      style={{
        flex: 1,
        padding: '1.5rem',
        backgroundColor: 'var(--card-bg)',
        borderRadius: 'var(--radius)',
        marginBottom: isLast ? 0 : '1.5rem',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
      }}
    >
      <div style={{
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--primary)',
        marginBottom: '0.5rem'
      }}>{time}</div>
      <h3 style={{ marginBottom: '0.5rem', fontSize: '1.2rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{description}</p>
    </motion.div>
  </div>
);

const Timeline = ({ agenda }) => {
  const defaultAgenda = [
    { time: '09:00 - 10:00', title: 'Pembukaan & Sambutan', description: 'Acara resmi akan dibuka oleh MC dan kata sambutan dari keluarga' },
    { time: '10:00 - 11:00', title: 'Inti Acara', description: 'Pelaksanaan kegiatan utama sesuai dengan agenda yang direncanakan' },
    { time: '11:00 - 12:00', title: 'Ramah Tamah & Makan Siang', description: 'Sesi santai bersama dengan para tamu dan hidangan yang disediakan' },
    { time: '12:00 - Selesai', title: 'Penutupan', description: 'Sesi dokumentasi dan ucapan terima kasih' },
  ];

  const displayAgenda = agenda || defaultAgenda;

  return (
    <section className="container" style={{ maxWidth: '700px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Agenda Acara</h2>
      <div style={{ padding: '0 1rem' }}>
        {displayAgenda.map((item, index) => (
          <TimelineItem 
            key={index} 
            {...item} 
            isLast={index === displayAgenda.length - 1} 
          />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
