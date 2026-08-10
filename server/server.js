const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");
const eventRoutes = require("./routes/eventRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const attendeeRoutes = require("./routes/attendeeRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Database
const sequelize = require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/registrations", registrationRoutes);
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Event Management System Backend is Running!");
});
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed successfully!",
    user: req.user,
  });
});

// Sync Database and Start Server
sequelize.sync()
  .then(() => {
    console.log("✅ Database synced successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Sync Error:", err);
  });