import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { DEFAULT_INVITATION_DATA } from "./data";
import { decodeData, encodeData } from "./utils/urlData";

function AppContent() {
  const [invitationData, setInvitationData] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check URL parameters for data
    const encoded = searchParams.get("d");

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
  }, [searchParams]);

  const updateData = (newData) => {
    setInvitationData(newData);
    // Note: We don't update URL here to avoid page reloads, 
    // but the Admin Dashboard will handle link generation.
  };

  const hasDataParam = searchParams.has("d");

  if (!invitationData) return <div>Loading...</div>;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          hasDataParam 
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
