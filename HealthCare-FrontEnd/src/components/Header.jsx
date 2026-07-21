import { Navigate, useNavigate } from "react-router-dom";

function Header({ open, setOpen }) {

  const username = localStorage.getItem("username")
  
  const navigate = useNavigate()

  function Logout(){
  localStorage.removeItem("token");
  navigate("/login")
  }

  return (
    <header className="header">

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="header-right">
        <span className="admin">{username}</span>
        <button className="logout-btn" onClick={Logout} >
          Logout
        </button>
      </div>

    </header>
  );
}

export default Header;