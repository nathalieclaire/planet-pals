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
