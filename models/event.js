const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    details: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 1000,
    },
    // eventTypes: {
    //   type: String,
    //   required: true,
    //   trim: true,
    //   minlength: 2,
    //   maxlength: 1000,
    // },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

module.exports = {
  Event: Event,
};
