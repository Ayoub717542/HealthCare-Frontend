import { NavLink } from "react-router-dom";

function Sidebar({open}){
    return(

        <aside className={open ? "active" : ""}>
        <NavLink to="/">Accueil</NavLink>

      <NavLink to="/DashBoard">Dashboard</NavLink>

      <NavLink to="/patients">Patients</NavLink>

      <NavLink to="/doctors">Médecins</NavLink>

      <NavLink to="/appointments">Rendez-vous</NavLink>

      <NavLink to="/records">records</NavLink>

      <NavLink to="/about">À propos</NavLink>

        </aside>

    )
}
export default Sidebar