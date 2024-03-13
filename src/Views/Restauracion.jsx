import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import './css/alerts.css'
import './css/Restauracion.css';

const Restauracion = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [preguntasSecretas, setPreguntasSecretas] = useState([]);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    console.log('Obteniendo preguntas secretas...');
    fetch('http://localhost/WebServices/preguntas.php')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Preguntas secretas obtenidas:', data.preguntas);
          setPreguntasSecretas(data.preguntas);
        } else {
          console.error('Error al obtener preguntas secretas:', data.message);
        }
      })
      .catch(error => {
        console.error('Error al obtener preguntas secretas:', error);
      });
  }, []);

  const handleRestauracion = () => {
    if (!usuario || !contrasenaNueva || !confirmarContrasena || !preguntaSecreta || !respuestaSecreta) {
      setAlertMessage('Todos los campos son obligatorios');
      setShowAlert(true);
      return;
    }

    if (contrasenaNueva !== confirmarContrasena) {
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      return;
    }

    fetch('http://localhost/WebServices/VerificarRespuestaSecreta.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, preguntaSecreta, respuestaSecreta }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          fetch('http://localhost/WebServices/ActualizarContrasena.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contrasenaNueva }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                setAlertMessage('La contraseña se ha actualizado correctamente');
                setShowAlert(true);
                alert('La contraseña se ha actualizado correctamente');
                navigate(`/Login`);
              } else {
                setAlertMessage('Error al actualizar la contraseña');
                setShowAlert(true);
              }
            })
            .catch(error => {
              console.error('Error al actualizar la contraseña:', error);
              setAlertMessage('Error al actualizar la contraseña');
              setShowAlert(true);
            });
        } else {
          setAlertMessage('Lo siento, no ha respondido correctamente a la pregunta secreta');
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.error('Error al verificar respuesta secreta:', error);
        setAlertMessage('Error al verificar respuesta secreta');
        setShowAlert(true);
      });
  };

  return (
    <div>
      <Header />
      <div className="registro-container">
        <div className="registro-box">
          <h2>Restauración de Contraseña</h2>
          <form>
            <div className="input-group">
              <label htmlFor="usuario">Usuario</label>
              <input type="text" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="contrasenaNueva">Contraseña Nueva</label>
              <div className="password-input">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  id="contrasenaNueva"
                  value={contrasenaNueva}
                  onChange={(e) => setContrasenaNueva(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <div className="password-input">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  id="confirmarContrasena"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="preguntaSecreta">Seleccione su Pregunta Secreta</label>
            
            
              <select
  id="preguntaSecreta"
  value={preguntaSecreta}
  onChange={(e) => setPreguntaSecreta(e.target.value)}
>
  <option value="">Seleccione una pregunta</option>
  {preguntasSecretas.map((pregunta) => (
    <option key={pregunta.idpregunta} value={pregunta.idpregunta}>
      {pregunta.pregunta}
    </option>
  ))}
</select>

            </div>

            <div className="input-group">
              <label htmlFor="respuestaSecreta">Respuesta Secreta</label>
              <input type="text" id="respuestaSecreta" value={respuestaSecreta} onChange={(e) => setRespuestaSecreta(e.target.value)} />
            </div>

            <button type="button" className="restauracion-button" onClick={handleRestauracion}>
              Cambiar Contraseña
            </button>
          </form>
<p className="login-link">Cambiar contraseña con correo electronico</p>
<p className="login-link"><Link to="/Rest">Recuperar</Link></p>

          <p className="login-link">¿Recuerdas tu contraseña? 
          <Link to="/Login"
            className="nav-linkLog"
            style={{ transition: 'text-shadow 0.3s ease' }}
            onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.9)'}
            onMouseLeave={(e) => e.target.style.textShadow = 'none'}
          > Inicia Sesión</Link></p>
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

export default Restauracion;
