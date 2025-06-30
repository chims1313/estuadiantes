import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('students');
    if (saved) setStudents(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  function handleAddOrUpdate(student) {
    if (editingIdx !== null) {
      setStudents(students => students.map((s, i) => i === editingIdx ? student : s));
      setEditingIdx(null);
    } else {
      setStudents(students => [...students, student]);
    }
  }

  function handleEdit(idx) {
    setEditingIdx(idx);
  }

  function handleDelete(idx) {
    if (window.confirm('¿Eliminar este alumno?')) {
      setStudents(students => students.filter((_, i) => i !== idx));
      if (editingIdx === idx) setEditingIdx(null);
    }
  }

  function handleCancelEdit() {
    setEditingIdx(null);
  }

  return (
    <div className="app-container">
      <h1>Aplicación de Evaluación de Alumnos</h1>
      <StudentForm
        onSubmit={handleAddOrUpdate}
        editingStudent={editingIdx !== null ? students[editingIdx] : null}
        onCancel={handleCancelEdit}
      />
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
