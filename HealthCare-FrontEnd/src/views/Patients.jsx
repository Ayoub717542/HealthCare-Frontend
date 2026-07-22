import { useEffect, useState } from "react";
import MyProfile from "../views/MyProfile";
import { getUserRole } from "../utils/auth";
import api from "../service/api";

function Patients() {
  
  const role= getUserRole();
    if (role === "PATIENT") {
    return <MyProfile />;
  }

  function fetchPatients(){
    api.get("/patients/obtenirTousLesPatients").then((response) => {
    setPatients(response.data);
    });

  }

  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
  });

    useEffect(() => {
        fetchPatients();
    }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    if(editingId){
        e.preventDefault();
        api.put(`/patients/modifier/${editingId}`, formData).then(() => {
        setShowForm(false);
        setEditingId(null);
        fetchPatients();
    });

    }else{
         e.preventDefault();
         api.post("/patients/ajouterPatient", formData).then(() => {
         setShowForm(false);
         fetchPatients();
    });
    }
   
  }
    function handleEdit(patient){
        setFormData({
        nom: patient.nom,
        prenom: patient.prenom,
        email: patient.email,
        telephone: patient.telephone,
        dateNaissance: patient.dateNaissance,
    })
    setEditingId(patient.id)
    setShowForm(true);
    }
    
  function handleDelete(patient){
        const sure = window.confirm(`Delete ${patient.prenom} ${patient.nom}?`);
        if(!sure) return;
        api.delete(`/patients/supprimer/${patient.id}`).then(() => {
            fetchPatients();
        })
  }

  return (
    <div className="patients">
      {showForm ? (
        <div className="form-container">
          <h2>Add Patient</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input name="prenom" value={formData.prenom} onChange={handleChange} />

            <label>Last Name</label>
            <input name="nom" value={formData.nom} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />

            <label>Phone</label>
            <input name="telephone" value={formData.telephone} onChange={handleChange} />

            <label>Date of Birth</label>
            <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <> 
        <div className="table-header">
          <h2>Patients</h2>
          <button onClick={() => setShowForm(true)} className="add-btn" >Add Patient</button>
        </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birth Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.nom} {patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(patient)}>
                            <i className="fa-solid fa-pen"></i> Edit
                    </button>
                     <button className="delete-btn" onClick={() => handleDelete(patient )}>
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

export default Patients;