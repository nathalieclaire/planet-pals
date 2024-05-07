const Product = require('./../models/productModel');

const fake_database = {};

exports.create_product = (item) => {
  if (item.description === undefined) {
    throw new TypeError('item needs "description".');
  }
  if (item.name === undefined) {
    throw new TypeError('item needs "name".');
  }
  if (item.productID === undefined) {
    throw new TypeError('item needs "productID".');
  }
  if (item.price === undefined) {
    throw new TypeError('item needs "price".');
  }
  if (item.quantity === undefined) {
    throw new TypeError('item needs "quantity".');
  }
  fake_db[item.productID] = item;
}
exports.fill = (seed) => {
  for (const item of seed) {
    fake_database[item.productID] = item
  }
}
