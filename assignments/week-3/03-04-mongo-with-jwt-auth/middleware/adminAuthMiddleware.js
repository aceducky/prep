import { Admin } from "../db/index.js";
import createAuthMiddleware from "./authMiddleware.js";

const adminAuthMiddleware = createAuthMiddleware({
  model: Admin,
  invalidCredentialsMessage: "User does not exist or invalid credentials",
});

export default adminAuthMiddleware;
