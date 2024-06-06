const User = require('./../models/shoppingCartModel');
const Product = require('./../models/productModel');

exports.renderShoppingCart = (req, res) => {
    Product.find()
        .then(products => {
            if (products.length === 0) {
                res.render('empty', { message: 'No products added yet.' });
            } else {
                res.render('shoppingcart', { products: products });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
};

exports.updateShoppingCart = (req, res) => {
    ShoppingCart.findOne({ users: req.body.users })
      .then(shoppingCart => {
        if (!shoppingCart) {
          shoppingCart = new ShoppingCart({
            users: req.body.users,
            products: [req.body.product]
          });
        } else {
          shoppingCart.products.push(req.body.product);
        }
        return shoppingCart.save();
      })
      .then(result => {
        res.render('shoppingcart_success', { shoppingCart: result.products });
      })
      .catch(error => {
        console.error(error.message);
        res.render('shoppingcart_fail', { message: error.message });
      });
  };