const Joi = require("joi");
const { Runner } = require("../../models/runner");
const { RunGroup } = require("../../models/runner");
const { Notifications } = require("../../models/runner");
// const { Location } = require("../../models/runner");
const { Event } = require("../../models/runner");
const { Comment } = require("../../models/runner");

///////////    Validate Comments   //////////////////////////
const validateComment = (comment) => {
  const Schema = Joi.object({
    username: Joi.string().min(5).max(50).required(),
    text: Joi.string().min(5).max(500).required(),
    likes: Joi.number().required(),
  });
  return Schema.validate(commment);
};
/////////////////////////////////////////////////////////////

///////////    Validate Events //////////////////////////////
const validateEvent = (event) => {
  const Schema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    details: Joi.string().min(2).max(500).required(),
  });
  return Schema.validate(event);
};
/////////////////////////////////////////////////////////////

///////////    Validate Notification ////////////////////////
const validateNotification = (notification) => {
  const Schema = Joi.object({
    info: Joi.object().required(),
  });
  return Schema.validate(notification);
};
/////////////////////////////////////////////////////////////

///////////    Validate Run Group ///////////////////////////
const validateRunGroup = (runGroup) => {
  const Schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    members: Joi.number().required(),
  });
  return Schema.validate(runGroup);
};
/////////////////////////////////////////////////////////////

///////////    Validate Runner  /////////////////////////////
const validateRunner = (runner) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(50).required(),
  });
  return Schema.validate(runner);
};
/////////////////////////////////////////////////////////////
