import { useEffect, useState } from "react";
import api from "../service/api";
import {useForm} from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Patients() {
const navigate = useNavigate();

 
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  
 function fetchPatients(){
    api.get("/patients/searchPatientParNom",{
      params : {
        nom:search,
        pageNumber: pageNumber,
        pageSize: 5,
        sortBy:"nom",
        sortDir:sortOrder,
      },
    }).then((responce) => {
      setPatients(responce.data.content);
      setTotalPages(responce.data.totalPages);
    })

  }
  {/* the problem here is that if we call normal use effect every key we type in the search bow it calls the backend immidiatly that is lots of requests so the solusion is to add timeOut debounced useEffect*/}



    useEffect(() => { 
      const timer = setTimeout(()=>{  {/*we wait a biit after the user stop typing so we wait 500 then we call fetchPatients */}
      fetchPatients();
      },500)
       return()=>clearTimeout(timer)    //means if i type A the timer starts and when i type y it cansle the previous timer and start a new 500ms  and that happens every time we write a letter, and if the timer finish it calls the function right?
    }, [search,pageNumber,sortOrder]);   {/* now every time  these use states change react automatically re-runs fetchPatients function and get fresh data from backend */}

  useEffect(() => { // reset to page 1 whenever the search text changes
    setPageNumber(1);
  }, [search]);

  const {register,handleSubmit,reset} = useForm();

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
       <div className="search-bar">
        <input
          type="text"
          placeholder="Search patient by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort by name</option>
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </div>
        <div className="table-header">
          <h2>Patients</h2>
          <button onClick={() => setShowForm(true)} className="add-btn" >Add Patient</button>
        </div>

        {patients.length === 0 ? (
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
                <th>Last Name</th>
                <th>First Name</th>
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
                  <td>{patient.nom}</td>
                  <td>{patient.prenom}</td>
                  <td>{patient.email}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.dateNaissance}</td>
                  
                  <td>
                    <button className="details-btn" onClick={() => navigate(`/patients/${patient.id}`)}>Details</button>
                    <button className="edit-btn" onClick={() => handleEdit(patient)}><i className="fa-solid fa-pen"></i> Edit</button>
                     <button className="delete-btn" onClick={() => handleDelete(patient )}><i className="fa-solid fa-trash"></i> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

               <div className="pagination">
                  <button disabled={pageNumber <= 1} onClick={() => setPageNumber((p) => p - 1)}>
                    Prev
                  </button>
                  <span> Page {pageNumber} of {totalPages} </span>
                  <button disabled={pageNumber >= totalPages} onClick={() => setPageNumber((p) => p + 1)}>
                    Next
                  </button>
                </div>
        </>
        )}
        </>
      )}
    </div>
  </> );
}
export default Patients;