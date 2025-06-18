import { User } from "../db/index.js";
import createAuthMiddleware from "./authMiddleware.js";

const userMiddleware = createAuthMiddleware({
    model: User,
    invalidCredentialsMessage: "User does not exist or invalid credentials"
});

export default userMiddleware;