const { Attendee, Registration } = require("../models");

// ==========================
// Create Attendee
// ==========================

exports.createAttendee = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAttendee = await Attendee.findOne({
      where: { email },
    });

    if (existingAttendee) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const attendee = await Attendee.create({
      name,
      email,
      phone,
    });

    res.status(201).json({
      message: "Attendee created successfully",
      attendee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get All Attendees
// ==========================

exports.getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.findAll({
      order: [["id", "ASC"]],
    });

    res.json(attendees);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Get Single Attendee
// ==========================

exports.getAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);

    if (!attendee) {
      return res.status(404).json({
        message: "Attendee not found",
      });
    }

    res.json(attendee);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Update Attendee
// ==========================

exports.updateAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);

    if (!attendee) {
      return res.status(404).json({
        message: "Attendee not found",
      });
    }

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingAttendee = await Attendee.findOne({
      where: { email },
    });

    if (
      existingAttendee &&
      existingAttendee.id !== attendee.id
    ) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    await attendee.update({
      name,
      email,
      phone,
    });

    res.json({
      message: "Attendee updated successfully",
      attendee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// Delete Attendee
// ==========================

exports.deleteAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findByPk(req.params.id);

    if (!attendee) {
      return res.status(404).json({
        message: "Attendee not found",
      });
    }

    // Delete all registrations first
    await Registration.destroy({
      where: {
        attendeeId: attendee.id,
      },
    });

    // Delete attendee
    await attendee.destroy();

    res.json({
      message: "Attendee deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};