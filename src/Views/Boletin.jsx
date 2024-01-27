import React from 'react';

import actividades from '../IMG/Imagen8.png';
import './css/Bitacora.css'
import regresar from '../IMG/Regresar.webp';
import Header from './Header';
import Festividades  from '../IMG/papel-picado.png';
import { Link } from "react-router-dom";

const Bitacoras = () => 
{
    return(
        <>
        <Header />
        <br />
        <Link to="/" className="nav-linkimg" style={{ marginLeft: '10px', marginTop: '10%' }}>
  <img src={regresar} alt="regresar" style={{ maxWidth: '5%' }} />
</Link>
        <h2 style={{ textAlign: 'center' ,color:'black',fontFamily:'sans-serif',fontSize:'30px'}}>Boletin</h2>
          <div className="tarjetas4">
          
            <div className="card4">
              <img src={actividades} alt="Imagen 1" />
              <div className="text">
                <div className="textContent">
                    <h2>Eventos</h2>
                    <h3>
                        <h3>
                       Clausura
                        </h3>
                    evento de graduacion de los alumnos
                    <p>
                        Horario:
                        </p>
                    </h3>
                    
                </div>
                
              </div>
            </div>
          </div>
    
          <div className="card3">
              <img src={Festividades} alt="Imagen 1" />
              <div className="text">
                <div className="textContent">
                <h2>Festividades</h2>
                    <h3>
                        <h3>
                        Día de la semana
                        </h3>
                        
                        *Celebracion:
                        dia del maestro,
                        dia del estudiante
                        xantolo
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