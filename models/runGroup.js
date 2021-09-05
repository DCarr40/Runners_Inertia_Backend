const mongoose = require("mongoose");
const { eventSchema } = require("./event");
const { runnerSchema } = require("./runner");

const runGroupSchema = mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 }, // every group needs a name
    groupType: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
      default: "",
    }, //
    events: { type: [eventSchema], default: [] }, // I want to display events corresponding to a runGroup
    runners: { type: [runnerSchema], default: [] }, // I want to display runners corresponding to a runGroup
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

//might help count number of events
runGroupSchema.virtual("eventsCount").get(() => {
  return this.events.length;
});

//might help count number of runners
runGroupSchema.virtual("runnersCount").get(() => {
  return this.runners.length;
});

const RunGroup = mongoose.model("runGoup", runGroupSchema);

module.exports = {
  RunGroup: RunGroup,
};
