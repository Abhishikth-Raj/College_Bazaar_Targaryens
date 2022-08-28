const userController = require("../controllers/user");


module.exports = router => {
  router
    .route("/user/:userId")
    .get(userController.getUser)
    .post(userController.updateMe);
}
