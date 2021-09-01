const Joi = require("joi");
const { Runner } = require("../../models/runner");
const { RunGroup } = require("../../models/runner");
const { Notifications } = require("../../models/runner");
// const { Location } = require("../../models/runner");
const { Event } = require("../../models/runner");

/*<=========================== Validate Events ===================>*/
const validateEvent = (event) => {
  const Schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    details: Joi.string().min(2).max(100).required(),
    creator: Joi.string().min(2).max(100).required(),
    tags: Joi.string().min(2).max(100).required(),
    events: Joi.object().required(),
  });
  return Schema.validate(event);
};
/*<===============================================================>*/

/*<=====================Validate Notifications ===================>*/
const validateNotification = (notification) => {
  const Schema = Joi.object({
    events: Joi.object().required(),
  });
  return Schema.validate(notification);
};
/*<===============================================================>*/

/*<======================= Validate Run Groups ===================>*/
const validateRunGroup = (runGroup) => {
  const Schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    groupType: Joi.string().min(2).max(30).required(),
    events: Joi.object().required(),
    runners: Joi.object().required(),
  });
  return Schema.validate(runGroup);
};
/*<===============================================================>*/

/*<=====================Validate Registration ====================>*/
const validateRunner = (runner) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });
  return Schema.validate(runner);
};
/*<===============================================================>*/


/*<=====================Validate Login ===================>*/
const validateLogin = (req) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });
  return Schema.validate(req);
};
/*<===============================================================>*/


module.exports = {
  validateRunner,
  validateRunGroup,
  validateEvent,
  validateLogin,
  validateNotification,
};
