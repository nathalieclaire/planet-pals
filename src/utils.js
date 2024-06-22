import fs from "fs";
import httpStatus from "http-status-codes";

import contentTypes from "./contentTypes.js";

// export a function to red files and return a response
export default {
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