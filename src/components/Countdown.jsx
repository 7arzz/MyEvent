import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CountdownUnit = ({ count, type }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    style={{
      flex: 1,
      minWidth: "80px",
      padding: "1.5rem",
      backgroundColor: "var(--card-bg)",
      borderRadius: "var(--radius)",
      boxShadow: "var(--shadow)",
      textAlign: "center",
      border: "1px solid var(--border)",
    }}
  >
    <div
      style={{
        fontSize: "2.5rem",
        fontWeight: 700,
        color: "var(--primary)",
      }}
    >
      {count !== undefined ? count : "00"}
    </div>
    <div
      style={{
        fontSize: "0.8rem",
        fontWeight: 500,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      {type}
    </div>
  </motion.div>
);

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
          jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
          menit: Math.floor((difference / 1000 / 60) % 60),
          detik: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = { hari: 0, jam: 0, menit: 0, detik: 0 };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="container" style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "2.5rem", color: "var(--text-main)" }}>
        Hitung Mundur Acara
      </h2>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          maxWidth: "800px",
          margin: "1rem auto",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "var(--shadow)",
        }}
      >
        <CountdownUnit count={timeLeft.hari} type="Hari" />
        <CountdownUnit count={timeLeft.jam} type="Jam" />
        <CountdownUnit count={timeLeft.menit} type="Menit" />
        <CountdownUnit count={timeLeft.detik} type="Detik" />
      </div>
    </section>
  );
};

export default Countdown;
