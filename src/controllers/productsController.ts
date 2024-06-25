import {Request, Response} from 'express';

import Product from './../models/productModel.js';

export function getAllProducts(req: Request, res: Response) {
  Product.find({})
    .exec()
    .then((products) => {
      res.render('searchview', {products: products});
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

export function getFilteredProducts(req: Request, res: Response) {
  let filter = {};
  const search = req.body.search;
  console.log("filter:" + search)
  if (search !== "") {
    filter = {name: search};
  }
  Product.find(filter)
    .exec()
    .then((products) => {
      res.render('searchview-products', {products: products});
    })
    .catch((error) => {
      console.error(error.message);
      return [];
    });
}

/*
export function saveProduct(req: Request, res: Response) {
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
 */
