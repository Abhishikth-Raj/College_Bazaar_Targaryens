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

exports.createItem = async (req, res, next) => {
  const userId = req.user._id;
  const itemData = req.body;
  const item = await Item.create({
    ...itemData,
    owner: userId,
  });

  res.status(201).json({
    status: "success",
    data: {
      item,
    },
  });
};

exports.updateItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const item = await Item.findByIdAndUpdate(itemId, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    message: "Updated successfully",
    data: {
      item,
    },
  });
};
