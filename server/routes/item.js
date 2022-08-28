const itemController = require("../controllers/items");


module.exports = router => {
  router
    .route("/item/")
    .get(itemController.getAllItems)
    .post(itemController.createItem);
  
  router
    .route("/item/:itemId")
    .get(itemController.getItem)
    .post(itemController.updateItem);
};
