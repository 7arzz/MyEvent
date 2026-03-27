import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { DEFAULT_INVITATION_DATA } from "./data";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [invitationData, setInvitationData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "invitation", "main"), (docSnap) => {
      if (docSnap.exists()) {
        setInvitationData(docSnap.data());
      } else {
        setInvitationData(DEFAULT_INVITATION_DATA);
      }
    });

    return () => unsub();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("admin_login") === "true";
  });

  // Sync with localStorage
  const updateData = async (newData) => {
    setInvitationData(newData);

    await setDoc(doc(db, "invitation", "main"), newData);
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={invitationData} />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
