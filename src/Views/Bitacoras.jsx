import React from 'react';

import actividades from '../IMG/calendarioLog.png';
import sinergia  from '../IMG/sinergia.png';

import { Link } from "react-router-dom";
import regresar from '../IMG/Regresar.webp';
import Header from './Header';
const Bitacoras = () => 
{
    return(
        <>
        <Header />
        <br />
        <Link to="/" className="nav-linkimg" style={{ marginLeft: '10px', marginTop: '10%' }}>
  <img src={regresar} alt="regresar" style={{ maxWidth: '5%' }} />
</Link>
        <h2 style={{ textAlign: 'center' ,color:'black',fontFamily:'sans-serif',fontSize:'30px'}}>Bitacoras</h2>
          <div className="tarjetas3">
          
            <div className="card3">
              <img src={actividades} alt="Imagen 1" />
              <div className="text">
                <div className="textContent">
                    <h2>Actividades del Docentes</h2>
                    <h3>
                        <h3>
                        Día de la semana
                        </h3>
                      
                        *Materias: Matemáticas,Ciencias,geografia
                    <p>
                        Horario:
                        </p>
                    </h3>
                    
                </div>
                
              </div>
            </div>
          </div>
    
          <div className="card3">
              <img src={sinergia} alt="Imagen 1" />
              <div className="text">
                <div className="textContent">
                <h2>Actividades directivas</h2>
                    <h3>
                        <h3>
                        Día de la semana
                        </h3>
                        *Materias:
                        Matemáticas,
                        Ciencias naturales
                       <p>
                        Horario:
                        </p>
                    </h3>
                    
                </div>
                
              </div>
            </div>

          
        </>
    )
}
export default Bitacoras;