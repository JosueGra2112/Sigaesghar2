// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import MenuAd from './Views/Repo/MenuAd'; // Añade esta línea
import Expedientes from './Views/Repo/TBL/expedientes';
import ErrorHandler from './Views/ErrorHandler';
import Breadcrumbs from './Views/Breadcrumbs'; // Agrega esta línea

import IMG404 from './IMG/404.png';

const NotFound = () => (
  <div>
    <center>
    <Header />
      <h2>¡Ooops!</h2>
      <h1>¡Error 404!</h1>
      <h3>La página que estás buscando no se encuentra en el servidor.</h3>
      {<img src={IMG404} alt="Error 404" style={{ maxWidth: '100%', height: 'auto' }} />}
    </center>
  </div>
);

const App = () => {
  return (
    <body>
      <Router>
      <ErrorHandler>
      <Breadcrumbs />
      <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Restauracion" element={<Restauracion />} />
          <Route path="/Bitacoras" element={<Bitacoras />} />
          <Route path="/Boletin" element={<Boletin />} />
          <Route path="/Calendario" element={<Calendario />} />
          <Route path="/AcercaDe" element={<AcercaDe />} />
          <Route path="/sesion" element={<Sesion />} />
          <Route path="/sesionAd" element={<SesionAd />} />
          <Route path="/TablaExp" element={<TableExp />} />
          <Route path="/MenuAd" element={<MenuAd />} /> 
          <Route path="/expedientes" element={<Expedientes />} />
    

          
          {/* Ruta para manejar errores 404 */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <Footer />
        </ErrorHandler>
      </Router>
    </body>
  );
};

export default App;
