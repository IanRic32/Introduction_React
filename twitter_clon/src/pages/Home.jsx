import { Link } from "react-router-dom";

const Home = ({ user, logout }) => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Twitter Clone</h1>
        {user ? (
          <div>
            <span style={{ marginRight: "10px" }}>Hola, {user.username}!</span>
            <button 
              onClick={logout}
              style={{ marginRight: "10px", padding: "5px 10px" }}
            >
              Cerrar sesión
            </button>
            <Link to="/profile">
              <button style={{ padding: "5px 10px" }}>Perfil</button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button style={{ padding: "5px 10px" }}>Iniciar sesión</button>
          </Link>
        )}
      </header>
      
      <main>
        <h2>Timeline</h2>
        {/* Aquí irían los tweets */}
        <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <p>Este es un tweet de ejemplo</p>
        </div>
      </main>
    </div>
  );
};

export default Home;