import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { DEFAULT_INVITATION_DATA } from './data';

function App() {
  const [invitationData, setInvitationData] = useState(() => {
    const saved = localStorage.getItem('invitation_data');
    return saved ? JSON.parse(saved) : DEFAULT_INVITATION_DATA;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('admin_login') === 'true';
  });

  // Sync with localStorage
  const updateData = (newData) => {
    setInvitationData(newData);
    localStorage.setItem('invitation_data', JSON.stringify(newData));
  };

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('admin_login', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('admin_login');
  };

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
