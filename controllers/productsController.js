const Product = require('./../models/productModel');

exports.getAllProducts = (req, res) => {
  Product.find({})
    .exec()
    .then((products) => {
      res.render('searchview', { products: products });
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}
exports.saveProduct = (req, res) => {
  new Product(
    req.body.productID,
    req.body.name,
    req.body.price,
    req.body.quantity,
    req.body.description)
    .save()
    .then(result => {
      res.render('thanks');
    })
    .catch(error => {
      if (error) {
        console.error(error.message);
        res.send(error);
      }
    })
}
