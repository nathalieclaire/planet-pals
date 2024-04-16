const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    router = require("./router"),
    contentTypes = require("./contentTypes"),
    utils = require("./utils");

router.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.htm);
    utils.getFile("views/index.html", res);                                                                                                                         
});
router.get("/productview.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/productview.html", res);
});
router.get("/searchview.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/searchview.html", res);
});
router.get("/shoppingcart.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/shoppingcart.html", res);
});
router.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});
http.createServer(router.handle).listen(port);
    console.log(`The server is listening on
    ➥ port number: ${port}`);