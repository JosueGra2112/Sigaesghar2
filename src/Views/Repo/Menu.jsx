// src/Views/MenuInicio.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './css/MenuAd.css'; // Asegúrate de tener un archivo CSS para los estilos del menú

const MenuInicio = () => {
  return (
    <div className="menu-inicio-container">
      <ul className="menu-inicio-list">
        <li><Link to="/dato1">Dato1</Link></li>
        <li><Link to="/dato2">Dato2</Link></li>
        <li><Link to="/dato3">Dato3</Link></li>
      </ul>
    </div>
  );
};

export default MenuInicio;
