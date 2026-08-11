import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../services/api";
import "../styles/style.css";

function EditAttendee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAttendee = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get(`/attendees/${id}`);

      setAttendeeData({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Failed to load attendee."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAttendee();
  }, [fetchAttendee]);

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
      setSaving(true);

      await API.put(`/attendees/${id}`, attendeeData);

      alert("✅ Attendee updated successfully!");

      navigate("/admin/attendees");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update attendee."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    fetchAttendee();
  };

  if (loading) {
    return (
      <Layout title="Edit Attendee">
        <p>Loading attendee...</p>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Attendee">
      <p>Update the attendee information and save the changes.</p>

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

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? "Updating..." : "💾 Update Attendee"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={saving}
            >
              🔄 Reset
            </button>

            <Link
              to="/admin/attendees"
              className="cancel-btn"
            >
              ❌ Cancel
            </Link>

          </div>

        </form>
      </div>
    </Layout>
  );
}

export default EditAttendee;