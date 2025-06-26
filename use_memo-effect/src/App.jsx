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
</div>);
}
export default App;