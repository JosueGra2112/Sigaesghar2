// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './Views/Inicio';
import Header from './Views/Header';
import Footer from './Views/Footer';
import Breadcrumbs from './Views/Breadcrumbs'; // Agrega esta línea
// ... (otras importaciones)

const App = () => {
  return (
    <body>
      <Router>
        <ErrorHandler>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Login" element={<Login />} />
            {/* ... (otras rutas) */}
            <Route path="/MenuAd" element={<MenuAd />} />
            <Route path="/expedientes" element={<Expedientes />} />
            {/* Agrega las migas de pan a las secciones que las necesiten */}
            <Route
              path="/expedientes/*"
              element={
                <>
                  <Header />
                  
                </>
              }
            />
            {/* ... (otras rutas) */}
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
