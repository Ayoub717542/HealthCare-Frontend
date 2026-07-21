import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUserInjured,
  FaUserMd,
  FaCalendarAlt,
  FaFolderOpen,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt 
} from "react-icons/fa";

function Sidebar({open, user}) {

  return (
    <aside className={`sidebar ${open ? "active" : ""}`}>

      <div className="logo">
        <h2>
          Health <span>Care+</span>
        </h2>
      </div>

      <nav>

        <NavLink to="/">
          <FaHome />
          <span>DashBoard</span>
        </NavLink>

        <NavLink to="/patients">
          <FaUserInjured />
          <span>Patients</span>
        </NavLink>

        <NavLink to="/doctors">
          <FaUserMd />
          <span>Doctors</span>
        </NavLink>

        <NavLink to="/appointments">
          <FaCalendarAlt />
          <span>Appoinments</span>
        </NavLink>

        <NavLink to="/records">
          <FaFolderOpen />
          <span>Medical Records</span>
        </NavLink>

        <NavLink to="/about">
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