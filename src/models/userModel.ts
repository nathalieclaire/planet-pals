import mongoose, {} from 'mongoose';

import {IShoppingCart} from "./shoppingCartModel.js"

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    shoppingCart?: IShoppingCart;

}

const UserSchema = new mongoose.Schema<IUser>({
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

export default mongoose.model('User', UserSchema);
