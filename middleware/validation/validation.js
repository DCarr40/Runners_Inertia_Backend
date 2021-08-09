const Joi = require("joi");
const { Runner } = require("../../models/runner");
const { RunGroup } = require("../../models/runner");
const { Notifications } = require("../../models/runner");
// const { Location } = require("../../models/runner");
const { Event } = require("../../models/runner");
const { Comment } = require("../../models/runner");






function validateRunGroup(runGroup) {
  const Schema = Joi.object({
    username: Joi.string().min(5).max(1000).required(),
    text: Joi.string().min(5).max(1000).required(),
    image: Joi.image().required(),
    username: Joi.string().min(5).max(50).required(),
  });
  return Schema.validate(runGroup);
}


function validateRunner(runner) {
    const Schema = Joi.object({
      firstName: Joi.string().min(5).max(100).required(),
      lastName: Joi.string().min(5).max(100).required(),
      username: Joi.string().min(5).max(100).required(),
      email: Joi.string().min(5).max(50).required().email(),
      password: Joi.string().min(5).max(1000).required(),
    });
    return Schema.validate(runner);
  }