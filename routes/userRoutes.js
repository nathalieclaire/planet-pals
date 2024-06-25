const passport = require("passport");
const router = require("express").Router();

const usersController = require("../controllers/usersController");
const registerController = require("../controllers/registerController");
const homeController = require("../controllers/homeController");

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
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true,
        successRedirect: '/'}));
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

module.exports = router;
