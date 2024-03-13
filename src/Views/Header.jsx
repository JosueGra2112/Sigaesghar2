import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import esgharImage from '../IMG/ESGHAR.png';
import esgharNAME from '../IMG/ESGHARNAME.png';
import './css/Header.css';
import ProgressBar from './ProgressBar';

const Header = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const yOffset = window.pageYOffset;

      const scrolled = yOffset;
      const totalHeight = document.documentElement.scrollHeight - windowHeight;
      const calculatedProgress = Math.min((scrolled / totalHeight) * 100, 100);

      setProgress(calculatedProgress);
    };

    const handleResize = () => {
      // Recalculate the position of ProgressBar when window size changes
      const headerHeight = document.querySelector('.header').offsetHeight;
      setProgressBarPosition(headerHeight);
    };

    const setProgressBarPosition = (headerHeight) => {
      const progressBarTop = headerHeight + -1; // Adjust as needed
      document.getElementById('progressBar').style.top = `${progressBarTop}px`;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Calculate initial ProgressBar position
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={esgharImage} alt="Esghar" className="logo" />
          <img src={esgharNAME} alt="esgharNAME" style={{ maxWidth: '20%' }} />
        </div>
        
        <nav className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/AcercaDe" className="nav-link">Acerca De</Link>
          <Link to="/Login" className="nav-link">Iniciar Sesión</Link>
        </nav>
      </header>
      <div id="progressBar" style={{ position: 'fixed', width: '100%', zIndex: '1000' }}>
        <ProgressBar progress={progress} />
      </div>
    </>
  );
};

export default Header;
