import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { DEFAULT_INVITATION_DATA } from "./data";
import { decodeData, encodeData } from "./utils/urlData";

function AppContent() {
  const [invitationData, setInvitationData] = useState(null);

  useEffect(() => {
    // Check URL parameters for data
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("d");

    if (encoded) {
      const decoded = decodeData(encoded);
      if (decoded) {
        setInvitationData(decoded);
      } else {
        setInvitationData(DEFAULT_INVITATION_DATA);
      }
    } else {
      setInvitationData(DEFAULT_INVITATION_DATA);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("admin_login") === "true";
  });

  const updateData = (newData) => {
    setInvitationData(newData);
    // Note: We don't update URL here to avoid page reloads, 
    // but the Admin Dashboard will handle link generation.
  };

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_login", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_login");
  };

  if (!invitationData) return <div>Loading...</div>;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          new URLSearchParams(window.location.search).get("d") 
            ? <Home data={invitationData} /> 
            : <Navigate to="/admin" replace />
        } 
      />
      <Route
        path="/admin"
        element={
          <Admin
            data={invitationData}
            onUpdate={updateData}
            isLoggedIn={isLoggedIn}
            onLogin={login}
            onLogout={logout}
          />
        }
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );

}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

