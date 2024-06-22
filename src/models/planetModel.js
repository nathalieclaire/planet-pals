import mongoose from "mongoose";

const PlanetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^#[0-9A-Fa-f]{6}$/.test(value);
            },
            message: 'Invalid color format. Color should be in the format #11AAff.'
        }
    },
    description: {
        type: String,
        required: true
    },

    // Add a reference to the Product model
    // (one planet can have many products, and one product can be from exactly one planet)
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
        }
    ]
});

export default mongoose.model('Planet', PlanetSchema);
