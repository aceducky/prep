function createAuthMiddleware({ model, invalidCredentialsMessage }) {
    return async (req, res, next) => {
        const username = req.headers.username;
        const password = req.headers.password;
        if (!username || !password) {
            return res.status(401).json({
                error: "Invalid username or password format",
            });
        }
        const user = await model.findOne({ username, password });
        if (!user) {
            return res.status(401).json({
                error: invalidCredentialsMessage,
            });
        }
        next();
    }
}

module.exports = createAuthMiddleware;