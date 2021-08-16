const Joi = require("joi");
const express = require("express");
const bcrypt = require("bcrypt");
const { Runner } = require("../models/runner");
const { validateRunnerLogin } = require("../middleware/validation/validation");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { error } = validateRunnerLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let runner = await Runner.findOne({ email: req.body.email });
    if (!runner) return res.status(400).send("Invalid email address");

    const validPass = await bcrypt.compare(req.body.password, runner.password);
    if (!validPass) return res.status(400).send("Invalid password");

    return res.send(true);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});
