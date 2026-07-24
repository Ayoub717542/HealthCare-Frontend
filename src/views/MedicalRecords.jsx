import { useEffect, useState } from "react";
import api from "../service/api";

function MedicalRecords(){

  const [recordes, setRecordes] = useState([]);

   function fetchMedicalRecords() {
    api.get("/DossierMedical/getAllDossierMedical")
        .then((response) => {
            setRecordes(response.data.content);
        })
        .catch((error) => {
            console.log(error);
        });
}
    useEffect(()=>{
        fetchMedicalRecords()
    },[]);

    return(
        <>
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

</>
    )
}
export default MedicalRecords