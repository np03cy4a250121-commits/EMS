import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function AddEvent() {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, date, time, location } = eventData;

    // Required fields
    if (!name || !description || !date || !time || !location) {
      alert("Please fill in all required fields.");
      return;
    }

    // Event name validation
    if (name.trim().length < 3) {
      alert("Event name must be at least 3 characters.");
      return;
    }

    // Description validation
    if (description.trim().length < 10) {
      alert("Description must be at least 10 characters.");
      return;
    }

    // Location validation
    if (location.trim().length < 3) {
      alert("Location must be at least 3 characters.");
      return;
    }

    // Date validation
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Event date cannot be in the past.");
      return;
    }

    try {
      await API.post("/events", eventData);

      alert("✅ Event added successfully!");

      // Redirect back to Admin Events page
      navigate("/admin/events");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add event."
      );
    }
  };

  const handleReset = () => {
    setEventData({
      name: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });
  };

  return (
    <Layout title="Add Event">
      <p>Enter the event details below to create a new event.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} autoComplete="off">

          <div className="form-group">
            <label htmlFor="name">Event Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Tech Conference 2026"
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
              placeholder="Write a short description about the event..."
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
              placeholder="e.g. Kathmandu"
              maxLength="100"
              value={eventData.location}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">

            <button type="submit" className="save-btn">
              💾 Save Event
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

export default AddEvent;