import React, { useState, useEffect } from 'react';
import './App.css';

const ESCALAS = [
  { min: 1, max: 3.9, label: "Deficiente", color: "#ef4444" },
  { min: 4.0, max: 5.5, label: "Con mejora", color: "#f59e42" },
  { min: 5.6, max: 6.4, label: "Buen trabajo", color: "#38bdf8" },
  { min: 6.5, max: 7.0, label: "Destacado", color: "#2563eb" },
];

function getEscala(promedio) {
  const escala = ESCALAS.find(
    (e) => promedio >= e.min && promedio <= e.max
  );
  return escala ? escala : { label: "Sin escala", color: "#aaa" };
}

function App() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    asignatura: "",
    promedio: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  // Cargar desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("evaluaciones");
    if (data) setEvaluaciones(JSON.parse(data));
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("evaluaciones", JSON.stringify(evaluaciones));
  }, [evaluaciones]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validar = () => {
    if (!form.nombre.trim() || !form.asignatura.trim() || !form.promedio.trim()) {
      setError("Todos los campos son obligatorios.");
      return false;
    }
    const promedio = parseFloat(form.promedio);
    if (isNaN(promedio) || promedio < 1 || promedio > 7) {
      setError("El promedio debe ser un número entre 1.0 y 7.0");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    const nuevaEval = {
      nombre: form.nombre.trim(),
      asignatura: form.asignatura.trim(),
      promedio: parseFloat(form.promedio),
    };
    if (editIndex !== null) {
      const nuevas = [...evaluaciones];
      nuevas[editIndex] = nuevaEval;
      setEvaluaciones(nuevas);
      setEditIndex(null);
    } else {
      setEvaluaciones([...evaluaciones, nuevaEval]);
    }
    setForm({ nombre: "", asignatura: "", promedio: "" });
    setError("");
  };

  const handleEdit = (idx) => {
    setEditIndex(idx);
    setForm(evaluaciones[idx]);
    setError("");
  };

  const handleDelete = (idx) => {
    if (window.confirm("¿Seguro que deseas eliminar esta evaluación?")) {
      setEvaluaciones(evaluaciones.filter((_, i) => i !== idx));
      setEditIndex(null);
      setForm({ nombre: "", asignatura: "", promedio: "" });
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px #0001", display: "inline-block", padding: "0.5em 1.5em" }}>
        Evaluación de Alumnos
      </h1>

      <div className="card">
        <h2 style={{ textAlign: "center" }}>
          {editIndex !== null ? "Editar Evaluación" : "Agregar Nueva Evaluación"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del Alumno:
            <input
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={form.nombre}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label>
            Asignatura:
            <input
              name="asignatura"
              placeholder="Ej: Matemáticas"
              value={form.asignatura}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          <label>
            Promedio (0.0 - 7.0):
            <input
              name="promedio"
              placeholder="Ej: 5.5"
              value={form.promedio}
              onChange={handleChange}
              autoComplete="off"
            />
          </label>
          {error && (
            <div style={{ color: "#ef4444", marginTop: "0.5rem", fontWeight: "bold" }}>
              {error}
            </div>
          )}
          <button type="submit" style={{ marginTop: "1rem" }}>
            {editIndex !== null ? "Actualizar Evaluación" : "Agregar Evaluación"}
          </button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: 700 }}>
        <h2 style={{ textAlign: "center" }}>Evaluaciones Guardadas</h2>
        {evaluaciones.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>
            No hay evaluaciones guardadas aún. ¡Agrega una!
          </p>
        ) : (
          evaluaciones.map((evalua, idx) => {
            const escala = getEscala(evalua.promedio);
            return (
              <div
                key={idx}
                style={{
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  boxShadow: "0 2px 8px #0001",
                  background: "#fafbfc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <b>Alumno: {evalua.nombre}</b>
                  <br />
                  Asignatura: {evalua.asignatura}
                  <br />
                  Promedio: <b>{evalua.promedio.toFixed(1)}</b>
                  <br />
                  <span
                    className="badge"
                    style={{
                      background: escala.color,
                      color: escala.label === "Con mejora" ? "#222" : "#fff",
                      marginTop: "0.5rem",
                    }}
                  >
                    {escala.label}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="edit"
                    style={{ width: "90px" }}
                    onClick={() => handleEdit(idx)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="delete"
                    style={{ width: "90px" }}
                    onClick={() => handleDelete(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
