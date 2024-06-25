const argon2 = require("argon2");
const User = require('./../models/userModel');
exports.renderRegisterView = (req, res) => {
  res.render('register', {id:''});
}
async function hashPassword(plainTextPassword) {
    return await argon2.hash(plainTextPassword);
}

exports.registerUser = async (req, res) => {
    console.log(req.body);
  new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      address: req.body.address
    }
  )
    .save()
    .then(result => {
      console.log(result);
      res.render('register_success', {user: req.body.firstName, id: result.id});
    })
    .catch(error => {
      if (error) {
        console.error(error.message);
        res.render('register_fail', { message: error.message });
      }
    })
}
