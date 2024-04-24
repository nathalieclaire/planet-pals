const express = require("express");
const layouts = require("express-ejs-layouts");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const utils = require("./utils");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.htm);
    utils.getFile("views/index.html", res);                                                                                                                         
});
app.get("/productview.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/productview.html", res);
});
app.get("/searchview.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/searchview.html", res);
});
app.get("/shoppingcart.html", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/shoppingcart.html", res);
});
app.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});