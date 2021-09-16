const bcrypt = require("bcrypt");
const {validateRunner,validateEvent} = require("../middleware/validation/validation");
const { Runner } = require("../models/runner");
const { Event } = require("../models/event");

const getAllRunners = async (req, res) => {
  try {
    const runner = await Runner.find();
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const getRunnerByID = async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.runnerId);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteRunnerById = async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.id);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const registerRunner = async (req, res) => {
  try {
    const { error } = validateRunner(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const runner = new Runner({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
    });

    await runner.save();

    const token = runner.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: runner._id,
        username: runner.username,
        email: runner.email,
      });
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addEventToRunner = async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res
        .status(400)
        .send(`The event with id "${req.params.eventId}" does not exist`);

    runner.events.push(event);

    await runner.save();
    return res.status(200).send(runner.events);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const updateRunner = async (req, res) => {
  try {
    const { error } = validateEvent(req.body);
    if (error) return res.status(400).send(error);

    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res
        .status(400)
        .send(`The event with id "${req.params.eventId}" does not exist`);

    event.title = req.body.title;
    event.details = req.body.details;

    await runner.save();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteEventOfRunner = async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res
        .status(400)
        .send(`The event with id "${req.params.eventId}" does not exist`);

    event = await event.remove();

    await runner.save();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

module.exports = {
  getAllRunners,
  getRunnerByID,
  deleteRunnerById,
  registerRunner,
  addEventToRunner,
  updateRunner,
  deleteEventOfRunner,
};
