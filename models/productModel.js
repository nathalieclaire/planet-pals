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

  // Add a reference to the shoppingCart model 
  // (many products can be in the same shopping cart, and one shopping cart can have many products)
  shoppingCart: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ShoppingCart'
    }
  ],
  // Add a reference to the Planet model 
  // (one product can be exactly from one home planet, and one home planet can have many products)
  planet: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Planet'
  }
});
module.exports = mongoose.model('Product', ProductSchema);
