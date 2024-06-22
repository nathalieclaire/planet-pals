import Product from './../models/productModel.js';
import User from './../models/userModel.js';


const create_product = (item) => {
  const product = new Product(item);
  product.save().then(() => console.log(`saved ${product.name}`));
}

const fill = (seed) => {
  for (const item of seed) {
    const product = new Product(item);
    product
      .save()
      .then(() => console.log(`saved ${product.name}`))
      .catch(() => console.log(`unable to save ${product.name}`));
  }
}

const fillUsers = (seed) => {
  for (const item of seed) {
    const user = new User(item);
    user
      .save()
      .then(() => console.log(`saved ${user.firstName}`))
      .catch(() => console.log(`unable to save ${user.firstName}`));
  }
}

export default {create_product, fill, fillUsers}