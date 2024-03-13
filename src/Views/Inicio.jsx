// src/Views/Inicio.jsx
import React from 'react';
import Header from './Header';
import Slider from 'react-slick'; // Importa Slider de react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import lup from '../IMG/pclup.png';
import SIGATEXT from '../IMG/SIGATEXT.png';
import SIGA from '../IMG/SIGA.png';




import IM1 from '../IMGCAR/IM1.jpeg';
import IM2 from '../IMGCAR/IM2.jpg';
import IM3 from '../IMGCAR/IM3.webp';


import calendarioImage from '../IMG/calendario.png';
import bitacoraImage from '../IMG/bitacora.png';
import boletinImage from '../IMG/boletin.png';

const Inicio = () => {
  const botones = [
    {
      titulo: 'Calendario',
      imagen: calendarioImage,
      descripcion: 'Calendario de todos los meses de actividad en la institución',
      link: '/Calendario',
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

  const handleMouseEnter = (index) => {
    const element = document.getElementById(`overlay-${index}`);
    const image = document.getElementById(`image-${index}`);
    if (element && image) {
      element.style.opacity = 1;
      image.style.transform = 'scale(1.1)';
    }
  };

  const handleMouseLeave = (index) => {
    const element = document.getElementById(`overlay-${index}`);
    const image = document.getElementById(`image-${index}`);
    if (element && image) {
      element.style.opacity = 0;
      image.style.transform = 'scale(1)';
    }
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Activar autoplay
    autoplaySpeed: 3000 // Cambiar de imagen cada 7 segundos
  };
  

  return (
    <div className="Inicio">
      <Header />
     
      <main className="App-main" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={lup} alt="Lup" style={{ alignItems: 'center', maxWidth: '30%', marginLeft: '50px', marginRight: '50px' }} />
        <div>
          <center><img src={SIGATEXT} alt="SIGATEXT" style={{ maxWidth: '90%', marginLeft: '50px', marginRight: '50px' }} /></center>
          <br />
          <center><img src={SIGA} alt="SIGA" style={{ maxWidth: '10%' }} /></center>
        </div>
      </main>

<center>
<main className="App-main" style={{ alignItems: 'center' }}>
<h1>Bienvenido</h1>
      </main>
</center>
<center>
<Slider {...settings}>
  {/* Renderiza las imágenes */}
  
  <div style={{ textAlign: 'center' }}>
    <center>
    <img src={SIGATEXT} alt="SIGATEXT" style={{ maxWidth: '50%'}} />
    <img src={lup} alt="lup" style={{ maxWidth: '20%'}} />
    <img src={SIGA} alt="SIGA" style={{ maxWidth: '10%', display: 'inline-block' }} />
    </center>
  </div>
  <div style={{ textAlign: 'center' }}>
    <img src={IM1} alt="IM1" style={{ maxWidth: '50%', marginBottom: '20px', display: 'inline-block' }} />
  </div>
  <div style={{ textAlign: 'center' }}>
    <img src={IM2} alt="IM2" style={{ maxWidth: '50%', marginBottom: '20px', display: 'inline-block' }} />
  </div>
  <div style={{ textAlign: 'center' }}>
    <img src={IM3} alt="IM3" style={{ maxWidth: '50%', marginBottom: '20px', display: 'inline-block' }} />
  </div>
    </Slider>
</center>

      <main className="App-main" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {botones.map((boton, index) => (
          <a href={boton.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
              className="noticia"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={() => window.location.href = boton.link}
              style={{ position: 'relative', overflow: 'hidden', border: '1px solid #ccc', borderRadius: '3px', padding: '10px', margin: '10px', textAlign: 'center', maxWidth: '300px', transition: 'transform 0.3s ease' }}
            >
              <img id={`image-${index}`} src={boton.imagen} alt={boton.titulo} style={{ maxWidth: '40%', marginBottom: '10px', position: 'relative', transition: 'transform 0.3s ease' }} />
              <div className="overlay" id={`overlay-${index}`} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: 'opacity 0.3s ease' }}>
                <h2 style={{ margin: 0 }}>{boton.titulo}</h2>
                <p style={{ margin: 0 }}>{boton.descripcion}</p>
              </div>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
};

export default Inicio;
