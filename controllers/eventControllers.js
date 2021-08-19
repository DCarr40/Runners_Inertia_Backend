const { Event } = require("../models/event");

const addEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      details: req.body.details,
    });
    await event.save();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const getEventByID = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const updateEvent = async (req, res) => {
  //   try {
  //     const event = await Event.findById(req.params.id);
  //     (event.title = req.params.title), (event.details = req.params.details);
  //     await event.save();
  //     return res.status(200).send(event);
  //   } catch (error) {
  //     return res.status(500).send(`Internal Server Error: ${error}`);
  //   }
};

module.exports = {
  addEvent,
  getAllEvents,
  updateEvent,
  getEventByID,
};
