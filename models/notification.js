const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Runner } = require("./runner");
const { Event } = require("./event");


const notificationSchema = new Schema(
  {
    events: [{type: eventSchema, required: true}], 
  },
);

const Notification = mongoose.model("notification", notificationSchema);

module.exports = {
  Notification: Notification,
};
