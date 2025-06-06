import {
  access,
  constants,
  copyFile,
  cp,
  mkdir,
  readdir,
  stat,
} from "fs/promises";
import path from "path";

async function canRead(filePath) {
  try {
    await access(filePath, constants.F_OK | constants.R_OK);
    return { availableToRead: true, error: null };
  } catch (err) {
    return { availableToRead: false, error: err };
  }
}

async function listContent(path, doRecursive = false) {
  const { availableToRead, error } = await canRead(src);
  if (!availableToRead) {
    throw new Error(`Couldn\'t access path: ${path}. Error: ${error.message}`);
  }
  const content = await readdir(path, { recursive: doRecursive });
  return content;
}

async function isDirectory(filePath) {
  try {
    const info = await stat(filePath);
    return info.isDirectory();
  } catch (err) {
    throw new Error(
      `Failed to get stat of file path ${filePath}\nError:${err.message}`,
    );
  }
}

async function bestCopyDirectory(src, dest) {
  if (!src || !dest) {
    throw new Error(`Invalid arguments.\nGot src:${src}\ndest:${dest}`);
  }

  const { availableToRead, error } = await canRead(src);
  if (!availableToRead) {
    throw new Error(`Couldn't access path: ${src}\nError:${error.message}`);
  }
try{
  await cp(src, dest, { 
    recursive: true, 
    force: true 
  })}catch(err){
  throw new Error(`Error when copying file.\nError:${err}`);
  }
}

async function copyDirectory_v1(src, dest) {
  if (!src || !dest) {
    throw new Error(`Invalid arguments.\nGot src:${src}\ndest:${dest}`);
  }

  const { availableToRead, error } = await canRead(src);
  if (!availableToRead) {
    throw new Error(`Couldn't access path: ${src}. Error: ${error.message}`);
  }
  try {
    const content = await listContent(src);

    await mkdir(dest, { recursive: true });
    for (const f of content) {
      const srcPath = path.join(src, f);
      const destPath = path.join(dest, f);
      if (await isDirectory(srcPath)) {
        await copyDirectory_v1(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function copyDirectory_v2(src, dest) {
  if (!src || !dest) {
    throw new Error(`Invalid arguments.\nGot src:${src}\ndest:${dest}`);
  }

  const { availableToRead, error } = await canRead(src);
  if (!availableToRead) {
    throw new Error(`Couldn't access path: ${src}\nError:${error.message}`);
  }
  try {
    const content = await listContent(src, true);
    await mkdir(dest, { recursive: true });
    // we have to ensure the destination directory exists before copying files
    // so we can use mkdir with recursive:true to create the directory if it doesn't exist
    // or skip this(comment above line of code) 1=>
    for (const f of content) {
      const srcPath = path.join(src, f);
      const destPath = path.join(dest, f);
      if (await isDirectory(srcPath)) {
        await mkdir(destPath, { recursive: true });
      } else {
        // 1 =>Ensure the directory exists before copying the file, uncomment the next line
        // await mkdir(path.dirname(destPath), { recursive: true });
        await copyFile(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const src = path.join(import.meta.dirname, "toBeCopiedDir");
const dest = path.join(import.meta.dirname, "toBeCopiedDirCopy");
// await copyDirectory_v1(src, dest);
// await copyDirectory_v2(src, dest);
await bestCopyDirectory(src, dest);
