const mongoose = require("mongoose");

const DetailSchema = new mongoose.Schema({
  itemInfo: {
    type: Map,
    of: String,
  },
});

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  picture: [
    {
      type: String,
    },
  ],
  details: [
    {
      type: DetailSchema,
    },
  ],
});

itemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "owner",
    select: "displayName email image isBlacklisted contact ",
  });
  next();
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
