const Product = require('./../models/productModel');

exports.create_product = (item) => {
  const product = new Product(item);
  product.save().then(() => console.log(`saved ${product.name}`));
}
exports.fill = (seed) => {
  for (const item of seed) {
    const product = new Product(item);
    product.save().then(() => console.log(`saved ${product.name}`));
  }
}
