import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('https://backend-school-9ipd.onrender.com/auth/login', {
        email,
        password,
      });

      const { data } = response;

      localStorage.setItem('user', JSON.stringify(data));

      const userRole = data.role.toLowerCase();
      if (userRole === 'profesor') {
        navigate('/teacher');
      } else if (userRole === 'estudiante') {
        navigate('/student');
      } else {
        console.warn('Rol no reconocido:', userRole);
        setErrorMessage(`Rol no reconocido: ${userRole}. Contacta al administrador.`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Credenciales incorrectas');
      } else {
        setErrorMessage('Error al conectar con el servidor. Inténtalo más tarde.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default LoginPage;
