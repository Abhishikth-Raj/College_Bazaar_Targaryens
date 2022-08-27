const User = require("../models/User");

exports.getUser = async (req, res, next) => {
  const userData = await User.findById(req.params.userId);
  res.status(200).json({
    status: "success",
    data: {
      userData,
    },
  });
};

exports.updateMe = async (req, res, next) => {
  const userData = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  });

  res.status(201).json({
    status: "success",
    data: {
      userData,
    },
  });
};
