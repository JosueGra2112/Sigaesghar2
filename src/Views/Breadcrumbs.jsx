// Breadcrumbs.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Lista de rutas donde se mostrarán las migas de pan
  const allowedRoutes = ['/Login', '/Registro', '/Restauracion', '/TablaExp', '/sesionAd', '/sesion'];

  // Verifica si la ruta actual está en la lista permitida y no es la raíz
  const showBreadcrumbs = allowedRoutes.includes(location.pathname) && location.pathname !== '/';

  // Si no se debe mostrar, retorna null
  if (!showBreadcrumbs) {
    return null;
  }

  return (
    <div>
      <Link to="/">Inicio</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}>{name}</span>
        ) : (
          <Link key={name} to={routeTo}>
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
