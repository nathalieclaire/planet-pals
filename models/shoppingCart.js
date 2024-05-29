const mongoose = require('mongoose');
const ShoppingCartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    itemQuantity: {
        type: Number,
        required: true,
        min: 0
    },
});
module.exports = mongoose.model('ShoppingCart', ShoppingCartSchema);