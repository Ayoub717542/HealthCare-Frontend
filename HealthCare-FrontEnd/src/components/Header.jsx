function Header({open, setOpen}){
    return(
<header>        <h1>
            HealthCare
        </h1>
         <div className="header-right">
                <span>Admin</span>
                <button className="LogoutBtn">Logout</button>
            </div>

            <button
         className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
          aria-expanded="false"
            >
          <i className="fa-solid fa-bars"></i>
            </button>
       </header>
    )
}
export default Header