import { useEffect, useState } from "react";
import api from "../service/api";
import { useForm } from "react-hook-form";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {register,reset,handleSubmit} = useForm(); 

  function fetchDoctors() {
    api.get("/medecine/getMedecinePagination").then((response) => {
      setDoctors(response.data.content);
    });
  }

  useEffect(() => {
    fetchDoctors();
  }, []);


  function OnSubmit(data) {

    if (editingId) {
      api.put(`/medecine/modifier/${editingId}`, data).then(() => {
        setShowForm(false);
        setEditingId(null);
        reset();
        fetchDoctors();

      });
    } else {
      api.post("/medecine/ajouterMedecin", data).then(() => {
        setShowForm(false);
        reset();
        fetchDoctors();
        
      });
    }
  }

  function handleEdit(medecine) {
    reset({
      nom: medecine.nom,
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
          <form onSubmit={handleSubmit(OnSubmit)}>
             {/* wehnever this form has submited its gonna first call the submit handler function which comes from react hook form .   */}

            <label>Full Name</label>
            <input type="text"  {...register("nom")} />

            <label>Email</label>
            <input type="email"  {...register("email")} />

            <label>Phone</label>
            <input type="text" {...register("telephone")} />

            <label>Specialite</label>
            <input type="text" {...register("specialite")} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <div className="table-header">
            <h2>Doctors</h2>
            <button onClick={() => setShowForm(true)} className="add-btn">Add Doctor</button>
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