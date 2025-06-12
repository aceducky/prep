import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import { z } from "zod";

const app = express();

// ⚠️WARNING: CHANGE CORS OPTIONS IN PRODUCTION
const allowedOrigins = [];
app.use(
  cors({
    origin: (origin, cb) => {
      if (process.env.NODE_ENV.toLowerCase() !== "development") {
        console.error(
          "[CORS ERROR] Change cors options for this environment (NODE_ENV)\nCurrently using development environment's cors options\nThis is NOT safe."
        );
        cb(new Error("Not allowed by CORS (development)"));
      } else if (process.env.NODE_ENV.toLowerCase() === "development") {
        cb(null, true);
      } else if (origin && allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/text-body", (req, res) => {
  console.log(req.body);
  res.send(`Got post req with body:\n${JSON.stringify(req.body, null, 2)}`);
});

app.post("/json-body", (req, res) => {
  console.log(req.body);
  res.send(`Got post req with body:\n${JSON.stringify(req.body, null, 2)}`);
});

app.get("/some-html", (_req, res) => {
  res.send("<h2>some html</h2>");
});

app.post("/sum-of-numbers", (req, res) => {
  const schema = z.array(z.number());
  const numbers = req.body.numbers;
  const response = schema.safeParse(numbers);
  res.send({ response });
});

// Global error catch
app.use((err, req, res, next) => {
  console.error("Global Catch:", err.message || err);
  res.status(500).json({ msg: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
