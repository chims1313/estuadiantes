import React, { useState, useEffect } from 'react';

const initialForm = { nombre: '', asignatura: '', promedio: '' };

function getApreciacion(promedio) {
  const num = parseFloat(promedio);
  if (num < 4) return 'Deficiente';
  if (num < 5.6) return 'Con mejora';
  if (num < 6.5) return 'Buen trabajo';
  if (num <= 7) return 'Destacado';
  return '';
}

export default function StudentForm({ onSubmit, editingStudent, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  useEffect(() => {
    if (editingStudent) setForm(editingStudent);
    else setForm(initialForm);
    setError('');
  }, [editingStudent]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre || !form.asignatura || !form.promedio) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (isNaN(form.promedio) || form.promedio < 1 || form.promedio > 7) {
      setError('El promedio debe ser un número entre 1.0 y 7.0.');
      return;
    }
    onSubmit({ ...form, promedio: parseFloat(form.promedio) });
    setForm(initialForm);
    setError('');
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 16px #0001',
      padding: '2rem',
      maxWidth: '400px',
      margin: '0 auto',
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <h2 style={{ textAlign: 'center', margin: 0, fontWeight: 700 }}>
        {editingStudent ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}
      </h2>
      <label style={{ fontWeight: 500 }}>Nombre del Alumno:
        <input
          name="nombre"
          placeholder="Ej: Juan Pérez"
          value={form.nombre}
          onChange={handleChange}
          required
          style={{ marginTop: 4 }}
        />
      </label>
      <label style={{ fontWeight: 500 }}>Asignatura:
        <input
          name="asignatura"
          placeholder="Ej: Matemáticas"
          value={form.asignatura}
          onChange={handleChange}
          required
          style={{ marginTop: 4 }}
        />
      </label>
      <label style={{ fontWeight: 500 }}>Promedio (0.0 - 7.0):
        <input
          name="promedio"
          placeholder="Ej: 5.5"
          value={form.promedio}
          onChange={handleChange}
          required
          type="number"
          min="1"
          max="7"
          step="0.1"
          style={{ marginTop: 4 }}
        />
      </label>
      {form.promedio && (
        <span className="apreciacion" style={{ fontWeight: 600, color: '#646cff' }}>
          {getApreciacion(form.promedio)}
        </span>
      )}
      {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
      <button
        type="submit"
        style={{
          background: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '0.75rem',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          marginTop: 8,
        }}
      >
        {editingStudent ? 'Actualizar Evaluación' : 'Agregar Evaluación'}
      </button>
      {editingStudent && (
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#888',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '0.75rem',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
