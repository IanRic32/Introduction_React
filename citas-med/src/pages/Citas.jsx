import { Link } from 'react-router-dom';

function Citas() {
  // Datos de ejemplo (en una app real estos vendrían de una API)
  const citas = [
    { id: 1, paciente: 'Juan Pérez', fecha: '2023-05-15', hora: '10:00' },
    { id: 2, paciente: 'María García', fecha: '2023-05-16', hora: '11:30' },
    { id: 3, paciente: 'Carlos López', fecha: '2023-05-17', hora: '09:15' },
  ];

  return (
    <div>
      <h2>Lista de Citas Médicas</h2>
      <ul>
        {citas.map(cita => (
          <li key={cita.id}>
            <Link to={`/cita/${cita.id}`}>
              {cita.paciente} - {cita.fecha} a las {cita.hora}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;