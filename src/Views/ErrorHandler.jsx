import React, { useState, useEffect } from 'react';

const ErrorHandler = ({ children }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Manejar errores globales aquí
    const handleError = (event) => {
      // Verificar si el evento es una instancia de ErrorEvent
      if (event instanceof ErrorEvent) {
        // Puedes agregar lógica adicional según tus necesidades
        console.error('Error de red:', event.message);
        setError('Error de red. Por favor, intenta de nuevo más tarde.');
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  // También podrías manejar errores de red utilizando el evento 'offline'
  useEffect(() => {
    const handleOffline = () => {
      setError('500: No hay respuesta del servidor. Por favor, verifica tu conexión.');
      alert('Error 500');
    };

    const handleOnline = () => {
      setError(null);
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div>
      {error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ErrorHandler;
