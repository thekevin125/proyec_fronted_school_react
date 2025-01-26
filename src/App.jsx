import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddNotes from './pages/teacher/AddNotes';
import Students from './pages/teacher/Students';

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
        <ProtectedRoute expectedRole="estudiante">
          <StudentDashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: '/teacher/*',
      element: (
        <ProtectedRoute expectedRole="profesor">
          <TeacherDashboard />
        </ProtectedRoute>
      ),
      children: [
        { path: 'home', element: <h1>Bienvenido Profesor</h1> },
        { path: 'add-notes', element: <AddNotes /> },
        { path: 'students', element: <Students /> },
      ],
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

  return <RouterProvider router={router} />;
}

export default App;
