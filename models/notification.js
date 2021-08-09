const mongoose = require("mongoose");

const notificationSchema = new Schema(
  {
    runner: { type: String, required: true, minlength: 2, maxlength: 30 },
    //I want to connect a list of notifications to a runner
  },
  { timestamps: true },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } } // should grab current time
);

const Notification = mongoose.model('notification',notificationSchema);

model.export = {
    Notification: Notification,
}