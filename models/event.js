const mongoose = require("mongoose");
const { Runner } = require("./runner");

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
      maxlength: 100,
    },
    creator: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    tags: {
      type: [String],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    // runners: [
    //   {
    //     type: Runner,
    //     required: true,
    //     default: [],
    //   },
    // ],
    time: { type: Date },
  },
  { timestamps: true },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const Event = mongoose.model("event", eventSchema);

module.exports = {
  Event: Event,
};
