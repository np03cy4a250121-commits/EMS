import { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import {
  FaCalendarAlt,
  FaUsers,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalEvents: 0,
    totalAttendees: 0,
    totalRegistrations: 0,
    upcomingEvents: 0,
    latestActivities: [],
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchDashboard = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const res = await API.get("/dashboard");

      setDashboard(res.data);


    } catch (err) {

      console.error(
        "Dashboard Error:",
        err
      );

      setError(
        "Failed to load dashboard."
      );


    } finally {

      setLoading(false);

    }

  }, []);



  useEffect(() => {

    fetchDashboard();

  }, [fetchDashboard]);



  if (loading) {

    return (
      <Layout>
        <h2>
          Loading dashboard...
        </h2>
      </Layout>
    );

  }



  if (error) {

    return (
      <Layout>
        <h2 style={{color:"red"}}>
          {error}
        </h2>
      </Layout>
    );

  }



  return (

    <Layout>


      <section className="dashboard-cards">


        <div className="card">

          <div className="card-icon">
            <FaCalendarAlt />
          </div>

          <h3>
            Total Events
          </h3>

          <p>
            {dashboard.totalEvents}
          </p>

        </div>



        <div className="card">

          <div className="card-icon">
            <FaUsers />
          </div>

          <h3>
            Total Attendees
          </h3>

          <p>
            {dashboard.totalAttendees}
          </p>

        </div>




        <div className="card">

          <div className="card-icon">
            <FaClipboardList />
          </div>

          <h3>
            Registrations
          </h3>

          <p>
            {dashboard.totalRegistrations}
          </p>

        </div>




        <div className="card">

          <div className="card-icon">
            <FaClock />
          </div>

          <h3>
            Upcoming Events
          </h3>

          <p>
            {dashboard.upcomingEvents}
          </p>

        </div>


      </section>




      <section
        className="table-container"
        style={{ marginTop: "30px" }}
      >


        <h2>
          Latest Activities
        </h2>



        <table className="event-table">


          <thead>

            <tr>

              <th>
                Attendee
              </th>

              <th>
                Activity
              </th>

              <th>
                Date & Time
              </th>

            </tr>

          </thead>




          <tbody>


            {
              dashboard.latestActivities &&
              dashboard.latestActivities.length > 0 ? (

                dashboard.latestActivities.map(
                  (activity) => (

                    <tr key={activity.id}>


                      <td>
                        {
                        activity.attendee
                        ? activity.attendee.name
                        : "No attendee"
                        }
                      </td>
                      



                      <td>

                        Registered for{" "}

                        <strong>
                          {
                          activity.event
                          ? activity.event.name
                          : "No event"
                          }
                        </strong>

                      </td>



                      <td>

                        {
                          activity.createdAt
                            ? new Date(
                                activity.createdAt
                              ).toLocaleString()
                            : "N/A"
                        }

                      </td>



                    </tr>

                  )

                )

              ) : (


                <tr>

                  <td
                    colSpan="3"
                    style={{
                      textAlign:"center"
                    }}
                  >

                    No recent activity found.

                  </td>


                </tr>


              )

            }


          </tbody>


        </table>


      </section>



    </Layout>

  );

}


export default Dashboard;