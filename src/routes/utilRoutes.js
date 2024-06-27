import {Router} from "express";
import * as utils from "../utils.js";

const router = Router();
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(200, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});
router.get("/htmx.min.js", (req, res) => {
    res.writeHead(200, contentTypes.js);
    utils.getFile("public/js/htmx.min.js", res);
});

export default router;
