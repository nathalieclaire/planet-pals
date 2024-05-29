const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userID: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },

  // Add a reference to the shoppingCart model
  // (one user can have exactly one shopping cart, and one shopping cart is owned by exactly one user)
  shoppingCart: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ShoppingCart'
    }
});
module.exports = mongoose.model('User', UserSchema);
