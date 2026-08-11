import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function Attendees() {
  const [search, setSearch] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAttendees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/attendees");
      setAttendees(res.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load attendees.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendees();
  }, [fetchAttendees]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendee?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/attendees/${id}`);

      alert("Attendee deleted successfully!");

      fetchAttendees();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message || "Failed to delete attendee."
      );
    }
  };

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Layout>
        <p>Loading attendees...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>View, search, edit, and manage all registered attendees.</p>

      <div className="top-bar">
        <input
          type="text"
          className="search-box"
          placeholder="Search attendees by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/admin/attendees/add">
          <button className="add-btn">+ Add Attendee</button>
        </Link>
      </div>

      <table className="event-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredAttendees.length > 0 ? (
            filteredAttendees.map((attendee, index) => (
              <tr key={attendee.id}>
                {/* Serial ID */}
                <td>{index + 1}</td>

                <td>{attendee.name}</td>
                <td>{attendee.email}</td>
                <td>{attendee.phone}</td>

                <td className="action-links">
                  <Link to={`/admin/attendees/edit/${attendee.id}`}>
                    Edit
                  </Link>

                  {" | "}

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(attendee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No attendees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}

export default Attendees;