import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Login.css';
import './css/alerts.css'
import Loginim from '../IMG/Login.png';
import Header from './Header';

const Login = () => {
  const [cargo, setCargo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('registroExitoso') === 'true') {
      setRegistroExitoso(true);
    }
  }, [location.search]);

  const showNotification = (message, type = 'error') => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleLogin = () => {
    if (!cargo || !username || !password) {
      setFormError('Todos los campos deben estar llenos.');
      showNotification('Todos los campos deben estar llenos.');
      return;
    }

    setFormError(null);
    setErrorLogin(false);

    fetch('http://localhost/WebServices/logeo.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cargo, username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          if (cargo === 'Docente' || cargo === 'Secretario' || cargo === 'Directivos') {
            navigate('/sesion');
          } else if (cargo === 'Administrativo') {
            navigate('/sesionAd');
          } else {
            setErrorLogin(false); // Limpiamos el estado de errorLogin
            showNotification('Autenticación exitosa');
          }
        } else {
          setErrorLogin(true);
          if (data.message === 'Su cuenta aún no está activada. Por favor, póngase en contacto con el administrador para activar su cuenta.') {
            // Mostrar mensaje específico para cuenta no activada
            showNotification('Su cuenta aún no está activada. Por favor, póngase en contacto con el administrador para activar su cuenta.');
          } else {
            // Mostrar mensaje genérico de error de autenticación
            showNotification('Error de autenticación. Por favor, verifica tus credenciales.');
          }
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud de autenticación:', error);
        showNotification('Error al realizar la solicitud de autenticación.');
      });
    
  };

  return (
    <div>
      <Header />
      <br />
      <center>
        {registroExitoso && (
          <div className="mensaje-exitoso">Bienvenido</div>
        )}
      </center>
      <div className="login-container">
        <div className="login-box">
          <img src={Loginim} alt="Loginim" className="logo" style={{ alignItems: 'center', maxWidth: '30%' }} />
          <h2>Iniciar Sesión</h2>

          <form>
            <div className="input-group">
              <label htmlFor="cargo">Seleccionar Cargo</label>
              <select
                id="cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                <option value="Directivos">Directivos</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Docente">Docente</option>
                <option value="Secretario">Secretario</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            {formError && <p className="error-message"></p>}
            {errorLogin && <p className="error-message"></p>}

            <button type="button" className="login-button" onClick={handleLogin}>
              Acceder
            </button>
          </form>

          <p className="register-link">¿No tienes cuenta?</p>
          <Link 
  to="/Registro" 
  className="nav-linkLog"
  style={{ transition: 'text-shadow 0.3s ease' }}
  onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.9)'}
  onMouseLeave={(e) => e.target.style.textShadow = 'none'}
>
  Registrarse
</Link>

          <p className="register-link">¿Olvidaste tu contraseña?</p>
          <Link 
  to="/Restauracion" 
  className="nav-linkLog"
  style={{ transition: 'text-shadow 0.3s ease' }}
  onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.5)'}
  onMouseLeave={(e) => e.target.style.textShadow = 'none'}
>
  Restaurar
</Link>



        </div>
      </div>
      {showAlert && (
        <div className="alert-overlay">
          <div className="alert-container">
            <div className="alert-content">
              <span className="close-button" onClick={() => setShowAlert(false)}>&times;</span>
              <p>{alertMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
