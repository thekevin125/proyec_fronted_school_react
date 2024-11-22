// src/pages/teacher/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [newGrade, setNewGrade] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener la lista de estudiantes
    axios
      .get('https://backend-school-9ipd.onrender.com/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleGradeSubmit = (e) => {
    e.preventDefault();

    if (!newGrade || !selectedStudent) {
      alert('Por favor selecciona un estudiante y asigna una nota.');
      return;
    }

    // Aquí se enviaría la nueva nota al backend para el estudiante seleccionado
    axios
      .post('https://backend-school-9ipd.onrender.com/grades', {
        studentId: selectedStudent,
        grade: newGrade,
      })
      .then((response) => {
        alert('Nota agregada exitosamente');
        setNewGrade('');
        setSelectedStudent(null);
      })
      .catch((error) => {
        console.error('Error al agregar nota:', error);
      });
  };

  return (
    <div>
      <h1>Bienvenido, Profesor</h1>
      <p>Este es tu panel para gestionar estudiantes, agregar notas y más.</p>

      <h2>Lista de Estudiantes</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.nombre} ({student.email})
            <button onClick={() => setSelectedStudent(student._id)}>
              Seleccionar para agregar nota
            </button>
          </li>
        ))}
      </ul>

      {selectedStudent && (
        <div>
          <h3>Agregar Nota para Estudiante</h3>
          <form onSubmit={handleGradeSubmit}>
            <label>
              Nota:
              <input
                type="number"
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                placeholder="Introduce la nota"
              />
            </label>
            <button type="submit">Agregar Nota</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
