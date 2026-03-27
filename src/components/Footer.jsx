import React from "react";
import { FaInstagram, FaMailBulk, FaPhone } from "react-icons/fa";

const Footer = ({ contact }) => {
  const { email, phone, instagram, facebook } = contact || {
    email: "hello@myevent.id",
    phone: "+62 123 4567 890",
    instagram: "@myevent.id",
    facebook: "MyEvent Official",
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--card-bg)",
        padding: "4rem 1.5rem",
        textAlign: "center",
        borderTop: "1px solid var(--border)",
        marginTop: "60px",
      }}
    >
      <div className="container">
        <h2
          style={{
            color: "var(--primary)",
            marginBottom: "1.5rem",
            fontSize: "1.8rem",
          }}
        >
          Terima Kasih
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "2.5rem",
            maxWidth: "500px",
            margin: "0 auto 2.5rem",
          }}
        >
          Kami sangat menantikan kehadiran Bapak/Ibu/Saudara/i untuk berbagi
          kebahagiaan di hari yang istimewa ini.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-main)",
              fontSize: "0.95rem",
            }}
          >
            <FaMailBulk size={18} color="var(--primary)" />
            {email}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-main)",
              fontSize: "0.95rem",
            }}
          >
            <FaPhone size={18} color="var(--primary)" />
            {phone}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--text-main)",
              fontSize: "0.95rem",
            }}
          >
            <FaInstagram size={18} color="var(--primary)" />
            {instagram}
          </div>
        </div>

        <div
          style={{
            paddingTop: "3rem",
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
          }}
        >
          &copy; {new Date().getFullYear()} MyEvent.id - All Rights Reserved.
          Built with ❤️ for your special day.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
