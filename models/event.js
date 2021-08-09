const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 2, maxlength: 30 },
    details: { type: String, required: true, minlength: 2, maxlength: 500 },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);

model.export = {
  Event: Event,
};
