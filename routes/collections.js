const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Runner } = require("../models/runner");
const { Event } = require("../models/event");
const { Notification } = require("../models/notification");
const event = require("../models/event");

/*TODO*/
//Go back through and fix status codes

module.exports = router;

/*<============================GET ALL RUNNERS===========================>*/
router.get("/runner", async (req, res) => {
  try {
    const runner = await Runner.find();
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/

/*<============================GET RUNNER BY ID=========================>*/
router.get("/runner/:id", async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.id);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/

/*<============================DELETE A RUNNER==========================>*/
router.delete("/runner/:id", async (req, res) => {
  try {
    const runner = await Runner.findById(req.params.id);
    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/

/*<============================REGISTER RUNNER==========================>*/
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

/*<============================PUT EVENT TO A RUNNER===================>*/
router.put("/runner/:id", async (req, res) => {
  try {
    const runner = await Runner.findByIdAndUpdate(
      req.params.id,
      {$push: {"event":"id"}},
      {upsert: true, new: true},
    )
    await runner.save();

    return res.status(200).send(runner);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST==========================>*/

/*<===================================================================================>*/
/***********************************EVENT ENDPOINTS*************************************/
/*<===================================================================================>*/

/*<============================POST EVENT==============================>*/
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
/*<============================END OF REQUEST===========================>*/

/*<============================GET ALL EVENTS===========================>*/
router.get("/event", async (req, res) => {
  try {
    const event = await Event.find();
    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/

/*<============================UPDATE EVENT=============================>*/
// router.put("/:id/event", async (req, res) => {
//   try {
//     const event = await Event.findById(req.params.id);
//     (event.title = req.params.title), (event.details = req.params.details);

//     await event.save();
//     return res.status(200).send(event);
//   } catch (error) {
//     return res.status(500).send(`Internal Server Error: ${error}`);
//   }
// });
/*<============================END OF REQUEST===========================>*/

/*<=========================GET ALL NOTIFICATIONS=======================>*/
router.get("/notification", async (req, res) => {
  try {
    const notification = await Notification.find();
    return res.status(200).send(notification);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/

/*<========================= POST NOTIFICATIONS=========================>*/
router.get("/notification", async (req, res) => {
  try {
    const notification = await Notification.find();
    return res.status(200).send(notification);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});
/*<============================END OF REQUEST===========================>*/
