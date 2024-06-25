import mongoose from "mongoose";

import {IProduct} from "./productModel.js"

export interface IShoppingCart {
  itemQuantity: number;
  products: IProduct[];

}

const ShoppingCartSchema = new mongoose.Schema<IShoppingCart>({
  itemQuantity: {
    type: Number,
    required: true,
    min: 0
  },

  // Add a reference to the Product model
  // (one shopping cart can have many products, and one product can be in many shopping carts)
  products: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      productQuantity: {
        type: Number,
        required: true,
        min: 0
      }
    }],
    required: true
  },
});

export default mongoose.model('ShoppingCart', ShoppingCartSchema);
