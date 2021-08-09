const mongoose = require("mongoose");
const Event = require("./event");

const runGroup = mongoose.Schema({
  name: { type: "string", required: true, minlength: 2, maxlength: 30 }, // every group needs a name
  enum: {
    //wanted to see if I could use this for skill level. If not I'll scrap it for an array maybe.
    BEGINNER,
    INTERMEDIATE,
    EXPERT,
  },
  members: { type: Number, default: 0 }, //to count number of members in group
  events: { type: Event }, // I want to display events corresponding to a runGroup
});
