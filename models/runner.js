const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("config");
const jwt = require("jsonwebtoken");
const { eventSchema } = require("./event");
const { runGroupSchema } = require("./runGroup");

const runnerSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 200,
    },
    events: {
      type: [eventSchema],
      default: [],
    },
    runnerBio: {
      type: String,
      trim: true,
      minlength: 6,
      maxlength: 50,
    },
    rungroups: {
      type: [runGroupSchema],
      default: [],
    },
    time: { type: Date },

    //I might want location as a city.

    //I might want to ref notifications
    // events: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "event",
    //   },
    // ],
    //then I might want to delete them once they are checked.
  },
  { timestamps: true },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } } // should grab current time
  //there's a ton of options, but I think timestamp is all i  need.
  //modififying timestamp to current timestamp might be useful for notifications
);

//trying out virtual that doesn't exist in the database by default settings
//https://mongoosejs.com/docs/guide.html
// runnerSchema.virtual("fullName").get(() => {
//   return `${this.name.first} ${this.name.last}`;
// });
runnerSchema.methods.generateAuthToken = () => {
  return jwt.sign({ _id: this._id, name: this.name }, config.get("jwtSecret"));
};

const Runner = mongoose.model("runner", runnerSchema);

module.exports = {
  Runner: Runner,
};
