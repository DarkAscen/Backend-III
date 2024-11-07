const errors = {
    error: { message: "Client error", status: 400 },
    auth: { message: "Invalid credentials", status: 401 },
    forbidden: { message: "Unauthorized", status: 403 },
    notFound: { message: "Not found", status: 404 },
    fatal: { message: "Server error", status: 500 }
};

export default errors;