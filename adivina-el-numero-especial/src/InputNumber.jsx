export default function InputNumber({ value, onChange, onGuess }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onGuess();
    }
  };

  return (
    <div className="input-container">
      <input
        type="number"
        min="1"
        max="100"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        placeholder="Ingresa tu número..."
        className="number-input"
      />
    </div>
  );
}