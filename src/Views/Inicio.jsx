// src/Views/Inicio.jsx
import React from 'react';
import '../index.css'; // Importa tu archivo de estilos


import Header from './Header';

import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';
import BIEN from '../IMG/BIEN.png';

import calendarioImage from '../IMG/calendario.png';
import bitacoraImage from '../IMG/bitacora.png';
import boletinImage from '../IMG/boletin.png';


const Inicio = () => {

  const botones = [
    {
      titulo: 'Calendario',
      imagen: calendarioImage,
      descripcion: 'Calendario de todos los meses de actividad en la institución',
      link: '/Calendario', // Agrega la ruta de destino
    },
    {
      titulo: 'Bitácora',
      imagen: bitacoraImage,
      descripcion: 'Actividades que se realizan al día en la institución',
      link: '/Bitacoras',
    },
    {
      titulo: 'Boletín',
      imagen: boletinImage,
      descripcion: 'Festividades de la institución, actividades escolares',
      link: '/Boletin',
    },
  ];

  return (



    <div className="Inicio">
      {/* Contenido de la página de inicio */}
      <Header />

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


      {/* Botones con imágenes y descripciones */}
      <main className="App-main" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {botones.map((boton, index) => (
          <a href={boton.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="noticia" style={{ border: '1px solid #ccc', borderRadius: '3px', padding: '10px', margin: '10px', textAlign: 'center', maxWidth: '300px' }}>
              <h2>{boton.titulo}</h2>
              <img src={boton.imagen} alt={boton.titulo} style={{ maxWidth: '20%', marginBottom: '10px' }} />
              <p>{boton.descripcion}</p>
            </div>
          </a>
        ))}
      </main>

      {/* Pie de página */}
     
    </div>

  );
};

export default Inicio;
