const { validateRunGroup } = require("../middleware/validation/validation");
const runGroup = require("../models/runGroup");
const { RunGroup } = require("../models/runGroup");

const getAllRunningGroups = async (req, res) => {
  try {
    const runGroup = await RunGroup.find();
    return res.status(200).send(runGroup);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const getRunningGroupById = async (req, res) => {
  try {
    const runGroup = await RunGroup.findById();
    return res.status(200).send(runGroup);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteRunGroup = async (req, res) => {
    try {
      const runGroup = await RunGroup.findById();
      return res.status(200).send(runGroup);
    } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
    }
  };

const createRunGroup = async (req, res) => {
  try {
    // const { error } = validateRunGroup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const runGroup = new RunGroup({
      name: req.body.name,
      eventType: req.body.eventType,
      location: req.body.location,
      events: req.body.events,
      runners: req.body.runners,
    });

    await runGroup.save();
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};



const updateRunGroup = async (req, res) => {
    try {
      const runGroup = await RunGroup.findById(req.params.runGroup);
      if (!runGroup) res.status(400).send(`Could not find running group with that ID`);
  
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

const addRunnerToRunGroup = async (req, res) => {
  try {
    const runGroup = await RunGroup.find(req.params.runGroup);
    if (!runGroup) res.status(400).send(`The runner with`);

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

module.exports = {
  getAllRunningGroups,
  createRunGroup,
  addRunnerToRunGroup,
  getRunningGroupById,
  updateRunGroup,
  deleteRunGroup,
};
