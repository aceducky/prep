import {
  access,
  constants,
  mkdir,
  readdir,
  rm,
  stat,
  writeFile,
} from "fs/promises";
import path from "path";

try {
  const files = await readdir(".");
  //                       or import.meta.dirname (current directory)
  console.log("Files in directory:", files);

  const filesWithOptions = await readdir(".", { withFileTypes: true });
  console.log("_____________________");

  for (const dirent of filesWithOptions) {
    console.log(
      dirent.name,
      dirent.isDirectory() ? "is a directory" : "is a file"
    );
  }
  console.log("_____________________");
} catch (err) {
  console.error("Error reading directory:", err);
}

const toBeRemovedFile = "toBeRemovedFile";
await writeFile(toBeRemovedFile, "");

try {
  await rm(toBeRemovedFile);
  console.log("Removed", toBeRemovedFile);
} catch (error) {
  console.log("Failed to delete", error.path);
}

const toBeRemovedDir = "./toBeRemovedFolder";
await mkdir(path.join(toBeRemovedDir, "A", "B"), { recursive: true });

// Check if File is visible to the calling process (Used here to check if file is present)
const curr_files = await readdir(".");
console.log(curr_files);
try {
  await access(toBeRemovedDir, constants.F_OK);
  console.log("Directory ", toBeRemovedDir, "is found");
} catch (e) {
  console.error("Error: ", e, "Directory ", toBeRemovedDir, "is not found");
}

await rm(toBeRemovedDir, { recursive: true, force: true });
console.log("Removed ", toBeRemovedDir);
const after_files = await readdir(".");
console.log(after_files);

const seperator = path.sep;
console.log("Seperator: ", seperator);
const file_path = path.join(import.meta.dirname, "textFile.txt");
console.log("File path: ", file_path);
console.log("Extension: ", path.extname(file_path));
