const router = require("express").Router();

const productsController = require("../controllers/productsController");

router.get("/searchview", productsController.getAllProducts);
router.post("/searchview", productsController.getFilteredProducts);

module.exports = router;
