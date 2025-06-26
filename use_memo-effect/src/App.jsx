import React, { useState, useEffect, useMemo } from 'react';

function App() {
  // Cargar tareas desde localStorage al inicio
  const [tareas, setTareas] = useState(() => {
    const saved = localStorage.getItem('tareas');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [busqueda, setBusqueda] = useState('');

  // Persistir tareas en localStorage
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Cálculo optimizado del tiempo total
  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  // Filtrar tareas según criterios
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
      
      <div className="form-section">
        <form onSubmit={agregarTarea} className="task-form">
          <div className="form-row">
            <input 
              type="text" 
              value={nuevaTarea} 
              onChange={(e) => setNuevaTarea(e.target.value)} 
              placeholder="Nombre de la tarea" 
              required
              className="form-input"
            />
            <input 
              type="number" 
              value={duracion} 
              onChange={(e) => setDuracion(e.target.value)} 
              placeholder="Duración (min)" 
              min="1"
              required
              className="form-input"
            />
            <button type="submit" className="submit-btn">
              ➕ Agregar
            </button>
          </div>
        </form>

        <div className="filter-row">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="🔍 Buscar tareas..."
            className="search-input"
          />
          
          <select 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)}
            className="filter-select"
          >
            <option value="todas">Todas las tareas</option>
            <option value="cortas">Tareas cortas (≤ 30 min)</option>
            <option value="largas">Tareas largas (&gt; 30 min)</option>
          </select>
        </div>
      </div>

      <div className="stats-container">
        <p>
          <span className="stat-item">Tareas: {tareas.length}</span> | 
          <span className="stat-item"> Completadas: {tareas.filter(t => t.completada).length}</span> | 
          <span className="stat-item"> Total tiempo: {calcularTiempoTotal} min</span>
        </p>
      </div>

      <ul className="task-list">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((tarea) => (
            <li 
              key={tarea.id} 
              className={`task-item ${tarea.completada ? 'completed' : ''}`}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={tarea.completada}
                  onChange={() => toggleCompletada(tarea.id)}
                  className="task-checkbox"
                />
                <span className="task-name">{tarea.nombre}</span>
                <span className="task-duration">{tarea.duracion} min</span>
                <span className="task-date">
                  {new Date(tarea.fecha).toLocaleDateString()}
                </span>
              </div>
              <button 
                onClick={() => eliminarTarea(tarea.id)}
                className="delete-btn"
              >
                🗑️
              </button>
            </li>
          ))
        ) : (
          <p className="empty-message">No hay tareas que coincidan con los filtros</p>
        )}
      </ul>

      <style jsx>{`
        .app-container {
          max-width: 800px;
          maxWidth: 100%;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #98A1BC;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
        }
        
        .form-section {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          margin-bottom: 1.5rem;
        }
        
        .form-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        
        .form-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          width: 100%;
          max-width: 250px;
        }
        
        .submit-btn {
          padding: 0.75rem 1.5rem;
          background-color: #4e73df;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        
        .submit-btn:hover {
          background-color: #3a5bd9;
        }
        
        .filter-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        
        .search-input {
          padding: 0.75rem 1rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          width: 100%;
          max-width: 300px;
        }
        
        .filter-select {
          padding: 0.75rem 1rem;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-size: 1rem;
          width: 100%;
          max-width: 300px;
          background-color: white;
        }
        
        .stats-container {
          background-color: #e9ecef;
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
        }
        
        .stat-item {
          margin: 0 0.5rem;
          color: #495057;
          font-weight: 500;
        }
        
        .task-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background-color: white;
          border-radius: 6px;
          margin-bottom: 0.75rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .task-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .task-item.completed {
          background-color: #f8f9fa;
        }
        
        .task-item.completed .task-name {
          text-decoration: line-through;
          color: #6c757d;
        }
        
        .task-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }
        
        .task-checkbox {
          cursor: pointer;
          width: 1.2rem;
          height: 1.2rem;
        }
        
        .task-name {
          flex: 1;
          font-weight: 500;
        }
        
        .task-duration {
          background-color: #e3f2fd;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          color: #1976d2;
          font-weight: 600;
        }
        
        .task-date {
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .delete-btn {
          background: none;
          border: none;
          color: #dc3545;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        
        .delete-btn:hover {
          color: #bb2d3b;
        }
        
        .empty-message {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

export default App;