const User = require('./../models/userModel');
const argon2 = require('argon2');
const passport = require("passport");
const LocalStrategy = require("passport-local");

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

exports.verifyToken = async (req, res, next) => {
  try {
      const apiToken = req.query.apiToken;

      if (!apiToken) {
          return res.status(400).send('API token is required');
      }

      const user = await User.findOne({ apiToken });

      if (!user) {
          return res.status(401).send('Invalid API token');
      }

      req.user = user;
      next();
  } catch (err) {
      res.status(500).send('Server error');
  }
};

exports.renderUsersTable = (req, res) => {
  User.find({})
    .then((users) => {
      res.render('usersTable', { users: users });
    })
    .catch((error) => {
      console.error(error.message);
    });
}

exports.renderLogin = (req, res) => {
  res.render('login');
}
exports.renderProfile = (req, res) => {
    console.log(req.query)
    console.log(req.query.apiToken)
    User.findOne({apiToken: req.query.apiToken})
        .then(async (user) => {
            if (user == null) {
                console.log('user not found:');
                res.render('error')
            }
            res.render('profile', {user: user});
        })
        .catch((error) => {
            console.error(error);
        })
}
exports.loginUser = async (req, res) => {
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
exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
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
exports.renderUser = (req, res) => {
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
