const fs = require("fs"),
    httpStatus = require("http-status-codes"),
    contentTypes = require("./contentTypes");

// export a function to red files and return a response
module.exports = { 
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
                    contentTypes.html);
                res.end("There was an error serving content!");
            }
        res.end(data);
        });
    }
};