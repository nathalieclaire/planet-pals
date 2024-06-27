import {Router} from "express";
import * as errorController from "../controllers/errorController.js";

const router = Router();
router.use(errorController.internalServerError);
router.use(errorController.pageNotFoundError);

export default router;
