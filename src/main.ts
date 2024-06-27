import express, {Express, Request, Response, NextFunction} from "express";
import httpStatus from "http-status-codes";
import mongoose from "mongoose";
import passport from "passport";
import serveStatic from 'serve-static';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import expressSession from "express-session";
import productSeed from "./models/productSeed.js";
import userSeed from "./models/userSeed.js";
import * as db from "./controllers/databaseController.js";
import apiRoutes from "./routes/apiRoutes.js"
import errorRoutes from "./routes/errorRoutes.js"
import homeRoutes from "./routes/homeRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import utilRoutes from "./routes/utilRoutes.js"

const __dirname = import.meta.dirname;
mongoose.connect('mongodb://localhost:27017/basic');
mongoose.connection.once('open', () => {
    console.log('open!')
}) // delete?

db.fill(productSeed);
db.fillUsers(userSeed);


const app: Express = express();

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

app.use("/", router);

const port = app.get("port");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
