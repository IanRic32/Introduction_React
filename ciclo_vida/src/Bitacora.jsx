import React, { useState, useEffect, useRef } from 'react';

function Bitacora({ planetas: initialPlanetas }) {
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('bitacoraPlanetas')) || initialPlanetas.map(nombre => ({
      nombre,
      descripcion: '',
      imagen: null
    }))
  );
  
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [editando, setEditando] = useState(null);
  const inputImagenRef = useRef(null);

  // Efecto para guardar en localStorage
  useEffect(() => {
    localStorage.setItem('bitacoraPlanetas', JSON.stringify(planetas));
  }, [planetas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editando !== null) {
      // Editar planeta existente
      const nuevosPlanetas = [...planetas];
      nuevosPlanetas[editando] = {
        ...nuevosPlanetas[editando],
        descripcion,
        imagen: imagen ? URL.createObjectURL(imagen) : nuevosPlanetas[editando].imagen
      };
      setPlanetas(nuevosPlanetas);
    } else {
      // Añadir nuevo planeta
      const nuevoPlaneta = {
        nombre,
        descripcion,
        imagen: imagen ? URL.createObjectURL(imagen) : null
      };
      setPlanetas([...planetas, nuevoPlaneta]);
    }
    
    // Limpiar formulario
    setNombre('');
    setDescripcion('');
    setImagen(null);
    setEditando(null);
    if (inputImagenRef.current) {
      inputImagenRef.current.value = '';
    }
  };

  const handleEditar = (index) => {
    const planeta = planetas[index];
    setNombre(planeta.nombre);
    setDescripcion(planeta.descripcion);
    setEditando(index);
  };

  const handleEliminar = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      const nuevosPlanetas = [...planetas];
      nuevosPlanetas.splice(index, 1);
      setPlanetas(nuevosPlanetas);
    }
  };

  return (
    <div className="bitacora">
      <h2>Bitácora de Exploración</h2>
      
      <form onSubmit={handleSubmit} className="form-bitacora">
        <div className="form-group">
          <label>Nombre del Planeta:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            disabled={editando !== null}
          />
        </div>
        
        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            onChange={(e) => setImagen(e.target.files[0])}
            ref={inputImagenRef}
            accept="image/*"
          />
        </div>
        
        <button type="submit">
          {editando !== null ? 'Actualizar' : 'Guardar'}
        </button>
        
        {editando !== null && (
          <button type="button" onClick={() => {
            setNombre('');
            setDescripcion('');
            setImagen(null);
            setEditando(null);
            if (inputImagenRef.current) {
              inputImagenRef.current.value = '';
            }
          }}>
            Cancelar
          </button>
        )}
      </form>
      
      <div className="registros-bitacora">
        <h3>Registros</h3>
        {planetas.length === 0 ? (
          <p>No hay planetas registrados en la bitácora.</p>
        ) : (
          <ul>
            {planetas.map((planeta, index) => (
              <li key={index} className="registro-planeta">
                <div className="info-planeta">
                  <h4>{planeta.nombre}</h4>
                  {planeta.descripcion && <p>{planeta.descripcion}</p>}
                  {planeta.imagen && (
                    <div className="imagen-planeta">
                      <img src={planeta.imagen} alt={planeta.nombre} />
                    </div>
                  )}
                </div>
                
                <div className="acciones-planeta">
                  <button onClick={() => handleEditar(index)}>Editar</button>
                  <button onClick={() => handleEliminar(index)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Bitacora;