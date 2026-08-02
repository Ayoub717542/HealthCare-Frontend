import { useEffect, useState } from "react";
import api from "../service/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


function MedicalRecords(){

  const [recordes, setRecordes] = useState([]);
  const [showForm,setShowForm] = useState(false);
  const {register, handleSubmit}= useForm();

   function fetchMedicalRecords() {
    api.get("/DossierMedical/getAllDossierMedical")
        .then((response) => {
            setRecordes(response.data.content);
        })
        .catch((error) => {
            console.log(error);
            toast.error("An error occurred while fetching Medical recores ")
        });
}
 useEffect(()=>{
        fetchMedicalRecords()
    },[]);


    return(
 <>
{ showForm ? (
    <div className="form-container">
          <h2>Add a Medical Recorde</h2>
          <form onSubmit={handleSubmit(OnSubmit)}>
            <label>diagnostic</label>
            <input type="text"  {...register("diagnostic")} />

            <label>observations</label>
            <input type="text"  {...register("observations")} />

            <label>dateCreation</label>
            <input type="date" {...register("dateCreation")} />

            <label>patientId</label>
            <input type="number" {...register("patientId")} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
):(
  <div className="recordes">
       
       <div className="table-header">
       <h2>Medical Recoreds</h2>
       <button>add An Record</button>
       </div>
       <table>
        <thead>
            <tr>
                <th>id</th>
                <th>diagnostic</th>
                <th>observations</th>
                <th>dateCreation</th>
                <th>patient</th>
                <th>Action</th>
            </tr>
            </thead>
                <tbody>
                    {recordes.map((record)=> (
                    <tr key={record.id}>
                        <td>{record.id}</td>
                        <td>{record.diagnostic}</td>
                        <td>{record.observations}</td>
                        <td>{record.dateCreation}</td>
                        <td>{record.patient?.nom} {record.patient?.prenom}</td>
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
        </div>

)
}


      
</>
    )
}
export default MedicalRecords