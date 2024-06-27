/*
const httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes.js"),
    utils = require("./utils");


// create route objects to hold route functions
const routes = {
    "GET": {},
    "POST": {}
};

// create handle function to handle requests
exports.handle = (req, res) => {
    try {
        routes[req.method][req.url](req, res);
    } catch (e) {
        res.writeHead(httpStatus.OK, contentTypes.html);
        utils.getFile("views/error.html", res);
    }
};

// map route functions
exports.get = (url, action) => {
    routes["GET"][url] = action;
};
exports.post = (url, action) => {
    routes["POST"][url] = action;
};
*/
