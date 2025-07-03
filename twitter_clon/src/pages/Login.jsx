import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }
    onLogin(username);
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button 
          type="submit"
          style={{ width: "100%", padding: "8px", backgroundColor: "#1DA1F2", color: "white", border: "none" }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;