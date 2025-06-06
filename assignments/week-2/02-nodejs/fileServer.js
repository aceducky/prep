/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */

const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();

const baseFilesDir = path.join(__dirname, "files");

async function validateAndResolveFilePathFromName(filename, res) {
  if (!filename || filename.includes("..")) {
    res.status(400).send("Invalid filename provided.");
    return null;
  }
  if (path.isAbsolute(filename)) {
    console.error(`Expected filename, got absolute path ${filename}`);
    res.status(400).send("Invalid filename provided.");
    return null;
  }

  const requestedFilePath = path.join(baseFilesDir, filename);
  const resolvedFilePath = path.resolve(requestedFilePath);

  if (!resolvedFilePath.startsWith(baseFilesDir + path.sep)) {
    res.status(404).send("File not found");
    return null;
  }
  return resolvedFilePath;
}

app.get("/files", async (req, res) => {
  try {
    const content = await fs.readdir(baseFilesDir);
    res.status(200).send(content);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/file/:filename", async (req, res) => {
  try {
    const resolvedFilePath = await validateAndResolveFilePathFromName(
      req.params.filename,
      res
    );
    if (!resolvedFilePath) {
      return;
    }

    const content = await fs.readFile(resolvedFilePath);
    res.status(200).send(content);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("File not found");
    } else {
      console.error(error);
      res.status(500).send("Internal server error.");
    }
  }
});

app.get("/*splat", (req, res) => {
  res.status(404).send("Route not found");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});

module.exports = app;
