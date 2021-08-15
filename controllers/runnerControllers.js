const { Runner } = require("../models/runner");

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
    const runner = new Runner({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    await runner.save();
    return res.status(200).send(runner);
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
