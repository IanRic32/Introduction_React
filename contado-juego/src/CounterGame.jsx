import { useReducer, useRef, useEffect, useCallback, useState } from "react";
import './CounterGame.css';

const initialState = { 
  count: 0, 
  history: [],
  previousStates: [] 
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { 
        count: state.count + (action.payload || 1),
        history: [...state.history, `+${action.payload || 1} (Nuevo valor: ${state.count + (action.payload || 1)})`],
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "decrement":
      return { 
        count: state.count - (action.payload || 1),
        history: [...state.history, `-${action.payload || 1} (Nuevo valor: ${state.count - (action.payload || 1)})`],
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "reset":
      return { 
        ...initialState,
        previousStates: [...state.previousStates, { count: state.count, history: state.history }]
      };
    case "undo":
      if (state.previousStates.length === 0) return state;
      const lastState = state.previousStates[state.previousStates.length - 1];
      return {
        count: lastState.count,
        history: lastState.history,
        previousStates: state.previousStates.slice(0, -1)
      };
    default:
      return state;
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [customValue, setCustomValue] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const incrementBtnRef = useRef(null);
  const inputRef = useRef(null);

  // Efecto para el foco inicial y persistencia en localStorage
  useEffect(() => {
    incrementBtnRef.current.focus();
    const savedState = localStorage.getItem('counterState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'reset' });
        parsedState.history.forEach(entry => {
          const value = parseInt(entry.split(' ')[0].replace('+', '').replace('-', ''));
          if (entry.includes('+')) {
            dispatch({ type: 'increment', payload: value });
          } else {
            dispatch({ type: 'decrement', payload: value });
          }
        });
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
  }, []);

  // Efecto para guardar en localStorage
  useEffect(() => {
    localStorage.setItem('counterState', JSON.stringify(state));
  }, [state]);

  // Funciones optimizadas
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment', payload: customValue });
  }, [customValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement', payload: customValue });
  }, [customValue]);

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: 'undo' });
  }, []);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleIncrement();
      inputRef.current.focus();
    }
  }, [handleIncrement]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Efecto para el tema oscuro/claro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`counter-container ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleDarkMode} className="theme-toggle">
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <h2>Contador: <span className="count-value">{state.count}</span></h2>
      
      <div className="controls">
        <div className="input-group">
          <label htmlFor="customValue">Valor personalizado:</label>
          <input
            id="customValue"
            type="number"
            min="1"
            value={customValue}
            onChange={(e) => setCustomValue(parseInt(e.target.value) || 1)}
            ref={inputRef}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="buttons">
          <button ref={incrementBtnRef} onClick={handleIncrement} className="increment">
            +{customValue}
          </button>
          <button onClick={handleDecrement} className="decrement">
            -{customValue}
          </button>
          <button onClick={handleReset} className="reset">
            Reset
          </button>
          <button onClick={handleUndo} className="undo" disabled={state.previousStates.length === 0}>
            Deshacer
          </button>
        </div>
      </div>
      
      <div className="history-section">
        <h3>Historial de cambios:</h3>
        {state.history.length === 0 ? (
          <p className="empty-history">No hay cambios registrados</p>
        ) : (
          <ul className="history-list">
            {state.history.map((entry, index) => (
              <li key={index} className="history-item">
                {entry}
                <span className="history-index">#{index + 1}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="stats">
        <p>Total de operaciones: {state.history.length}</p>
        <p>Valor máximo alcanzado: {
          Math.max(0, ...state.history.map(entry => 
            parseInt(entry.split('Nuevo valor: ')[1].replace(')', ''))
          ))
        }</p>
      </div>
    </div>
  );
}

export default CounterGame;