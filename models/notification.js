const mongoose = require("mongoose");

const notificationSchema = new Schema(
  {
    runner: { type: String, required: true, minlength: 2, maxlength: 30 },
    //I want to connect a list of notifications to a runner
  },
  { timestamps: true }
);
