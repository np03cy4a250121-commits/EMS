import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get(`/events/${id}`);

      setEventData({
        name: res.data.name || "",
        description: res.data.description || "",
        date: res.data.date || "",
        time: res.data.time || "",
        location: res.data.location || "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load event.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, date, time, location } = eventData;

    if (!name || !description || !date || !time || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    if (name.trim().length < 3) {
      alert("Event name must be at least 3 characters.");
      return;
    }

    if (description.trim().length < 10) {
      alert("Description must be at least 10 characters.");
      return;
    }

    if (location.trim().length < 3) {
      alert("Location must be at least 3 characters.");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Event date cannot be in the past.");
      return;
    }

    try {
      await API.put(`/events/${id}`, eventData);

      alert("✅ Event updated successfully!");

      navigate("/admin/events");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to update event."
      );
    }
  };

  const handleReset = () => {
    fetchEvent();
  };

  if (loading) {
    return (
      <Layout title="Edit Event">
        <p>Loading event...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Event">
      <p>Modify the event information below and save the changes.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} autoComplete="off">

          <div className="form-group">
            <label htmlFor="name">Event Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter event name"
              maxLength="100"
              value={eventData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              rows="5"
              maxLength="500"
              value={eventData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Event Date</label>

              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Event Time</label>

              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>

            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter event location"
              maxLength="100"
              value={eventData.location}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="save-btn">
              💾 Update Event
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              🔄 Reset
            </button>

            <Link to="/admin/events" className="cancel-btn">
              ❌ Cancel
            </Link>
          </div>

        </form>
      </div>
    </Layout>
  );
}

export default EditEvent;