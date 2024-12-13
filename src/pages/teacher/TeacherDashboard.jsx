import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function TeacherDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet /> {/* Aquí se renderizarán las subrutas */}
      </div>
    </div>
  );
}

export default TeacherDashboard;
