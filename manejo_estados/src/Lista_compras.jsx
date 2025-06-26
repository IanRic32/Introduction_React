import { useState, useEffect } from "react";

function ListaCompras() {
  const [productos, setProductos] = useState(() => {
    // Cargar productos desde localStorage al iniciar
    const saved = localStorage.getItem("lista-compras");
    return saved ? JSON.parse(saved) : [];
  });
  const [nuevoProducto, setNuevoProducto] = useState("");
  const [categoria, setCategoria] = useState("general");
  const [busqueda, setBusqueda] = useState("");

  // Persistir datos en localStorage
  useEffect(() => {
    localStorage.setItem("lista-compras", JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      const nuevoItem = {
        id: Date.now(),
        nombre: nuevoProducto,
        categoria,
        completado: false,
        fecha: new Date().toLocaleDateString()
      };
      setProductos([...productos, nuevoItem]);
      setNuevoProducto("");
    }
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(item => item.id !== id));
  };

  const toggleCompletado = (id) => {
    setProductos(productos.map(item => 
      item.id === id ? {...item, completado: !item.completado} : item
    ));
  };

  const productosFiltrados = productos.filter(item =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const categoriasUnicas = [...new Set(productos.map(item => item.categoria))];

  return (
    <div className="lista-compras-container">
      <h2>🛒 Lista de Compras Inteligente</h2>
      
      <div className="controles-superiores">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar productos..."
          className="busqueda-input"
        />
      </div>

      <div className="agregar-producto">
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          placeholder="✏️ Escribe un producto"
          className="producto-input"
          onKeyPress={(e) => e.key === 'Enter' && agregarProducto()}
        />
        
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="categoria-select"
        >
          <option value="general">General</option>
          <option value="frutas">Frutas</option>
          <option value="verduras">Verduras</option>
          <option value="carnes">Carnes</option>
          <option value="lacteos">Lácteos</option>
          <option value="limpieza">Limpieza</option>
          {categoriasUnicas.map(cat => (
            !['general', 'frutas', 'verduras', 'carnes', 'lacteos', 'limpieza'].includes(cat) && (
              <option key={cat} value={cat}>{cat}</option>
            )
          ))}
        </select>
        
        <button onClick={agregarProducto} className="agregar-btn">
          ➕ Agregar
        </button>
      </div>

      <div className="estadisticas">
        <p>Total: {productos.length} | Pendientes: {productos.filter(p => !p.completado).length}</p>
      </div>

      <ul className="lista-productos">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((item) => (
            <li 
              key={item.id} 
              className={`producto-item ${item.completado ? 'completado' : ''}`}
            >
              <div className="producto-info">
                <input
                  type="checkbox"
                  checked={item.completado}
                  onChange={() => toggleCompletado(item.id)}
                  className="completado-checkbox"
                />
                <span className="producto-nombre">
                  {item.nombre} 
                  <span className="producto-categoria">{item.categoria}</span>
                  <span className="producto-fecha">{item.fecha}</span>
                </span>
              </div>
              <button 
                onClick={() => eliminarProducto(item.id)}
                className="eliminar-btn"
              >
                🗑️
              </button>
            </li>
          ))
        ) : (
          <p className="lista-vacia">No hay productos en tu lista</p>
        )}
      </ul>

      <style jsx>{`
        .lista-compras-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        h2 {
          color:black;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .controles-superiores {
          margin-bottom: 15px;
        }
        
        .busqueda-input, .producto-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .agregar-producto {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .categoria-select {
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          min-width: 120px;
        }
        
        .agregar-btn {
          padding: 10px 15px;
          background-color: #27ae60;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .agregar-btn:hover {
          background-color: #2ecc71;
        }
        
        .estadisticas {
          background-color: #e8f4fc;
          padding: 8px;
          border-radius: 4px;
          margin-bottom: 15px;
          text-align: center;
          font-size: 14px;
          color: #3498db;
        }
        
        .lista-productos {
          list-style: none;
          padding: 0;
        }
        
        .producto-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background-color: white;
          border-radius: 4px;
          margin-bottom: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          color: black;
        }
        
        .producto-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .producto-item.completado {
          opacity: 0.7;
          background-color: #f0f0f0;
        }
        
        .producto-info {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-grow: 1;
        }
        
        .completado-checkbox {
          cursor: pointer;
        }
        
        .producto-nombre {
          flex-grow: 1;
          text-decoration: none;
        }
        
        .producto-item.completado .producto-nombre {
          text-decoration: line-through;
          color: #7f8c8d;
        }
        
        .producto-categoria {
          display: inline-block;
          margin-left: 10px;
          padding: 2px 8px;
          background-color: #e0f7fa;
          border-radius: 10px;
          font-size: 12px;
          color: #00838f;
        }
        
        .producto-fecha {
          display: block;
          font-size: 11px;
          color: #95a5a6;
          margin-top: 3px;
        }
        
        .eliminar-btn {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 16px;
          padding: 5px;
        }
        
        .eliminar-btn:hover {
          color: #c0392b;
        }
        
        .lista-vacia {
          text-align: center;
          color: #95a5a6;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default ListaCompras;