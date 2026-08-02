import { useEffect, useState } from "react"
import api from "../service/api"
import { useForm } from "react-hook-form";

function Appointments(){
    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const {register, reset,handleSubmit,formState:{ errors }} = useForm();
    

    function fetchAppointments(){
        api.get("/RendezVous/obtenirTousLesRendezVous").then((response) => {
            setAppointments(response.data.content ?? response.data)
        })
    }
    useEffect(() => {
        fetchAppointments();
    }, []);

    function onSubmit(data){
        if (editingId) {
            api.put(`/RendezVous/modifier/${editingId}`, data).then(() => {
                setShowForm(false);
                setEditingId(null);
                reset();
                fetchAppointments();
            });
        } else {
            api.post("/RendezVous/ajouterRendezVous", data).then(() => {
                setShowForm(false);
                reset();
                fetchAppointments();
            })
        }
    }

    function handleEdit(appointment){
reset({
        dateRendezVous: appointment.dateRendezVous,
        statut: appointment.statut,
        medecinId: appointment.medecine.id,
        patientId: appointment.patient.id
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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Patient ID</label>
                        <input {...register("patientId",{
                            required:"patient ID Is required !",
                            valueAsNumber: true
                        })} 
                        type="Number"
                    
/>
                    {errors.patientId &&(<p className="error-text">{errors.patientId.message}</p>)}
                        <label>Doctor ID</label>
                        <input {...register("medecinId",{
                            required:"doctor Id is required",
                        })} 
                        type="number"
                        />
                    {errors.DoctorId &&(<p className="error-text">{errors.DoctorId.message}</p>)}
                        <label>Appiontment date</label>
                        <input 
                        {...register("dateRendezVous",{
                            required:"date is required",
                        })}
                        type="date"
                        />
                     {errors.date &&(<p className="error-text">{errors.date.message}</p>)}

                        <label>Status</label>
                        <select {...register("statut",{required:"statuts is required"})}>
                            <option value=""> Select status</option>
                            <option value="EN_ATTENTE">On hold</option>
                            <option value="CONFIRME">Confirmed</option>
                            <option value="ANNULE">Canceled</option>
                            <option value="TERMINE">Finished</option>
                        </select>
                 {errors.status &&(<p className="error-text">{errors.status.message}</p>)}
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