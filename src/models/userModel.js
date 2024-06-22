import mongoose from 'mongoose';

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

  // Add a reference to the shoppingCart model
  // (one user can have exactly one shopping cart, and one shopping cart is owned by exactly one user)
  shoppingCart: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ShoppingCart'
    }
});

export default mongoose.model('User', UserSchema);
