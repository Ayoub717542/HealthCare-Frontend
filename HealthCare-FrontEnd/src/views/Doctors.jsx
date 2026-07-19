import { useEffect, useState } from "react";
import api from "../service/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    specialite: "",
  });

  function fetchDoctors() {
    api.get("/medecine/getMedecinePagination").then((response) => {
      setDoctors(response.data.content);
    });
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault(); 

    if (editingId) {
      api.put(`/medecine/modifier/${editingId}`, formData).then(() => {
        setShowForm(false);
        setEditingId(null);
        fetchDoctors();
      });
    } else {
      api.post("/medecine/ajouterMedecin", formData).then(() => {
        setShowForm(false);
        fetchDoctors();
      });
    }
  }

  function handleEdit(medecine) {
    setFormData({
      nom: medecine.nom,
      prenom: medecine.prenom,
      email: medecine.email,
      telephone: medecine.telephone,
      specialite: medecine.specialite,
    });
    setEditingId(medecine.id);
    setShowForm(true);
  }

  function handleDelete(medecine) {
    const sure = window.confirm(`Delete ${medecine.prenom} ${medecine.nom}?`);
    if (!sure) return;
    api.delete(`/medecine/supprimer/${medecine.id}`).then(() => {
      fetchDoctors();
    });
  }

  return (
    <div className="doctors">
      {showForm ? (
        <div className="form-container">
          <h2>Add Doctor</h2>
          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input name="nom" value={formData.nom} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />

            <label>Phone</label>
            <input name="telephone" value={formData.telephone} onChange={handleChange} />

            <label>Specialite</label>
            <input name="specialite" value={formData.specialite} onChange={handleChange} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <div className="table-header">
            <h2>Doctors</h2>
            <button onClick={() => setShowForm(true)}>Add Doctor</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.nom}</td>
                  <td>{doctor.specialite}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.telephone}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(doctor)}>
                      <i className="fa-solid fa-pen"></i> Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(doctor)}>
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Doctors;