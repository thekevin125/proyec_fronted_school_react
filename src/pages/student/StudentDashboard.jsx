import React, { useState } from 'react';
import axios from 'axios';

function StudentDashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grado: '',
    telefono: '',
    direccion: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-school-9ipd.onrender.com/students', formData);
      setSuccessMessage('¡Registro exitoso! Ahora puedes ver tus notas.');
      setFormData({
        name: '',
        email: '',
        grado: '',
        telefono: '',
        direccion: ''
      });
    } catch (error) {
      setErrorMessage('Hubo un error al registrar tus datos. Intenta nuevamente.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2>Registro de Estudiante</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Grado:</label>
            <input
              type="text"
              name="grado"
              value={formData.grado}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>Registrar</button>
        </form>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
      </div>
      <div style={styles.content}>
        <h1>Bienvenido, Estudiante</h1>
        <p>Este es tu panel donde puedes ver tus notas, tareas y más.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    padding: '20px',
  },
  sidebar: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginRight: '20px',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    marginTop: '10px',
  }
};

export default StudentDashboard;
