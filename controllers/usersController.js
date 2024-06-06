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
  const update = {};
  update[req.body.key] = req.body.value;
  User.findByIdAndUpdate(req.body.id, {search: update})
  .exec()
  .then((user) => {
    res.render('p', {value: req.body.value});
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .exec()
    .then(() => {
      res.render('register');
    })
    .catch((error) => {
      res.render('register');
    });
}
exports.renderUser = (req, res) => {
  User.findById(req.body.id)
    .exec()
    .then((user) => {
      res.render('profile', { user: user });
    })
    .catch((error) => {
      res.render('register');
    });
}
