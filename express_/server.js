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
          "[CORS ERROR] Change cors options for this environment (NODE_ENV)\nCurrently using development environment's cors options\nThis is NOT safe. origin: ",
          origin
        );
        cb(new Error("Not allowed by CORS (development)"));
      } else if (process.env.NODE_ENV.toLowerCase() === "development") {
        console.log("Allowed request from origin: ", origin);
        cb(null, true);
      } else if (origin && allowedOrigins.includes(origin)) {
        console.log("Allowed request from origin: ", origin);
        cb(null, true);
      } else {
        cb(new Error("Not allowed by CORS, origin: ", origin));
      }
    },
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true }));

app.post("/text-body", express.text(),(req, res) => {
  res.send(`Got post req with body:\n${JSON.stringify(req.body, null, 2)}`);
});

app.post("/json-body", (req, res) => {
  res.send(`Got post req with body:\n${JSON.stringify(req.body, null, 2)}`);
  });

app.get("/some-html", (_req, res) => {
  res.send("<h2>some html</h2>");
});

app.post("/sum-of-numbers", (req, res) => {
  const schema = z.object({
    numbers: z.array(z.number()).min(0).max(10),
  });

  const response = schema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json({
      status: 400,
      message: "Error: numbers must be an array of numbers.",
      error: response.error.issues,
    });
  }

  const sum = response.data.numbers.reduce((acc, num) => acc + num, 0);
  res.status(200).json({ sum });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON Payload:", err.message);
    return res.status(400).json({
      status: 400,
      message: "Invalid JSON payload",
    });
  }

  console.error("Global Catch:", err.message || err);
  res.status(500).json({ msg: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
