import { useParams } from 'react-router-dom';

function CitaDetalle() {
  const { id } = useParams();
  
  // Datos de ejemplo (en una app real esto vendría de una API)
  const citas = {
    1: { paciente: 'Juan Pérez', fecha: '2023-05-15', hora: '10:00', motivo: 'Consulta general' },
    2: { paciente: 'María García', fecha: '2023-05-16', hora: '11:30', motivo: 'Control anual' },
    3: { paciente: 'Carlos López', fecha: '2023-05-17', hora: '09:15', motivo: 'Dolor de cabeza' },
  };

  const cita = citas[id];

  if (!cita) {
    return (
      <div>
        <h2>Cita no encontrada</h2>
        <p>No existe una cita con el ID {id}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalles de la Cita</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Paciente:</strong> {cita.paciente}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Hora:</strong> {cita.hora}</p>
      <p><strong>Motivo:</strong> {cita.motivo}</p>
    </div>
  );
}

export default CitaDetalle;