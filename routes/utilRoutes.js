const router = require("express").Router();

const utils = require("../utils");

router.get("/bootstrap.css", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/css"});
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});
router.get("/htmx.min.js", (req, res) => {
    res.writeHead(200, {"Content-Type": "text/js"});
    utils.getFile("public/js/htmx.min.js", res);
});

module.exports = router;
