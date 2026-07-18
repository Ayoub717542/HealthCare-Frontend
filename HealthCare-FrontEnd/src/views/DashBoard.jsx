function DashBoard() {
  return (
    <div className="dashboard">

      <div className="welcome">
        <h1>Welcome to HealthCare+</h1>
        <p>
          HealthCare+ is a platform that helps manage patients, doctors,
          appointments, and medical records in one place.
        </p>
      </div>

      <div className="cards">

        <div className="card">
          <div className="icon"><i class="fa-solid fa-user-doctor"></i></div>
          <h3>Doctors</h3>
          <span>25</span>
          <p>Manage doctors and their specialties.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-hospital-user"></i></div>
          <h3>Patients</h3>
          <span>150</span>
          <p>View and manage patient information.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-regular fa-calendar-days"></i></div>
          <h3>Appointments</h3>
          <span>42</span>
          <p>Schedule and manage appointments.</p>
        </div>

        <div className="card">
          <div className="icon"><i className="fa-solid fa-book-medical"></i></div>
          <h3>Medical Records</h3>
          <span>320</span>
          <p>Access and manage medical records.</p>
        </div>

      </div>

    </div>
  );
}

export default DashBoard;