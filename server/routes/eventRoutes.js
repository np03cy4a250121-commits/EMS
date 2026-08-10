const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

/*
|--------------------------------------------------------------------------
| Public Routes (User Interface)
|--------------------------------------------------------------------------
*/

// Get all events
router.get("/", getEvents);

// Get single event details
router.get("/:id", getEvent);

/*
|--------------------------------------------------------------------------
| Protected Routes (Admin Interface)
|--------------------------------------------------------------------------
*/

// Create event
router.post("/", authMiddleware, createEvent);

// Update event
router.put("/:id", authMiddleware, updateEvent);

// Delete event
router.delete("/:id", authMiddleware, deleteEvent);

module.exports = router;