const Product = require('./../models/productModel');
const User = require('./../models/userModel');


exports.create_product = (item) => {
  const product = new Product(item);
  product.save().then(() => console.log(`saved ${product.name}`));
}

exports.fill = (seed) => {
  for (const item of seed) {
    const product = new Product(item);
    product
      .save()
      .then(() => console.log(`saved ${product.name}`))
      .catch(() => console.log(`unable to save ${product.name}`));
  }
}

exports.fillUsers = (seed) => {
  for (const item of seed) {
    const user = new User(item);
    user
      .save()
      .then(() => console.log(`saved ${user.firstName}`))
      .catch(() => console.log(`unable to save ${user.firstName}`));
  }
}
