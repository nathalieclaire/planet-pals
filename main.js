const express = require("express");
const layouts = require("express-ejs-layouts");
const httpStatus = require("http-status-codes");
const mongoose = require('mongoose');
const passport = require('passport');
const passport_strategy = require('passport-strategy')
const contentTypes = require("./contentTypes");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const utils = require("./utils");
const productModel = require("./models/productModel");
const productSeed = require("./models/productSeed");
const userSeed = require("./models/userSeed");
const db = require("./controllers/databaseController");
const productsController = require('./controllers/productsController');
const registerController = require('./controllers/registerController');
const usersController = require('./controllers/usersController');
mongoose.connect('mongodb://localhost:27017/basic');
mongoose.connection.once('open', () => { console.log('open!') }) // delete?

db.fill(productSeed);
db.fillUsers(userSeed);


const app = express();

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/bootstrap.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/bootstrap-4.0.0-dist/css/bootstrap.min.css", res);
});
app.get("/htmx.min.js", (req, res) => {
    res.writeHead(200, contentTypes.js);
    utils.getFile("public/js/htmx.min.js", res);
});

app.get("/", homeController.renderIndex2);
app.get("/greeting/:username", homeController.renderIndex); // Render the index view
app.get("/shoppingcart", homeController.renderShoppingCart);  // Read shoppingcart
//app.put("/shoppingcart", homeController.updateShoppingCart);  // Update shoppingcart
app.get("/searchview", productsController.getAllProducts);
app.post("/searchview", productsController.getFilteredProducts);
app.get("/product/:productID", homeController.renderProductView);
app.get("/users", usersController.renderUsersTable);
app.put("/users", usersController.updateUser);

//User
app.get("/register", registerController.renderRegisterView);
app.post("/register", registerController.registerUser);
app.get("/profile", usersController.renderLogin);
app.post("/profile", usersController.renderUser);
app.put("/profile", usersController.updateUser);
app.delete("/profile", usersController.deleteUser);
app.get("/login", usersController.renderLogin);
app.post("/login/password",
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true,
    successRedirect: '/'}));

app.use(errorController.internalServerError);
app.use(errorController.pageNotFoundError);

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
