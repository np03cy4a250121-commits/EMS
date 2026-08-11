import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    alert("Logged out successfully.");

    navigate("/admin/login");
  };

  return (
    <div className="sidebar">
      <h2>EventMS</h2>

      <ul>
        <li>
          <Link to="/admin/dashboard">
            🏠 Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/events">
            📅 Events
          </Link>
        </li>

        <li>
          <Link to="/admin/attendees">
            👥 Attendees
          </Link>
        </li>

        <li>
          <Link to="/admin/registration">
            📝 Registration
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
              textAlign: "left",
              padding: "10px 15px",
            }}
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;