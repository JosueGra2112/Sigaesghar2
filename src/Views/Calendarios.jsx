import React from 'react';
import calen from '../IMG/Imagen5.png';
import { Link } from "react-router-dom";
import regresar from '../IMG/Regresar.webp';
import Header from './Header';

import './css/Calendario.css'

const Calendarios = () => {
  return (
    <>
    <Header />
    <br />
    <Link to="/" className="nav-linkimg" style={{ marginLeft: '10px', marginTop: '10%' }}>
  <img src={regresar} alt="regresar" style={{ maxWidth: '5%' }} />
</Link>

      <h1 style={{ textAlign: 'center' ,color:'black',fontFamily:'sans-serif',fontSize:'30px'}}>Calendarios escolares</h1>
      <div className="calendario">
        <div className="cal">
          <img src={calen} alt="Imagen 1" />
        </div>
      
      </div>
   
      
    </>
  );
};

export default Calendarios;
