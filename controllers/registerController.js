const User = require('./../models/userModel');
exports.renderRegisterView = (req, res) => {
  res.render('register', {id:''});
}
exports.registerUser = (req, res) => {
  new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address
    }
  )
    .save()
    .then(result => {
      console.log(result.id)
      res.render('register_success', {user: req.body.firstName, id: result.id});
    })
    .catch(error => {
      if (error) {
        console.error(error.message);
        res.render('register_fail', { message: error.message });
      }
    })
}
