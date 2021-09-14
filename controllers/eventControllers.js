const { Event } = require("../models/event");
const { Runner } = require("../models/runner");

//restapitutorial.com/httpstatuscodes.html

const addEvent = async (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      details: req.body.details,
      creator: req.body.creator,
      tags: req.body.tags,
      attendees: req.body.attendees,
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
  try {
    const event = await Event.findById(req.params.id);
    (event.title = req.body.title), (event.details = req.body.details);
    await event.save();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addRunnerToEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) res.status(400).send(`The event with ${req.params.eventId} does not exist`);

    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

    event.runners.push(runner);

    await event.save();
    return res.status(200).send(event.runners);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

module.exports = {
  addEvent,
  getAllEvents,
  updateEvent,
  getEventByID,
  addRunnerToEvent,
};
