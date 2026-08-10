const express = require("express");

const router = express.Router();

const {
  createRegistration,
  getRegistrations,
  getEventRegistrations,
  deleteRegistration,
} = require("../controllers/registrationController");

// ==========================
// CREATE REGISTRATION
// ==========================
router.post("/", createRegistration);

// ==========================
// GET ALL REGISTRATIONS
// ==========================
router.get("/", getRegistrations);

// ==========================
// GET REGISTRATIONS OF AN EVENT
// ==========================
router.get("/event/:eventId", getEventRegistrations);

// ==========================
// DELETE REGISTRATION
// ==========================
router.delete("/:id", deleteRegistration);

module.exports = router;