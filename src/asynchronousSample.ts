const fs = require("fs");

const util = require("util");

const promisifyReadFile = util.promisify(fs.readFile);

// type Err = Error | null;
type Data = Buffer | string;

// function main() {
//   let fileContent = "";

//   fs.readFile("index.html", (err: Err, data: Data) => {
//     fileContent = data.toString();
//     console.log("readFile callback");
//     console.log(fileContent);
//   });

//   console.log("after readFile");
//   console.log(fileContent);
// }

// function main() {
//   const readFilePromise = promisifyReadFile("index.html");

//   readFilePromise.then((data: Data) => {
//     const fileContent = data.toString();
//     console.log(fileContent);
//   });
// }

async function main() {
  const data = await promisifyReadFile("index.html");
  const fileContent = data.toString();
  console.log(fileContent);
}

main();
