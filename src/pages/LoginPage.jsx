import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://backend-school-9ipd.onrender.com/auth/login', {
        email,
        password,
      });

      // Si la solicitud es exitosa, maneja la respuesta
      if (response.status === 200) {
        setSuccessMessage('Inicio de sesión exitoso');
        // Redirigir según el rol o hacer algo más
        // localStorage.setItem('user', JSON.stringify(response.data));
        console.log('Usuario autenticado:', response.data);
      }
    } catch (error) {
      // Manejo de errores
      if (error.response) {
        // Error específico del servidor
        setErrorMessage(error.response.data.message || 'Error en el servidor');
      } else if (error.request) {
        // Error de red o CORS
        setErrorMessage('Error al conectar con el servidor. Inténtalo más tarde.');
      } else {
        // Otro tipo de error
        setErrorMessage('Error al realizar la solicitud.');
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
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default LoginPage;
