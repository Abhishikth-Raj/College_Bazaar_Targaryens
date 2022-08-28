const adminController = require("../controllers/admin");


module.exports = router => {
  router.route("/admin/:userId").post(adminController.updateUserStatus);
  
  router.route("/admin/:itemId").post(adminController.updateItemStatus);
};
