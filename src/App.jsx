import React, { useState, useEffect } from "react";
import { supabase } from "./createClient";

const App = () => {
  const [users, setUsers] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Leer usuarios
  async function fetchUsers() {
    const { data, error } = await supabase.from("users").select("*").order("id", { ascending: true });
    if (error) console.error("Error al cargar usuarios:", error);
    else setUsers(data || []);
  }

  // 🔹 Agregar usuario
  async function addUser(e) {
    e.preventDefault();
    if (!nombre || !correo || !celular) return alert("Completa todos los campos");

    const { error } = await supabase.from("users").insert([{ nombre, correo, celular }]);
    if (error) console.error("Error al agregar:", error);
    else {
      fetchUsers();
      setNombre("");
      setCorreo("");
      setCelular("");
    }
  }

  // 🔹 Eliminar usuario
  async function deleteUser(id) {
    if (!window.confirm("¿Seguro que quieres eliminar este contacto?")) return;
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) console.error("Error al eliminar:", error);
    else fetchUsers();
  }

  // 🔹 Cargar datos para editar
  function startEdit(user) {
    setEditId(user.id);
    setNombre(user.nombre);
    setCorreo(user.correo);
    setCelular(user.celular);
  }

  // 🔹 Guardar edición
  async function updateUser(e) {
    e.preventDefault();
    if (!nombre || !correo || !celular) return alert("Completa todos los campos");

    const { error } = await supabase
      .from("users")
      .update({ nombre, correo, celular })
      .eq("id", editId);

    if (error) console.error("Error al actualizar:", error);
    else {
      fetchUsers();
      setEditId(null);
      setNombre("");
      setCorreo("");
      setCelular("");
    }
  }

  // 🔹 Cancelar edición
  function cancelEdit() {
    setEditId(null);
    setNombre("");
    setCorreo("");
    setCelular("");
  }

  return (
    <div className="container py-5 bg-light">
      <h2 className="text-center mb-4">
        📇 <strong>CRUD - Directorio de Contactos</strong>
      </h2>

      {/* FORMULARIO */}
      <div className="card p-4 shadow-sm mb-4">
        <h4 className="mb-3 text-primary">
          {editId ? "✏ Editar contacto" : "➕ Agregar nuevo contacto"}
        </h4>

        <form onSubmit={editId ? updateUser : addUser}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa el nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              placeholder="Número de celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className={`btn ${editId ? "btn-warning" : "btn-success"}`}>
              {editId ? "💾 Guardar cambios" : "➕ Agregar"}
            </button>
            {editId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                ❌ Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLA */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📋 Lista de Contactos</h5>
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Celular</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nombre}</td>
                    <td>{user.correo}</td>
                    <td>{user.celular}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(user)}
                      >
                        ✏ Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        🗑 Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No hay contactos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
