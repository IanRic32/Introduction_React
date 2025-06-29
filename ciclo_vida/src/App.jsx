import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './Planeta';
import './App.css'
import Bitacora from './Bitacora';

function App() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(0)
  const [estado_nave, setEstadoNave] = useState('En Órbita')
  const [planetasVisitados, setPlanetasVisitados] = useState([])
  const [mostrarBitacora, setMostrarBitacora] = useState(false)

  useEffect(() => {
    console.log('El panel de control se ha encendido');

    const intervalo = setInterval(() => {

      if (combustible > 0 && estado_nave === 'En Órbita') {
        setDistancia(prev => prev + 1);
        setCombustible(prev => prev - 1);
      }else if (combustible <= 0) {
          setEstadoNave("Sin combustible");
        }
      },100);

        return () => {
          clearInterval(intervalo);
          console.log('El panel de control se ha apagado');
        };},[combustible, estado_nave]);

        useEffect(() => {
          console.log('Combustible actualizado:');},[combustible]);

        const mensajeEstado = useMemo(() => {
          return `Estado de la nave: ${estado_nave}`;}, [estado_nave]);

        const aterrizar = () => {
          const nombrePlaneta = `Planeta-${distancia}`;
          setEstadoNave('Aterrizando');
          setPlanetasVisitados([...planetasVisitados, nombrePlaneta]);

          setTimeout(() => {
            setEstadoNave('En Órbita');
            setCombustible(prev => Math.min(prev + 30), 100);
          }, 2000);
        };
  return (
    <>
      <div className='app'>
        <h1>Panel de Control de la Nave Espacial</h1>
        <div className='panel'>
          <div className='indicador'>
            <h2>Distancia Recorrida: {distancia} UA</h2>
          </div>
          <div className='indicador'>
            <h2>Combustible: {combustible}%</h2>
            <div className='barra-combustible'></div>
            <div className='nivel-combustible' style={{width:`${combustible}%`}}>

            </div>
          </div>
        </div>
        <div className='indicador'>
          <h2>{mensajeEstado}</h2>
        </div>
        <div className='controles'>
          <button onClick={aterrizar}
            disabled= {estado_nave !== 'En orbita'|| combustible<=0}>
            Aterrizar
            </button>
            <button onClick={() => setMostrarBitacora(!mostrarBitacora)}>
            {mostrarBitacora ? 'Ocultar Bitácora' : 'Mostrar Bitácora'}
          </button>
        </div>
      </div>
      <div className='planetas-visitados'>
        <h2>Planetas visitados</h2>
        {planetasVisitados.map((planeta, index) => (
          <Planeta key={index} nombre={planeta} />
        ))}
      </div>
      {mostrarBitacora && <Bitacora planetas={planetasVisitados} />}
      div
    </>
  )
}

export default App
