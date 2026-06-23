import React from "react";
import Dashboard from "../components/Admin/Dashboard";

const Admin = ({ data, onUpdate }) => {
  return <Dashboard data={data} onUpdate={onUpdate} />;
};

export default Admin;

