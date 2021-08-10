const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Runner } = require("../models/runner");
const { Event } = require("../models/event");

module.exports = router;

/*<============================GET ALL RUNNERS=========================>*/
router.get("/runner", async (req, res) => {
  try {
    const runner = await Runner.find();
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST==========================>*/

/*<============================GET RUNNER BY ID========================>*/
router.get("/runner/:id", async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.id);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST==========================>*/

/*<============================DELETE A RUNNER=========================>*/
router.get("/runner/:id", async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.id);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST==========================>*/

/*<============================REGISTER RUNNER=========================>*/
router.post("/runner", async (req, res) => {
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
});
/*<============================END OF REQUEST==========================>*/

/*<============================ADD EVENT TO A RUNNER=========================>*/
// router.post("/runner", async (req, res) => {
//   try {
//     const runner = new Runner({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     await runner.save();
//     return res.status(200).send(runner);
//   } catch (error) {
//     return res.status(500).send(`Internal Server Error: ${error}`);
//   }
// });
/*<============================END OF REQUEST==========================>*/

/*<============================CREATE EVENT============================>*/
router.post("/event", async (req, res) => {
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
});
/*<============================END OF REQUEST==========================>*/

/*<============================UPDATE EVENT============================>*/
router.put("/event/:id", async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);
    if (event) {
      (event = {
        title: req.body.title,
        details: req.body.details,
      }),
        await event.save();
      return res.status(200).send(runner);
    }
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST==========================>*/
