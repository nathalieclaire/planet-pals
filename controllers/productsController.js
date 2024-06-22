import Product from './../models/productModel.js';

const getAllProducts = (req, res) => {
  Product.find({})
    .exec()
    .then((products) => {
      res.render('searchview', { products: products });
    })
    .catch((error) => {
      console.error(error.message);
    });
}
exports.getAllProductsJSON = (req, res) => {
  Product.find({})
      .exec()
      .then((products) => {
        res.json(products);
      })
      .catch((error) => {
        console.error(error.message);
      });
}

<<<<<<< HEAD
exports.getAllProductsJSONRendered = (req, res) => {
    Product.find({})
        .exec()
        .then((products) => {
            res.render("products_via_api", {json: JSON.stringify(products)});
        })
        .catch((error) => {
            console.error(error.message);
        });
}
exports.getFilteredProducts = (req, res) => {
=======
const getFilteredProducts = (req, res) => {
>>>>>>> 7444d9c (chore: modules are better for ts...)
  let filter = {};
  const search = req.body.search;
  console.log("filter:" + search)
  if (search !== "") {
    filter = { name: search };
  }
  Product.find(filter)
    .exec()
    .then((products) => {
      res.render('searchview-products', { products: products });
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

const saveProduct = (req, res) => {
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

export default {getAllProducts, getFilteredProducts, saveProduct};