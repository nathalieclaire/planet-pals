const mongoose = require('mongoose');
const ShoppingCartSchema = new mongoose.Schema({
    itemQuantity: {
        type: Number,
        required: true,
        min: 0
    },

    // Add a reference to the Product model
    // (one shopping cart can have many products, and one product can be in many shopping carts)
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            productQuantity: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    // Add a reference to the User model
    // (one shopping cart is owned by exactly one user, and one user can have exactly one shopping cart)
    users: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});
module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);
