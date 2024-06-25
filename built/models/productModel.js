import mongoose from "mongoose";
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
    // Add a reference to the Planet model
    // (one product can be exactly from one home planet, and one home planet can have many products)
    planet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planet',
        required: false
    }
});
const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
