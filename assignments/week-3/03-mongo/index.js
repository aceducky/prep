import express from "express";
const app = express();
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

// Middleware for parsing request bodies
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
