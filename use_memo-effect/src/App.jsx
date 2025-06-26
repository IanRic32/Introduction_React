import React, { useState, useEffect, useMemo } from 'react';

function App() {
  const [tareas, setTareas] = useState(
    ()=> {
      const saved = localStorage.getItem("tareas");
      return saved ? JSON.parse(saved) : [];    });

  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtro, setFiltro] = useState('');
  const [busqueda, setBusqueda] = useState('');
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    document.title = `Tareas (${calcularTiempoTotal} minutos)`;}, [tareas]);
  //Calculo del tiempo total de las tareas
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total,tarea) => total + tarea.duracion, 0)}, [tareas]);


  const tareasFiltradas = useMemo(() => {
    return tareas.filter(tarea => {
      const cumpleFiltro = filtro === 'todas' || 
                          (filtro === 'cortas' && tarea.duracion <= 30) || 
                          (filtro === 'largas' && tarea.duracion > 30);
      
      const cumpleBusqueda = tarea.nombre.toLowerCase().includes(busqueda.toLowerCase());
      
      return cumpleFiltro && cumpleBusqueda;
    });
  }, [tareas, filtro, busqueda]);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (nuevaTarea.trim() && duracion && !isNaN(duracion)) {
      const nuevaTareaObj = {
        id: Date.now(),
        nombre: nuevaTarea.trim(),
        duracion: parseInt(duracion),
        fecha: new Date().toISOString(),
        completada: false
      };
      
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? {...tarea, completada: !tarea.completada} : tarea
    ));
  };

  return (
    <div className="app-container">
      <h1>⏱️ Gestor de Tareas</h1>
      
      <form onSubmit={agregarTarea} className="formulario-tarea">
        <div className="input-group">
          <input 
            type="text" 
            value={nuevaTarea} 
            onChange={(e) => setNuevaTarea(e.target.value)} 
            placeholder="Nombre de la tarea" 
            required
          />
          <input 
            type="number" 
            value={duracion} 
            onChange={(e) => setDuracion(e.target.value)} 
            placeholder="Duración (min)" 
            min="1"
            required
          />
          <button type="submit">➕ Agregar</button>
        </div>
      </form>

      <div className="filtros">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="🔍 Buscar tareas..."
        />
        
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todas">Todas las tareas</option>
          <option value="cortas">Tareas cortas (≤ 30 min)</option>
          <option value="largas">Tareas largas ({">"} 30 min)</option>
        </select>
      </div>

      <div className="estadisticas">
        <p>
          <span>Tareas: {tareas.length}</span> | 
          <span> Completadas: {tareas.filter(t => t.completada).length}</span> | 
          <span> Total tiempo: {calcularTiempoTotal} min</span>
        </p>
      </div>

      <ul className="lista-tareas">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((tarea) => (
            <li key={tarea.id} className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
              <div className="tarea-info">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => toggleCompletada(tarea.id)}
                />
                <span className="tarea-nombre">{tarea.nombre}</span>
                <span className="tarea-duracion">{tarea.duracion} min</span>
                <span className="tarea-fecha">
                  {new Date(tarea.fecha).toLocaleDateString()}
                </span>
              </div>
              <button 
                onClick={() => eliminarTarea(tarea.id)}
                className="eliminar-btn"
              >
                🗑️
              </button>
            </li>
          ))
        ) : (
          <p className="sin-tareas">No hay tareas que coincidan con los filtros</p>
        )}
      </ul>
      <style jsx>{`
      .app-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      h1 {
          color: #2c3e50;
          text-align: center;
        }
        
        .formulario-tarea {
          margin-bottom: 20px;
        }
        
        .input-group {
          display: flex;
          gap: 10px;
        }
        
        .input-group input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .input-group button {
          padding: 10px 20px;
          background-color: #27ae60;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .input-group button:hover {
          background-color: #2ecc71;
        }
        
        .filtros {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .filtros input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .filtros select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
          min-width: 200px;
        }
        
        .estadisticas {
          background-color: #f0f7ff;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
          text-align: center;
        }
        
        .estadisticas p {
          margin: 0;
          color: #3498db;
        }
        
        .estadisticas span {
          margin: 0 10px;
        }
        
        .lista-tareas {
          list-style: none;
          padding: 0;
        }
        
        .tarea-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background-color: white;
          border-radius: 4px;
          margin-bottom: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .tarea-item.completada {
          opacity: 0.7;
          background-color: #f5f5f5;
        }
        
        .tarea-item.completada .tarea-nombre {
          text-decoration: line-through;
          color: #7f8c8d;
        }
        
        .tarea-info {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-grow: 1;
        }
        
        .tarea-nombre {
          flex-grow: 1;
        }
        
        .tarea-duracion {
          background-color: #e3f2fd;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 14px;
          color: #1976d2;
        }
        
        .tarea-fecha {
          font-size: 12px;
          color: #95a5a6;
        }
        
        .eliminar-btn {
          background: none;
          border: none;
          color: #e74c3c;
          cursor: pointer;
          font-size: 16px;
          padding: 5px;
        }
        
        .sin-tareas {
          text-align: center;
          padding: 20px;
          color: #95a5a6;
        }
      `}</style>
</div>);
}
export default App;