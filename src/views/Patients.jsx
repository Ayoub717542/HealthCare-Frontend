import { useEffect, useState } from "react";
import api from "../service/api";
import {useForm} from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Patients() {
const navigate = useNavigate();

  function fetchPatients(){
    api.get("/patients/obtenirTousLesPatients").then((response) => {
    setPatients(response.data);
    });

  }

  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const {register,handleSubmit,reset} = useForm();

  const filterByName = [...patients]
  .filter((patient) => (patient.nom || "").toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => {
    if (sortOrder === "asc") {
      return (a.nom || "").localeCompare(b.nom || "");
    }

    if (sortOrder === "desc") {
      return (b.nom|| "").localeCompare(a.nom || "");
    }
    return 0;
  });

  function onSubmit(data){

     if(editingId){
        api.put(`/patients/modifier/${editingId}`, data).then(() => {
        setShowForm(false);
        setEditingId(null);
        reset();
        fetchPatients();
        toast.success("Patient updated successfully!");
    })
      .catch(() => {
        toast.error("c.");
      });
    

    }else{
         api.post("/patients/ajouterPatient", data).then(() => {
         setShowForm(false);
         reset();
         fetchPatients();
         toast.success("Patient added successfully!");
    })
    .catch(() => {
        toast.error("An error occurred while adding the patient.");
      });
    }
  }

    useEffect(() => {
        fetchPatients();
    }, []);
    
    function handleEdit(patient){
        reset({
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
            toast.success("Patient successfully deleted!");
        })
        .catch(() => {
            toast.error("An error has occurred");
        });
  }
  return (
    <>  
    <div className="patients">
      {showForm ? (
        <div className="form-container">
          <h2>Add Patient</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <label>First Name</label>
            <input 
            {...register("prenom")}
            type="text"
            />
            <label>Last Name</label>
            <input {...register("nom")} 
            type="text" />

            <label>Email</label>
            <input {...register("email")}
            type="email"
            />

            <label>Phone</label>
            <input {...register("telephone")}
            type="text" />

            <label>Date of Birth</label>
            <input {...register("dateNaissance")}
            type="date"/>

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
        <input
          type="text"
          placeholder="Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
/>
   <select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
>
  <option value="">Sort by name</option>
  <option value="asc">A → Z</option>
  <option value="desc">Z → A</option>
</select>

        <div className="table-header">
          <h2>Patients</h2>
          <button onClick={() => setShowForm(true)} className="add-btn" >Add Patient</button>
        </div>

        {filterByName.length === 0 ? (
  search ? (
    <p>No patients found.</p>
  ) : (
    <p>No patients available.</p>
  )
) : (
<>
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
              {filterByName.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.nom} {patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.dateNaissance}</td>
                  
                  <td>
                    <button onClick={() => navigate(`/patients/${patient.id}`)}>Details</button>
                    <button className="edit-btn" onClick={() => handleEdit(patient)}><i className="fa-solid fa-pen"></i> Edit</button>
                     <button className="delete-btn" onClick={() => handleDelete(patient )}><i className="fa-solid fa-trash"></i> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        )}
        </>
      )}
    </div>
  </> );
}
export default Patients;