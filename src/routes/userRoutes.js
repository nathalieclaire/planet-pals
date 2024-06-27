import passport from "passport";
import {Router} from "express";
import * as usersController from "../controllers/usersController.js";
import * as registerController from "../controllers/registerController.js";

const router = Router();
router.get("/users", usersController.renderUsersTable);
router.put("/users", usersController.updateUser);
router.get("/register", registerController.renderRegisterView);
router.post("/register", registerController.registerUser);
router.get("/profile", usersController.renderLogin);
router.post("/profile", usersController.renderUser);
router.put("/profile", usersController.updateUser);
router.delete("/profile", usersController.deleteUser);
router.get("/login", usersController.renderLogin);
router.post("/login/password",
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true,
        successRedirect: '/'
    }));
router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.error('fuck')
            return next(err);
        }
        res.redirect("/login");
        console.log('success fully logged out')
    })
})

export default router;
