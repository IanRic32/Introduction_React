import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div>
      <h2>Error 404 - Página no encontrada</h2>
      <p>La página que estás buscando no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;