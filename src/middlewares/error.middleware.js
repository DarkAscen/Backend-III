import errors from "../utils/errors/errors.js"

function errorMiddleware(err, req, res, next) {
    console.log(err);
    const { fatal } = errors;
    return res.status(err.status || fatal.status).json({ message: err.message || fatal.message });
};

export default errorMiddleware;