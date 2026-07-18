function Header({ open, setOpen }) {
  return (
    <header className="header">

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      
      <div className="header-right">
        <span className="admin">👤 Admin</span>
        <button className="logout-btn">
          Logout
        </button>
      </div>

    </header>
  );
}

export default Header;