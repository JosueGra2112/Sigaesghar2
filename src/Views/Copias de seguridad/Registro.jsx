import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Registro.css';
import Header from './Header';
import Loginim from '../IMG/Login.png';

const Registro = () => {
  const navigate = useNavigate();  // Agregado 'useNavigate'

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

  // Aquí puedes agregar tus opciones de cargos
  const cargos = ['Directivos', 'Administrativo', 'Docente', 'Secretario'];

  const preguntas = ['¿cual es tu comida favorita?', '¿cual es tu color favorito?', '¿como se llamaba tu primera mascota?', '¿como se llama tu cancante favorito?'];

  const handleRegistro = () => {
  const validarFormulario = () => {

    
    // Validar que todos los campos estén completos
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !cargo || !telefono || !correo || !user || !contrasena || !confirmarContrasena || !preguntaSecreta || !respuestaSecreta) {
      alert('Todos los campos son obligatorios');
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
    console.log('Los datos Proporcionados son los siguientes', userData);

    // Realizar solicitud al servidor para registro
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
            navigate(`/Login?registroExitoso=true`);
          }, 2000); // Espera 2 segundos antes de redirigir
        } else {
          console.log('Error en el registro:', data.message);
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

        <br />
        <div className="registro-box">
          <form>
            <img src={Loginim} alt="Loginim" className="logo" style={{ alignItems: 'center', maxWidth: '30%' }} />
            <h2>Registro</h2>
        
          <div className="input-group">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="apellidoPaterno">Apellido Paterno</label>
            <input type="text" id="apellidoPaterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="apellidoMaterno">Apellido Materno</label>
            <input type="text" id="apellidoMaterno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="cargo">Cargo</label>
            <select id="cargo" value={cargo} onChange={(e) => setCargo(e.target.value)}>
              <option value="">Seleccione un cargo</option>
              {cargos.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="telefono">Teléfono</label>
            <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="user">Crear Usuario</label>
            <input type="user" id="user" value={user} onChange={(e) => setuser(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="preguntaSecreta">Pregunta Secreta</label>
            <select id="preguntaSecreta" value={preguntaSecreta} onChange={(e) => setPreguntaSecreta(e.target.value)}>
              <option value="">Seleccione una pregunta</option>
              {preguntas.map((c, index) => (
                <option key={index} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="respuestaSecreta">Respuesta Secreta</label>
            <input type="text" id="respuestaSecreta" value={respuestaSecreta} onChange={(e) => setRespuestaSecreta(e.target.value)} />
          </div>

          <button type="button" className="registro-button" onClick={handleRegistro}>
            Registrarse
          </button>
          <br />
<br />
          {registroExitoso && <div className="mensaje-exitoso">Validando datos....</div>}
          <br />
        </form>

        <p className="login-link">¿Ya tienes una cuenta? <Link to="/Login">Inicia Sesión</Link></p>
      </div>
      <div className="espacio-aviso"></div>
    </div>
    </div>
  );
};

export default Registro;