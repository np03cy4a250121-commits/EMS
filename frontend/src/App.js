import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Protected Routes
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

// ==================== Admin Pages ====================
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import EditEvent from "./pages/EditEvent";
import ViewEvent from "./pages/ViewEvent";
import Attendees from "./pages/Attendees";
import AddAttendee from "./pages/AddAttendee";
import EditAttendee from "./pages/EditAttendee";
import Registration from "./pages/Registration";

// ==================== User Pages ====================
import Home from "./pages/Home";
import UserEvents from "./pages/UserEvents";
import EventDetails from "./pages/EventDetails";
import About from "./pages/About";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= DEFAULT ================= */}

        <Route
          path="/"
          element={<Navigate to="/user/login" replace />}
        />


        {/* ================= USER AUTH ================= */}

        <Route
          path="/user/login"
          element={<UserLogin />}
        />

        <Route
          path="/user/signup"
          element={<UserSignup />}
        />


        {/* ================= USER ROUTES ================= */}

        <Route
          path="/users"
          element={
            <ProtectedUserRoute>
              <Home />
            </ProtectedUserRoute>
          }
        />


        <Route
          path="/users/events"
          element={
            <ProtectedUserRoute>
              <UserEvents />
            </ProtectedUserRoute>
          }
        />


        <Route
          path="/users/events/:id"
          element={
            <ProtectedUserRoute>
              <EventDetails />
            </ProtectedUserRoute>
          }
        />


        <Route
          path="/users/about"
          element={
            <ProtectedUserRoute>
              <About />
            </ProtectedUserRoute>
          }
        />



        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin/login"
          element={<Login />}
        />



        {/* ================= ADMIN ROUTES ================= */}


        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/events/add"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />


        {/* FIXED EDIT EVENT ROUTE */}
        <Route
          path="/admin/events/edit/:id"
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/events/view/:id"
          element={
            <ProtectedRoute>
              <ViewEvent />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/attendees"
          element={
            <ProtectedRoute>
              <Attendees />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/attendees/add"
          element={
            <ProtectedRoute>
              <AddAttendee />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/attendees/edit/:id"
          element={
            <ProtectedRoute>
              <EditAttendee />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/registration"
          element={
            <ProtectedRoute>
              <Registration />
            </ProtectedRoute>
          }
        />


        {/* ================= PAGE NOT FOUND ================= */}

        <Route
          path="*"
          element={<Navigate to="/admin/login" replace />}
        />


      </Routes>

    </BrowserRouter>
  );
}


export default App;