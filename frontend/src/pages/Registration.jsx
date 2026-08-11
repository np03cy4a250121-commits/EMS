import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function Registration() {

  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [registration, setRegistration] = useState({
    eventId: "",
    attendeeId: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchAttendees = useCallback(async () => {
    try {
      const res = await API.get("/attendees");
      setAttendees(res.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Get registered attendees of selected event
  const fetchRegistrations = useCallback(async (eventId) => {

    if (!eventId) {
      setRegistrations([]);
      return;
    }

    try {

      const res = await API.get(
        `/registrations/event/${eventId}`
      );

      console.log(
        "Selected Event Registrations:",
        res.data
      );

      setRegistrations(res.data);

    } catch (error) {

      console.log(error);

      setRegistrations([]);

    }

  }, []);

  useEffect(() => {

    const loadData = async () => {

      setLoading(true);

      await Promise.all([
        fetchEvents(),
        fetchAttendees()
      ]);

      setLoading(false);

    };

    loadData();

  }, [fetchEvents, fetchAttendees]);

  useEffect(() => {

    fetchRegistrations(
      registration.eventId
    );

  }, [
    registration.eventId,
    fetchRegistrations
  ]);

  const handleChange = (e) => {

    setRegistration({
      ...registration,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !registration.eventId ||
      !registration.attendeeId
    ) {

      alert(
        "Please select event and attendee"
      );

      return;

    }

    try {

      await API.post(
        "/registrations",
        registration
      );

      alert(
        "Attendee registered successfully"
      );

      fetchRegistrations(
        registration.eventId
      );

      setRegistration({
        ...registration,
        attendeeId: ""
      });

    } catch (err) {

      console.log(err);

      alert(
        "Registration failed"
      );

    }

  };

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this registration?"
      )
    )
      return;

    try {

      await API.delete(
        `/registrations/${id}`
      );

      alert(
        "Registration deleted"
      );

      fetchRegistrations(
        registration.eventId
      );

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {

    return (

      <Layout title="Event Registration">

        <h2>
          Loading...
        </h2>

      </Layout>

    );

  }

  return (

    <Layout title="Event Registration">

      <p className="page-description">
        Assign attendees to events and manage registrations.
      </p>

      <div className="form-container">

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Select Event
            </label>

            <select
              name="eventId"
              value={registration.eventId}
              onChange={handleChange}
            >

              <option value="">
                Select Event
              </option>

              {
                events.map(event => (

                  <option
                    key={event.id}
                    value={event.id}
                  >

                    {event.name}

                  </option>

                ))
              }

            </select>

          </div>

          <div className="form-group">

            <label>
              Select Attendee
            </label>

            <select
              name="attendeeId"
              value={registration.attendeeId}
              onChange={handleChange}
            >

              <option value="">
                Select Attendee
              </option>

              {
                attendees.map(attendee => (

                  <option
                    key={attendee.id}
                    value={attendee.id}
                  >

                    {attendee.name}

                  </option>

                ))
              }

            </select>

          </div>

          <button
            type="submit"
            className="save-btn"
          >

            Register Attendee

          </button>

          <Link
            to="/admin/dashboard"
            className="cancel-btn"
          >

            Cancel

          </Link>

        </form>

      </div>

      <div className="table-container">

        <h2>
          Registered Attendees
        </h2>

        <table className="event-table">

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              registrations.length > 0 ? (

                registrations.map(item => (

                  <tr key={item.id}>

                    <td>
                      {item.attendee?.name || "Unknown"}
                    </td>

                    <td>
                      {item.attendee?.email || "-"}
                    </td>

                    <td>
                      {item.attendee?.phone || "-"}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    Select an event to see registered attendees.

                  </td>

                </tr>

              )

            }

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Registration;