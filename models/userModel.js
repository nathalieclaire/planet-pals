const mongoose = require('mongoose');
const randToken = require('rand-token');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  apiToken: {
    type: String,
    unique: true
  },

  // Add a reference to the shoppingCart model
  // (one user can have exactly one shopping cart, and one shopping cart is owned by exactly one user)
  shoppingCart: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ShoppingCart'
    }
});

UserSchema.pre('save', function(next) {
  if (this.isNew) {
      this.apiToken = randToken.generate(16); // Generate a 16-character token
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);
