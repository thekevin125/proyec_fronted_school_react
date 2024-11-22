import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, component }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('ProtectedRoute user:', user);
console.log('Expected role:', role);


  if (!user) {
    // Si no hay usuario, redirige al login
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    // Si el rol no coincide, redirige al login o muestra un mensaje de error
    return <Navigate to="/login" />;
  }

  // Si todo está bien, renderiza el componente
  return component;
};

export default ProtectedRoute;
