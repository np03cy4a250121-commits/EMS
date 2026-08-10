const { Event, Registration, Attendee } = require("../models");
const { Op } = require("sequelize");

// ==========================
// CREATE EVENT
// ==========================
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time, location } = req.body;

    if (!name || !description || !date || !time || !location) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const event = await Event.create({
      name,
      description,
      date,
      time,
      location,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// GET ALL EVENTS
// ==========================
exports.getEvents = async (req, res) => {
  try {
    const { search } = req.query;

    let where = {};

    if (search) {
      where.name = {
        [Op.like]: `%${search}%`,
      };
    }

    const events = await Event.findAll({
      where,
      include: [
        {
          model: Registration,
          as: "registrations",
        },
      ],
      order: [["id", "ASC"]],
    });

    const data = events.map((event) => {
      const e = event.toJSON();

      e.registeredAttendees = e.registrations
        ? e.registrations.length
        : 0;

      delete e.registrations;

      return e;
    });

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// GET SINGLE EVENT
// ==========================
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Registration,
          as: "registrations",
          include: [
            {
              model: Attendee,
              as: "attendee",
              attributes: [
                "id",
                "name",
                "email",
                "phone",
              ],
            },
          ],
        },
      ],
    });

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const data = event.toJSON();

    data.registeredAttendees = data.registrations.length;

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// UPDATE EVENT
// ==========================
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    const {
      name,
      description,
      date,
      time,
      location,
    } = req.body;

    if (
      !name ||
      !description ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await event.update({
      name,
      description,
      date,
      time,
      location,
    });

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================
// DELETE EVENT
// ==========================
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await Registration.destroy({
      where: {
        eventId: event.id,
      },
    });

    await event.destroy();

    res.json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};