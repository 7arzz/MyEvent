import React, { useState, useEffect } from "react";
import {
  LogOut,
  Save,
  Plus,
  Trash2,
  Layout,
  Calendar,
  MapPin,
  Hash,
  User,
  Mail,
  Phone,
  Eye,
  Edit3,
} from "lucide-react";
import Hero from "../Hero";
import EventInfo from "../EventInfo";
import Countdown from "../Countdown";
import Timeline from "../Timeline";
import Map from "../Map";
import Footer from "../Footer";

const SidebarLink = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.8rem",
      backgroundColor: active ? "rgba(108, 92, 231, 0.1)" : "transparent",
      color: active ? "#6c5ce7" : "#636e72",
      border: "none",
      borderLeft: active ? "4px solid #6c5ce7" : "4px solid transparent",
      borderRadius: "0 8px 8px 0",
      cursor: "pointer",
      fontSize: "0.9rem",
      fontWeight: active ? 700 : 500,
      textAlign: "left",
      transition: "all 0.3s",
    }}
  >
    <Icon size={18} />
    {label}
  </button>
);

const FormSection = ({ title, children, show }) => (
  <div
    style={{
      display: show ? "block" : "none",
      padding: "1.5rem",
      animate: "fadeIn 0.3s",
    }}
  >
    <h3 style={{ marginBottom: "1.5rem", color: "#2d3436" }}>{title}</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      {children}
    </div>
  </div>
);

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#636e72" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "0.8rem 1rem",
        borderRadius: "8px",
        border: "1px solid #dfe6e9",
        fontSize: "0.95rem",
        outline: "none",
        backgroundColor: "#fff",
      }}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#636e72" }}>
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: "0.8rem 1rem",
        borderRadius: "8px",
        border: "1px solid #dfe6e9",
        fontSize: "0.95rem",
        outline: "none",
        backgroundColor: "#fff",
        minHeight: "80px",
        resize: "vertical",
      }}
    />
  </div>
);

const Dashboard = ({ data, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState(data);
  const [activeTab, setActiveTab] = useState("hero");
  const [previewMode, setPreviewMode] = useState(false);

  // Sync for real-time preview (within the dashboard session)
  // Actually, onUpdate should be called when "Save" is clicked or debounced.
  // The user asked for "live preview" while editing.

  const handleChange = (section, field, value) => {
    const updated = { ...formData };
    if (section) {
      updated[section] = { ...updated[section], [field]: value };
    } else {
      updated[field] = value;
    }
    setFormData(updated);
  };

  const handleAgendaChange = (index, field, value) => {
    const updated = { ...formData };
    updated.agenda[index] = { ...updated.agenda[index], [field]: value };
    setFormData(updated);
  };

  const addAgendaItem = () => {
    const updated = { ...formData };
    updated.agenda.push({
      time: "00:00 - 00:00",
      title: "New Event",
      description: "",
    });
    setFormData(updated);
  };

  const removeAgendaItem = (index) => {
    const updated = { ...formData };
    updated.agenda = updated.agenda.filter((_, i) => i !== index);
    setFormData(updated);
  };

  const handleSave = () => {
    onUpdate(formData);
    alert("Data berhasil disimpan dan dipublikasikan!");
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar Admn */}
      <nav
        style={{
          padding: "1rem 2rem",
          flexWrap: "wrap",
          gap: "0.5rem",
          backgroundColor: "#fff",
          borderBottom: "1px solid #f1f2f6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div
            style={{
              backgroundColor: "#6c5ce7",
              color: "#fff",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <Layout size={20} />
          </div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>
            Admin Dashboard
          </h2>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "8px 16px",
              backgroundColor: previewMode ? "#636e72" : "#f1f2f6",
              color: previewMode ? "#fff" : "#2d3436",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s",
            }}
          >
            {previewMode ? <Edit3 size={16} /> : <Eye size={16} />}
            {previewMode ? "Edit Kembali" : "Lihat Preview"}
          </button>
          <button
            onClick={handleSave}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "8px 20px",
              backgroundColor: "#6c5ce7",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              boxShadow: "0 4px 10px rgba(108, 92, 231, 0.2)",
            }}
          >
            <Save size={16} />
            Simpan & Publish
          </button>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 12px",
              backgroundColor: "transparent",
              color: "#d63031",
              borderRadius: "8px",
              border: "1px solid #d63031",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          overflow: "hidden",
          backgroundColor: "#fafbfc",
        }}
      >
        {/* Sidebar */}
        {!previewMode && (
          <div
            style={{
              width: window.innerWidth < 768 ? "100%" : "240px",
              display: "flex",
              flexDirection: window.innerWidth < 768 ? "row" : "column",
              overflowX: "auto",
              backgroundColor: "#fff",
              borderRight: "1px solid #f1f2f6",
              padding: "2rem 0",
            }}
          >
            <SidebarLink
              icon={Layout}
              label="Hero Section"
              active={activeTab === "hero"}
              onClick={() => setActiveTab("hero")}
            />
            <SidebarLink
              icon={Calendar}
              label="Event Info"
              active={activeTab === "event"}
              onClick={() => setActiveTab("event")}
            />
            <SidebarLink
              icon={Hash}
              label="Agenda Acara"
              active={activeTab === "agenda"}
              onClick={() => setActiveTab("agenda")}
            />
            <SidebarLink
              icon={MapPin}
              label="Lokasi / Maps"
              active={activeTab === "location"}
              onClick={() => setActiveTab("location")}
            />
            <SidebarLink
              icon={Mail}
              label="Kontak Footer"
              active={activeTab === "rsvp"}
              onClick={() => setActiveTab("rsvp")}
            />
          </div>
        )}

        {/* Form Container */}
        {!previewMode ? (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: window.innerWidth < 768 ? "1rem" : "2rem",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                border: "1px solid #f1f2f6",
              }}
            >
              <FormSection title="Hero Section" show={activeTab === "hero"}>
                <InputField
                  label="Judul Utama"
                  value={formData.hero.title}
                  onChange={(e) =>
                    handleChange("hero", "title", e.target.value)
                  }
                  placeholder="🌟 Undangan Digital 🌟"
                />
                <TextAreaField
                  label="Subtitle / Nama Penyelenggara"
                  value={formData.hero.subtitle}
                  onChange={(e) =>
                    handleChange("hero", "subtitle", e.target.value)
                  }
                  placeholder="Merayakan Kebersamaan..."
                />
                <InputField
                  label="URL Gambar/Logo (Biarkan kosong untuk icon surat)"
                  value={formData.hero.imageUrl}
                  onChange={(e) =>
                    handleChange("hero", "imageUrl", e.target.value)
                  }
                  placeholder="https://example.com/logo.png"
                />
              </FormSection>

              <FormSection
                title="Event Info & Countdown"
                show={activeTab === "event"}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      window.innerWidth < 768 ? "1fr" : "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <InputField
                    label="Hari"
                    value={formData.event.day}
                    onChange={(e) =>
                      handleChange("event", "day", e.target.value)
                    }
                    placeholder="Sabtu"
                  />
                  <InputField
                    label="Tanggal"
                    value={formData.event.date}
                    onChange={(e) =>
                      handleChange("event", "date", e.target.value)
                    }
                    placeholder="17 Oktober 2026"
                  />
                </div>
                <InputField
                  label="Jam"
                  value={formData.event.time}
                  onChange={(e) =>
                    handleChange("event", "time", e.target.value)
                  }
                  placeholder="09:00 - Selesai"
                />
                <TextAreaField
                  label="Nama Tempat / Alamat Singkat"
                  value={formData.event.locationName}
                  onChange={(e) =>
                    handleChange("event", "locationName", e.target.value)
                  }
                  placeholder="Gedung XYZ..."
                />
                <InputField
                  label="Target Date (Countdown)"
                  type="datetime-local"
                  value={formData.targetDate.substring(0, 16)}
                  onChange={(e) =>
                    handleChange(null, "targetDate", e.target.value)
                  }
                />
                <p style={{ fontSize: "0.75rem", color: "#636e72" }}>
                  *Target date digunakan untuk sistem hitung mundur real-time.
                </p>
              </FormSection>

              <FormSection
                title="Agenda / Timeline"
                show={activeTab === "agenda"}
              >
                {formData.agenda.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "1.2rem",
                      borderRadius: "12px",
                      border: "1px solid #f1f2f6",
                      marginBottom: "1rem",
                      position: "relative",
                      backgroundColor: "#fafbfc",
                    }}
                  >
                    <button
                      onClick={() => removeAgendaItem(index)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "#d63031",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <InputField
                        label={`Jam Item #${index + 1}`}
                        value={item.time}
                        onChange={(e) =>
                          handleAgendaChange(index, "time", e.target.value)
                        }
                        placeholder="09:00 - 10:00"
                      />
                      <InputField
                        label="Judul Kegiatan"
                        value={item.title}
                        onChange={(e) =>
                          handleAgendaChange(index, "title", e.target.value)
                        }
                        placeholder="Pembukaan"
                      />
                      <TextAreaField
                        label="Deskripsi"
                        value={item.description}
                        onChange={(e) =>
                          handleAgendaChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Keterangan singkat..."
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addAgendaItem}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    border: "2px dashed #dfe6e9",
                    borderRadius: "12px",
                    backgroundColor: "transparent",
                    color: "#636e72",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  <Plus size={18} /> Tambah Agenda
                </button>
              </FormSection>

              <FormSection
                title="Lokasi / Maps"
                show={activeTab === "location"}
              >
                <TextAreaField
                  label="Alamat Lengkap"
                  value={formData.location.address}
                  onChange={(e) =>
                    handleChange("location", "address", e.target.value)
                  }
                />
                <InputField
                  label="URL Link Google Maps (Tombol Navigasi)"
                  value={formData.location.mapUrl}
                  onChange={(e) =>
                    handleChange("location", "mapUrl", e.target.value)
                  }
                />
                <InputField
                  label="URL Embed Google Maps (Frame Iframe)"
                  value={formData.location.embedUrl}
                  onChange={(e) =>
                    handleChange("location", "embedUrl", e.target.value)
                  }
                />
                <p style={{ fontSize: "0.75rem", color: "#636e72" }}>
                  *Link embed didapat dari menu &quot;Bagikan&quot; &rarr;
                  &quot;Sematkan peta&quot; di Google Maps.
                </p>
              </FormSection>

              <FormSection title="Kontak Footer" show={activeTab === "rsvp"}>
                <div style={{ paddingTop: "0" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <InputField
                      label="Email"
                      value={formData.contact.email}
                      onChange={(e) =>
                        handleChange("contact", "email", e.target.value)
                      }
                    />
                    <InputField
                      label="Phone / WA"
                      value={formData.contact.phone}
                      onChange={(e) =>
                        handleChange("contact", "phone", e.target.value)
                      }
                    />
                    <InputField
                      label="Instagram"
                      value={formData.contact.instagram}
                      onChange={(e) =>
                        handleChange("contact", "instagram", e.target.value)
                      }
                    />
                    <InputField
                      label="Facebook"
                      value={formData.contact.facebook}
                      onChange={(e) =>
                        handleChange("contact", "facebook", e.target.value)
                      }
                    />
                  </div>
                </div>
              </FormSection>
            </div>
          </div>
        ) : (
          /* Live Preview Container */
          <div style={{ flex: 1, overflowY: "auto" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: "#fff",
                padding: "10px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#636e72",
                }}
              >
                Mode Preview - Tampilan Undangan Terkini
              </span>
            </div>
            <div
              className="preview-content"
              style={{ maxWidth: "100%", margin: "0 auto" }}
            >
              <Hero
                title={formData.hero.title}
                subtitle={formData.hero.subtitle}
                imageUrl={formData.hero.imageUrl}
              />
              <Countdown targetDate={formData.targetDate} />
              <EventInfo eventData={formData.event} />
              <Timeline agenda={formData.agenda} />
              <Map location={formData.location} />
              <Footer contact={formData.contact} />
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #f1f1f1; }
          ::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
          ::-webkit-scrollbar-thumb:hover { background: #6c5ce7; }
          @media (max-width: 768px) {
              nav {
                padding: 1rem !important;
              }

              button {
                width: 100%;
              }
            }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
