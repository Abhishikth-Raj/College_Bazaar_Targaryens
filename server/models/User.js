const mongoose = require("mongoose");
const Item = require("./Item");

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

userSchema.pre(/^find/, async function (next) {
  const soldItemsPromises = this.soldItems.map(
    async (itemId) => await Item.findById(itemId)
  );
  this.soldItems = await Promise.all(soldItemsPromises);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
