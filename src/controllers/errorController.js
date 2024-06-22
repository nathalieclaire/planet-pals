import httpStatus from "http-status-codes";

const pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./public/404.html`, { root: "./" });
};
const internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.error(`ERROR occurred: ${error.stack}`);
    res.status(errorCode);
    res.sendFile(`./public/500.html`, { root: "./" });
};

export default {pageNotFoundError, internalServerError};