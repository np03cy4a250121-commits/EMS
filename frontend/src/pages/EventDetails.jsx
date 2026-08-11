import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";

import API from "../services/api";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

import "../styles/EventDetails.css";


// ======================================================
// EVENT IMAGES
// ======================================================

const getEventImage = (eventName = "", eventId = 1) => {
  const name = eventName.toLowerCase().trim();


  // ====================================================
  // TECH / INNOVATION
  // ====================================================

  if (
    name.includes("tech") ||
    name.includes("innovation") ||
    name.includes("summit")
  ) {
    return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // STARTUP / PITCH
  // ====================================================

  if (
    name.includes("startup") ||
    name.includes("pitch") ||
    name.includes("entrepreneur")
  ) {
    return "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // WOMEN / LEADERSHIP
  // ====================================================

  if (
    name.includes("women") ||
    name.includes("leadership")
  ) {
    return "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // GAMING
  // ====================================================

  if (
    name.includes("gaming") ||
    name.includes("game") ||
    name.includes("esports")
  ) {
    return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // ROBOTICS
  // ====================================================

  if (
    name.includes("robot") ||
    name.includes("robotics")
  ) {
    return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // CAREER
  // ====================================================

  if (
    name.includes("career") ||
    name.includes("job") ||
    name.includes("fair")
  ) {
    return "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // MARKETING
  // ====================================================

  if (
    name.includes("marketing") ||
    name.includes("digital")
  ) {
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // PHOTOGRAPHY
  // ====================================================

  if (
    name.includes("photography") ||
    name.includes("photo")
  ) {
    return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // MUSIC / CONCERT
  // ====================================================

  if (
    name.includes("music") ||
    name.includes("concert") ||
    name.includes("fiesta") ||
    name.includes("festival")
  ) {
    return "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // POETRY / LITERATURE
  // ====================================================

  if (
    name.includes("poetry") ||
    name.includes("poem") ||
    name.includes("literature")
  ) {
    return "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // ART
  // ====================================================

  if (
    name.includes("art") ||
    name.includes("painting") ||
    name.includes("creative")
  ) {
    return "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // AI
  // ====================================================

  if (
    name.includes("artificial intelligence") ||
    name.includes("artificial-intelligence") ||
    /\bai\b/.test(name)
  ) {
    return "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // WEB DEVELOPMENT
  // ====================================================

  if (
    name.includes("web development") ||
    name.includes("website") ||
    name.includes("frontend") ||
    name.includes("backend")
  ) {
    return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // MOBILE
  // ====================================================

  if (
    name.includes("mobile") ||
    name.includes("android") ||
    name.includes("ios")
  ) {
    return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // DEVOPS
  // ====================================================

  if (
    name.includes("devops") ||
    name.includes("docker") ||
    name.includes("kubernetes")
  ) {
    return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // CYBER SECURITY
  // ====================================================

  if (
    name.includes("cyber") ||
    name.includes("security") ||
    name.includes("hacking")
  ) {
    return "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // CLOUD
  // ====================================================

  if (name.includes("cloud")) {
    return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // WORKSHOP
  // ====================================================

  if (name.includes("workshop")) {
    return "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // CONFERENCE
  // ====================================================

  if (
    name.includes("conference") ||
    name.includes("convention")
  ) {
    return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // BUSINESS
  // ====================================================

  if (
    name.includes("business") ||
    name.includes("finance") ||
    name.includes("networking")
  ) {
    return "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // FOOD
  // ====================================================

  if (
    name.includes("food") ||
    name.includes("cooking") ||
    name.includes("culinary")
  ) {
    return "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // SPORTS
  // ====================================================

  if (
    name.includes("sport") ||
    name.includes("football") ||
    name.includes("basketball") ||
    name.includes("cricket")
  ) {
    return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // EDUCATION
  // ====================================================

  if (
    name.includes("education") ||
    name.includes("seminar") ||
    name.includes("lecture")
  ) {
    return "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // ENVIRONMENT
  // ====================================================

  if (
    name.includes("environment") ||
    name.includes("green") ||
    name.includes("climate")
  ) {
    return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80";
  }


  // ====================================================
  // FALLBACK IMAGES
  //
  // Unknown events get different images based on ID.
  // ====================================================

  const fallbackImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",

    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  ];


  return fallbackImages[
    Math.abs(Number(eventId) || 0) % fallbackImages.length
  ];
};


// ======================================================
// EVENT DETAILS COMPONENT
// ======================================================

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);


  // ====================================================
  // FETCH EVENT
  // ====================================================

  useEffect(() => {
    fetchEvent();
  }, [id]);


  const fetchEvent = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/events/${id}`);

      setEvent(res.data);

    } catch (error) {
      console.log("Error fetching event:", error);

    } finally {
      setLoading(false);
    }
  };


  // ====================================================
  // USER EVENT REGISTER
  // ====================================================

  const handleRegister = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );


      if (!user) {
        alert("Please login first");
        return;
      }


      setRegistering(true);


      const response = await API.post(
        "/registrations",
        {
          eventId: event.id,
          userId: user.id,
        }
      );


      alert(response.data.message);

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setRegistering(false);
    }
  };


  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return (
      <>
        <UserNavbar />

        <h2 className="loading">
          Loading...
        </h2>

        <Footer />
      </>
    );
  }


  // ====================================================
  // EVENT NOT FOUND
  // ====================================================

  if (!event) {
    return (
      <>
        <UserNavbar />

        <div className="event-not-found">

          <h2>
            Event Not Found
          </h2>


          <Link
            to="/users/events"
            className="back-btn"
          >
            <FaArrowLeft />
            Back to Events
          </Link>

        </div>

        <Footer />
      </>
    );
  }


  // ====================================================
  // EVENT IMAGE
  // ====================================================

  const eventImage = getEventImage(
    event.name,
    event.id
  );


  // ====================================================
  // PAGE
  // ====================================================

  return (
    <>
      <UserNavbar />


      <div className="event-details-container">


        {/* ================= EVENT IMAGE ================= */}

        <div className="event-banner">

          <img
            src={eventImage}
            alt={event.name}
            className="details-image"
          />

        </div>


        {/* ================= EVENT CONTENT ================= */}

        <div className="details-content">

          <h1>
            {event.name}
          </h1>


          <p className="description">
            {event.description ||
              "Join this exciting event and expand your knowledge while networking with professionals."}
          </p>


          {/* ================= EVENT INFORMATION ================= */}

          <div className="details-info">

            <p>
              <FaCalendarAlt />

              <strong>
                Date:
              </strong>

              {event.date}
            </p>


            <p>
              <FaClock />

              <strong>
                Time:
              </strong>

              {event.time || "10:00 AM"}
            </p>


            <p>
              <FaMapMarkerAlt />

              <strong>
                Location:
              </strong>

              {event.location}
            </p>


            <p>
              <FaUsers />

              <strong>
                Capacity:
              </strong>

              {event.capacity || "Unlimited"}
            </p>

          </div>


          {/* ================= REGISTER ================= */}

          <button
            className="register-btn"
            onClick={handleRegister}
            disabled={registering}
          >
            {registering
              ? "Registering..."
              : "Register Now"}
          </button>


          <br />
          <br />


          {/* ================= BACK ================= */}

          <Link
            to="/users/events"
            className="back-btn"
          >
            <FaArrowLeft />

            Back to Events
          </Link>

        </div>

      </div>


      <Footer />

    </>
  );
}


export default EventDetails;