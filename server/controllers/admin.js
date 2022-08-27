const Item = require("../models/Item");
const User = require("../models/User");

exports.updateItemStatus = async (req, res, next) => {
  const itemData = await Item.findByIdAndUpdate(req.params.itemId, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "Successfully updated the status of item",
    data: {
      itemData,
    },
  });
};

exports.updateUserStatus = async (req, res, next) => {
  const userData = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "Successfully updated the status of user",
    data: {
      userData,
    },
  });
};
