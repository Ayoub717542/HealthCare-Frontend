import { useEffect, useState } from "react";
import api from "../service/api";

function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients/obtenirTousLesPatients")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Patients</h1>

      {patients.map((patient) => (
        <div key={patient.id}>
          <p>{patient.firstName} {patient.lastName}</p>
        </div>
      ))}
    </div>
  );
}

export default Patients;