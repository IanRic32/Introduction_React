import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Perfil</h1>
        <Link to="/">
          <button style={{ padding: "5px 10px" }}>Volver al inicio</button>
        </Link>
      </header>
      
      <main>
        {user && (
          <div style={{ marginTop: "20px" }}>
            <h2>Información del usuario</h2>
            <p><strong>Nombre de usuario:</strong> {user.username}</p>
            <p><strong>Miembro desde:</strong> {new Date().toLocaleDateString()}</p>
            
            <div style={{ marginTop: "20px" }}>
              <h3>Mis tweets</h3>
              <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                <p>Mi primer tweet</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;