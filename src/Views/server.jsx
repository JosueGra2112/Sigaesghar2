const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3001; // Puedes cambiar el puerto según tus necesidades

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // o el origen de tu aplicación React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Habilitar el intercambio de cookies
  optionsSuccessStatus: 204,
};


app.use(cors(corsOptions));

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sigaprueba',
});

// Conéctate a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para comprobar la conexión
app.get('/testdb', (req, res) => {
  // Realiza una consulta simple para verificar la conexión
  db.query('SELECT * FROM tbluser', (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.status(500).send('Error al acceder a la base de datos');
    } else {
      res.json(results);
    }
  });
});




function registrarUsuario(userData, res) {
  const { nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, preguntaSecreta, respuestaSecreta, aceptoPoliticas } = userData;

  // Verificar si se aceptaron las políticas
  if (aceptoPoliticas !== "ACEPTO") {
    res.status(400).json({ message: 'Debes aceptar las políticas del sitio web para registrarte' });
    return;
  }

  // Obtener el ID de la pregunta secreta seleccionada
  const obtenerIdPregunta = 'SELECT idPregunta FROM tblpreguntas WHERE idPregunta = ?'; // Cambiar 'pregunta' por 'idPregunta'
  db.query(obtenerIdPregunta, [preguntaSecreta], (errorPregunta, resultsPregunta) => {
    if (errorPregunta) {
      console.error('Error al obtener ID de pregunta secreta:', errorPregunta);
      res.status(500).json({ message: 'Error al obtener ID de pregunta secreta' });
      return;
    }

    if (resultsPregunta.length === 0) {
      // La pregunta secreta seleccionada no existe en la base de datos
      res.status(400).json({ field: 'preguntaSecreta', message: 'La pregunta secreta seleccionada no es válida' });
    } else {
      const idPregunta = resultsPregunta[0].idPregunta;

      // Validar si el usuario ya existe, verificar teléfono y correo

      // Registra el nuevo usuario
      const sql = 'INSERT INTO tbluser (nombre, ap_paterno, ap_materno, cargo, telefono, email, user, pass, idPre, respuesta, politicas, act) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)';
      db.query(sql, [nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, idPregunta, respuestaSecreta, aceptoPoliticas], (err, result) => {
        if (err) {
          console.error('Error al realizar el registro:', err);
          res.status(500).json({ message: 'Error al realizar el registro' });
        } else {
          console.log('Registro exitoso:', result);
          res.status(200).json({ message: 'Registro exitoso' });
        }
      });
    }
  });
}


// Ruta para el registro de usuarios
app.post('/Registro', (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  try {
    const userData = req.body;

    registrarUsuario(userData, res);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



app.post('/Login', (req, res) => {
  const { cargo, username, password } = req.body;

  // Lógica de autenticación (reemplazar con tu propia lógica)
  const sql = 'SELECT * FROM tbluser WHERE cargo = ? AND user = ? AND pass = ?';
  
  db.query(sql, [cargo, username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ success: false, message: 'Error al autenticar usuario' });
    }

    if (results.length > 0) {
      const user = results[0];
      if (user.act === 0) {
        return res.status(401).json({ success: false, message: 'Su cuenta aún no está activada. Por favor, póngase en contacto con el administrador para activar su cuenta.' });
      } else {
        // Autenticación exitosa
        return res.status(200).json({ success: true, message: 'Autenticación exitosa' });
      }
    } else {
      // Autenticación fallida
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});







app.get('/expedientes', (req, res) => {
  // Realiza una consulta simple para obtener los datos de tblexpedientes
  db.query('SELECT * FROM tblexpedientes', (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta de expedientes:', err);
      res.status(500).send('Error al obtener datos de expedientes');
    } else {
      res.json(results);
    }
  });
});

// ... (código anterior)




// Ruta para verificar la respuesta secreta
app.post('/VerificarRespuestaSecreta', (req, res) => {
  const { usuario, preguntaSecreta, respuestaSecreta } = req.body;

  // Lógica para verificar la respuesta secreta en la base de datos
  const sql = 'SELECT * FROM tbluser WHERE user = ? AND idPre = ? AND respuesta = ?';

  db.query(sql, [usuario, preguntaSecreta, respuestaSecreta], (err, results) => {
    if (err) {
      console.error('Error al verificar respuesta secreta:', err);
      res.status(500).json({ success: false, message: 'Error al verificar respuesta secreta' });
    } else {
      if (results.length > 0) {
        // Respuesta secreta correcta
        res.status(200).json({ success: true, message: 'Respuesta secreta correcta' });
      } else {
        // Respuesta secreta incorrecta
        res.status(401).json({ success: false, message: 'Respuesta secreta incorrecta' });
      }
    }
  });
});






// ... (código anterior)

// Ruta para actualizar la contraseña después de verificar la respuesta secreta
app.post('/ActualizarContrasena', (req, res) => {
  const { usuario, contrasenaNueva } = req.body;

  // Lógica para actualizar la contraseña en la base de datos
  const sql = 'UPDATE tbluser SET pass = ? WHERE user = ?';

  db.query(sql, [contrasenaNueva, usuario], (err, results) => {
    if (err) {
      console.error('Error al actualizar la contraseña:', err);
      res.status(500).json({ success: false, message: 'Error al actualizar la contraseña', error: err.message });
    } else {
      if (results.affectedRows > 0) {
        // Se actualizó al menos una fila (contraseña actualizada con éxito)
        res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
      } else {
        // No se actualizó ninguna fila (el usuario no existe, por ejemplo)
        res.status(404).json({ success: false, message: 'Usuario no encontrado para la actualización de contraseña' });
      }
    }
  });
});




app.get('/PreguntasSecretas', (req, res) => {
  // Realiza una consulta simple para obtener las preguntas secretas de la tabla tblpreguntas
  db.query('SELECT `idpregunta`, pregunta FROM tblpreguntas', (err, results) => {
    if (err) {
      console.error('Error al obtener preguntas secretas:', err);
      res.status(500).json({ success: false, message: 'Error al obtener preguntas secretas' });
    } else {
      res.json({ success: true, preguntas: results });
    }
  });
});







// Escucha en el puerto especificado

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
