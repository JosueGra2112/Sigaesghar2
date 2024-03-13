import React from 'react';
import './css/ProgressBar.css'; // Archivo CSS para estilos de la barra de progreso
import useScrollHandler from './useScrollHandler'; // Importa el hook useScrollHandler

const ProgressBar = () => {
  const progress = useScrollHandler(); // Usa el hook useScrollHandler para obtener el progreso de desplazamiento

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
