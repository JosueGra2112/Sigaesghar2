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




// ... (tu código anterior)

// ... (tu código anterior)

// Función de ejemplo para la lógica de registro (reemplazar con tu propia lógica)
function registrarUsuario(userData, res) {
  const { nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, preguntaSecreta, respuestaSecreta } = userData;

  // Validar si el usuario ya existe
  const verificarUsuarioExistente = 'SELECT * FROM tbluser WHERE user = ?';
  db.query(verificarUsuarioExistente, [user], (errorUser, resultsUser) => {
    if (errorUser) {
      console.error('Error al verificar usuario existente:', errorUser);
      res.status(500).json({ field: 'user', message: 'Error al verificar usuario existente' });
      return;
    }

    if (resultsUser.length > 0) {
      // Usuario ya existe
      res.status(400).json({ field: 'user', message: 'Este usuario ya está registrado' });
    } else {
      // Validar si el número de teléfono ya existe
      const verificarTelefonoExistente = 'SELECT * FROM tbluser WHERE telefono = ?';
      db.query(verificarTelefonoExistente, [telefono], (errorTelefono, resultsTelefono) => {
        if (errorTelefono) {
          console.error('Error al verificar teléfono existente:', errorTelefono);
          res.status(500).json({ field: 'telefono', message: 'Error al verificar teléfono existente' });
          return;
        }

        if (resultsTelefono.length > 0) {
          // Teléfono ya existe
          res.status(400).json({ field: 'telefono', message: 'Este número de teléfono ya está registrado' });
        } else {
          // Validar si el correo electrónico ya existe
          const verificarCorreoExistente = 'SELECT * FROM tbluser WHERE email = ?';
          db.query(verificarCorreoExistente, [correo], (errorCorreo, resultsCorreo) => {
            if (errorCorreo) {
              console.error('Error al verificar correo existente:', errorCorreo);
              res.status(500).json({ field: 'correo', message: 'Error al verificar correo existente' });
              return;
            }

            if (resultsCorreo.length > 0) {
              // Correo electrónico ya existe
              res.status(400).json({ field: 'correo', message: 'Este correo electrónico ya está registrado' });
            } else {
              // Lógica de registro en la base de datos (reemplazar con tu propia lógica)
              const sql = 'INSERT INTO tbluser (nombre, ap_paterno, ap_materno, cargo, telefono, email, user, pass, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            
              db.query(sql, [nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, preguntaSecreta, respuestaSecreta], (err, result) => {
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
      });
    }
  });
}

// ... (tu código posterior)

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


// Ruta para la autenticación
app.post('/Login', (req, res) => {
  const { cargo, username, password } = req.body;

  console.log('Cargo:', cargo);
  console.log('Username:', username);
  console.log('Password:', password);

  // Lógica de autenticación (reemplazar con tu propia lógica)
  const sql = 'SELECT * FROM tbluser WHERE cargo = ? AND user = ? AND pass = ?';

  // Verifica que los datos lleguen correctamente
  console.log('Cargo:', cargo);
  console.log('Username:', username);
  console.log('Password:', password);

  // Agrega un manejo adecuado de errores en la consulta SQL
  db.query(sql, [cargo, username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ success: false, message: 'Error al autenticar usuario' });
    }

    if (results.length > 0) {
      // Autenticación exitosa
      res.status(200).json({ success: true, message: 'Autenticación exitosa' });
    } else {
      // Autenticación fallida
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
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
  const sql = 'SELECT * FROM tbluser WHERE user = ? AND pregunta = ? AND respuesta = ?';

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
  // Realiza una consulta simple para obtener las preguntas secretas
  db.query('SELECT DISTINCT pregunta FROM tbluser', (err, results) => {
    if (err) {
      console.error('Error al obtener preguntas secretas:', err);
      res.status(500).json({ success: false, message: 'Error al obtener preguntas secretas' });
    } else {
      const preguntas = results.map(result => result.pregunta);
      res.json({ success: true, preguntas });
    }
  });
});



// Escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
