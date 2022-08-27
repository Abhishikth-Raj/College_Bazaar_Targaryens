const Item = require("../models/Item");

exports.getAllItems = async (req, res, next) => {
  const items = await Item.find({ isBlacklisted: false, status: "approved" });
  res.status(200).json({
    status: "success",
    data: {
      items,
    },
  });
};

exports.getItem = async (req, res, next) => {
  const item = await Item.findById(req.params.itemId);
  res.status(200).json({
    status: "success",
    data: {
      item,
    },
  });
};
