// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import esgharImage from '../IMG/ESGHAR.png';
import esgharNAME from '../IMG/ESGHARNAME.png';
import './css/Header.css';

const Header = () => {
  return (
    <header className="header">
      {/* Encabezado */}
      <div className="logo-container">
        <img src={esgharImage} alt="Esghar" className="logo" />
        <img src={esgharNAME} alt="esgharNAME" style={{ maxWidth:'20%'}} />
      </div>
      <div className="nav-links combo-box">
        {/* Enlaces de navegación */}

            <Link to="/Login" className="nav-link">Cerrar Sesion</Link>

            <br />

      </div>
    </header>
  );
};

export default Header;
