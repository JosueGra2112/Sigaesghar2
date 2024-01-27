// src/Views/Inicio.jsx
import React from 'react';
import '../index.css'; // Importa tu archivo de estilos


import Header from './HeaderSe';

import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';
import BIEN from '../IMG/BIEN.png';
import Menu from './Repo/Menu';


const Inicio = () => {

  return (



    <div className="Inicio">
      {/* Contenido de la página de inicio */}
      <Header />
      <Menu />
<center><h1>Inicio de sesion activo</h1></center>
      {/* Cuerpo */}
      <main className="App-main" style={{ display: 'flex', alignItems: 'center' }}>
  <img src={lup} alt="Lup" style={{alignItems:'center', maxWidth:'30%',marginLeft:'50px' , marginRight: '50px' }} />
  <div>
    
    <center><img src={BIEN} alt="BIEN" style={{ maxWidth:'30%'}} /></center>
    <br />
      <img src={SIGATEXT} alt="SIGATEXT" style={{ maxWidth:'90%',marginLeft:'50px' , marginRight: '50px'}} />
      <br />
      <br />
      <center><img src={SIGA} alt="SIGA" style={{ maxWidth:'10%'}} /></center>
  </div>
</main>
     
    </div>

  );
};

export default Inicio;
