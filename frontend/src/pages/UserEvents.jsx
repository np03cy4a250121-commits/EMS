import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

import "../styles/UserEvents.css";


function UserEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");


  // ==========================
  // FETCH EVENTS
  // ==========================

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };


  // ==========================
  // EVENT IMAGES
  // ==========================

  const getImage = (eventName = "", eventId = 1) => {
    const name = eventName.toLowerCase().trim();


    // --------------------------------
    // Technology
    // --------------------------------

    if (
      name.includes("tech") ||
      name.includes("innovation") ||
      name.includes("summit")
    ) {
      return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Startup / Pitch
    // --------------------------------

    if (
      name.includes("startup") ||
      name.includes("pitch") ||
      name.includes("entrepreneur")
    ) {
      return "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Women / Leadership
    // --------------------------------

    if (
      name.includes("women") ||
      name.includes("leadership")
    ) {
      return "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Gaming
    // --------------------------------

    if (
      name.includes("gaming") ||
      name.includes("game") ||
      name.includes("esports")
    ) {
      return "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Robotics
    // --------------------------------

    if (
      name.includes("robot") ||
      name.includes("robotics")
    ) {
      return "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Career
    // --------------------------------

    if (
      name.includes("career") ||
      name.includes("job") ||
      name.includes("fair")
    ) {
      return "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Marketing
    // --------------------------------

    if (
      name.includes("marketing") ||
      name.includes("digital")
    ) {
      return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Photography
    // --------------------------------

    if (
      name.includes("photography") ||
      name.includes("photo")
    ) {
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Music / Concert
    // --------------------------------

    if (
      name.includes("music") ||
      name.includes("concert") ||
      name.includes("fiesta")
    ) {
      return "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Poetry / Literature
    // --------------------------------

    if (
      name.includes("poetry") ||
      name.includes("poem") ||
      name.includes("literature")
    ) {
      return "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Artificial Intelligence
    // --------------------------------

    if (
      name.includes("artificial intelligence") ||
      name.includes("artificial-intelligence") ||
      /\bai\b/.test(name)
    ) {
      return "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Web Development
    // --------------------------------

    if (
      name.includes("web development") ||
      name.includes("web development") ||
      name.includes("website")
    ) {
      return "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Mobile
    // --------------------------------

    if (
      name.includes("mobile") ||
      name.includes("android") ||
      name.includes("ios")
    ) {
      return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // DevOps
    // --------------------------------

    if (
      name.includes("devops") ||
      name.includes("docker") ||
      name.includes("kubernetes")
    ) {
      return "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Cyber Security
    // --------------------------------

    if (
      name.includes("cyber") ||
      name.includes("security") ||
      name.includes("hacking")
    ) {
      return "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Cloud
    // --------------------------------

    if (name.includes("cloud")) {
      return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Workshop
    // --------------------------------

    if (name.includes("workshop")) {
      return "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Conference
    // --------------------------------

    if (
      name.includes("conference") ||
      name.includes("convention")
    ) {
      return "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Business
    // --------------------------------

    if (
      name.includes("business") ||
      name.includes("finance") ||
      name.includes("entrepreneurship")
    ) {
      return "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Art
    // --------------------------------

    if (
      name.includes("art") ||
      name.includes("painting") ||
      name.includes("creative")
    ) {
      return "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Food
    // --------------------------------

    if (
      name.includes("food") ||
      name.includes("cooking") ||
      name.includes("culinary")
    ) {
      return "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Sports
    // --------------------------------

    if (
      name.includes("sport") ||
      name.includes("football") ||
      name.includes("basketball") ||
      name.includes("cricket")
    ) {
      return "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Education
    // --------------------------------

    if (
      name.includes("education") ||
      name.includes("seminar") ||
      name.includes("lecture")
    ) {
      return "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // Environment
    // --------------------------------

    if (
      name.includes("environment") ||
      name.includes("green") ||
      name.includes("climate")
    ) {
      return "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80";
    }


    // --------------------------------
    // DEFAULT
    //
    // IMPORTANT:
    // Every unknown event gets a different
    // image based on its ID.
    // --------------------------------

    const fallbackImages = [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80"
    ];

    return fallbackImages[
      Math.abs(Number(eventId) || 0) % fallbackImages.length
    ];
  };


  // ==========================
  // SEARCH
  // ==========================

  const filteredEvents = events.filter((event) =>
    event.name?.toLowerCase().includes(search.toLowerCase())
  );


  // ==========================
  // PAGE
  // ==========================

  return (
    <>
      <UserNavbar />


      <div className="user-events-container">

        <div className="events-header">

          <div>
            <h1>Upcoming Events</h1>

            <p>
              Discover exciting events and register for your favorites.
            </p>
          </div>


          <input
            type="text"
            placeholder="Search events..."
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <div className="event-grid">

          {filteredEvents.length > 0 ? (

            filteredEvents.map((event) => (

              <div
                className="event-card"
                key={event.id}
              >

                <img
                  src={getImage(event.name, event.id)}
                  alt={event.name}
                  className="event-image"
                />


                <div className="event-content">

                  <h2>{event.name}</h2>


                  <p className="event-description">

                    {event.description
                      ? event.description.length > 100
                        ? event.description.substring(0, 100) + "..."
                        : event.description
                      : "Join this exciting event and expand your knowledge."}

                  </p>


                  <div className="event-info">

                    <p>
                      📅 <strong>Date:</strong>{" "}
                      {event.date}
                    </p>


                    <p>
                      🕒 <strong>Time:</strong>{" "}
                      {event.time || "10:00 AM"}
                    </p>


                    <p>
                      📍 <strong>Location:</strong>{" "}
                      {event.location}
                    </p>


                    <p>
                      👥 <strong>Capacity:</strong>{" "}
                      {event.capacity || "Unlimited"}
                    </p>

                  </div>


                  <div className="card-footer">

                    <span className="status-badge">
                      Registration Open
                    </span>


                    <Link
                      to={`/users/events/${event.id}`}
                      className="details-btn"
                    >
                      View Details →
                    </Link>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "60px",
                color: "#fff"
              }}
            >

              <h2>No events found.</h2>

            </div>

          )}

        </div>

      </div>


      <Footer />

    </>
  );
}


export default UserEvents;