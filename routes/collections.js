const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Runner } = require("../models/runner");
const {validateLogin} = require("../middleware/validation/validation")

const config = require("config");
const jwt = require("jsonwebtoken");

const {
  getAllRunners,
  getRunnerByID,
  deleteRunnerById,
  registerRunner,
  addEventToRunner,
  updateRunner,
  deleteEventOfRunner,
} = require("../controllers/runnerControllers");
const {
  addEvent,
  getAllEvents,
  updateEvent,
  getEventByID,
} = require("../controllers/eventControllers");
const { getAllRunningGroups, createRunGroup, getRunningGroupById, updateRunGroup, deleteRunGroup } = require("../controllers/runninggroups");
module.exports = router;
/*TODO*/
//Go back through and fix status codes

/*<============================GET ALL RUNNERS==========================>*/
//desc: GET all Runners from db
//route: GET /api/collections/runner
router.get("/runner", getAllRunners);
/*<============================END OF REQUEST===========================>*/

/*<============================GET RUNNER BY ID=========================>*/
//desc: GET Runner By ID from db
//route: GET /api/collections/runner/:id
router.get("/runner/:id", getRunnerByID);
/*<============================END OF REQUEST===========================>*/

/*<========================DELETE RUNNER BY ID==========================>*/
//desc: DELETE Runner By ID from db
//route: DELETE /api/collections/runner/:id
router.delete("/runner/:id", deleteRunnerById);
/*<============================END OF REQUEST===========================>*/

/*<============================REGISTER RUNNER==========================>*/
//desc: Register Runner to db
//route: POST /api/collections/runner
router.post("/runner", registerRunner);
/*<============================END OF REQUEST==========================>*/

/*<============================ADD EVENT TO A RUNNER===================>*/
//desc: Add an Event to a Runner in db
//route: POST /api/collections/:runnerId/events/:eventId
router.post("/:runnerId/events/:eventId", addEventToRunner);
/*<============================END OF REQUEST==========================>*/

/*<============================UPDATE EVENT OF A RUNNER================>*/
//desc: Update an Event of a Runner in db
//route: PUT /api/collections/:runnerId/events/:eventId
router.put("/:runnerId/events/:eventId", updateRunner);
/*<============================END OF REQUEST==========================>*/

/*<============================UPDATE EVENT OF A RUNNER================>*/
//desc: Delete an Event of a Runner in db
//route: DELETE /api/collections/:runnerId/events/:eventId
router.delete("/:runnerId/events/:eventId", deleteEventOfRunner);
/*<============================END OF REQUEST==========================>*/

/*<===================================================================================>*/
/***********************************EVENT ENDPOINTS*************************************/
/*<===================================================================================>*/

/*<============================POST EVENT==============================>*/
//desc: Add Event to db
//route: POST /api/collections/event
router.post("/event", addEvent);
/*<============================END OF REQUEST===========================>*/

/*<============================GET ALL EVENTS===========================>*/
//desc: GET All Events from db
//route: GET /api/collections/event
router.get("/event", getAllEvents);
/*<============================END OF REQUEST===========================>*/

/*<============================GET ALL EVENTS===========================>*/
//desc: GET All Events from db
//route: GET /api/collections/event/:id
router.get("/event/:id", getEventByID);
/*<============================END OF REQUEST===========================>*/

/*<============================UPDATE EVENT=============================>*/
//desc: Update an Event from db
//route: PUT /api/collections/event/:id
//router.put("/:id/event",updateEvent);
router.put("/event/:id", updateEvent);
/*<============================END OF REQUEST===========================>*/

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let runner = await Runner.findOne({ email: req.body.email });
    if (!runner) return res.status(400).send("Invalid email address");

    const validPass = await bcrypt.compare(req.body.password, runner.password);
    if (!validPass) return res.status(400).send("Invalid password");

    const token = runner.generateAuthToken();
    return res.send(token);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

/*<=========================== GET ALL RUNNING GROUPS ==================>*/
//desc: GET All Run Groups from db
//route: GET /api/collections/groups
router.get("/groups", getAllRunningGroups);
/*<============================END OF REQUEST===========================>*/

/*<========================== GET RUNNING GROUP BY ID ==================>*/
//desc: GET All Run Groups from db
//route: GET /api/collections/groups
router.get("/groups/:id", getRunningGroupById);
/*<============================END OF REQUEST===========================>*/

/*<=========================== CREATE RUNNING GROUPS ===================>*/
//desc: GET All Run Groups from db
//route: GET /api/collections/groups
router.post("/groups", createRunGroup);
/*<============================END OF REQUEST===========================>*/

/*<=========================== UPDATE RUNNING GROUPS ===================>*/
//desc: GET All Run Groups from db
//route: GET /api/collections/groups
router.put("/groups", updateRunGroup);
/*<============================END OF REQUEST===========================>*/

/*<=========================== DELETE RUNNING GROUPS ===================>*/
//desc: GET All Run Groups from db
//route: GET /api/collections/groups
router.delete("/groups", deleteRunGroup);
/*<============================END OF REQUEST===========================>*/
