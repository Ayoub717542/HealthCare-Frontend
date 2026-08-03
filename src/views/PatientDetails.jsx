import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";
import { toast } from "react-toastify";

function PatientDetails() {

  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [record, setRecord] = useState(null);

   useEffect(()=>{
    api.get(`/patients/consulterPatient/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error(`No patient found with ID ${id}.`);
      });
    },[id])

useEffect(() => {
    if(patient){
          api.get(`/DossierMedical/${patient.id}`)
          .then((response) => {
        setRecord(response.data);
    })
    .catch((error) => {
        console.log(error);
        toast.error( "An error occurred while fetching the medical record.");
                })   
    }
    
}, [patient])

   if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div className="patient-details">
      <h1>Patient Details</h1>
<div className="details-section">

      <h2>Personal Information</h2>

      <p>Last Name: {patient.nom}</p>
      <p>First Name: {patient.prenom}</p>
      <p>Date of Birth: {patient.dateNaissance}</p>

      <h2>Contact Information</h2>

      <p>Email: {patient.email}</p>
      <p>Phone: {patient.telephone}</p>

      <h2>Medical Information</h2>

      {record ? (
        <>
        <p>Diagnosis: {record.diagnostic}</p>
        <p>Treatment: {record.observations}</p>
        <p>Treatment: {record.dateCreation}</p>
        </>
      ):(
      <p>No medical record found.</p> 
    ) 
      
      }
</div>
    </div>
    )}


export default PatientDetails;