class CustomError {
    static newError(message, status) {
        const error = new Error(message);
        error.status = status;
        throw error;
    }
}