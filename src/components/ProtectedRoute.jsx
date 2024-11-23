import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ expectedRole, children }) => {
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Obtén el rol directamente del localStorage

  if (!userRole || userRole !== expectedRole) {
    // Redirige si no coincide el rol
    return <Navigate to="/login" />;
  }

  return children; // Si el rol es correcto, renderiza el contenido
};

export default ProtectedRoute;
