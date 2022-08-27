const router = require("express").Router();
const itemController = require("../controllers/items");

router
  .route("/")
  .get(itemController.getAllItems)
  .post(itemController.createItem);

router
  .route("/:itemId")
  .get(itemController.getItem)
  .post(itemController.updateItem);

module.exports = router;
