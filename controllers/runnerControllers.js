const bcrypt = require("bcrypt");
const { validateRunner } = require("../middleware/validation/validation");
const { Runner } = require("../models/runner");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    const runner = await Runner.find();
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
    .header('x-auth-token',token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send({_id: runner._id, username: runner.username, email: runner.email})

  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
};

const addEventToRunner = async (req, res) => {
  // try {
  //   const runner = await Runner.findByIdAndUpdate(
  //     req.params.id,
  //     {$push: {"event":"id"}},
  //     {upsert: true, new: true},
  //   )
  //   await runner.save();
  //   return res.status(200).send(runner);
  // } catch (error) {
  //   return res.status(500).send(`Internal Server Error: ${error}`);
  // }
};

module.exports = {
  getAllRunners,
  getRunnerByID,
  deleteRunnerById,
  registerRunner,
  addEventToRunner,
};
