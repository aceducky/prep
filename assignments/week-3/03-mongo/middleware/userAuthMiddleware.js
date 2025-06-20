import { User } from "../db/index.js";
import createAuthMiddleware from "./authMiddleware.js";

const userAuthMiddleware = createAuthMiddleware({
  model: User,
  invalidCredentialsMessage: "User does not exist or invalid credentials",
});

export default userAuthMiddleware;
