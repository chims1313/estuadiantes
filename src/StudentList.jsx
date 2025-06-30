import React from 'react';

function getApreciacion(promedio) {
  const num = parseFloat(promedio);
  if (num < 4) return 'Deficiente';
  if (num < 5.6) return 'Con mejora';
  if (num < 6.5) return 'Buen trabajo';
  if (num <= 7) return 'Destacado';
  return '';
}

export default function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) return <p>No hay alumnos registrados.</p>;
  return (
    <table className="student-list">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Asignatura</th>
          <th>Promedio</th>
          <th>Apreciación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, idx) => (
          <tr key={idx}>
            <td>{s.nombre}</td>
            <td>{s.asignatura}</td>
            <td>{s.promedio}</td>
            <td>{getApreciacion(s.promedio)}</td>
            <td>
              <button onClick={() => onEdit(idx)}>Editar</button>
              <button onClick={() => onDelete(idx)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
