import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../styles/index.css'; // Importamos los estilos

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Controlar si estamos en login o registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

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

      if (response.status === 200) {
        setSuccessMessage('Inicio de sesión exitoso');
        localStorage.setItem('user', JSON.stringify(response.data));

        // Redirige según el rol
        if (response.data.role === 'profesor') {
          navigate('/teacher');
        } else if (response.data.role === 'estudiante') {
          navigate('/student');
        }
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error en el servidor');
      } else if (error.request) {
        setErrorMessage('Error al conectar con el servidor. Inténtalo más tarde.');
      } else {
        setErrorMessage('Error al realizar la solicitud.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !name) {
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://backend-school-9ipd.onrender.com/users', {
        name,
        email,
        password,
        role: 'estudiante', // Cambia este rol según el tipo de usuario
      });

      if (response.status === 201) {
        setSuccessMessage('Registro exitoso');
        // Aquí puedes redirigir o mostrar algo más
        // navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error en el servidor');
      } else if (error.request) {
        setErrorMessage('Error al conectar con el servidor. Inténtalo más tarde.');
      } else {
        setErrorMessage('Error al realizar la solicitud.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{isLogin ? 'Iniciar Sesión' : 'Registrar Cuenta'}</h1>

        {/* Si es registro, mostramos el campo de nombre */}
        {!isLogin && (
          <div>
            <input
              type="text"
              placeholder="Nombre Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        
        <div>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={isLogin ? handleLogin : handleRegister} disabled={isLoading}>
          {isLoading ? (isLogin ? 'Iniciando sesión...' : 'Registrando...') : (isLogin ? 'Iniciar sesión' : 'Registrar')}
        </button>

        <div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </div>

        <div className="toggle-auth">
          <p>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
