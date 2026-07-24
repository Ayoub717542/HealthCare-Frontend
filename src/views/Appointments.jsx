import { useEffect, useState } from "react"
import api from "../service/api"

function Appointments(){
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        dateRendezVous: "",
        statut: "",
        medecinId: "",
        patientId: ""
    });

    function fetchAppointments(){
        api.get("/RendezVous/obtenirTousLesRendezVous").then((response) => {
            setAppointments(response.data.content ?? response.data)
        })
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    function handleChange(e){
        setFormData({
            ...formData,[e.target.name]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if (editingId) {
            api.put(`/RendezVous/modifier/${editingId}`, formData).then(() => {
                setShowForm(false);
                setEditingId(null);
                fetchAppointments();
            });
        } else {
            api.post("/RendezVous/ajouterRendezVous", formData).then(() => {
                setShowForm(false);
                fetchAppointments();
            })
        }
    }

    function handleEdit(appointment){
        setFormData({
            dateRendezVous: appointment.dateRendezVous,
            statut: appointment.statut,
            medecinId: appointment.medecine.id,  
            patientId: appointment.patient.id,
        });
        setEditingId(appointment.id);
        setShowForm(true);
    }

    function handleDelete(appointment) {
        const sure = window.confirm(`Anuule this appointment?`);
        if (!sure) return;
        api.put(`/RendezVous/annulerRendezVous/${appointment.id}`).then(() => {
            fetchAppointments();
        });
    }

    return (
        <div className="appointments">
            {showForm ? (
                <div className="form-container">
                    <h2>{editingId ? "Edit Appointment" : "Add Appointment"}</h2>
                    <form onSubmit={handleSubmit}>

                        <label>Patient ID</label>
                        <input name="patientId" value={formData.patientId} onChange={handleChange} />

                        <label>Doctor ID</label>
                        <input name="medecinId" value={formData.medecinId} onChange={handleChange} />

                        <label>Date</label>
                        <input type="date" name="dateRendezVous" value={formData.dateRendezVous} onChange={handleChange} />

                        <label>Status</label>
                        <select name="statut" value={formData.statut} onChange={handleChange}>
                            <option value=""> Select status</option>
                            <option value="EN_ATTENTE">On hold</option>
                            <option value="CONFIRME">Confirmed</option>
                            <option value="ANNULE">Canceled</option>
                            <option value="TERMINE">Finished</option>
                        </select>

                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            ) : (
                <>
                    <div className="table-header">
                        <h2>Appointments</h2>
                        <button onClick={() => setShowForm(true)} className="add-btn">Add Appointment</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient ID</th>
                                <th>Doctor ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td >{appointment.id}</td>
                                <td>{appointment.patient.prenom} {appointment.patient.nom}</td>
                                <td>{appointment.medecine.nom}</td>
                                <td>{appointment.dateRendezVous}</td>
                                <td><span className={`status ${appointment.statut.toLowerCase()}`}>{appointment.statut}</span></td> 
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(appointment)}>
                                        <i className="fa-solid fa-pen"></i> Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => handleDelete(appointment)}>
                                        <i className="fa-solid fa-trash"></i> Annule
                                    </button>
                                </td>
                            </tr>
                        ))}
        </tbody>
                    </table>
                </>
            )}
        </div>
    )
}
export default Appointments