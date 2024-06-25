const router = require('express').Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.renderIndex2);
router.get("/greeting/:username", homeController.renderIndex); // Render the index view
router.get("/shoppingcart", homeController.renderShoppingCart);  // Read shoppingcart
//router.put("/shoppingcart", homeController.updateShoppingCart);  // Update shoppingcart
router.get("/product/:productID", homeController.renderProductView);

module.exports = router;
