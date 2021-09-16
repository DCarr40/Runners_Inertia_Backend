const { validateRunGroup } = require("../middleware/validation/validation");
const { Event } = require("../models/event");
const { RunGroup } = require("../models/runGroup");
const { Runner } = require("../models/runner");

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
    const runGroup = await RunGroup.findById(req.params.groupId);
    return res.status(200).send(runGroup);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteRunGroup = async (req, res) => {
  try {
    const runGroup = await RunGroup.findByIdAndRemove(req.params.runGroupId);
    return res.status(200).send(runGroup);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const createRunGroup = async (req, res) => {
  try {
    // const { error } = validateRunGroup(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const runGroup = new RunGroup({
      name: req.body.name,
      groupType: req.body.groupType,
    });

    await runGroup.save();

    return res.status(200).send(runGroup);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error.message}`);
  }
};

const addEventToRunGroup = async (req, res) => {
  try {
    const runGroup = await RunGroup.findById(req.params.groupId);
    if (!runGroup)
     return res.status(400).send(`Could not find running group with that ID`);

    const event = await Event.findById(req.params.eventId);
    if (!event)
      return res
        .status(400)
        .send(`The event with id "${req.params.eventId}" does not exist`);

    runGroup.events.push(event);

    await runGroup.save();
    return res.status(200).send(runGroup.events);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addRunnerToRunGroup = async (req, res) => {
  try {
    const runGroup = await RunGroup.findById(req.params.groupId);
    if (!runGroup) return res.status(400).send(`The runner with`);

    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

    runGroup.runners.push(runner);

    await runGroup.save();
    return res.status(200).send(runGroup.runners);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const deleteRunnerFromRunGroup = async (req, res) => {
  try {
    const runGroup = await RunGroup.findById(req.params.groupId);
    if (!runGroup) return res.status(400).send(`The runner with`);

    const runner = await Runner.findById(req.params.runnerId);
    if (!runner)
      return res
        .status(400)
        .send(`The runner with id "${req.params.runnerId}" does not exist`);

  runGroup.runners.filter(runner);

    await runGroup.save();
    return res.status(200).send(runGroup.runners);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
 
}

module.exports = {
  getAllRunningGroups,
  createRunGroup,
  addRunnerToRunGroup,
  getRunningGroupById,
  addEventToRunGroup,
  deleteRunGroup,
  deleteRunnerFromRunGroup
};
