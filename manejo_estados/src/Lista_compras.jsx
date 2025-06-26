import { useState } from "react";

function ListaCompras() {// Definir el estado para la lista de compras
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState("");

  // Función para agregar un nuevo producto a la lista
    const agregarProducto = () => {
        if (nuevoProducto.trim() !== "") {
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto("");
    }
};

  // Función para eliminar un producto de la lista
const eliminarProducto = (index) => {
    const nuevaLista = productos.filter((_, i) => i !== index);
    setProductos(nuevaLista);
};

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <h1 style={{ color: 'white' }}>Lista de Compras 🛒</h1>
      <div style={{ display: 'flex', marginBottom: '10px', flexDirection: 'row' }}>
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          style={{ flex: 1, padding: '8px', marginRight: '8px' }}
          placeholder="Escribe un producto"
        />
        <button 
          onClick={agregarProducto}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Agregar
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {productos.map((producto, index) => (
          <li 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '8px',
              margin: '4px 0',
              backgroundColor: '#f5f5f5',
              color: 'black',
              borderRadius: '4px'
            }}
          >
            <span>{producto}</span>
            <button 
              onClick={() => eliminarProducto(index)}
              style={{ 
                padding: '4px 8px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaCompras;