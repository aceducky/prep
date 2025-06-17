const { User } = require("../db");
const createAuthMiddleware = require("./authMiddleware");

const userMiddleware = createAuthMiddleware({
    model: User,
    invalidCredentialsMessage: "User does not exist or invalid credentials"
});

module.exports = userMiddleware;