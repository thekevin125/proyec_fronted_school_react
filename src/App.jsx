import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Definimos el router con las rutas principales
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navigate to="/login" />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
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
    {
      path: '*',
      element: <Navigate to="/login" />,
    },
  ]
);

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
    }
  }, []);

  // Devuelve el RouterProvider que maneja las rutas
  return <RouterProvider router={router} />;
}

export default App;
