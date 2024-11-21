// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/student/*"
          element={<ProtectedRoute role="estudiante" component={<StudentDashboard />} />}
        />
        <Route
          path="/teacher/*"
          element={<ProtectedRoute role="profesor" component={<TeacherDashboard />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
