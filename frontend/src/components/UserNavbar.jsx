import { Link, useNavigate } from "react-router-dom";
import "../styles/UserNavbar.css";

function UserNavbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/user/login");
  };

  return (
    <nav className="user-navbar">

      <div className="logo">
        EventMS
      </div>

      <div className="nav-links">

        <Link to="/users">
          Home
        </Link>

        <Link to="/users/events">
          Events
        </Link>

        <Link to="/users/about">
          About
        </Link>

      </div>


      <button 
        className="logout-btn"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}

export default UserNavbar;