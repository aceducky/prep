import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
const port = 5000;
const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  return (
    ALL_USERS.findIndex(
      (user) => user.username === username && user.password === password
    ) !== -1
  );
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  const token = jwt.sign({ username: username }, process.env.JWT_PASSWORD);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    const username = decoded.username;
    res.json(ALL_USERS.filter((user) => user.username !== username));
    // return a list of users other than this username
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(port, () => {
  console.log("Running on http://localhost:5000");
});
