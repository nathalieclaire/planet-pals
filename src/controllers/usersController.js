import argon2 from 'argon2';
import passport from "passport";
import LocalStrategy from "passport-local";

import User from './../models/userModel.js';

async function verifyPassword(hashOfPassword, plainTextPassword) {
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

export const renderUsersTable = (req, res) => {
  User.find({})
    .then((users) => {
      res.render('usersTable', { users: users });
    })
    .catch((error) => {
      console.error(error.message);
    });
}

export const renderLogin = (req, res) => {
  res.render('login');
}
export const loginUser = async (req, res) => {
    User.findOne({email: req.body.user})
        .then(async (user) => {
            if (user == null) {
                console.log('user not found:'+req.body.user);
                res.render('register')
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
export const updateUser = (req, res) => {
  const update = {};
  update[req.body.key] = req.body.value;
  User.findByIdAndUpdate(req.body.id, update, { new: true })
    .then((user) => {
      if (user === null) {
        console.warn('no user with id', req.body.id);
      } else {
        res.render('p', { key: req.body.key, value: req.body.value });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render('register');
    });
}

export const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .then((user) => {
      if (user === null) {
        console.warn('no user with id', req.body.id);
      } else {
        res.render('bye', { id: req.body.id, name: user.firstName });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render('register');
    });
}
export const renderUser = (req, res) => {
  console.log(req.body.id)
  User.findById(req.body.id)
    .then((user) => {
      if (user === null) {
        res.render('register')
      } else {
        res.render('profile', { user: user });
      }
    })
    .catch((error) => {
      console.error(error);
      res.render('register');
    });
}
passport.use(new LocalStrategy(
    {passReqToCallback: true },
    function(req, email, pass, done) {
        console.log("made it!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        User.findOne({ email: email })
            .then((user) => verify(req, user, done))
            .catch((err) => done(err));
    }
));

async function verify(req, user, done) {
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

passport.serializeUser(function(user, done) {
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
