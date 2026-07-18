import { useEffect, useState } from "react";
import api from "../service/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [showForm,setShowForm]=useState(false);

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
    <div className="patients">
      {showForm ? (
         <div className="patient-form">

                    <h2>Add Patient</h2>

                    <form>

                        <label>First Name</label>
                        <input type="text" placeholder="Enter first name" />

                        <label>Last Name</label>
                        <input type="text" placeholder="Enter last name" />

                        <label>Phone</label>
                        <input type="text" placeholder="Enter phone" />


                        <button className="add-btn">
                            Save
                        </button>


                        <button 
                            type="button"
                            className="cancel-btn"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>

                    </form>

                </div>
  ) : (
   
                <>

                    <div className="table-header">

                        <h2>Patients</h2>

                        <button 
                            className="add-btn"
                            onClick={() => setShowForm(true)}
                        >
                            <i className="fa-solid fa-plus"></i> Add Patient
                        </button>

                    </div>


                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                        <tbody>

                        {patients.map((patient) => (

                            <tr key={patient.id}>

                                <td>{patient.id}</td>

                                <td>
                                    {patient.firstName} {patient.lastName}
                                </td>

                                <td>{patient.phone}</td>


                                <td>

                                    <button className="edit-btn">
                                        Edit
                                    </button>

                                    <button className="delete-btn">
                                        Delete
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

      {/* <h1>Patients</h1>

      {patients.map((patient) => (
        <div key={patient.id}>
          <p>{patient.firstName} {patient.lastName}</p>
        </div>
      ))}
    </div>
  ); */}


export default Patients;