import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

import "../styles/About.css";

function About() {
  return (
    <>
      <UserNavbar />

      <section className="about-page">

        <div className="about-container">

          <h1>About EventMS</h1>

          <p>
            EventMS (Event Management System) is an online platform designed
            to make event discovery and registration simple, fast, and
            convenient.
          </p>

          <p>
            Our system allows users to explore upcoming events, view complete
            event details, and register for events easily without any
            complicated process.
          </p>

          <h2>Our Mission</h2>

          <p>
            Our mission is to provide a reliable and user-friendly event
            management solution that helps organizers manage events efficiently
            and helps attendees participate in events smoothly.
          </p>


          <h2>Features</h2>

          <ul>
            <li>Browse upcoming events</li>
            <li>View event details including date, time, and location</li>
            <li>Online event registration</li>
            <li>Easy event management for administrators</li>
            <li>Secure and organized attendee management</li>
          </ul>


          <h2>Why Choose EventMS?</h2>

          <p>
            EventMS saves time by bringing event information and registration
            into one simple platform. Whether you are an attendee looking for
            exciting events or an organizer managing events, our system makes
            the process easier.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default About;