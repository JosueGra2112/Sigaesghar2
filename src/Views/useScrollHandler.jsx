import { useState, useEffect } from 'react';

const useScrollHandler = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.clientHeight;
      const yOffset = window.pageYOffset;

      const scrolled = yOffset;
      const totalHeight = fullHeight - windowHeight;
      const progress = Math.min((scrolled / totalHeight) * 100, 100);

      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);

    // Limpia el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
};

export default useScrollHandler;
