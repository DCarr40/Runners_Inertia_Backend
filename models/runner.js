const mongoose = require("mongoose");

const runnerSchema = new mongoose.Schema(
  {
    name: {
      first: String,
      last: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 20,
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
      maxlength: 50,
    },

    //I might want location as a city.

    //I might want to embed notifications
    //then I might want to delete them once they are checked.
  },
  { timestamps: true } //there's a ton of options, but I think timestamp is all i  need.
);

//trying out virtual that doesn't exist in the database
//https://mongoosejs.com/docs/guide.html
runnerSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});
