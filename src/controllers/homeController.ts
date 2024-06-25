import {IProduct} from "../models/productModel";
import {Request, Response} from "express";

const products: any = {
    stickynotebert: {
        productID: 1,
        name: "Stickynotebert",
        price: 9.99,
        quantity: 50,
        description: "Meet Stickynotebert, the friendly sticky note from planet Paperonia. Stickynotebert helps you organize your thoughts and keep track of important tasks.",
    },
    gizmotron: {
        productID: 2,
        name: "GizmoTron",
        price: 24.99,
        quantity: 20,
        description: "The GizmoTron is the ultimate gadget for tech enthusiasts. Packed with features and advanced functionality, it's a must-have for every tech-savvy individual.",
    },
};


export const renderShoppingCart = (req: Request, res: Response) => {
    console.log('yeeeeeeeeeeeeeeee;', req.user)
    res.render("shoppingcart", {user: req.user});
};


export const renderSearchView = (req: Request, res: Response) => {
    res.render("searchview", {products: req.body.data});
}


export const renderProductView = (req: Request, res: Response) => {
    const productID = req.params.productID;
    const product = products[productID];
    res.render("product", {product});
};


export const renderIndex = (req: Request, res: Response) => {
    res.render("index", {username: req.params.username});
};

export const renderIndex2 = (req: Request, res: Response) => {
    res.render("index", {username: 'Tobi'});
};
