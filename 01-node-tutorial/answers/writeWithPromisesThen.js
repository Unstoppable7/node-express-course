const { writeFile, readFile } = require("fs").promises;

writeFile("./temp.txt", `Writing line 1\n`)
  .then(() => {
    writeFile("./temp.txt", `Writing line 2\n`, { flag: "a" })
      .then(() => {
        writeFile("./temp.txt", `Writing line 3\n`, { flag: "a" });
      })
      .then(() => {
        return readFile("./temp.txt", { encoding: "utf8" });
      })
      .then((result) => {
        console.log(result);
      });
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });
