var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import argon2 from 'argon2';
import passport from "passport";
import User from './../models/userModel.js';
import { Strategy as StrategyLocal } from "passport-local";
function verifyPassword(hashOfPassword, plainTextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield argon2.verify(hashOfPassword, plainTextPassword);
            if (result) {
                return 'correct';
            }
            else {
                return 'wrong';
            }
        }
        catch (error) {
            return 'error';
        }
    });
}
export const renderUsersTable = (req, res) => {
    User.find({})
        .then((users) => {
        res.render('usersTable', { users: users });
    })
        .catch((error) => {
        console.error(error.message);
    });
};
export const renderLogin = (req, res) => {
    res.render('login');
};
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    User.findOne({ email: req.body.user })
        .then((user) => __awaiter(void 0, void 0, void 0, function* () {
        if (user == null) {
            console.log('user not found:' + req.body.user);
            res.render('register');
            return;
        }
        console.log(user);
        const result = yield verifyPassword(user.password, req.body.password);
        if (result === 'correct') {
            console.log('correct password');
            res.render('index', { username: user.firstName });
        }
        else if (result === 'wrong') {
            res.render('login');
            console.log('wrong password');
        }
        else {
            console.log('error in verifyPassword');
        }
    }))
        .catch((error) => {
        console.error(error);
    });
});
export const updateUser = (req, res) => {
    const update = {}; // TODO: any type
    update[req.body.key] = req.body.value;
    User.findByIdAndUpdate(req.body.id, update, { new: true })
        .then((user) => {
        if (user === null) {
            console.warn('no user with id', req.body.id);
        }
        else {
            res.render('p', { key: req.body.key, value: req.body.value });
        }
    })
        .catch((error) => {
        console.error(error);
        res.render('register');
    });
};
export const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.body.id)
        .then((user) => {
        if (user === null) {
            console.warn('no user with id', req.body.id);
        }
        else {
            res.render('bye', { id: req.body.id, name: user.firstName });
        }
    })
        .catch((error) => {
        console.error(error);
        res.render('register');
    });
};
export const renderUser = (req, res) => {
    console.log(req.body.id);
    User.findById(req.body.id)
        .then((user) => {
        if (user === null) {
            res.render('register');
        }
        else {
            res.render('profile', { user: user });
        }
    })
        .catch((error) => {
        console.error(error);
        res.render('register');
    });
};
passport.use(new StrategyLocal({ passReqToCallback: true }, function (req, email, pass, done) {
    console.log("made it!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    User.findOne({ email: email })
        .then((user) => {
        if (user != null) {
            verify(req, user, done);
        }
    })
        .catch((err) => done(err));
}));
function verify(req, user, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("aslkdfalkdsjfldsajflksadjflasdjflk");
        if (!user) {
            return done(null, false);
        }
        if ((yield verifyPassword(user.password, req.body.password)) === 'correct') {
            req.body.user = user;
            return done(null, user);
        }
        return done(null, false);
    });
}
passport.serializeUser(function (user, done) {
    done(null, user.email);
});
passport.deserializeUser((email, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: email });
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
