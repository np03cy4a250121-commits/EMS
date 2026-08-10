const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAttendee,
  getAttendees,
  getAttendee,
  updateAttendee,
  deleteAttendee,
} = require("../controllers/attendeeController");

router.post("/", authMiddleware, createAttendee);
router.get("/", authMiddleware, getAttendees);
router.get("/:id", authMiddleware, getAttendee);
router.put("/:id", authMiddleware, updateAttendee);
router.delete("/:id", authMiddleware, deleteAttendee);

module.exports = router;