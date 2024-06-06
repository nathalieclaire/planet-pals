const User = require('./../models/userModel');
const ShoppingCart = require('./../models/shoppingCartModel');

exports.renderRegisterView = (req, res) => {
  res.render('register');
}
exports.registerUser = (req, res) => {
  console.log(req.body)
  new User(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      ShoppingCart: new ShoppingCart({ products: [] }),
    }
  )
    .save()
    .then(result => {
      res.render('register_success', {user: req.body.firstName});
    })
    .catch(error => {
      if (error) {
        console.error(error.message);
        res.render('register_fail', { message: error.message });
      }
    })
}
