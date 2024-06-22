const products = {
    stickynotebert:{   
        productID: 1,
        name: "Stickynotebert",
        price: 9.99,
        quantity: 50,
        description: "Meet Stickynotebert, the friendly sticky note from planet Paperonia. Stickynotebert helps you organize your thoughts and keep track of important tasks.",
    },
    gizmotron:{
        productID: 2,
        name: "GizmoTron",
        price: 24.99,
        quantity: 20,
        description: "The GizmoTron is the ultimate gadget for tech enthusiasts. Packed with features and advanced functionality, it's a must-have for every tech-savvy individual.",
    },
};


const renderShoppingCart = (req, res) => {
    console.log('yeeeeeeeeeeeeeeee;',req.user)
    res.render("shoppingcart", {user: req.user});
};


const renderSearchView = (req, res) => {
    res.render("searchview", {products: req.data});
}


const renderProductView = (req, res) => {
    const productID = req.params.productID;
    const product = products[productID];
    res.render("product", {product});
};


const renderIndex = (req, res) => {
    res.render("index", { username: req.params.username });
};

const renderIndex2 = (req, res) => {
    res.render("index", { username: 'Tobi' });
};

export default {renderShoppingCart, renderSearchView, renderProductView, renderIndex, renderIndex2};