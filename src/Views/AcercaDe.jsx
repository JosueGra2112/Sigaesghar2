import React from 'react';
import Header from './Header';
import './css/Bitacora.css'
import { Link } from 'react-router-dom';
import regresar from '../IMG/Regresar.webp';

const AcercaDe = () => 
{
    return(
        <>
        <Header />
        <br />
        <Link to="/" className="nav-linkimg" style={{ marginLeft: '10px', marginTop: '10%' }}>
  <img src={regresar} alt="regresar" style={{ maxWidth: '5%' }} />
</Link>
        <h2 style={{ textAlign: 'center' ,color:'black',fontFamily:'sans-serif',fontSize:'30px'}}>Planeacion Estrategica</h2>
          <div className="tarjetas4">
          
            <div className="card4">
              <div className="text">
                <div className="textContent">
                    <h2>Mision</h2>
                    <h4>Ofrecer un servicio educativo que asegure a los alumnos una educación suficiente y de calidad que contribuya como factor estratégico de justicia social que los forme como sujetos competentes, en donde se favorezca el desarrollo de sus habilidades, actitudes y valores, para acceder a mejores condiciones de vida, aprendan a vivir en forma solidaria y democráticamente para que sean capaces de transformar su entorno.</h4>
                    <h2>Vision</h2>    
                    <h4>Formar alumnos de educación secundaria de manera integral, que les permita alcanzar el perfil de egreso, fortaleciendo los aprendizajes, que los incorpora a la vida social, y productiva, ofreciendo una educación laica, gratuita, obligatoria y de calidad de manera eficaz y eficiente.</h4>
                    <h2>Valores</h2>
                    <h4>° Respeto <br />
                        ° Responsabilidad <br />
                        ° Solidaridad <br />
                        ° Honestidad <br />
                        ° Amabilidad <br />
                        ° Lealtad <br />
                        ° Honradez
                    </h4>

                    
                </div>
                
              </div>
            </div>
          </div>
    
         
                
              
          
        </>
    )
}
export default AcercaDe;