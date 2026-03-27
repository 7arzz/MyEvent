import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ title, subtitle, imageUrl }) => {
  return (
    <section 
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--pastel-gradient)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0 2rem',
      }}
    >
      {/* Background Decorative Circles */}
      <div 
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'var(--primary)',
          opacity: '0.05',
          top: '-100px',
          left: '-100px',
          zIndex: 0
        }}
      />
      <div 
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'var(--secondary)',
          opacity: '0.07',
          bottom: '-50px',
          right: '-50px',
          zIndex: 0
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          overflow: 'hidden',
          marginBottom: '2rem',
          border: '8px solid var(--card-bg)',
          boxShadow: 'var(--shadow)',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--card-bg)'
        }}
      >
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Event Logo" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <div style={{ fontSize: '4rem' }}>💌</div>
        )}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontSize: '3.5rem',
          marginBottom: '1rem',
          color: 'var(--primary)',
          zIndex: 1,
          lineHeight: 1.2
        }}
      >
        {title || '🌟 Undangan Digital 🌟'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: '600px',
          margin: '0 auto',
          zIndex: 1,
          fontWeight: 500
        }}
      >
        {subtitle || 'Kepada Bapak/Ibu/Saudara/i di tempat'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>↓</span>
      </motion.div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
            40% {transform: translateY(-10px) translateX(-50%);}
            60% {transform: translateY(-5px) translateX(-50%);}
          }
          @media (max-width: 768px) {
            h1 { font-size: 2.5rem!important; }
            p { font-size: 1rem!important; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
