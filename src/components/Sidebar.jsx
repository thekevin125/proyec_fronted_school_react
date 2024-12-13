
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../../src/styles/index.css'; // Archivo CSS para estilos

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Elimina los datos del usuario
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="avatar-placeholder"></div>
        <h3>Profesor</h3>
      </div>
      <nav className="sidebar-menu">
        <Link to="/teacher/home">Inicio</Link>
        <Link to="/teacher/add-notes">Añadir Notas</Link>
        <Link to="/teacher/students">Estudiantes</Link>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Salir
      </button>
    </div>
  );
}

export default Sidebar;
