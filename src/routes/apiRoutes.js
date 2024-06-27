import {Router} from "express";

import * as productsController from "../controllers/productsController.js";

const router = Router();
router.get("/products", productsController.getAllProductsJSON);
router.get("/renderProducts", productsController.getAllProductsJSONRendered);

export default router;
