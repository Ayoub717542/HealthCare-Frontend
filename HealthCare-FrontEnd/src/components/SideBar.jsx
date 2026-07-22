import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaFolderOpen,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserCircle 
} from "react-icons/fa";
import {getUserRole} from "../utils/auth"
import { use } from "react";
function Sidebar({open, user,setOpen}) {

  const userRole = getUserRole();

  return (
    <aside className={`sidebar ${open ? "active" : ""}`}>

      <div className="logo">
        <h2>
          Health <span>Care+</span>
        </h2>
      </div>

      <nav>

        <NavLink to="/" onClick={()=> setOpen(false)}>
          <FaHome />
          <span>DashBoard</span>
        </NavLink>

        {userRole ==="ADMIN" && (
          <>
          <NavLink to="/patients" onClick={() => setOpen(false)}>
              <FaUserInjured />
              <span>Patients</span>
            </NavLink>

          <NavLink to="/doctors" onClick={()=> setOpen(false)}>
          <FaUserMd />
          <span>Doctors</span>
        </NavLink>

         <NavLink to="/appointments" onClick={()=> setOpen(false)}>
          <FaCalendarAlt />
          <span>Appoinments</span>
        </NavLink>

         <NavLink to="/records" onClick={()=> setOpen(false)}>
          <FaFolderOpen />
          <span>Medical Records</span>
        </NavLink>
        
          </>
        )}

        { userRole ==="ADMIN" || userRole === "MEDECIN" && (
<>
          <NavLink to="/appointments" onClick={()=> setOpen(false)}>
          <FaCalendarAlt />
          <span>Appoinments</span>
        </NavLink>
         <NavLink to="/records" onClick={()=> setOpen(false)}>
          <FaFolderOpen />
          <span>Medical Records</span>
        </NavLink>
         <NavLink to="/about" onClick={()=> setOpen(false)}>
          <FaInfoCircle />
          <span>About</span>
        </NavLink>
</>
 )}
      {userRole === "PATIENT" && (
        <>
        <NavLink to="/patientProfile" onClick={()=> setOpen(false)} >
       <FaUserCircle />
        <span>Profile</span>
       
        </NavLink>

        <NavLink to="/appointments" onClick={() => setOpen(false)}>
              <FaCalendarAlt />
              <span>My Appointments</span>
        </NavLink>

         <NavLink to="/records" onClick={() => setOpen(false)}>
              <FaFolderOpen />
              <span>My Medical Records</span>
         </NavLink>

        </>

      )}
          <NavLink to="/about" onClick={()=> setOpen(false)}>
          <FaInfoCircle />
          <span>About</span>
        </NavLink>

      </nav>

      <div className="bottom">
        <div>
          <small>{user?.username}</small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;