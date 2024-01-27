// src/Restauracion.jsx
import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

import './css/Restauracion.css'; // Asegúrate de crear este archivo CSS para los estilos de la restauración

const Restauracion = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenaNueva, setContrasenaNueva] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [preguntaSecreta, setPreguntaSecreta] = useState('');
  const [respuestaSecreta, setRespuestaSecreta] = useState('');
  const [preguntasSecretas, setPreguntasSecretas] = useState([]); // Agrega este estado
  const navigate = useNavigate();
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  
  
  useEffect(() => {
    console.log('Obteniendo preguntas secretas...');
    fetch('http://localhost:3001/PreguntasSecretas')
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
    // Verificar que todos los campos estén completos
    if (!usuario || !contrasenaNueva || !confirmarContrasena || !preguntaSecreta || !respuestaSecreta) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validar que las contraseñas coincidan
    if (contrasenaNueva !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Realizar solicitud al servidor para verificar la respuesta secreta
    fetch('http://localhost:3001/VerificarRespuestaSecreta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, preguntaSecreta, respuestaSecreta }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Respuesta secreta correcta, proceder con la actualización de la contraseña
          // Realizar solicitud al servidor para actualizar la contraseña
          fetch('http://localhost:3001/ActualizarContrasena', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contrasenaNueva }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                // Contraseña actualizada con éxito
                alert('La contraseña se ha actualizado correctamente');
                navigate(`/Login`);
              } else {
                // Error al actualizar la contraseña
                alert('Error al actualizar la contraseña');
              }
            })
            .catch(error => {
              console.error('Error al actualizar la contraseña:', error);
              alert('Error al actualizar la contraseña');
            });
        } else {
          // Respuesta secreta incorrecta
          alert('Lo siento, no ha respondido correctamente a la pregunta secreta');
        }
      })
      .catch(error => {
        console.error('Error al verificar respuesta secreta:', error);
        alert('Error al verificar respuesta secreta');
      });
  };

  return (
  
    <div>
        <Header />
        <div className="registro-container">

        
        <br />
        <br />
      <div className="registro-box">
        <h2>Restauración de Contraseña</h2>
        <br />
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

              </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
            
            <div className="password-input">
                <input
                  type={mostrarContrasena ? "text" : "password"}
                  id="contrasenaNueva"
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

          <div className="input-group">
  <label htmlFor="preguntaSecreta">Seleccione su Pregunta Secreta</label>
  <select id="preguntaSecreta" value={preguntaSecreta} onChange={(e) => setPreguntaSecreta(e.target.value)}>
    <option value="">Seleccione una pregunta</option>
    {preguntasSecretas.map((pregunta, index) => (
      <option key={index} value={pregunta}>{pregunta}</option>
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

        <p className="login-link">¿Recuerdas tu contraseña? <Link to="/Login">Inicia Sesión</Link></p>
        <br />
        <div className="espacio-aviso"></div>
        </div>
      </div>
    </div>
    
    
  );
};

export default Restauracion;
