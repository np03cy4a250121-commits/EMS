import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ title }) {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin")) || {};

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="navbar">
      <div>
        <h2>{title}</h2>
      </div>

      <div className="navbar-right">
        <Link to="/admin/dashboard">
          🏠 Home
        </Link>

        <span>
          Welcome, {admin.username || admin.name || "Admin"}
        </span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;