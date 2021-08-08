const mongoose = require("mongoose");

const runnerSchema = new mongoose.Schema(
  {
    firstname: { type: "string", required: true, minlength: 2, maxlength: 30 },
    lastname: { type: "string", required: true, minlength: 2, maxlength: 30 },
    username: {
      type: "string",
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 50,
    },
    password: { type: "string", required: true, minlength: 6, maxlength: 50 },
    //I might want to embed notifications
    //then I might want to delete them once they are checked.
  },
  { timestamps: true}
);
