const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isBlacklisted: {
    type: Boolean,
    default: false,
  },
  contact: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  soldItems: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Item",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
