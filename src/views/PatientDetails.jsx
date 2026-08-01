import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";

function PatientDetails() {

  const { id } = useParams();

  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatient();
  }, [id]);

  function fetchPatient() {
    api.get(`/patients/consulterPatient/${id}`)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

   if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Patient Details</h1>

      <h2>Personal Information</h2>

      <p>Last Name: {patient.nom}</p>
      <p>First Name: {patient.prenom}</p>
      <p>Date of Birth: {patient.dateNaissance}</p>

      <h2>Contact Information</h2>

      <p>Email: {patient.email}</p>
      <p>Phone: {patient.telephone}</p>

      <h2>Medical Information</h2>

      {/* Medical information here */}
    </div>
  )
}
export default PatientDetails;