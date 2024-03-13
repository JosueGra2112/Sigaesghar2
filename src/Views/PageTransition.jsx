// PageTransition.jsx
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './css/PageTransition.css'; // Importa el archivo CSS para las animaciones

const PageTransition = ({ children }) => {
  return (
    <CSSTransition
      in={true} // Indica que la transición está activa
      appear={true} // Indica que la transición debe aplicarse en la primera renderización
      timeout={500} // Duración de la transición en milisegundos
      classNames="fade" // Clase CSS para las animaciones
    >
      {children}
    </CSSTransition>
  );
};

export default PageTransition;
