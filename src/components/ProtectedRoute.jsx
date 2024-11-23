import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, expectedRole }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Obtén el usuario desde localStorage

  if (!user || user.role !== expectedRole) {
    // Si no hay usuario o el rol no coincide, redirige al login
    return <Navigate to="/login" />;
  }

  return children; // Si el rol coincide, renderiza los hijos (la ruta protegida)
};

export default ProtectedRoute;
