import fs from "fs";
import httpStatus from "http-status-codes";
import {Response} from "express";

import contentTypes from "./contentTypes.js";

// export a function to red files and return a response
export function getFile(file: string, res: Response) {
    fs.readFile(`./${file}`, (error, data) => {
        if (error) {
            res.writeHead(httpStatus.INTERNAL_SERVER_ERROR,
                contentTypes.html);
            res.end("There was an error serving content!");
        }
        res.end(data);
    });
}
