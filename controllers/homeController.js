exports.renderShoppingCart = (req, res) => {
    res.render("shoppingcart");
};


exports.renderSearchView = (req, res) => {
    res.render("searchview");
};


exports.renderProductView = (req, res) => {
    res.render("productview", {username: 'stickynotebert'});
};


exports.renderIndex = (req, res) => {
    res.render("index", { username: req.params.username });
};

exports.renderIndex2 = (req, res) => {
    res.render("index", { username: 'Tobi' });
};
