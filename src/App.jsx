// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Definimos el router con las banderas futuras y una ruta por defecto
const router = createBrowserRouter(
  [
    // Redirigir raíz ("/") a "/login"
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    // Rutas de autenticación
    {
      path: '/login',
      element: <LoginPage />,
    },
    
    // Rutas protegidas por rol
    {
      path: '/student/*',
      element: (
        <ProtectedRoute role="estudiante" component={<StudentDashboard />} />
      ),
    },
    {
      path: '/teacher/*',
      element: (
        <ProtectedRoute role="profesor" component={<TeacherDashboard />} />
      ),
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Bandera para rutas splat
      v7_skipActionErrorRevalidation: true, // Bandera para revalidación de errores
      v7_startTransition: true, // Bandera para usar startTransition
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
