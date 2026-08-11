import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function ViewEvent() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          Loading event...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-message">
          {error}
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="error-message">
          Event not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="page-header">
        <h1>Event Details</h1>
        <p>
          View complete information about the selected event and its
          registered attendees.
        </p>
      </div>


      {/* ================= EVENT DETAILS ================= */}

      <div className="details-container">

        <h2>📅 {event.name}</h2>

        <div className="detail-item">
          <strong>Description</strong>
          <p>{event.description}</p>
        </div>


        <div className="details-grid">

          <div className="detail-card">
            <h3>Date</h3>
            <p>{event.date}</p>
          </div>


          <div className="detail-card">
            <h3>Time</h3>
            <p>{event.time}</p>
          </div>


          <div className="detail-card">
            <h3>Location</h3>
            <p>{event.location}</p>
          </div>


          <div className="detail-card">
            <h3>Registered Attendees</h3>
            <p>{event.registeredAttendees || 0}</p>
          </div>

        </div>

      </div>


      {/* ================= REGISTERED ATTENDEES ================= */}

      <div className="table-container">

        <h2>Registered Attendees</h2>

        <table className="event-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>


          <tbody>

            {event.registrations &&
            event.registrations.length > 0 ? (

              event.registrations.map((registration) => (

                <tr key={registration.id}>

                  <td>
                    {registration.attendee?.name || "Unknown"}
                  </td>

                  <td>
                    {registration.attendee?.email || "-"}
                  </td>

                  <td>
                    {registration.attendee?.phone || "-"}
                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  style={{ textAlign: "center" }}
                >
                  No attendees registered for this event.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* ================= BUTTONS ================= */}

      <div className="button-group">

        {/* FIXED EDIT ROUTE */}
        <Link
          to={`/admin/events/edit/${event.id}`}
          className="save-btn"
        >
          ✏️ Edit Event
        </Link>


        {/* FIXED BACK ROUTE */}
        <Link
          to="/admin/events"
          className="cancel-btn"
        >
          ⬅ Back to Events
        </Link>

      </div>

    </Layout>
  );
}

export default ViewEvent;