const mongoose = require("mongoose");
const { Runner } = require("./runner");

const notificationSchema = new Schema(
  {
    info: {
      runner: [{ ref: Runner.fullname, required: true }], //not sure if I did the reference and embed right
      event: [{ Event, required: true }],
      required: true,
    },

    //I want to connect a list of notifications to a runner
  },
  { timestamps: true },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } } // should grab current time
);

const Notification = mongoose.model("notification", notificationSchema);

model.export = {
  Notification: Notification,
};
