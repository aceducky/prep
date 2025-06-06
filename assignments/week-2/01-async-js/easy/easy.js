const counter1 = (count, interval = 1000) => {
  let i = 0;
  console.log(i);
  const intervalId = setInterval(() => {
    console.log(++i);
    if (i >= count) clearInterval(intervalId);
  }, interval);
};

// counter1(5);

const counter2 = (count, interval = 1000) => {
  let i = 0;
  const helper = () => {
    console.log(i++);
    if (i <= count)
      setTimeout(() => {
        helper(count, interval);
      }, interval);
  };
  helper();
};

// counter2(5);

import * as fs from "fs/promises";

await fs.writeFile("./f1.txt", "Black box");

console.log(await fs.readFile("./f1.txt", "utf-8"));
