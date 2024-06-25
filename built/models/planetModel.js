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
            validator: function (value) {
                return /^#[0-9A-Fa-f]{6}$/.test(value);
            },
            message: 'Invalid color format. Color should be in the format #11AAff.'
        }
    },
    description: {
        type: String,
        required: true
    }
});
export default mongoose.model('Planet', PlanetSchema);
