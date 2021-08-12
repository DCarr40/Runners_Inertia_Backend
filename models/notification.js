const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Runner } = require("./runner");
const { Event } = require("./event");


const notificationSchema = new Schema(
  {
    runnerId: {type: String, required: true},
    runners: [{
      type: Schema.Types.ObjectId,
      ref: "runner"

    }], 


    //I want to connect a list of notifications to a runner
  },
  { timestamps: true },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } } // should grab current time
);

const Notification = mongoose.model("notification", notificationSchema);

module.exports = {
  Notification: Notification,
};
