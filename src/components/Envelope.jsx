import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Envelope = ({ onOpen, title, subtitle, sealUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setIsOpen(true);
    
    // Sequence of animations: 
    // 1. Star button moves (handled by motion)
    // 2. Top flap opens (handled by motion)
    // 3. Paper slides out
    // 4. Finally call onOpen to transition to Home
    setTimeout(() => {
      onOpen();
    }, 2500); 
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg)",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
        perspective: "1500px",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          color: "#fff",
          fontSize: "1.2rem",
          fontWeight: 700,
          marginBottom: "2rem",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        Klik logo untuk Membuka
      </motion.p>

      <div style={{ position: "relative", width: "360px", height: "240px", perspective: "1500px" }}>
        {/* BACK PART */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          borderRadius: "10px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          zIndex: 1,
          border: "1px solid #e0e0e0"
        }} />

        {/* PAPER */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isOpen ? -180 : 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "absolute",
            top: "15px",
            left: "20px",
            width: "320px",
            height: "210px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.02)",
            zIndex: 2,
            padding: "25px 20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "1px solid #f0f0f0"
          }}
        >
          <h2 style={{ color: "#2d3436", margin: "0 0 10px 0", fontSize: "1.2rem", borderBottom: "2px solid #6c5ce7", paddingBottom: "5px", width: "100%" }}>
            Undangan Spesial
          </h2>
          <p style={{ color: "#2d3436", fontSize: "0.9rem", lineHeight: 1.5, margin: 0, fontWeight: 600 }}>
            {title}
          </p>
          <p style={{ color: "#636e72", fontSize: "0.75rem", marginTop: "10px" }}>
            {subtitle}
          </p>
          <div style={{ marginTop: "15px", color: "#6c5ce7", fontSize: "0.8rem", fontStyle: "italic" }}>
            Tunggu sebentar...
          </div>
        </motion.div>

        {/* FRONT FLAPS */}
        {/* Left */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, borderRadius: "10px",
          background: "linear-gradient(90deg, #fdfdfd, #f5f5f5)",
          clipPath: "polygon(0 0, 50% 50%, 0 100%)",
        }} />
        {/* Right */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 4, borderRadius: "10px",
          background: "linear-gradient(-90deg, #fdfdfd, #f5f5f5)",
          clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
        }} />
        {/* Bottom */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 5, borderRadius: "10px",
          background: "linear-gradient(0deg, #f5f5f5, #ffffff)",
          clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
        }} />

        {/* TOP FLAP */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #ffffff, #f9f9f9)",
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            transformOrigin: "top center",
            zIndex: isOpen ? 1 : 6,
            borderRadius: "10px",
            borderTop: "1px solid #f0f0f0"
          }}
        />

        {/* SEAL LOGO */}
        <motion.div
          onClick={handleOpen}
          initial={{ rotate: 0, x: "-50%", y: "-50%", scale: 1 }}
          animate={{ 
            rotate: isOpen ? 720 : 0, 
            x: isOpen ? "160px" : "-50%", 
            y: "-50%",
            scale: isOpen ? 0.7 : 1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "70px",
            height: "70px",
            zIndex: 100,
            cursor: isOpening ? "default" : "pointer",
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          whileHover={!isOpening ? { scale: 1.1 } : {}}
        >
          {sealUrl ? (
            <img 
              src={sealUrl} 
              alt="Seal" 
              style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }} 
            />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle, #f1c40f, #f39c12)",
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }} />
          )}
        </motion.div>
      </div>


      <style>
        {`
          body { 
            touch-action: none;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Envelope;

