const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 50 },
    text: { type: String, required: true, minlength: 5, maxlength: 500 },
    like: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
