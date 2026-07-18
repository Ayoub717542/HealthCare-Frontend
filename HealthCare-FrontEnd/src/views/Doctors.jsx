import { useState } from "react";

function Doctors() {

    const [showForm, setShowForm] = useState(false);


    const doctors = [
        {
            id: 1,
            name: "John Smith",
            specialty: "Cardiology",
            phone: "0612345678"
        },
        {
            id: 2,
            name: "Sarah Brown",
            specialty: "Dermatology",
            phone: "0678901234"
        },
        {
            id: 3,
            name: "Michael Lee",
            specialty: "Pediatrics",
            phone: "0654321987"
        }
    ];


    return (

        <div className="doctors">


            {showForm ? (

                // Your same form
                <div className="doctor-form">

                    <h2>Add Doctor</h2>

                    <form>

                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter doctor's name"
                        />


                        <label>Specialty</label>
                        <input
                            type="text"
                            placeholder="Enter specialty"
                        />


                        <label>Phone</label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                        />


                        <button type="submit" className="add-btn">
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


                // Your same table
                <>

                    <div className="table-header">

                        <h2>Doctors</h2>

                        <button 
                            className="add-btn"
                            onClick={() => setShowForm(true)}
                        >
                            <i className="fa-solid fa-plus"></i> Add Doctor
                        </button>

                    </div>


                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Specialty</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>


                        <tbody>

                        {doctors.map((doctor) => (

                            <tr key={doctor.id}>

                                <td>{doctor.id}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.phone}</td>


                                <td>

                                    <button className="edit-btn">
                                        <i className="fa-solid fa-pen"></i> Edit
                                    </button>


                                    <button className="delete-btn">
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

export default Doctors;