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

// Función de ejemplo para la lógica de registro (reemplazar con tu propia lógica)
function registrarUsuario(userData, callback) {
  const { nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, preguntaSecreta, respuestaSecreta } = userData;

  // Lógica de registro en la base de datos (reemplazar con tu propia lógica)
  // Si el registro es exitoso, llama a callback con null; de lo contrario, llama a callback con un objeto de error
  const sql = 'INSERT INTO tbluser (nombre, ap_paterno, ap_materno, cargo, telefono, email, user, pass, pregunta, respuesta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [nombre, apellidoPaterno, apellidoMaterno, cargo, telefono, correo, user, contrasena, preguntaSecreta, respuestaSecreta], (err, result) => {
    if (err) {
      console.error('Error al realizar el registro:', err);
      callback(err);
    } else {
      console.log('Registro exitoso:', result);
      callback(null);
    }
  });
}

app.post('/Registro', (req, res) => {
  console.log('Cuerpo de la solicitud:', req.body);
  try {
    const userData = req.body;

    registrarUsuario(userData, (error) => {
      if (error) {
        console.error('Error al realizar el registro:', error);
        res.status(500).json({ message: 'Error al registrar usuario' });
      } else {
        res.status(200).json({ message: 'Registro exitoso' });
      }
    });
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


// Escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
