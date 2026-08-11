import { Link } from "react-router-dom";

import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

import {
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "../styles/Home.css";

function Home() {
  return (
    <>
      <UserNavbar />

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1>
            Discover Amazing Events Near You
          </h1>

          <p>
            Book your favorite events, conferences, workshops,
            concerts and festivals in just a few clicks.
          </p>

          <Link
            to="/users/events"
            className="browse-btn"
          >
            Explore Events
          </Link>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="feature-card">

          <FaCalendarAlt className="feature-icon" />

          <h3>Upcoming Events</h3>

          <p>
            Explore exciting events happening around you.
          </p>

        </div>

        <div className="feature-card">

          <FaUsers className="feature-icon" />

          <h3>Easy Registration</h3>

          <p>
            Register online within seconds.
          </p>

        </div>

        <div className="feature-card">

          <FaMapMarkerAlt className="feature-icon" />

          <h3>Best Locations</h3>

          <p>
            Attend events hosted at top venues.
          </p>

        </div>

      </section>

      {/* About */}

      <section className="about-home">

        <h2>About EventMS</h2>

        <p>
          EventMS is a simple event management platform
          where users can discover events, register online,
          and administrators can manage events,
          attendees, and registrations efficiently.
        </p>

      </section>

      <Footer />
    </>
  );
}

export default Home;