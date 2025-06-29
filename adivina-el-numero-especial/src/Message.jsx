export default function Message({ message, isCorrect }) {
  return (
    <div className={`message ${isCorrect ? 'correct' : ''}`}>
      <p>{message}</p>
    </div>
  );
}