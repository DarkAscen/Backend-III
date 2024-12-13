import errors from "../utils/errors/errors.js"
import winstonLogger from "../utils/winston.util.js";

function errorMiddleware(error, req, res, next) {
    const message = `${req.method} ${req.url} - ${error.message.toUpperCase()}`;
    if (error.statusCode) {
        winstonLogger.error(message);
    } else {
        winstonLogger.error(message);
    }
    const { fatal } = errors;
    return res.status(error.status || fatal.status).json({ message: error.message || fatal.message });
};

export default errorMiddleware;