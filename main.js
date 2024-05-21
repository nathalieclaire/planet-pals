const express = require("express");
const layouts = require("express-ejs-layouts");
const httpStatus = require("http-status-codes");
const mongoose = require('mongoose');
const contentTypes = require("./contentTypes");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const utils = require("./utils");
const productModel = require("./models/productModel");
const productSeed = require("./models/productSeed");
const db = require("./controllers/databaseController");
mongoose.connect('mongodb://localhost:27017/basic');
mongoose.connection.once('open', () => { console.log('open!') }) // delete?

db.fill(productSeed)


const app = express();

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});

app.get("/", homeController.renderIndex2);
app.get("/:username", homeController.renderIndex); // Render the index view
app.get("/shoppingcart", homeController.renderShoppingCart);
app.get("/searchview", homeController.renderSearchView);
app.get("/product/:productID", homeController.renderProductView);
app.use(errorController.internalServerError);
app.use(errorController.pageNotFoundError);

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
