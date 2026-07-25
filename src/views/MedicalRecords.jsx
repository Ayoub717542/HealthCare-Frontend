import { useEffect, useState } from "react";
import api from "../service/api";

function MedicalRecords(){

  const [recordes, setRecordes] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showForm, setShowForm]= useState(false);
  const [diagnosticInput, setDiagnosticInput] = useState("");
  const [observationInput, setObservationInput] = useState("");


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


     function handleEdit(record) {
    setSelectedRecord(record);
    setDiagnosticInput(record.diagnostic || "");
    setObservationInput(record.observations || "");
    setShowForm(true);
  }

  function handleAddClick() {
    setSelectedRecord(null);
    setDiagnosticInput("");
    setObservationInput("");
    setShowForm(true);
  }

    function saveDiagnostic(patientId) {
    api.put(`/DossierMedical/${patientId}/diagnostic`, diagnosticInput, {
      headers: { "Content-Type": "text/plain" },
    })
      .then(() => {
        fetchMedicalRecords(); 
      })
      .catch((error) => console.log(error));
  }

    function saveObservation(patientId) {
    api.put(`/DossierMedical/${patientId}/observation`, observationInput, {
      headers: { "Content-Type": "text/plain" },
    })
      .then(() => {
        fetchMedicalRecords(); // refresh the table
      })
      .catch((error) => console.log(error));
  }
 
  // When the user submits the edit form
  function handleUpdateSubmit(e) {
    e.preventDefault();
 
    if (!selectedRecord) return;
 
    const patientId = selectedRecord.patient?.id;
 
    saveDiagnostic(patientId);
    saveObservation(patientId);
 
    setShowForm(false);
  }

    return(
    <div className="recordes">
      <div className="table-header">
        <h2>Medical Records</h2>
        <button onClick={handleAddClick}>Add a Record</button>
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
          {recordes.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.diagnostic}</td>
              <td>{record.observations}</td>
              <td>{record.dateCreation}</td>
              <td>
                {record.patient?.nom} {record.patient?.prenom}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(record)}>
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* Simple form shown only when showForm is true */}
      {showForm && (
        <div className="record-form-overlay">
          <form className="record-form" onSubmit={handleUpdateSubmit}>
            <h3>{selectedRecord ? "Edit Record" : "Add Record"}</h3>
 
            <label>Diagnostic</label>
            <input
              type="text"
              value={diagnosticInput}
              onChange={(e) => setDiagnosticInput(e.target.value)}
            />
 
            <label>Observation</label>
            <input
              type="text"
              value={observationInput}
              onChange={(e) => setObservationInput(e.target.value)}
            />
 
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default MedicalRecords