import {Router} from "express";
import * as productsController from "../controllers/productsController.js";

const router = Router();
router.get("/searchview", productsController.getAllProducts);
router.post("/searchview", productsController.getFilteredProducts);

export default router;
