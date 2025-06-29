import React, { useState, useEffect, useMemo, use } from 'react';
import Planeta from './Planeta';
import './App.css'

function App() {
  const [distancia, setDistancia] = useState(0)
  const [combustible, setCombustible] = useState(0)
  const [estado_nave, setEstadoNave] = useState('En Órbita')
  const [planetasVisitados, setPlanetasVisitados] = useState([])
  const [mostrarbitacora, setMostrarBitacora] = useState(false)

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
          setPlanetasVisitados(prev => [...planetasVisitados, nombrePlaneta]);

          setTimeout(() => {
            setEstadoNave('En Órbita');
            setCombustible(prev => Math.min(prev + 30), 100);
          }, 2000);
        };
  return (
    <>
      
    </>
  )
}

export default App
