import {Router} from "express";
import * as homeController from "../controllers/homeController.js";

const router = Router();
router.get("/", homeController.renderIndex2);
router.get("/greeting/:username", homeController.renderIndex); // Render the index view
router.get("/shoppingcart", homeController.renderShoppingCart);  // Read shoppingcart
//router.put("/shoppingcart", homeController.updateShoppingCart);  // Update shoppingcart
router.get("/product/:productID", homeController.renderProductView);

export default router;
