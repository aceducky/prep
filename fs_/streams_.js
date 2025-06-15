import { createReadStream, createWriteStream } from "fs";
import path from "path";

const ip = path.join(import.meta.dirname, "ip.txt");
const op = path.join(import.meta.dirname, "op.txt");

const rs = createReadStream(ip, {
  highWaterMark: 16,
  autoClose: true,
});

const ws = createWriteStream(op, {
  flags: "a",
  highWaterMark: 15,
  autoClose: true,
});

rs.pipe(ws);

rs.on("error", (err) => {
  console.error(err);
});
ws.on("error", (err) => {
  console.error(err);
});

rs.on("end", () => console.log("Readable stream ended"));
ws.on("finish", () => console.log("Writable stream finished"));