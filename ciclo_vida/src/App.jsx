import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';
import './App.css'
import Bitacora from './Bitacora';

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);
  const [mostrarBitacora, setMostrarBitacora] = useState(false);

  // Efecto para simulación de vuelo
  useEffect(() => {
    console.log("¡El panel de control está listo!"); // Montaje

    const intervalo = setInterval(() => {
      if (combustible > 0 && estadoNave === "En órbita") {
        setDistancia(prev => prev + 1);
        setCombustible(prev => prev - 1);
      } else if (combustible <= 0) {
        setEstadoNave("Sin combustible");
      }
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel de control se ha apagado."); // Desmontaje
    };
  }, [combustible, estadoNave]);

  // Efecto para actualización de combustible
  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  // Memoización del mensaje de estado
  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  // Función para aterrizar
  const aterrizar = () => {
    const nombrePlaneta = `Planeta-${distancia}`;
    setEstadoNave("Aterrizando");
    setPlanetasVisitados([...planetasVisitados, nombrePlaneta]);
    
    // Después de 2 segundos, volver a órbita
    setTimeout(() => {
      setEstadoNave("En órbita");
      // Recargar un poco de combustible al aterrizar
      setCombustible(prev => Math.min(prev + 30, 100));
    }, 2000);
  };

  return (
    <div className="app">
      <h1>Panel de Control de la Nave Espacial</h1>
      
      <div className="panel">
        <div className="indicador">
          <h2>Distancia recorrida: {distancia} UA</h2>
        </div>
        
        <div className="indicador">
          <h2>Combustible: {combustible}%</h2>
          <div className="barra-combustible">
            <div 
              className="nivel-combustible" 
              style={{ width: `${combustible}%` }}
            ></div>
          </div>
        </div>
        
        <div className="indicador">
          <h2>{mensajeEstado}</h2>
        </div>
        
        <div className="controles">
          <button 
            onClick={aterrizar} 
            disabled={estadoNave !== "En órbita" || combustible <= 0}
          >
            Aterrizar
          </button>
          
          <button onClick={() => setMostrarBitacora(!mostrarBitacora)}>
            {mostrarBitacora ? 'Ocultar Bitácora' : 'Mostrar Bitácora'}
          </button>
        </div>
      </div>
      
      <div className="planetas-visitados">
        <h2>Planetas Visitados</h2>
        {planetasVisitados.map((planeta, index) => (
          <Planeta key={index} nombre={planeta} />
        ))}
      </div>
      
      {mostrarBitacora && <Bitacora planetas={planetasVisitados} />}
    </div>
  );
}
export default App;