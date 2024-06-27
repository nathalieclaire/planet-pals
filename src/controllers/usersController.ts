import argon2 from 'argon2';
import passport from "passport";
import {Request, Response} from "express";

import User, {IUser} from './../models/userModel.js';
import {Strategy as StrategyLocal} from "passport-local";

async function verifyPassword(hashOfPassword: string, plainTextPassword: string): Promise<'correct' | 'wrong' | 'error'> {
    try {
        const result = await argon2.verify(hashOfPassword, plainTextPassword);
        if (result) {
            return 'correct';
        } else {
            return 'wrong';
        }
    } catch (error) {
        return 'error';
    }
}

export const renderUsersTable = (req: Request, res: Response) => {
    User.find({})
        .then((users) => {
            res.render('usersTable', {users: users});
        })
        .catch((error) => {
            console.error(error.message);
        });
}

export const renderLogin = (req: Request, res: Response) => {
    res.render('login');
}
export const loginUser = async (req: Request, res: Response) => {
    User.findOne({email: req.body.user})
        .then(async (user) => {
            if (user == null) {
                console.log('user not found:' + req.body.user);
                res.render('register')
                return;
            }
            console.log(user)
            const result = await verifyPassword(user.password, req.body.password);
            if (result === 'correct') {
                console.log('correct password');
                res.render('index', {username: user.firstName});
            } else if (result === 'wrong') {
                res.render('login');
                console.log('wrong password');
            } else {
                console.log('error in verifyPassword');
            }
        })
        .catch((error) => {
            console.error(error);
        })
}

export const updateUser = (req: Request, res: Response) => {
    const update: any = {};  // TODO: any type
    update[req.body.key] = req.body.value;
    User.findByIdAndUpdate(req.body.id, update, {new: true})
        .then((user) => {
            if (user === null) {
                console.warn('no user with id', req.body.id);
            } else {
                res.render('p', {key: req.body.key, value: req.body.value});
            }
        })
        .catch((error) => {
            console.error(error);
            res.render('register');
        });
}

export const deleteUser = (req: Request, res: Response) => {
    User.findByIdAndDelete(req.body.id)
        .then((user) => {
            if (user === null) {
                console.warn('no user with id', req.body.id);
            } else {
                res.render('bye', {id: req.body.id, name: user.firstName});
            }
        })
        .catch((error) => {
            console.error(error);
            res.render('register');
        });
}
export const renderUser = (req: Request, res: Response) => {
    console.log(req.body.id)
    User.findById(req.body.id)
        .then((user) => {
            if (user === null) {
                res.render('register')
            } else {
                res.render('profile', {user: user});
            }
        })
        .catch((error) => {
            console.error(error);
            res.render('register');
        });
}
passport.use(new StrategyLocal(
    {passReqToCallback: true},
    function (req, email, pass, done) {
        console.log("made it!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        User.findOne({email: email})
            .then((user) => {
                if (user != null) {
                    verify(req, user, done)
                }
            })
            .catch((err) => done(err));
    }
));

async function verify(req: Request, user: IUser, done: Function) {
    console.log("aslkdfalkdsjfldsajflksadjflasdjflk")
    if (!user) {
        return done(null, false);
    }
    if (await verifyPassword(user.password, req.body.password) === 'correct') {
        req.body.user = user;
        return done(null, user);
    }
    return done(null, false);
}

passport.serializeUser(function (user: any, done: any) {  // TODO: any type
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await User.findOne({email: email});
        done(null, user);
    } catch (err) {
        done(err);
    }
});
