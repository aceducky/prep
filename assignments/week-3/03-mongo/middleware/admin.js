const { Admin } = require("../db");
const createAuthMiddleware = require("./authMiddleware");

const adminMiddleware = createAuthMiddleware({
    model: Admin,
    invalidCredentialsMessage: "User does not exist or invalid credentials"
});

module.exports = adminMiddleware;