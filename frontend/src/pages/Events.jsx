import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = useCallback(async (searchText = "", showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      setError("");

      const res = await API.get(`/events?search=${searchText}`);
      setEvents(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load events.");
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchEvents("", true);
  }, [fetchEvents]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchEvents(value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/events/${id}`);

      alert("Event deleted successfully.");

      fetchEvents(search);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete event.");
    }
  };

  if (loading) {
    return (
      <Layout title="Events">
        <p>Loading events...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Events">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="top-bar">
        <input
          type="text"
          className="search-box"
          placeholder="Search event by name..."
          value={search}
          onChange={handleSearch}
        />

        <Link to="/admin/events/add" className="add-btn">
          + Add Event
        </Link>
      </div>

      <table className="event-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>

                <td>
                  <Link
                    to={`/admin/events/view/${event.id}`}
                    className="view-btn"
                  >
                    View
                  </Link>

                  {" | "}

                  <Link
                    to={`/admin/events/edit/${event.id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  {" | "}

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No events found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default Events;