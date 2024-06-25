const router = require("express").Router();

const productsController = require("../controllers/productsController");

router.get("/products", productsController.getAllProductsJSON);
router.get("/renderProducts",  productsController.getAllProductsJSONRendered);

module.exports = router;
