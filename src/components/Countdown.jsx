import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { parseIndonesianDate, parseTargetDate } from "../data";

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
      {count !== undefined ? String(count).padStart(2, "0") : "00"}
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

const resolveTargetDate = (targetDate, eventData) => {
  const parsedTarget = parseTargetDate(targetDate);
  if (parsedTarget) {
    return parsedTarget;
  }

  const parsedFromEvent = parseIndonesianDate(eventData?.date, eventData?.time);
  if (parsedFromEvent) {
    return parsedFromEvent;
  }

  return null;
};

const computeTimeLeft = (targetDate, eventData) => {
  const effectiveTarget = resolveTargetDate(targetDate, eventData);
  if (!effectiveTarget) {
    return { hari: 0, jam: 0, menit: 0, detik: 0 };
  }

  const difference = effectiveTarget.getTime() - Date.now();
  if (difference <= 0) {
    return { hari: 0, jam: 0, menit: 0, detik: 0 };
  }

  return {
    hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
    jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
    menit: Math.floor((difference / (1000 * 60)) % 60),
    detik: Math.floor((difference / 1000) % 60),
  };
};

const Countdown = ({ targetDate, eventData }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    computeTimeLeft(targetDate, eventData)
  );

  useEffect(() => {
    setTimeLeft(computeTimeLeft(targetDate, eventData));
    const timer = setInterval(() => {
      setTimeLeft(computeTimeLeft(targetDate, eventData));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, eventData?.date, eventData?.time]);

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
