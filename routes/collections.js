const express = require("express");
const router = express.Router();
const {
  getAllRunners,
  getRunnerByID,
  deleteRunnerById,
  registerRunner,
  addEventToRunner,
} = require("../controllers/runnerControllers");
const {
  addEvent,
  getAllEvents,
  updateEvent,
} = require("../controllers/eventControllers");
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

/*<============================PUT EVENT TO A RUNNER===================>*/
router.put("/runner/:id", addEventToRunner);
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

/*<============================UPDATE EVENT=============================>*/
//desc: Update an Event from db
//route: PUT /api/collections/event/:id
//router.put("/:id/event",updateEvent);
/*<============================END OF REQUEST===========================>*/
