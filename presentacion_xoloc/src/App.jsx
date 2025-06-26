import Tarjeta from './Tarjeta';
import imagen1 from './assets/xoloc2.png'; // Ajusta la ruta
import imagen2 from './assets/xoloc2.png';  // Ajusta la ruta

function App() {
  // Estilo común para las imágenes y la tarjeta para mantener consistencia
  const cardStyle = {
    width: '250px',
    height: '350px',
    margin: '20px', // Aumenté el margen para separar más los elementos
    objectFit: 'cover', // Para que las imágenes mantengan sus proporciones
    borderRadius: '10px', // Opcional: para esquinas redondeadas
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Opcional: sombra para mejor visualización
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '50px', 
      fontFamily: 'Arial, sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      padding: '20px',
      minHeight: '100vh',
    }}>
      <h1 style={{ 
        marginBottom: '40px', 
        color: '#333',
        fontSize: '2.5rem'
      }}>Tarjeta de Presentación</h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '60px', // Esto añade espacio uniforme entre los elementos
        maxWidth: '1200px', // Limita el ancho máximo del contenedor
        width: '100%'
      }}>
        {/* Primera imagen */}
        <img 
          src={imagen1} 
          alt="Imagen decorativa 1" 
          style={cardStyle} 
        />
        
        {/* Componente Tarjeta */}
        <div style={{ ...cardStyle, padding: '20px', alignContent: 'center', marginRight: '20px' }}>
          <Tarjeta />
        </div>
        
        {/* Segunda imagen */}
        <img 
          src={imagen2} 
          alt="Imagen decorativa 2" 
          style={{...cardStyle,marginLeft: '20px'}} 
        />
      </div>
    </div>
  );
}

export default App;