import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../styles/index.css'; // Importamos los estilos

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Controla si estamos en login o registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar el login aqui
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu correo y contraseña.');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      console.log('Intentando iniciar sesión con:', { email, password });
  
      const response = await axios.post('https://backend-school-9ipd.onrender.com/auth/login', {
        email,
        password,
      });
  
      // Verifica que la respuesta contenga los datos esperados
      if (response && response.data && response.data.access_token) {
        console.log('Respuesta del servidor:', response.data);
        const { access_token } = response.data;
  
        console.log('Token recibido:', access_token);
  
        // Decodificar el token para obtener el rol
        const decodedToken = JSON.parse(atob(access_token.split('.')[1]));
        console.log('Token decodificado:', decodedToken);
  
        const role = decodedToken.role; // Extraer el rol del token decodificado
        console.log('Rol recibido:', role);
  
        // Guardar el usuario (token y rol) completo en localStorage
        localStorage.setItem('user', JSON.stringify({
          access_token,
          role,
        }));
  
        setSuccessMessage('Inicio de sesión exitoso');
  
        // Añadir un console.log antes de la redirección
        console.log('Redirigiendo a la ruta correspondiente según el rol:', role);
  
        // Redirigir según el rol
        if (role === 'profesor') {
          console.log('Redirigiendo a /teacher');
          navigate('/teacher'); // Redirige al dashboard del profesor
        } else if (role === 'estudiante') {
          console.log('Redirigiendo a /student');
          navigate('/student'); // Redirige al dashboard del estudiante
        } else {
          console.log('Rol no reconocido:', role);
          setErrorMessage('Rol no reconocido.');
        }
      } else {
        setErrorMessage('Respuesta del servidor no válida');
      }
    } catch (error) {
      console.log('Error durante el login:', error);
  
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error en el servidor');
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor');
      } else {
        setErrorMessage('Error al realizar la solicitud');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  


  // Función para manejar el registro
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
        // Redirigir a la página de login después de un registro exitoso
        setTimeout(() => {
          navigate('/login'); // Redirige a login
        }, 1000);
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
