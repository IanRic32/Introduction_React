export default function RestartButton({ onRestart }) {
  return (
    <button onClick={onRestart} className="restart-button">
      🪐 Jugar de nuevo
    </button>
  );
}