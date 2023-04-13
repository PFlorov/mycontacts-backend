const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter a username"],
      unique: [true, "This username is already in use"],
    },
    email: {
      type: String,
      required: [true, "please enter a valid email address"],
      unique: [true, "This email address has already been registered"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
