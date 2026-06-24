import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Envelope = ({ onOpen, title, subtitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#f5f5f5", // Light gray background
        background: "radial-gradient(circle, #ffffff 0%, #e0e0e0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          color: "#2d3436",
          fontSize: "1.2rem",
          fontWeight: 700,
          marginBottom: "2rem",
          textAlign: "center",
          textShadow: "0 1px 2px rgba(255,255,255,0.8)",
        }}
      >
        Klik logo untuk Membuka
      </motion.p>

      <div
        style={{
          position: "relative",
          width: "360px",
          height: "240px",
          perspective: "1500px",
        }}
      >
        {/* BACK PART */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(145deg, #ffffff, #ececec)",
            borderRadius: "10px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            zIndex: 1,
            border: "1px solid #dcdcdc",
          }}
        />

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
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.1), inset 0 0 20px rgba(0,0,0,0.02)",
            zIndex: 2,
            padding: "25px 20px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "1px solid #f0f0f0",
          }}
        >
          <h2
            style={{
              color: "#2d3436",
              margin: "0 0 10px 0",
              fontSize: "1.2rem",
              borderBottom: "2px solid #bdc3c7",
              paddingBottom: "5px",
              width: "100%",
            }}
          >
            Undangan Spesial
          </h2>
          <p
            style={{
              color: "#2d3436",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              margin: 0,
              fontWeight: 600,
            }}
          >
            {title}
          </p>
          <p
            style={{ color: "#636e72", fontSize: "0.75rem", marginTop: "10px" }}
          >
            {subtitle}
          </p>
          <div
            style={{
              marginTop: "15px",
              color: "#95a5a6",
              fontSize: "0.8rem",
              fontStyle: "italic",
            }}
          >
            Tunggu sebentar...
          </div>
        </motion.div>

        {/* FRONT FLAPS */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            borderRadius: "10px",
            background: "linear-gradient(90deg, #ffffff, #f2f2f2)",
            clipPath: "polygon(0 0, 50% 50%, 0 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 4,
            borderRadius: "10px",
            background: "linear-gradient(-90deg, #ffffff, #f2f2f2)",
            clipPath: "polygon(100% 0, 50% 50%, 100% 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 5,
            borderRadius: "10px",
            background: "linear-gradient(0deg, #f2f2f2, #ffffff)",
            clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
          }}
        />

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
            background: "linear-gradient(180deg, #ffffff, #ebebeb)",
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            transformOrigin: "top center",
            zIndex: isOpen ? 1 : 6,
            borderRadius: "10px",
            borderTop: "1px solid #dcdcdc",
          }}
        />

        {/* SEAL LOGO (Star) */}
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
            background: "radial-gradient(circle, #f1c40f, #f39c12)",
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            zIndex: 100,
            cursor: isOpening ? "default" : "pointer",
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
          }}
          whileHover={!isOpening ? { scale: 1.1 } : {}}
        />
      </div>

      <style>
        {`
          body { 
            touch-action: none;
          }
        `}
      </style>
    </div>
  );
};

export default Envelope;
