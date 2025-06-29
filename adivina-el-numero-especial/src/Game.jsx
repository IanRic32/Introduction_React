import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import InputNumber from './InputNumber';
import Message from './Message';
import RestartButton from './RestartButton';
import AlienAnimation from './AlienAnimation';
import './Game.css';
import 'animate.css';

export default function Game() {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('¡Bienvenido, astronauta! Adivina un número entre 1 y 100');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alienTalking, setAlienTalking] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [planetRotation, setPlanetRotation] = useState(0);
  const audioRef = useRef(null);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  useEffect(() => {
    // Efecto para la rotación del planeta
    const interval = setInterval(() => {
      setPlanetRotation(prev => (prev + 0.2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('¡Ingresa un número válido entre 1 y 100!');
      return;
    }

    setAttempts(prev => prev + 1);

    if (num === targetNumber) {
      setMessage(`¡Correcto! ¡Encontraste el número ${targetNumber} en ${attempts + 1} intentos!`);
      setGameWon(true);
      setShowConfetti(true);
      setAlienTalking(true);
      playSound('win');
      setTimeout(() => setShowConfetti(false), 8000);
    } else {
      const diff = Math.abs(num - targetNumber);
      let newMessage = num < targetNumber ? 'El número es mayor' : 'El número es menor';
      
      // Pistas sensacionales basadas en la diferencia
      if (diff <= 5) {
        newMessage += ' 🚀 ¡Estás muy cerca! ¡La nave detecta calor!';
        playSound('hot');
      } else if (diff <= 15) {
        newMessage += ' 🔥 ¡Caliente! ¡Sigue así!';
        playSound('warm');
      } else {
        newMessage += ' ❄️ Frío... sigue buscando';
        playSound('cold');
      }
      
      setMessage(newMessage);
      setAlienTalking(true);
      setTimeout(() => setAlienTalking(false), 2000);
    }
  };

  const handleRestart = () => {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setMessage('Nuevo juego iniciado. Adivina un número entre 1 y 100');
    setAttempts(0);
    setGameWon(false);
    setHintUsed(false);
    playSound('restart');
  };

  const playSound = (type) => {
    const sounds = {
      win: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
      hot: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3',
      warm: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
      cold: 'https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-lose-2027.mp3',
      restart: 'https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3',
      hint: 'https://assets.mixkit.co/sfx/preview/mixkit-extra-bonus-in-a-game-2045.mp3'
    };
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    audioRef.current = new Audio(sounds[type]);
    audioRef.current.play();
  };

  const getHint = () => {
    if (hintUsed) return;
    
    const hint = targetNumber % 2 === 0 
      ? 'Pista: El número es PAR' 
      : 'Pista: El número es IMPAR';
    
    setMessage(`${message} | ${hint}`);
    setHintUsed(true);
    playSound('hint');
  };

  return (
    <div className="game-container">
      <audio ref={audioRef} />
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="space-background">
        <div 
          className="planet" 
          style={{ transform: `rotate(${planetRotation}deg)` }}
        ></div>
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      <div className="game-content animate__animated animate__fadeIn">
        <h1 className="game-title">🚀 Adivina el Número Espacial 🌌</h1>
        
        <div className="game-info">
          <p>Intentos: <span className="attempts-counter">{attempts}</span></p>
          {!gameWon && !hintUsed && (
            <button onClick={getHint} className="hint-button">
              🆘 Pedir pista (solo 1)
            </button>
          )}
        </div>
        
        <AlienAnimation talking={alienTalking} />
        
        <Message message={message} isCorrect={gameWon} />
        
        {!gameWon ? (
          <>
            <InputNumber 
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onGuess={handleGuess}
            />
            <button 
              onClick={handleGuess}
              className="guess-button animate__animated animate__pulse animate__infinite"
            >
              ¡Intentar!
            </button>
          </>
        ) : (
          <div className="win-message animate__animated animate__tada">
            <p>¡Felicidades, astronauta! 🎉</p>
            <RestartButton onRestart={handleRestart} />
          </div>
        )}
      </div>
    </div>
  );
}