// src/Views/Repo/MenuAd.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

const MenuAd = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
      <li><Link to="../sesionAd">Inicio</Link></li>  
        <li><Link to="../TablaExp">Expedientes</Link></li>
        <li><Link to="/bitacora">Bitacora</Link></li>
        <li><Link to="/alumnos">Perfiles</Link></li>
      </ul>
    </div>
  );
};

export default MenuAd;
