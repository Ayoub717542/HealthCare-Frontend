import { useEffect, useState } from "react";
import api from "../service/api";
import axios from "axios";
import {getUserRole} from "../utils/auth";

function DashBoard() {

  const username=localStorage.getItem("username");

  const userRole = getUserRole();

  const [counts,setCounts]= useState({
  doctors: 0,
  patients: 0,
  appointments: 0,
  medicalRecords: 0
  }
  );

 useEffect(() => {
  Promise.all([
    api.get("/patients/count"),
    api.get("/medecine/count"),
    api.get("/RendezVous/count"),
    api.get("/DossierMedical/count")
  ]).then(([patients, doctors, appointments, records]) => {
    setCounts({
      patients: patients.data,
      doctors: doctors.data,
      appointments: appointments.data,
      medicalRecords: records.data
    });
  });
}, []);

  return (
    <div className="dashboard">
      <div className="welcome">
        {userRole ==="ADMIN" && (
          <>
            <h1>Welcome back, Admin {username}</h1>
        <p>
          Manage your healthcare platform from one place. You can manage patients, doctors, appointments, and medical records.
        </p>
        <div className="cards">
        <div className="card">
          <div className="icon"><i className="fa-solid fa-user-doctor"></i></div>
          <h3>Doctors</h3>
          <span>{counts.doctors}</span>
          <p>Manage doctors and their specialties.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-hospital-user"></i></div>
          <h3>Patients</h3>
          <span>{counts.patients}</span>
          <p>View and manage patient information.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-regular fa-calendar-days"></i></div>
          <h3>Appointments</h3>
          <span>{counts.appointments}</span>
          <p>Schedule and manage appointments.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-book-medical"></i></div>
          <h3>Medical Records</h3>
          <span>{counts.medicalRecords}</span>
          <p>Access and manage medical records.</p>
        </div>

      </div>
          </>
        )}

           {userRole ==="MEDECIN" && (
          <>
            <h1>Welcome back, Doctor {username}</h1>
        <p>
              Manage your appointments and follow your patients' medical information from your dashboard.</p>

      <div className="cards">
        <div className="card">
          <div className="icon"><i className="fa-solid fa-hospital-user"></i></div>
          <h3>Patients</h3>
          <span>{counts.patients}</span>
          <p>View and manage patient information.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-regular fa-calendar-days"></i></div>
          <h3>Appointments</h3>
          <span>{counts.appointments}</span>
          <p>Schedule and manage appointments.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-book-medical"></i></div>
          <h3>Medical Records</h3>
          <span>{counts.medicalRecords}</span>
          <p>Access and manage medical records.</p>
        </div>

      </div>
          </>          
        )}

           {userRole ==="PATIENT" && (
          <>
            <h1>Welcome back {username}</h1>
        <p>
          Manage your appointments and access your medical information easily from your personal dashboard.</p>

             <div className="cards">
        <div className="card">
          <div className="icon"><i className="fa-solid fa-user-doctor"></i></div>
          <h3>Doctors</h3>
          <span>{counts.doctors}</span>
          <p>Manage doctors and their specialties.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-regular fa-calendar-days"></i></div>
          <h3>Appointments</h3>
          <span>{counts.appointments}</span>
          <p>Schedule and manage appointments.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-book-medical"></i></div>
          <h3>Medical Records</h3>
          <span>{counts.medicalRecords}</span>
          <p>Access and manage medical records.</p>
        </div>

      </div>
          </>
        )}
      </div>

    </div>
  );
}

export default DashBoard;