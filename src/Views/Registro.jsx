import React, { useState, useRef, useEffect } from 'react'; // Agrega useEffect aquí
import { Link, useNavigate } from 'react-router-dom';
import './css/alerts.css'
import './css/Registro.css';
import Header from './Header';
import Loginim from '../IMG/Login.png';
import ReCAPTCHA from "react-google-recaptcha";
import politicasPDF from './PDF/Politicas_de_privacidad.pdf'; 

const Registro = () => {
  const navigate = useNavigate();

  const [politicasAceptadas, setPoliticasAceptadas] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [user, setuser] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [captchaCompletado, setCaptchaCompletado] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [preguntasSecretas, setPreguntasSecretas] = useState([]);
  

  const captcha = useRef(null);

  useEffect(() => {
    console.log('Obteniendo preguntas secretas...');
    fetch('http://localhost/WebServices/preguntas.php')

    //preguntas
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Preguntas secretas obtenidas:', data.preguntas);
          setPreguntasSecretas(data.preguntas); // Cambia setPreguntaSecreta por setPreguntasSecretas
        } else {
          console.error('Error al obtener preguntas secretas:', data.message);
        }
      })
      .catch(error => {
        console.error('Error al obtener preguntas secretas:', error);
      });
  }, []);
  

  const onChange = () => {
    if (captcha.current && captcha.current.getValue()) {
      console.log('Captcha completado');
      setCaptchaCompletado(true);
    }
  }

  const abrirPDFPoliticas = () => {
    window.open(politicasPDF, '_blank'); // Abrir el PDF en una nueva pestaña
    // Alternativamente, puedes redireccionar a la URL del PDF
    // window.location.href = politicasPDF;
  };

  const cargos = ['Directivos', 'Administrativo', 'Docente', 'Secretario'];

  const [errorMessages, setErrorMessages] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    cargo: '',
    telefono: '',
    correo: '',
    user: '',
    contrasena: '',
    confirmarContrasena: '',
    preguntaSecreta: '',
    respuestaSecreta: '',
  });


  const handleRegistro = () => {
    const validarFormulario = () => {
      setErrorMessages({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        cargo: '',
        telefono: '',
        correo: '',
        user: '',
        contrasena: '',
        confirmarContrasena: '',
        preguntaSecreta: '',
        respuestaSecreta: '',
      });
  
      if (!nombre || !apellidoPaterno || !apellidoMaterno || !cargo || !telefono || !correo || !user || !contrasena || !confirmarContrasena || !preguntaSecreta || !respuestaSecreta) {
        setErrorMessages({
          ...errorMessages,
          nombre: 'Todos los campos son obligatorios',
        });
        setAlertMessage('Todos los campos son obligatorios');
        setShowAlert(true);
        return false;
      }
  
      if (!captchaCompletado) {
        setAlertMessage('Por favor, complete el captcha');
        setShowAlert(true);
        return false;
      }
  
      const regexLetras = /^[a-zA-Z\s]+$/;
      if (!regexLetras.test(nombre) || !regexLetras.test(apellidoPaterno) || !regexLetras.test(apellidoMaterno)) {
        setAlertMessage('El nombre y apellidos solo pueden contener letras');
        setShowAlert(true);
        return false;
      }
  
      if (!cargos.includes(cargo)) {
        setAlertMessage('Seleccione un cargo válido');
        setShowAlert(true);
        return false;
      }
  
      const regexNumeros = /^[0-9]+$/;
      if (!regexNumeros.test(telefono)) {
        setAlertMessage('El teléfono solo puede contener números');
        setShowAlert(true);
        return false;
      }
  
      const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexCorreo.test(correo)) {
        setAlertMessage('Ingrese un correo electrónico válido');
        setShowAlert(true);
        return false;
      }
  
      const valuser = /^[a-zA-Z0-9]+$/;
      if (!valuser.test(user)) {
        setAlertMessage('USUARIO NO VALIDO');
        setShowAlert(true);
        return false;
      }
  
      if (contrasena.length < 8 || !/[A-Z]/.test(contrasena) || !/\d/.test(contrasena)) {
        setAlertMessage('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
        setShowAlert(true);
        return false;
      }
  
      if (contrasena !== confirmarContrasena) {
        setAlertMessage('Las contraseñas no coinciden');
        setShowAlert(true);
        return false;
      }
  
      if (!politicasAceptadas) {
        setAlertMessage('Por favor, acepta las políticas del sitio web.');
        setShowAlert(true);
        return false;
      }
  
      return true;
    };

    if (validarFormulario()) {
      const userData = {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        cargo,
        telefono,
        correo,
        user,
        contrasena,
        preguntaSecreta,
        respuestaSecreta,
        aceptoPoliticas: 'ACEPTO', // Agregar el campo para indicar que se aceptan las políticas
      };

      console.log('Los datos proporcionados son los siguientes', userData);

      fetch('http://localhost/WebServices/registro.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.message === 'Registro exitoso') {
          setRegistroExitoso(true);
          setTimeout(() => {
            console.log('Registro exitoso. Redirigiendo a /Login');
            alert('Registro exitoso. Por favor, inicie sesión.');
            navigate(`/Login?registroExitoso=true`);
          }, 2000);
        } else if (data.message === 'Usuario ya existe' || data.message === 'Teléfono ya registrado' || data.message === 'Correo ya registrado') {
          setErrorMessages({
            ...errorMessages,
            [data.field]: data.message,
          });
          alert(data.message);
        } else {
          console.log('Error 400:', data.message);
          setErrorMessages({
            ...errorMessages,
            [data.field]: data.message,
          });
          setAlertMessage(`Error 400: ${data.message}`);
          setShowAlert(true);
        }
      })
      .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        setAlertMessage('Error al realizar la solicitud al servidor.');
        setShowAlert(true);
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="registro-container">
        <div className="form-container">

          <center><h2>Registro</h2></center>
          <center><img src={Loginim} alt="Loginim" className="logo" style={{ alignItems: 'center', maxWidth: '5%' }} /></center>
          {/* Sección 1 */}
          <div className="section">
            <div className="input-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" required id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>


            <div className="input-group">
              <label htmlFor="apellidoPaterno">Apellido Paterno</label>
              <input type="text" id="apellidoPaterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
              <span className="error-message">{errorMessages.apellidoPaterno}</span>
            </div>


            <div className="input-group">
              <label htmlFor="apellidoMaterno">Apellido Materno</label>
              <input type="text" id="apellidoMaterno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
              <span className="error-message">{errorMessages.apellidoMaterno}</span>
            </div>

          </div>

          {/* Sección 2 */}
          <div className="section">
            <div className="input-group">
              <label htmlFor="correo">Correo Electrónico</label>
              <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="cargo">Cargo</label>
              <select id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                <option value="">Seleccione un cargo</option>
                {cargos.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="error-message">{errorMessages.cargo}</span>
            </div>


          </div>

          {/* Sección 3 */}
          <div className="section">
            <div className="input-group">
              <label htmlFor="user">Crear Usuario</label>
              <input type="text" id="user" value={user} onChange={(e) => setuser(e.target.value)} />
            </div>

            <div className="input-group">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="password-input">
                <input
                  type={mostrarContrasena ? "pass" : "password"}
                  id="contrasena"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <div className="password-input">
                <input
                  type={mostrarContrasena ? 'pass' : 'password'}
                  id="confirmarContrasena"
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                >
                  Mostrar
                </button>
              </div>
            </div>

          </div>

          <div className="section">
            <div className="input-group">
              <label htmlFor="preguntaSecreta">Pregunta Secreta</label>

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


              <span className="error-message">{errorMessages.preguntaSecreta}</span>
            </div>

<div className="input-group">
              <label htmlFor="respuestaSecreta">Respuesta Secreta</label>
              <input type="text" id="respuestaSecreta" value={respuestaSecreta} onChange={(e) => setRespuestaSecreta(e.target.value)} />
              <span className="error-message">{errorMessages.respuestaSecreta}</span>
            </div>

          
            <div className="centered-section">
              <label htmlFor="respuestaSecreta">¿Ya tienes Cuenta?</label>
              <p className="login-link">
                <Link to="/Login"
                  className="nav-linkLog"
                  style={{ transition: 'text-shadow 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.textShadow = '0 0 10px rgba(0, 0, 0, 0.9)'}
                  onMouseLeave={(e) => e.target.style.textShadow = 'none'}
                > 
                  Inicia Sesión</Link>



                </p>
            </div>

            <div className="input-group">
  <div className="terminos-container">
    <input
      type="radio"
      id="acepto"
      name="acepto"
      value="ACEPTO"
      required
      onChange={(e) => setPoliticasAceptadas(e.target.value === "ACEPTO")}
    />
    <label htmlFor="acepto" className="acepto-politicas-label">
      <center><span className="acepto-text">Acepto </span></center>
<center>      <a
        href={politicasPDF}
        target="_blank"
        rel="noopener noreferrer"
        className="politicas-link"
        onClick={(e) => { e.stopPropagation(); abrirPDFPoliticas(); }}
      >Politicas de Privacidad
      </a></center>
    </label>
  </div>
</div>



          </div>

          <ReCAPTCHA
            ref={captcha}
            sitekey="6LdhvmwpAAAAAJYW5MoEkVuJEXq9VljgAzzXa4Tp"
            onChange={onChange}
          />

          <br />
          <button type="button" className="registro-button" onClick={handleRegistro}>
            Registrarse
          </button>

          <div>
            <div>
              <br />
            </div>
            
          </div>

          <br />
          <br />
          {registroExitoso && <div className="mensaje-exitoso">Validando datos....</div>}

        </div>
        {showAlert && (
  <div className="alert-overlay">
    <div className="alert-container">
      <div className="alert-content">
        <span className="close-button" onClick={() => setShowAlert(false)}>&times;</span>
        <center><h3>Alerta</h3></center>
        <p>{alertMessage}</p>
      </div>
    </div>
  </div>
)}

        <div className="espacio-aviso"></div>
      </div>
    </div>
  );
};

export default Registro;