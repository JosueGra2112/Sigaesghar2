import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Registro.css';
import Header from './Header';
import Loginim from '../IMG/Login.png';


const Registro = () => {
  const navigate = useNavigate();

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
  
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);



  const cargos = ['Directivos', 'Administrativo', 'Docente', 'Secretario'];
  const preguntas = ['¿Cuál es tu comida favorita?', '¿Cuál es tu color favorito?', '¿Cómo se llamaba tu primera mascota?', '¿Cómo se llama tu cantante favorito?'];

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
        return false;
      }
   // Validar que el nombre y apellidos solo contengan letras
   const regexLetras = /^[a-zA-Z\s]+$/;
   if (!regexLetras.test(nombre) || !regexLetras.test(apellidoPaterno) || !regexLetras.test(apellidoMaterno)) {
     alert('El nombre y apellidos solo pueden contener letras');
     return false;
   }

   // Validar que se haya seleccionado un cargo
   if (!cargos.includes(cargo)) {
     alert('Seleccione un cargo válido');
     return false;
   }

   // Validar que el teléfono solo contenga números
   const regexNumeros = /^[0-9]+$/;
   if (!regexNumeros.test(telefono)) {
     alert('El teléfono solo puede contener números');
     return false;
   }

   // Validar formato de correo electrónico
   const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!regexCorreo.test(correo)) {
     alert('Ingrese un correo electrónico válido');
     return false;
   }

   const valuser = /^[a-zA-Z0-9]+$/;
   if (!valuser.test(user)) {
     alert('USUARIO NO VALIDO');
     return false;
   }

   // Validar la contraseña
   if (contrasena.length < 8 || !/[A-Z]/.test(contrasena) || !/\d/.test(contrasena)) {
     alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
     return false;
   }

   // Validar que las contraseñas coincidan
   if (contrasena !== confirmarContrasena) {
     alert('Las contraseñas no coinciden');
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
      };

      console.log('Los datos proporcionados son los siguientes', userData);

      fetch('http://localhost:3001/Registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      })
        .then(response => response.json())
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
            // Manejar mensajes específicos para casos de duplicados
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
            alert(`Error 400: ${data.message}`);
          }
        })
        
        .catch(error => {
          console.error('Error al realizar la solicitud:', error);
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
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
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
                type={mostrarContrasena ? "text" : "password"}
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setMostrarContrasena(!mostrarContrasena)}
              >
                Mostrar
              </button>
            </div>
            </div>

            <div className="input-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <div className="password-input">
              <input
                type={mostrarConfirmarContrasena ? 'text' : 'password'}
                id="confirmarContrasena"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
              >
                Mostrar
              </button>
            </div>
          </div>

        </div>
   
        <div className="section">
  <div className="input-group">
    <label htmlFor="preguntaSecreta">Pregunta Secreta</label>
    <select id="preguntaSecreta" value={preguntaSecreta} onChange={(e) => setPreguntaSecreta(e.target.value)}>
      <option value="">Seleccione una pregunta</option>
      {preguntas.map((c, index) => (
        <option key={index} value={c}>
          {c}
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

  {/* Div para centrar elementos */}
  
  <div className="centered-section">
    <label htmlFor="respuestaSecreta">¿Ya tienes Cuenta?</label>
    <p className="login-link"><Link to="/Login">Inicia Sesión</Link></p>
  </div>
</div>

  
        <br />
        <button type="button" className="registro-button" onClick={handleRegistro}>
          Registrarse
        </button>
  
        <div>
          <div>
            <br />
          </div>
          <span className="error-message">{errorMessages.nombre}</span>
        </div>
  
        <br />
        <br />
        {registroExitoso && <div className="mensaje-exitoso">Validando datos....</div>}
        
        

      </div>
  
      <div className="espacio-aviso"></div>

    </div>
  </div>
  );
};

export default Registro;