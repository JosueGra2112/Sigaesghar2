// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Helmet } from 'react-helmet';
import Inicio from './Views/Inicio';
import Header from './Views/Header';
import Footer from './Views/Footer';
import Login from './Views/Login';
import Registro from './Views/Registro';
import Restauracion from './Views/Restauracion';
import Bitacoras from './Views/Bitacoras';
import Boletin from './Views/Boletin';
import Calendario from './Views/Calendarios';
import AcercaDe from './Views/AcercaDe';
import Sesion from './Views/sesion';
import SesionAd from './Views/sesionAd';
import TableExp from './Views/TablaExp';
import MenuAd from './Views/Repo/MenuAd';
import Expedientes from './Views/Repo/TBL/expedientes';
import ErrorHandler from './Views/ErrorHandler';
import PageTransition from './Views/PageTransition'; // Importa el componente de transición
import Rest from './Views/ResetPasswordForm';
import IMG404 from './IMG/404.png';

const NotFound = () => (
  <div>
    <center>
      <Header />
      <h2>¡Ooops!</h2>
      <h1>¡Error 404!</h1>
      <h3>La página que estás buscando no se encuentra en el servidor.</h3>
      <img src={IMG404} alt="Error 404" style={{ maxWidth: '100%', height: 'auto' }} />
    </center>
  </div>
);

const App = () => {
  console.log("CSP activo");

  return (
    <body>
      <Router>
        <Helmet>
        
        <meta http-equiv="Content-Security-Policy" content="
    default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; 
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' https://www.google.com https://www.gstatic.com data:;
    font-src 'self'; 
    connect-src 'self' https://sigaemail.host8b.me/ https://sigaemail.host8b.me/correo.php http://localhost/WebServices/registro.php http://localhost/WebServices/preguntas.php http://localhost/WebServices/logeo.php http://localhost/WebServices/VerificarRespuestaSecreta.php http://localhost/WebServices/ActualizarContrasena.php http://localhost/WebServices/correo.php;

    frame-src 'self' https://www.google.com;" />



        </Helmet>
        <ErrorHandler>
        <TransitionGroup>
        <CSSTransition key={window.location.key} classNames="fade" timeout={300}>
          <Routes>
            <Route path="/" element={<PageTransition><Inicio /></PageTransition>} />
            <Route path="/Login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/Registro" element={<PageTransition><Registro /></PageTransition>} />
            <Route path="/Restauracion" element={<PageTransition><Restauracion /></PageTransition>} />
            <Route path="/Bitacoras" element={<PageTransition><Bitacoras /></PageTransition>} />
            <Route path="/Boletin" element={<PageTransition><Boletin /></PageTransition>} />
            <Route path="/Calendario" element={<PageTransition><Calendario /></PageTransition>} />
            <Route path="/AcercaDe" element={<PageTransition><AcercaDe /></PageTransition>} />
            <Route path="/sesion" element={<PageTransition><Sesion /></PageTransition>} />
            <Route path="/sesionAd" element={<PageTransition><SesionAd /></PageTransition>} />
            <Route path="/TablaExp" element={<PageTransition><TableExp /></PageTransition>} />
            <Route path="/Rest" element={<PageTransition><Rest /></PageTransition>} />
            <Route path="/MenuAd" element={<PageTransition><MenuAd /></PageTransition>} /> 
            <Route path="/expedientes" element={<PageTransition><Expedientes /></PageTransition>} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          </CSSTransition>
      </TransitionGroup>
          <Footer />
        </ErrorHandler>
      </Router>
    </body>
  );
};

export default App;

