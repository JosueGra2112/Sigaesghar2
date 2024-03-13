// Importar el módulo Nodemailer
const nodemailer = require('nodemailer');

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia esto según tu proveedor de correo electrónico
  auth: {
    user: '20211306@uthh.edu.mx', // Tu dirección de correo electrónico
    pass: 'Chicles2112', // Tu contraseña de correo electrónico
  },
});

// Definir la función para enviar el correo electrónico de restablecimiento
const sendResetEmail = async (email, token) => {
  try {
    // Configurar opciones de correo electrónico
    const mailOptions = {
      from: '20211306@uthh.edu.mx', // Remitente
      to: email, // Destinatario
      subject: 'Restablecimiento de Contraseña', // Asunto
      text: `Utiliza este token para restablecer tu contraseña: ${token}`, // Cuerpo del correo electrónico
    };

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico de restablecimiento enviado correctamente');
    return true;
  } catch (error) {
    console.error('Error al enviar el correo electrónico de restablecimiento:', error);
    return false;
  }
};

// Exportar la función de envío de correo electrónico de restablecimiento
module.exports = sendResetEmail;
