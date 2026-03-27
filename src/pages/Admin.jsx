import React from "react";
import LoginForm from "../components/Admin/LoginForm";
import Dashboard from "../components/Admin/Dashboard";

const Admin = ({ data, onUpdate, isLoggedIn, onLogin, onLogout }) => {
  if (!isLoggedIn) {
    return <LoginForm onLogin={onLogin} />;
  }

  return <Dashboard data={data} onUpdate={onUpdate} onLogout={onLogout} />;
};

export default Admin;
