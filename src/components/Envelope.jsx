import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MailOpen } from "lucide-react";

const Envelope = ({ onOpen, title, subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // Wait for animation to finish before showing home content
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--bg)",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fdfdfd 0%, #f3f4ff 100%)",
      }}
    >
      <div style={{ position: "relative", width: "300px", height: "200px" }}>
        {/* Envelope Body */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(145deg, #ffffff, #e0e4ff)",
            borderRadius: "0 0 15px 15px",
            boxShadow:
              "0 15px 35px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)",
            zIndex: 2,
            border: "1px solid rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
          }}
        />

        {/* Envelope Top Flap */}
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          whileHover={{ rotateX: 10 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #dfe6ff, #ffffff)",
            clipPath: "polygon(0 0, 50% 50%, 100% 0)",
            transformOrigin: "top",
            zIndex: 4,
            borderTop: "1px solid rgba(0,0,0,0.05)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        />

        {/* Invitation Card Inside */}
        <motion.div
          initial={{ y: 0, scale: 0.95 }}
          animate={{ y: isOpen ? -80 : 0, scale: isOpen ? 1 : 0.95 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: "10px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(4px)",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            zIndex: 1,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              color: "var(--primary)",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "5px",
            }}
          >
            Undangan
          </p>
          <h4 style={{ fontSize: "1rem", color: "#2d3436" }}>
            {title || "Acara Istimewa"}
          </h4>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
        style={{ marginTop: "4rem", textAlign: "center" }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            color: "var(--text-main)",
            fontSize: "1.8rem",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "2rem",
            maxWidth: "300px",
            margin: "0 auto",
            marginBottom: "1rem",
          }}
        >
          {subtitle}
        </p>

        <button
          onClick={handleOpen}
          style={{
            padding: "1rem 2.5rem",
            backgroundColor: "var(--primary)",
            color: "white",
            borderRadius: "50px",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            boxShadow: "0 8px 20px rgba(108, 92, 231, 0.3)",
            transition: "all 0.3s ease",
            justifyContent: "center",
            margin: "0 auto", // <- ini biar pasti di tengah
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          <MailOpen size={20} />
          Buka Undangan
        </button>
      </motion.div>

      <style>
        {`
          body { overflow: ${isOpen ? "auto" : "hidden"}!important; }
        `}
      </style>
    </motion.div>
  );
};

export default Envelope;
