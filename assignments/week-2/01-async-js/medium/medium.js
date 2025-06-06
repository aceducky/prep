// import { open } from "fs/promises";

// const file_handler = await open("./f1.txt", "a+");

// const file_content = await file_handler.readFile("utf-8");

// const spaces_removed_file_content = "\n" + file_content.split(/\s+/).join(" ");

// await file_handler.writeFile(spaces_removed_file_content, "utf-8");

function timer() {
  const leftPadZero = (n) => String(n).padStart(2, "0");
  const helper = () => {
    let time = "";
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    let m = hours >= 12 ? " PM" : " AM";
    time +=
      leftPadZero(hours % 12) +
      ":" +
      leftPadZero(minutes) +
      ":" +
      leftPadZero(seconds) +
      m;
    console.log(time);
  };
  helper();
  setInterval(helper, 1000);
}

timer();
