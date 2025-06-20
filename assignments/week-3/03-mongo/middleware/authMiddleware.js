import jwt from "jsonwebtoken";

function createAuthMiddleware({ model, invalidCredentialsMessage }) {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({
        error: "Invalid inputs",
      });
    }
    let decodedUsername;
    try {
      const jwtToken = authHeader.split(" ")[1];
      console.log(jwtToken, process.env.JWT_SECRET);
      const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET);
      if (!decodedValue.username) {
        return res.status(400).json({ error: "Invalid inputs" });
      }
      decodedUsername = decodedValue.username;
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: "Invalid inputs" });
    }
    const user = await model.findOne({ username: decodedUsername });
    if (!user) {
      return res.status(400).json({
        error: invalidCredentialsMessage,
      });
    }

    req.username = decodedUsername;
    next();
  };
}

export default createAuthMiddleware;
