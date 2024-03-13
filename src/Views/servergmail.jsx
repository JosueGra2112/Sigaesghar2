const express = require('express');
const cors = require('cors');
const router = express.Router();
const sendResetEmail = require('./sendResetEmail.jsx');

const app = express();
const PORT = 3002;

app.use(express.json());

// Configura CORS para permitir solicitudes solo desde http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/send-reset-email', (req, res) => {
  const { email, token } = req.body;

  sendResetEmail(email, token)
    .then(success => {
      if (success) {
        res.json({ success: true, message: 'Correo de recuperación enviado correctamente' });
      } else {
        res.status(500).json({ success: false, message: 'Error al enviar el correo de recuperación' });
      }
    })
    .catch(error => {
      console.error('Error al enviar el correo electrónico de restablecimiento:', error);
      res.status(500).json({ success: false, message: 'Error interno del servidor' });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor de correo electrónico escuchando en el puerto ${PORT}`);
});

module.exports = app;
