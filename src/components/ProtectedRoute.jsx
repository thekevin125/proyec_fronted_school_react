// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, component }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtenemos el usuario autenticado.

  // Si el usuario no está autenticado o su rol no coincide, redirige al login.
  if (!user || user.role !== role) {
    return <Navigate to="/login" />;
  }

  return component;
};

export default ProtectedRoute;
