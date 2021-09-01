const mongoose = require("mongoose");
const Event = require("./event");

const runGroupSchema = mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 }, // every group needs a name
  skillLevel: {enum({
    //wanted to see if I could use this for skill level. If not I'll scrap it for an array maybe.
    BEGINNER,
    INTERMEDIATE,
    EXPERT
  })},
  members: { type: Number, required: true, default: 0 }, //to count number of members in group
  location: { type: String }, // here in case location.js doesn't work
  events: [eventSchema], // I want to display events corresponding to a runGroup
  runners: [runnerSchema], // I want to display the runners associated with this runGroup
});

//might help count number of events
runGroupSchema.virtual("eventsCount").get(() => {
  return this.events.length;
});

const RunGroup = mongoose.model("runGoup", runGroupSchema);

model.export = {
  RunGroup: RunGroup,
};
