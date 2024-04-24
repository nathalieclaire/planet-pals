const express = require("express");
const layouts = require("express-ejs-layouts");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const utils = require("./utils");

const app = express();

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});

app.get("/", homeController.renderIndex); // Render the index view
app.get("/shoppingcart", homeController.renderShoppingCart);
app.get("/searchview", homeController.renderSearchView);
app.get("/productview", homeController.renderProductView);

app.use(errorController.internalServerError);
app.use(errorController.pageNotFoundError);

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});