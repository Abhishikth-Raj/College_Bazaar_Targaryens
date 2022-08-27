const router = require("express").Router();
const userController = require("../controllers/user");

router
  .route("/:userId")
  .get(userController.getUser)
  .post(userController.updateMe);

module.exports = router;
