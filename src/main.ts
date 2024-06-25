import express, {Express, Request, Response, NextFunction} from "express";
import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import passport from "passport";
import serveStatic from 'serve-static';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";

import contentTypes from "./contentTypes.js";
import * as homeController from "./controllers/homeController.js";
import * as errorController from "./controllers/errorController.js";
import * as utils from "./utils.js";
import productSeed from "./models/productSeed.js";
import userSeed from "./models/userSeed.js";
import * as db from "./controllers/databaseController.js";
import * as productsController from "./controllers/productsController.js";
import * as registerController from "./controllers/registerController.js";
import * as usersController from "./controllers/usersController.js";


const __dirname = import.meta.dirname;
mongoose.connect('mongodb://localhost:27017/basic');
mongoose.connection.once('open', () => {
    console.log('open!')
}) // delete?

db.fill(productSeed);
db.fillUsers(userSeed);


const app: Express = express();
const app = express();
const router = express.Router();
router.use("/users", userRoutes);
router.use("/utils", utilRoutes);
router.use("/products", productRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(serveStatic(__dirname + '/../../public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/bootstrap.css", (req: Request, res: Response) => {
    req.body
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
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true,
        successRedirect: '/'
    }));
app.post("/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            console.error(err)
            return next(err);
        }
        res.redirect("/login");
        console.log('success fully logged out')
    })
})

app.use(errorController.internalServerError);
app.use(errorController.pageNotFoundError);
app.use("/", router);

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
