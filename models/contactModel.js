const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Please add the contact email adress"],
    },
    phoneNumber: {
      type: Number,
      require: [true, "Please add the contact phone number"],
    },
    user_id: {
      //shows the user id
      type: mongoose.Schema.Types.ObjectId,
      //required so when a user creates a contact in can append to its particular user
      required: true,
      // reference to the actual schema which will make one-to-many relationship between the user and the contact
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
