import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function AddAttendee() {
  const navigate = useNavigate();

  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAttendeeData({
      ...attendeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone } = attendeeData;

    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (name.trim().length < 3) {
      alert("Name must be at least 3 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return;
    }

    try {
      await API.post("/attendees", attendeeData);

      alert("✅ Attendee added successfully!");

      navigate("/admin/attendees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to add attendee."
      );
    }
  };

  const handleReset = () => {
    setAttendeeData({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <Layout title="Add Attendee">
      <p>Enter the attendee's information below.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit} autoComplete="off">

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter full name"
              maxLength="100"
              value={attendeeData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              maxLength="100"
              value={attendeeData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="98XXXXXXXX"
              maxLength="10"
              value={attendeeData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">

            <button type="submit" className="save-btn">
              💾 Save Attendee
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              🔄 Reset
            </button>

            <Link to="/admin/attendees" className="cancel-btn">
              ❌ Cancel
            </Link>

          </div>

        </form>
      </div>
    </Layout>
  );
}

export default AddAttendee;