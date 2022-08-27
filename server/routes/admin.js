const router = require("express").Router();
const adminController = require("../controllers/admin");

router.route("/:userId").post(adminController.updateUserStatus);

router.route("/:itemId").post(adminController.updateItemStatus);

module.exports = router;
