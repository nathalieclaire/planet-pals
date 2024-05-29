const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
});
module.exports = mongoose.model('Product', ProductSchema);
