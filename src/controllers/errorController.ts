import httpStatus from "http-status-codes";
import {Request, Response, NextFunction} from "express";

export function pageNotFoundError(req: Request, res: Response) {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/404.html`, {root: "./"});
}

export function internalServerError(error: Error, req: Request, res: Response, next: NextFunction) {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.error(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.sendFile(`./public/500.html`, {root: "./"});
}
