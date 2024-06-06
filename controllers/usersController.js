const User = require('./../models/userModel');

exports.renderUsersTable = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.render('usersTable', { users: users });
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

exports.renderLogin = (req, res) => {
  res.render('login');
}

exports.updateUser = (req, res) => {
  const search = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  };
  console.log(search)
  User.updateOne(search)
    .exec()
    .then((user) => {
      res.render();
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

exports.deleteUser = (req, res) => {
  const search = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address
  };
}
exports.renderUser = (req, res) => {
  User.findById(req.body.id)
    .exec()
    .then((user) => {
      res.render('profile', { user: user });
    })
    .catch((error) => {
      console.error(error.message);
    });
}
